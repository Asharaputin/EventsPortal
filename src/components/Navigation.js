"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useNotification } from "@/context/notification-context";
import { UserIcon } from "@heroicons/react/24/solid";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const { data: session } = useSession();

  const onLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
    showNotification("Вы вышли из системы", "info");
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li>
          <Link href="/" className={pathname === "/" ? styles.active : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={pathname === "/about" ? styles.active : ""}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className={pathname.startsWith("/events") ? styles.active : ""}
          >
            Events
          </Link>
        </li>
      </ul>

      <div className={styles.authBlock}>
        {session ? (
          <>
            <span className={styles.nickname}>
              <UserIcon className={styles.userIcon} />{" "}
              {session.user.nickname || session.user.email}
            </span>
            <Link
              href="/change-password"
              className={
                pathname === "/change-password"
                  ? styles.active
                  : styles.authLink
              }
            >
              Change Password
            </Link>
            <button
              className={`${styles.logoutBtn} ${styles.sessionActive}`}
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/signin"
            className={pathname === "/signin" ? styles.active : styles.authLink}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
