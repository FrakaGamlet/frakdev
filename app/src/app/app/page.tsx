import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AppPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="text-sm font-semibold tracking-[0.25em] text-white/40">
            FRΛKDEV
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Учёт расходов
          </h1>

          <p className="mt-2 text-white/50">
            Добро пожаловать, {session.user.name}.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="text-sm text-white/50">
            Первый релиз
          </div>

          <div className="mt-2 text-xl font-medium">
            Загрузка и анализ чеков
          </div>
        </div>
      </div>
    </main>
  );
}
