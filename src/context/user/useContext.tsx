"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/src/schema/user";
import { fetchUserById } from "@/src/lib/services/user";
import { logger } from "@/src/lib/utils/logger";

type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;

    fetchUserById("12345")
      .then((fetchedUser) => {
        if (active) setUser(fetchedUser);
      })
      .catch((error: unknown) => {
        logger.error(error, "Failed to load user");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return context;
}
