"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`${styles.glassNav} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={styles.navContent}>
        <Link href="/" className={styles.brand}>VB.</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/#experience">Experience</Link></li>
          <li><Link href="/#projects">Projects</Link></li>
          <li><Link href="/#skills">Skills</Link></li>
        </ul>
        <Link href="/contact" className={styles.ctaButton}>Say Hello</Link>
      </div>
    </motion.nav>
  );
}
