"use client";
import Login from "../components/login/login";
import { UserProvider } from "../context/user/useContext";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}
