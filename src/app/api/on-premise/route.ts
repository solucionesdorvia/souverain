import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { empresa, contactName, email, phone, rubro, volumen, ciudad, mensaje } =
      await req.json();

    if (!empresa || !contactName || !email || !phone || !rubro) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        empresa: String(empresa),
        contactName: String(contactName),
        email: String(email),
        phone: String(phone),
        rubro: String(rubro),
        volumen: volumen ? String(volumen) : null,
        ciudad: ciudad ? String(ciudad) : null,
        mensaje: mensaje ? String(mensaje) : null,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[on-premise]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
