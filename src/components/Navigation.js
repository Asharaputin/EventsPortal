"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useNotification } from "@/context/notification-context";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Navigation() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const { data: session } = useSession();

  const onLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
    showNotification("Вы вышли из системы", "info");
  };

  return (
    <nav className="bg-gray-800 px-6 py-3 flex justify-between items-center">
      <ul className="flex gap-6 list-none m-0 p-0">
        <li>
          <Link
            href="/"
            className={`text-white font-medium pb-1 transition-colors ${
              pathname === "/"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "hover:text-yellow-400"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`text-white font-medium pb-1 transition-colors ${
              pathname === "/about"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "hover:text-yellow-400"
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className={`text-white font-medium pb-1 transition-colors ${
              pathname.startsWith("/events")
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "hover:text-yellow-400"
            }`}
          >
            Events
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-yellow-400 font-semibold flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-yellow-400" />
              {session.user.nickname || session.user.email}
            </span>
            <Link
              href="/change-password"
              className={`px-3 py-1 rounded text-white font-medium transition-colors ${
                pathname === "/change-password"
                  ? "bg-yellow-400 text-gray-900"
                  : "hover:bg-gray-700"
              }`}
            >
              Change Password
            </Link>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded font-semibold transition-transform hover:bg-red-700 hover:scale-105 shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/signin"
            className={`px-3 py-1 rounded text-white font-medium transition-colors ${
              pathname === "/signin"
                ? "bg-yellow-400 text-gray-900"
                : "hover:bg-gray-700"
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
