"use client";

import { useState, useEffect } from "react";
import mainStyles from "../page.module.css";
import Link from "next/link";

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponse(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (res.ok) {
        setResponse({ status: 200, message: data.message });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setResponse({ status: res.status, message: data.error || "Failed to send message." });
      }
    } catch (err) {
      setResponse({ status: 500, message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className={mainStyles.main}>
      <div className={mainStyles.notebookHeader}>
        <div className={mainStyles.notebookTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          contact_api.py
        </div>
        <div className={mainStyles.kernelStatus}>
          <button 
            onClick={toggleTheme} 
            style={{background: "transparent", border: "1px solid var(--border)", color: "var(--text-main)", cursor: "pointer", borderRadius: "var(--radius-sm)", padding: "0.2rem 0.5rem", marginRight: "1rem", fontSize: "0.8rem", fontFamily: "var(--font-jetbrains-mono)"}}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link href="/" style={{color: "var(--accent-blue)", textDecoration: "underline"}}>cd ../</Link>
          <div className={mainStyles.statusDot}></div>
        </div>
      </div>

      <div className={mainStyles.cell} id="payload">
        <div className={mainStyles.cellPrompt}>In [1]:</div>
        <div className={mainStyles.cellContent}>
          <div className={mainStyles.cellHeader}>
            <span className={mainStyles.cellType}>Python</span>
          </div>
          <div className={mainStyles.cellBody} style={{fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem"}}>
            <span className={mainStyles.syntaxKeyword}>import</span> requests<br/><br/>
            <span className={mainStyles.syntaxComment}># Define the payload</span><br/>
            payload = {'{'}
            <form onSubmit={handleSubmit} style={{marginLeft: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
              <div>
                <span className={mainStyles.syntaxString}>"name"</span>: 
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  placeholder='"Enter name"'
                  style={{background: "transparent", border: "none", borderBottom: "1px dashed var(--border)", color: "var(--text-main)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", marginLeft: "0.5rem", outline: "none", width: "200px"}}
                />,
              </div>
              <div>
                <span className={mainStyles.syntaxString}>"email"</span>: 
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  placeholder='"Enter email"'
                  style={{background: "transparent", border: "none", borderBottom: "1px dashed var(--border)", color: "var(--text-main)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", marginLeft: "0.5rem", outline: "none", width: "200px"}}
                />,
              </div>
              <div style={{display: "flex"}}>
                <span className={mainStyles.syntaxString}>"message"</span>: 
                <textarea 
                  required
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  placeholder='"""Enter message"""'
                  rows={3}
                  style={{background: "transparent", border: "1px solid var(--border)", color: "var(--text-main)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", marginLeft: "0.5rem", outline: "none", width: "100%", maxWidth: "400px", padding: "0.5rem", borderRadius: "4px"}}
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={mainStyles.actionBtn} 
                style={{marginTop: "1rem", width: "fit-content"}}
              >
                {isSubmitting ? "Sending..." : "requests.post(url, json=payload)"}
              </button>
            </form>
            {'}'}
          </div>
        </div>
      </div>

      {response && (
        <div className={mainStyles.cell}>
          <div className={mainStyles.cellPrompt} style={{color: "var(--accent-red)"}}>Out[1]:</div>
          <div className={mainStyles.cellContent} style={{background: "transparent", border: "none"}}>
            <div style={{fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--text-main)", padding: "0.5rem 0"}}>
              {'{'}<br/>
              <span style={{marginLeft: "2rem"}}><span className={mainStyles.syntaxString}>"status"</span>: <span className={mainStyles.syntaxFunction}>{response.status}</span>,</span><br/>
              <span style={{marginLeft: "2rem"}}><span className={mainStyles.syntaxString}>"message"</span>: <span className={mainStyles.syntaxString}>"{response.message}"</span></span><br/>
              {'}'}
            </div>
          </div>
        </div>
      )}

      <div className={mainStyles.cell} id="channels">
        <div className={mainStyles.cellPrompt}>In [2]:</div>
        <div className={mainStyles.cellContent}>
          <div className={mainStyles.cellHeader}>
            <span className={mainStyles.cellType}>Markdown</span>
          </div>
          <div className={mainStyles.cellBody}>
            <h3 style={{fontFamily: "var(--font-jetbrains-mono)", fontSize: "1.1rem", marginBottom: "1rem"}}>Alternative Comm Channels:</h3>
            <div className={mainStyles.links}>
              <a href="mailto:venkatbalaji2004@gmail.com" className={`${mainStyles.actionBtn} ${mainStyles.iconLink}`}>
                Email Direct
              </a>
              <a href="https://github.com/VBS2004" target="_blank" rel="noopener noreferrer" className={`${mainStyles.actionBtn} ${mainStyles.iconLink}`}>
                <GithubIcon /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/venkat-balaji-s/" target="_blank" rel="noopener noreferrer" className={`${mainStyles.actionBtn} ${mainStyles.iconLink}`}>
                <LinkedinIcon /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
