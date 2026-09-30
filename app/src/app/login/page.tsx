"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.username({
      username: username.trim(),
      password,
      rememberMe: true,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Не удалось войти");
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-8">
            <div className="mb-6 text-sm font-semibold tracking-[0.25em] text-white/50">
              FRΛKDEV
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Вход
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Войдите в свой аккаунт, чтобы открыть учёт расходов.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Имя пользователя
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
                placeholder="Введите имя пользователя"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm outline-none transition focus:border-white/30 focus:bg-white/[0.08]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Пароль
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                placeholder="Введите пароль"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm outline-none transition focus:border-white/30 focus:bg-white/[0.08]"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/45">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="text-white transition hover:text-white/70"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
