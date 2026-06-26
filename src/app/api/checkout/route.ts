import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripeRequired } from "@/lib/stripe";
import { buildWhatsappUrl, getCheckoutMode } from "@/lib/checkout-mode";
import { SITE } from "@/lib/site";

const Schema = z.object({
  items: z
    .array(z.object({ productId: z.string(), quantity: z.number().int().positive() }))
    .min(1),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    notes: z.string().optional().default(""),
  }),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const { items, customer } = parsed.data;

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
  });
  if (products.length !== items.length) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 400 });
  }

  const lines = items.map((i) => {
    const p = products.find((x) => x.id === i.productId)!;
    return { product: p, quantity: i.quantity };
  });
  const total = lines.reduce((acc, l) => acc + l.product.price * l.quantity, 0);
  const mode = getCheckoutMode();

  // Persistimos el pedido como PENDING en ambos casos.
  const order = await prisma.order.create({
    data: {
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerNotes: customer.notes || null,
      total,
      status: "PENDING",
      checkoutMethod: mode === "whatsapp" ? "WHATSAPP" : "STRIPE",
      items: {
        create: lines.map((l) => ({
          productId: l.product.id,
          quantity: l.quantity,
          unitPrice: l.product.price,
        })),
      },
    },
  });

  if (mode === "whatsapp") {
    const url = buildWhatsappUrl({
      items: lines.map((l) => ({
        name: l.product.name,
        quantity: l.quantity,
        unitPrice: l.product.price,
      })),
      total,
      customerName: customer.name,
      customerEmail: customer.email,
      notes: customer.notes,
    });
    return NextResponse.json({ mode, url, orderId: order.id });
  }

  // Stripe
  try {
    const stripe = stripeRequired();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lines.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: "ars",
          unit_amount: l.product.price,
          product_data: {
            name: l.product.name,
            description: l.product.brand,
            images: [l.product.imageUrl],
          },
        },
      })),
      customer_email: customer.email,
      success_url: `${SITE.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/checkout/cancel`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ mode, url: session.url, orderId: order.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error en Stripe";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
