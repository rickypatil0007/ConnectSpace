"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dummyUsers } from "./dummy-data";

export type Role = "user" | "organizer" | "owner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role, name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("connectspace_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("connectspace_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: Role, name: string, email: string) => {
    const newUser: User = { id: `u_${Date.now()}`, name, email, role };
    // Map demo users to specific dummy user data if necessary
    if (email === "user@example.com") {
      newUser.id = dummyUsers[0].id;
      newUser.name = dummyUsers[0].name;
    }
    
    setUser(newUser);
    localStorage.setItem("connectspace_user", JSON.stringify(newUser));
    router.push(`/${role}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("connectspace_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
