import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  message: z.string().min(1),
});

// Por ahora el formulario solo loguea el mensaje en el servidor.
// Para producción: enchufar a Resend / Postmark / SMTP.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  console.log("[souverain·contact]", parsed.data);
  return NextResponse.json({ ok: true });
}
