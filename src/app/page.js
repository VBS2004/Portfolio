"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import { getProjectImages } from "./actions";

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

const projectsData = [
  {
    title: "AnyCompare",
    slug: "anycompare",
    domain: "Multi-Agent AI",
    tags: "Exa AI, DeepSeek, Agents",
    link: "https://anycompare.app",
    func: "visit_site()",
    images: [],
    ytVideo: "ZGwr2iiLwjk", // Demo YouTube ID
    desc: "A powerful multi-agent search platform integrating Exa AI, DeepSeek and Reddit Signals. Built to autonomously cross-reference product metrics and synthesize accurate comparisons across the web, minimizing user friction."
  },
  {
    title: "BirdCLEF 2026",
    slug: "birdclef",
    domain: "Audio ML",
    tags: "EfficientNet, CBAM, PyTorch",
    link: "https://www.kaggle.com/code/vbs2004",
    func: "view_kernel()",
    images: [],
    desc: "Kaggle competition kernel leveraging EfficientNet with CBAM attention modules to classify bird calls from highly noisy environmental audio data. Placed in the top percentiles for the baseline phase."
  },
  {
    title: "BirdID",
    slug: "birdid",
    domain: "Full-Stack ML",
    tags: "React, Flask, Redis",
    link: "https://github.com/VBS2004/BirdSoundIdentifier",
    func: "view_repo()",
    images: [],
    desc: "A production-ready full-stack application that classifies bird species from user-uploaded audio. Utilizes a Redis task queue for asynchronous model inference and a responsive React frontend."
  },
  {
    title: "Custom RAG Pipeline",
    slug: "rag",
    domain: "Information Retrieval",
    tags: "FAISS, BM25, Selenium",
    link: "https://github.com/VBS2004/RAG-LLM--Retrievel-from-google",
    func: "view_repo()",
    images: [],
    desc: "An intelligent Retrieval-Augmented Generation pipeline. It uses Selenium for robust web scraping, FAISS for dense vector similarity, and BM25 for sparse retrieval, achieving highly accurate document grounding."
  },
  {
    title: "CIBMTR Survival Prediction",
    slug: "cibmtr",
    domain: "Healthcare ML",
    tags: "Neural Networks, XGBoost",
    link: "https://www.kaggle.com/code/vbs2004/cibmtr-neural-network",
    func: "view_solution()",
    images: [],
    desc: "A hybrid approach using deeply tuned Neural Networks and XGBoost ensembles to predict transplant survival rates. Focused heavily on handling class imbalance and missing clinical variables."
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState(projectsData);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageIndex, setImageIndex] = useState(0);
  const [theme, setTheme] = useState("dark"); // Or detect system pref

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync theme on mount
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Fetch images dynamically
    getProjectImages().then(imageMap => {
      setProjects(prev => prev.map(p => ({
        ...p,
        images: imageMap[p.slug] || []
      })));
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    let interval;
    if (hoveredProject) {
      setImageIndex(0);
      if (hoveredProject.images && hoveredProject.images.length > 0) {
        interval = setInterval(() => {
          setImageIndex(prev => (prev + 1) % hoveredProject.images.length);
        }, 1500);
      }
    }
    return () => clearInterval(interval);
  }, [hoveredProject]);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <main className={styles.main}>
      <div className={styles.notebookHeader}>
        <div className={styles.notebookTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          main.ipynb
        </div>
        <div className={styles.kernelStatus}>
          <button
            onClick={toggleTheme}
            style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-main)", cursor: "pointer", borderRadius: "var(--radius-sm)", padding: "0.2rem 0.5rem", marginRight: "1rem", fontSize: "0.8rem", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          Python 3 (ipykernel) <div className={styles.statusDot}></div>
        </div>
      </div>

      {/* Cell 1: Intro */}
      <div className={styles.cell} id="intro">
        <div className={styles.cellPrompt}>In [1]:</div>
        <div className={styles.cellContent}>
          <div className={styles.cellHeader}>
            <span className={styles.cellType}>Markdown</span>
          </div>
          <div className={styles.cellBody}>
            <h1 className={styles.heroTitle}>Venkat Balaji S</h1>
            <h2 className={styles.heroSubtitle}>Software Engineer & ML Researcher</h2>
            <p className={styles.heroDesc}>
              Building scalable ML infrastructure and intelligent backends. Specializing in PyTorch, GenAI workflows, and high-performance APIs.
            </p>

            <div className={styles.links}>
              <button className={styles.actionBtn} onClick={() => window.location.href = '/contact'}>
                <span className={styles.syntaxFunction}>initiate_contact</span>()
              </button>
              <a href="https://github.com/VBS2004" className={`${styles.actionBtn} ${styles.iconLink}`} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub
              </a>
              <a href="https://linkedin.com/in/venkat-balaji-s" className={`${styles.actionBtn} ${styles.iconLink}`} target="_blank" rel="noreferrer">
                <LinkedinIcon /> LinkedIn
              </a>
            </div>

            <div className={styles.heroMetrics}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>Expert</span>
                <span className={styles.metricLabel}>Kaggle Notebooks</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>AWS</span>
                <span className={styles.metricLabel}>Solutions Architect</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>9.47</span>
                <span className={styles.metricLabel}>CGPA at VIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cell 2: Experience */}
      <div className={styles.cell} id="experience">
        <div className={styles.cellPrompt}>In [2]:</div>
        <div className={styles.cellContent}>
          <div className={styles.cellHeader}>
            <span className={styles.cellType}>Python</span>
          </div>
          <div className={styles.cellBody} style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem" }}>
            <span className={styles.syntaxKeyword}>import</span> json<br />
            <span className={styles.syntaxKeyword}>print</span>(<span className={styles.syntaxString}>"Loading Experience..."</span>)<br />
            experience_log.show()
          </div>
        </div>
      </div>

      {/* Output 2 */}
      <div className={styles.cell}>
        <div className={styles.cellPrompt} style={{ color: "var(--accent-red)" }}>Out[2]:</div>
        <div className={styles.cellContent} style={{ background: "transparent", border: "none" }}>
          <div className={styles.arrayItem}>
            <div className={styles.arrayHeader}>
              <h3>IDFC FIRST Bank</h3>
              <span className={styles.arrayDate}>Jan 2026 - Present</span>
            </div>
            <div className={styles.arrayRole}>Application Engineer</div>
            <ul className={styles.arrayDesc} style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li>Developing scalable backend modules and microservices in an enterprise application development environment.</li>
              <li>Focusing on RESTful service design, API performance optimization, and seamless system integration within high-availability architectures.</li>
              <li>Collaborating with cross-functional teams to automate operational workflows and enhance existing CI/CD pipelines.</li>
            </ul>
          </div>
          <div className={styles.arrayItem}>
            <div className={styles.arrayHeader}>
              <h3>Samsung R&D Institute</h3>
              <span className={styles.arrayDate}>Sept 2024 - May 2025</span>
            </div>
            <div className={styles.arrayRole}>ML Research Intern (Samsung PRISM)</div>
            <ul className={styles.arrayDesc} style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li>Fine-tuned Mistral 7B with LoRA adapters for automated software development tasks, achieving a 42% reduction in syntactic and logical code error rates.</li>
              <li>Engineered a proprietary dataset pipeline utilizing Gemini APIs to construct high-quality Spring Boot code-instruction pairs for model training.</li>
              <li>Optimized PyTorch inference scripts and deployed quantized LLMs for local evaluation, significantly reducing memory footprint without sacrificing quality.</li>
            </ul>
          </div>
          <div className={styles.arrayItem}>
            <div className={styles.arrayHeader}>
              <h3>AlgoAnalytics</h3>
              <span className={styles.arrayDate}>Apr 2025 - Aug 2025</span>
            </div>
            <div className={styles.arrayRole}>Software Engineer (GenAI & ML)</div>
            <ul className={styles.arrayDesc} style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li>Architected and maintained production-grade GenAI agents for the AlgoFabric platform, integrating LLM tool-use for complex task orchestration.</li>
              <li>Developed specialized Machine Learning models using PyTorch to derive critical performance metrics and predictive insights from raw financial return data.</li>
              <li>Containerized full-stack ML applications using Docker and orchestrated automated CI/CD deployment pipelines via GitHub Actions targeting AWS ECR.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cell 3: Projects */}
      <div className={styles.cell} id="projects">
        <div className={styles.cellPrompt}>In [3]:</div>
        <div className={styles.cellContent}>
          <div className={styles.cellHeader}>
            <span className={styles.cellType}>Python</span>
          </div>
          <div className={styles.cellBody} style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem" }}>
            <span className={styles.syntaxKeyword}>import</span> pandas <span className={styles.syntaxKeyword}>as</span> pd<br />
            df_projects = pd.DataFrame(portfolio.projects)<br />
            df_projects.head(5)
          </div>
        </div>
      </div>

      {/* Output 3 */}
      <div className={styles.cell}>
        <div className={styles.cellPrompt} style={{ color: "var(--accent-red)" }}>Out[3]:</div>
        <div className={styles.cellContent} style={{ background: "transparent", border: "none" }}>
          <div className={styles.tableResponsive}>
            <table className={styles.dataframe}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}></th>
                  <th style={{ width: "25%" }}>Title</th>
                  <th style={{ width: "20%" }}>Domain</th>
                  <th style={{ width: "35%" }}>Tech_Stack</th>
                  <th style={{ width: "15%" }}>Source</th>
                </tr>
              </thead>
              {projects.map((project, idx) => (
                <tbody
                  key={idx}
                  id={`project-${idx}`}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ cursor: "pointer" }}
                >
                  <tr>
                    <td className={styles.dfIndex}>{idx}</td>
                    <td className={styles.dfName}>{project.title}</td>
                    <td>{project.domain}</td>
                    <td className={styles.dfTags}>{project.tags}</td>
                    <td><a href={project.link} target="_blank" rel="noreferrer" className={styles.dfAction}>{project.func}</a></td>
                  </tr>
                  {hoveredProject?.title === project.title && (
                    <tr>
                      <td colSpan={5} style={{ padding: 0 }}>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          onAnimationComplete={() => {
                            const el = document.getElementById(`project-${idx}`);
                            if (el) {
                              const rect = el.getBoundingClientRect();
                              if (rect.bottom > window.innerHeight) {
                                window.scrollBy({ top: rect.bottom - window.innerHeight + 40, behavior: "smooth" });
                              }
                            }
                          }}
                          style={{ overflow: "hidden", background: "var(--bg-surface-hover)", borderBottom: "1px solid var(--border)" }}
                        >
                          <div className={styles.expandedContentRow}>
                            <div style={{ flex: 1, color: "var(--text-muted)", fontSize: "0.95rem" }}>
                              {project.desc}
                            </div>
                            {project.ytVideo && (
                              <div className={styles.expandedImageWrap}>
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={`https://www.youtube.com/embed/${project.ytVideo}?autoplay=1&mute=1&loop=1&playlist=${project.ytVideo}&controls=0`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                                ></iframe>
                                <div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.7)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", color: "var(--accent-red)", border: "1px solid var(--accent-red)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-red)", animation: "pulse 2s infinite" }} /> LIVE DEMO
                                </div>
                              </div>
                            )}
                            
                            {project.images && project.images.length > 0 && (
                              <div className={styles.expandedImageWrap}>
                                <AnimatePresence>
                                  <motion.img
                                    key={`${project.title}-${imageIndex}`}
                                    src={project.images[imageIndex]}
                                    alt={`${project.title} preview`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                  />
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>

      <div className={styles.footerCell}>
        <div>Kernel Idle</div>
        <div className={styles.footerLinks}>
          <a href="mailto:venkatbalaji2004@gmail.com">venkatbalaji2004@gmail.com</a>
          <span>|</span>
          <a href="https://kaggle.com/vbs2004" target="_blank" rel="noreferrer">Kaggle</a>
        </div>
      </div>

    </main>
  );
}

