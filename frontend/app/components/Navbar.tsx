"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Building2, MapPin, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const roleConfig: Record<
  string,
  { label: string; roleLabel: string; icon: typeof Users; href: string; color: string }
> = {
  user: { label: "User Dashboard", roleLabel: "User", icon: Users, href: "/user", color: "var(--color-blue)" },
  organizer: { label: "Organizer Dashboard", roleLabel: "Organizer", icon: Building2, href: "/organizer", color: "var(--color-purple)" },
  owner: { label: "Space Owner Dashboard", roleLabel: "Space Owner", icon: MapPin, href: "/owner", color: "var(--color-yellow)" },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  const role = user?.role;
  const config = role ? roleConfig[role] : null;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href={config?.href || "/"} className="flex items-center gap-2 font-bold text-lg text-navy">
          ConnectSpace
        </Link>

        {user && (
          <>
            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm font-medium text-gray hidden md:inline">
                Welcome, <span className="text-navy">{user.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {config && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`, color: config.color }}
                  >
                    <config.icon size={16} strokeWidth={1.8} />
                    <span className="hidden sm:inline">{config.label}</span>
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                  title={config ? `Logout from ${config.roleLabel}` : "Logout"}
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} className="text-navy" /> : <Menu size={22} className="text-navy" />}
            </button>
          </>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {user && menuOpen && (
        <div className="sm:hidden border-t border-gray/10 bg-white/95 backdrop-blur-sm px-4 py-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm text-gray">
            Welcome, <span className="font-medium text-navy">{user.name}</span>
          </p>
          {config && (
            <span
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium w-full"
              style={{ backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`, color: config.color }}
            >
              <config.icon size={16} strokeWidth={1.8} />
              {config.label}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors w-full justify-center"
          >
            <LogOut size={16} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
