"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

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
          <li className={styles.sectionItem}>
            <Link href="/#intro" className={styles.sectionLink}># Intro</Link>
          </li>
          <li className={styles.sectionItem}>
            <Link href="/#experience" className={styles.sectionLink}># Experience</Link>
          </li>
          <li className={styles.sectionItem}>
            <Link href="/#projects" className={styles.sectionLink}># Projects</Link>
          </li>
          <li className={styles.sectionItem}>
            <Link href="/#achievements" className={styles.sectionLink}># Achievements</Link>
          </li>
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
