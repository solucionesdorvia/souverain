import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ESTADOS_LEAD } from "@/lib/leads";

const PatchSchema = z.object({ status: z.enum(ESTADOS_LEAD) });

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }
  try {
    const updated = await prisma.lead.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
