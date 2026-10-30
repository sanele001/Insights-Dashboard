"use client";
import Login from "../components/login/login";
import ThemeToggle from "../components/themeToggle";
import { UserProvider } from "../context/user/useContext";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 items-center justify-center font-sans">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}
