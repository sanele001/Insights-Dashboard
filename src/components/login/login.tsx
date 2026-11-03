"use client";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/user/useContext";

export default function Login() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [email, setEmail] = useState("john.doe@email.com");
  const [password, setPassword] = useState("john.doe@email.com");

  const handleLogin = () => {
    if (user) {
      router.push(`/dashboard/${user.customerId}`);
      return;
    }

    setShowWarning(true);
  };

  return (
    <section className="w-full max-w-md rounded-xl border border-border bg-surface p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-primary">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to view your spending dashboard.
        </p>
      </div>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-primary outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-primary outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0f1419] px-4 py-2.5 text-sm font-medium leading-5 text-white hover:bg-[#0f1419]/90 focus:outline-none focus:ring-4 focus:ring-[#0f1419]/50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55"
        >
          <FaEnvelope aria-hidden="true" />
          Sign in with email
        </button>
      </div>
      {showWarning && <p role="alert">Invalid email or password.</p>}
    </section>
  );
}
