"use client";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/user/useContext";

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleLogin = () => {
    if (user) {
      router.push(`/dashboard/${user.customerId}`);
      return;
    }

    setShowWarning(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogin}
        className="text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center inline-flex items-center gap-2 dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55"
      >
        <FaEnvelope aria-hidden="true" />
        Sign in with email
      </button>
      {showWarning && <p role="alert">Invalid email or password.</p>}
    </>
  );
}
