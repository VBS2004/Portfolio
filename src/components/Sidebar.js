"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState("intro");

  // Highlight the section currently being read, like a notebook's running cell
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.explorerTitle}>Explorer</div>
      
      {/* File: main.ipynb */}
      <div className={styles.fileBlock}>
        <Link href="/" className={styles.fileName}>
          <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          main.ipynb
        </Link>
        <ul className={styles.sectionList}>
          {sections.map(({ id, label }) => {
            const isActive = pathname === "/" && active === id;
            return (
              <li key={id} className={styles.sectionItem}>
                <Link
                  href={`/#${id}`}
                  className={`${styles.sectionLink} ${isActive ? styles.sectionActive : ""}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  # {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* File: contact_api.py */}
      <div className={styles.fileBlock}>
        <Link href="/contact" className={styles.fileName}>
          <svg className={styles.pyIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          contact_api.py
        </Link>
        <ul className={styles.sectionList}>
          <li className={styles.sectionItem}>
            <Link href="/contact#payload" className={styles.sectionLink}># POST Payload</Link>
          </li>
          <li className={styles.sectionItem}>
            <Link href="/contact#channels" className={styles.sectionLink}># Comm Channels</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
