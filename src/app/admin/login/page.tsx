import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Login" };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="max-w-md mx-auto py-16">
      <h2 className="font-display text-4xl mb-2">Iniciar sesión</h2>
      <p className="text-mute text-sm mb-10">Acceso restringido al equipo de Souverain.</p>
      <LoginForm />
    </div>
  );
}
