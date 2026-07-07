"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, Building2, MapPin } from "lucide-react";
import { useAuth, Role } from "@/lib/auth-context";

export default function Home() {
  const router = useRouter();
  const { user, login, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to their dashboard
  useEffect(() => {
    if (user && !isLoading) {
      router.replace(`/${user.role}`);
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // For this ideathon demo, we bypass backend auth
      // and just log them in as the requested role locally
      if (!isLogin && !name) {
        setError("Name is required");
        setLoading(false);
        return;
      }

      // Simulate a small delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const loginName = isLogin ? (email.split('@')[0] || "User") : name;
      const loginRole = isLogin ? (
        email.includes("organizer") ? "organizer" : 
        email.includes("owner") ? "owner" : "user"
      ) : role;

      login(loginRole, loginName, email);
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Show a loading spinner instead of a blank white screen
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
      </div>
    );
  }
  
  if (user) return null;

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-8 sm:py-16">
      <header className="text-center mb-6 sm:mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl font-bold text-navy tracking-tight mb-3 sm:mb-4">
          ConnectSpace
        </h1>
        <div
          className="h-1 w-16 sm:w-20 mx-auto mb-4 sm:mb-6 rounded-full"
          style={{ background: "var(--color-yellow)" }}
        />
        <p className="text-base sm:text-xl text-gray leading-relaxed">
          Connecting People, Spaces & Communities
        </p>
      </header>

      <main className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl border border-gray/20 shadow-sm">
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray/30 rounded-lg focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Account Role</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("user")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                      role === "user" ? "border-blue bg-blue/5 text-blue" : "border-gray/30 text-gray hover:bg-gray/5"
                    }`}
                  >
                    <Users size={20} className="mb-1" />
                    <span className="text-xs font-medium">User</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("organizer")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                      role === "organizer" ? "border-purple bg-purple/5 text-purple" : "border-gray/30 text-gray hover:bg-gray/5"
                    }`}
                  >
                    <Building2 size={20} className="mb-1" />
                    <span className="text-xs font-medium">Organizer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("owner")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                      role === "owner" ? "border-yellow bg-yellow/5 text-yellow" : "border-gray/30 text-gray hover:bg-gray/5"
                    }`}
                  >
                    <MapPin size={20} className="mb-1" />
                    <span className="text-xs font-medium">Owner</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray/30 rounded-lg focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray/30 rounded-lg focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-navy text-white rounded-lg font-medium hover:bg-navy/90 transition-colors disabled:opacity-70"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>

        {isLogin && (
          <div className="mt-8 pt-6 border-t border-gray/10">
            <p className="text-xs text-center text-gray font-medium mb-3 uppercase tracking-wider">Demo Accounts</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { setEmail("user@example.com"); setPassword("password123"); }}
                className="text-xs py-1.5 border border-blue/30 text-blue rounded bg-blue/5 hover:bg-blue/10 transition-colors"
              >
                User
              </button>
              <button
                onClick={() => { setEmail("organizer@example.com"); setPassword("password123"); }}
                className="text-xs py-1.5 border border-purple/30 text-purple rounded bg-purple/5 hover:bg-purple/10 transition-colors"
              >
                Organizer
              </button>
              <button
                onClick={() => { setEmail("owner@example.com"); setPassword("password123"); }}
                className="text-xs py-1.5 border border-yellow/40 text-yellow-600 rounded bg-yellow-50 hover:bg-yellow-100 transition-colors"
              >
                Owner
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
