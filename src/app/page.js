"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import { getProjectImages } from "./actions";

const GithubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"></path>
  </svg>
);

const projectsData = [
  {
    title: "AnyCompare",
    slug: "anycompare",
    short: "Multi-agent product research with Reddit sentiment",
    result: "Launched on Product Hunt",
    tags: "Exa AI, DeepSeek, Agents",
    thumb: "/thumbs/anycompare.jpg",
    link: "https://anycompare.app",
    func: "visit_site()",
    images: [],
    ytVideo: "ZGwr2iiLwjk",
    desc: "Multi-agent research platform using Exa AI and DeepSeek to aggregate, analyze, and compare products across the web. Architected an agent orchestration layer for parallel source retrieval; shipped Reddit sentiment analysis to surface community opinions alongside structured specs. Launched on Product Hunt."
  },
  {
    title: "ClipLabs",
    slug: "cliplabs",
    short: "Long videos into short-form clips on GPU workers",
    result: "Live SaaS",
    tags: "Modal (T4), FFmpeg NVENC, Railway, Cloudflare",
    link: "https://cliplabs.pro",
    func: "visit_site()",
    images: [],
    desc: "Co-founded short-form video repurposing SaaS: an automated long-form-to-short-form pipeline served from GPU workers (Modal, T4) with FFmpeg NVENC, a Railway backend and Cloudflare in front. Usage-based pricing and GPU cost modelling; iterated on real usage."
  },
  {
    title: "jevcut",
    slug: "jevcut",
    short: "Auto-clipper built evaluation-first",
    result: "Recall 0.23 → 0.54",
    tags: "ASR, LLM cascade, ffmpeg, pytest",
    thumb: "/thumbs/jevcut.jpg",
    link: "https://github.com/VBS2004/jevcut",
    func: "view_repo()",
    images: [],
    video: "/projects/jevcut/demo.mp4",
    desc: "Auto-clipper that turns long video into ranked short clips (ASR → candidate cuts → LLM cascade → quality gate → ffmpeg). Built the evaluation harness first: 38 hand-labelled videos across 13 genres, two labelers, benchmarks tied to commit SHAs; beats five simpler baselines. Redesigned from measured failures, raising recall from 0.23 to 0.54 at roughly $0.03 per hour of video."
  },
  {
    title: "jev-windows-agent",
    slug: "jev-windows-agent",
    short: "Fast decision loop for Windows desktop agents",
    result: "Task done in 4 actions",
    tags: "Windows UI Automation, arc-cua, OpenRouter",
    thumb: "/thumbs/jev-windows-agent.jpg",
    link: "https://github.com/VBS2004/jev-windows-agent",
    func: "view_repo()",
    images: [],
    video: "/projects/jev-windows-agent/demo.mp4",
    desc: "Windows UI Automation backend for arc-cua: a planner hands off bounded desktop subtasks and a fast decision model drives the clicks from a structured view of the UI instead of screenshot-and-guess. In the demo it opens Apple Music and plays liked songs in 4 actions, with no frontier-model call in the loop."
  },
  {
    title: "Jev plays Super Mario Bros",
    slug: "jev-mario",
    short: "Plays from NES memory, every move verified",
    result: "5 levels for ~$0.02",
    tags: "NES RAM, typed decisions, emulator rollback",
    thumb: "/thumbs/jev-mario.jpg",
    link: "https://github.com/VBS2004/jev-plays-super-mario-bros",
    func: "view_repo()",
    images: [],
    video: "/projects/jev-mario/demo.mp4",
    desc: "Agent that clears Super Mario Bros by reading the NES's RAM, not its pixels: code turns memory into decision-shaped facts, a typed decision model picks each move, and a save-state rollback search verifies it. Cleared levels 1-1 to 1-4 and 2-1 for about $0.02 in model calls."
  },
  {
    title: "BirdID",
    slug: "birdid",
    short: "Bird species from sound, end to end",
    result: "75% acc. on BirdCLEF+",
    tags: "PyTorch, EfficientNetB0, React, Flask, Redis",
    thumb: "/thumbs/birdid.jpg",
    link: "https://github.com/VBS2004/BirdSoundIdentifier",
    func: "view_repo()",
    images: [],
    desc: "End-to-end bird species identification system: audio-to-mel spectrogram pipeline with PyTorch EfficientNetB0 classifier achieving 75% accuracy on the BirdCLEF+ dataset. Built a React frontend with a Flask REST API backend; integrated Redis caching for image URLs to optimize real-time prediction throughput."
  },
  {
    title: "AI vs. Human Image Classifier",
    slug: "aivshuman",
    short: "VAE classifier for AI-generated images",
    result: "78%, +12% vs baseline",
    tags: "VAE, PyTorch, Data Augmentation",
    link: "https://github.com/VBS2004/AI-Generated-Image-Classifier",
    func: "view_repo()",
    images: [],
    desc: "Variational Autoencoder-based classifier achieving 78% accuracy on diverse AI vs. human-generated image datasets, with a 12% performance improvement over the baseline. Mitigated overfitting via adaptive regularization and data augmentation strategies."
  },
  {
    title: "CIBMTR Survival Prediction",
    slug: "cibmtr",
    short: "Neural net and boosting survival ensemble",
    result: "Top 150 / 1,200+",
    tags: "Neural Networks, XGBoost, LightGBM",
    link: "https://www.kaggle.com/code/vbs2004/cibmtr-neural-network",
    func: "view_solution()",
    images: [],
    desc: "Ranked top 150 globally out of 1,200+ participants in the CIBMTR healthcare ML challenge on Kaggle. Ensemble of neural networks + gradient boosting (XGBoost, LightGBM) with survival analysis objectives; handled class imbalance via PR-AUC optimization."
  },
  {
    title: "Custom RAG Pipeline",
    slug: "rag",
    short: "Hybrid retrieval over scraped web pages",
    result: "+45% vs keyword search",
    tags: "FAISS, BM25, Selenium",
    link: "https://github.com/VBS2004/RAG-LLM--Retrievel-from-google",
    func: "view_repo()",
    images: [],
    desc: "Selenium-based web scrapers feeding a FAISS vector store; improved retrieval accuracy by 45% over baseline keyword search with hybrid BM25 + dense retrieval reranking."
  }
];

const achievements = [
  { result: "15th / 500+", event: "Zelestra × AWS ML Ascend Challenge (Phase 1)", year: "2025" },
  { result: "Top 150 / 1,200+", event: "CIBMTR Healthcare ML Challenge, Kaggle", year: "2025" },
  { result: "Expert", event: "Kaggle Notebooks (healthcare, audio, vision)", year: "active" },
  { result: "2nd Place", event: "Binary Battles, Gravitas 2023, VIT (75 teams)", year: "2023" },
  { result: "Certified", event: "AWS Solutions Architect – Associate (valid 2024–2027)", year: "2024" },
  { result: "Nanodegree", event: "Udacity Foundation of Generative AI", year: "2025" },
  { result: "Contributor", event: "Open source: vLLM, hermes-agent", year: "2026" },
];

const skills = [
  { category: "LLMs & Agents", stack: "LangChain, LangGraph, tool/function calling, structured outputs, RAG, hybrid retrieval, cross-encoder reranking, prompt and context engineering, evaluation harness design, benchmark versioning, LLM cost/latency budgeting, Vertex AI, Google ADK" },
  { category: "ML", stack: "PyTorch, TensorFlow, LoRA, QLoRA, SFT, PEFT, TRL, Unsloth, HuggingFace Transformers, survival analysis, scikit-learn, XGBoost, LightGBM" },
  { category: "Engineering", stack: "Python, SQL, Git, model deployment, REST APIs, Flask, Spring Boot, pytest, GitHub Actions CI/CD, Docker, Kubernetes, Terraform, Helm, AWS (S3, RDS, Lambda, ECR, EC2)" },
  { category: "Data & Languages", stack: "pandas, NumPy, PySpark, Neo4j, MySQL, Redis, Java, Go, Bash, C++, JavaScript" },
];

// One collapsed Jupyter input: a prompt and a single line of code
function InputCell({ n, id, children }) {
  return (
    <div className={styles.cell} id={id}>
      <div className={styles.cellPrompt}>In [{n}]:</div>
      <div className={styles.inputLine}>{children}</div>
    </div>
  );
}

function OutputCell({ n, children }) {
  return (
    <div className={styles.cell}>
      <div className={`${styles.cellPrompt} ${styles.outPrompt}`}>Out[{n}]:</div>
      <div className={styles.cellOutput}>{children}</div>
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState(projectsData);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [openProject, setOpenProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Sync theme on mount
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Fetch images dynamically
    getProjectImages().then(imageMap => {
      setProjects(prev => prev.map(p => ({
        ...p,
        images: imageMap[p.slug] || []
      })));
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // A row is open while hovered with a mouse, or after a click, tap or Enter on its title
  const activeTitle = hoveredProject?.title ?? openProject;
  const activeProject = projects.find(p => p.title === activeTitle);
  const activeImageCount = activeProject?.images?.length ?? 0;

  useEffect(() => {
    let interval;
    setImageIndex(0);
    if (activeImageCount > 0) {
      interval = setInterval(() => {
        setImageIndex(prev => (prev + 1) % activeImageCount);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [activeTitle, activeImageCount]);

  return (
    <main className={styles.main}>
      <div className={styles.notebookHeader}>
        <div className={styles.notebookTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          main.ipynb
        </div>
        <div className={styles.kernelStatus}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          Python 3 (ipykernel) <div className={styles.statusDot}></div>
        </div>
      </div>

      {/* Cell 1: rendered markdown, so no input box */}
      <section className={styles.cell} id="intro">
        <div className={styles.cellPrompt}>In [1]:</div>
        <div className={styles.hero}>
          <div className={styles.heroMain}>
            <h1 className={styles.heroTitle}>Venkat Balaji S</h1>
            <p className={styles.heroSubtitle}>Software Engineer &amp; ML Researcher</p>
            <p className={styles.heroDesc}>
              Building scalable ML infrastructure and intelligent backends. Specializing in PyTorch, GenAI workflows, and high-performance APIs.
            </p>

            <div className={styles.links}>
              <a href="/contact" className={`${styles.actionBtn} ${styles.actionPrimary}`}>
                initiate_contact()
              </a>
              <a href="https://github.com/VBS2004" className={styles.actionBtn} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub
              </a>
              <a href="https://linkedin.com/in/venkat-balaji-s" className={styles.actionBtn} target="_blank" rel="noreferrer">
                <LinkedinIcon /> LinkedIn
              </a>
            </div>

            <dl className={styles.heroMetrics}>
              <div className={styles.metric}>
                <dt className={styles.metricLabel}>Samsung PRISM</dt>
                <dd className={styles.metricValue}>−42% code errors</dd>
              </div>
              <div className={styles.metric}>
                <dt className={styles.metricLabel}>Kaggle Notebooks</dt>
                <dd className={styles.metricValue}>Expert</dd>
              </div>
              <div className={styles.metric}>
                <dt className={styles.metricLabel}>CGPA at VIT</dt>
                <dd className={styles.metricValue}>9.49</dd>
              </div>
            </dl>

            <div className={styles.badges}>
              <a href="https://www.credly.com/badges/67d45d4b-6d3b-4d95-8a07-5127320d25fc" target="_blank" rel="noreferrer" className={styles.badge}>
                <img src="/badges/aws-saa.png" alt="" width="36" height="36" />
                <span>
                  <span className={styles.badgeTitle}>AWS Solutions Architect</span>
                  <span className={styles.badgeSub}>Associate · 2024–2027</span>
                </span>
              </a>
              <a href="https://www.kaggle.com/vbs2004" target="_blank" rel="noreferrer" className={styles.badge}>
                <img src="/badges/kaggle.jpg" alt="" width="36" height="36" className={styles.badgeRound} />
                <span>
                  <span className={styles.badgeTitle}>Kaggle Notebooks Expert</span>
                  <span className={styles.badgeSub}>kaggle.com/vbs2004</span>
                </span>
              </a>
            </div>
          </div>

          <figure className={styles.heroFigure}>
            <img src="/me.jpg" alt="Venkat Balaji S" width="480" height="480" className={styles.heroPhoto} />
            <figcaption className={styles.heroCaption}>
              <span className={styles.outPrompt}>Out[1]:</span> &lt;PIL.Image 480×480&gt;
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Cell 2: Experience */}
      <InputCell n={2} id="experience">
        experience_log.<span className={styles.syntaxFunction}>show</span>()
      </InputCell>
      <OutputCell n={2}>
        <article className={styles.job}>
          <header className={styles.jobHeader}>
            <h2>IDFC FIRST Bank <span className={styles.jobRole}>Application Engineer</span></h2>
            <span className={styles.jobDate}>Jan 2026 – Present</span>
          </header>
          <ul className={styles.jobDesc}>
            <li>Fine-tuned <strong>Qwen2.5-Coder-14B</strong> (LoRA + SFT) into a production code-generation model, from dataset design through GPU-constrained training and deployment, on a proprietary codebase that could not leave the environment.</li>
            <li>Built the evaluation harness (tflint, terraform validate, checkov, CodeBLEU-HCL) that <strong>gates every model iteration</strong> on compile, lint, security and similarity instead of manual review.</li>
            <li>Built a <strong>hybrid-retrieval RAG pipeline</strong> (Jina v3, FAISS/Chroma, BM25 + dense, cross-encoder reranking) and fixed a production retrieval defect that was silently degrading output.</li>
          </ul>
        </article>
        <article className={styles.job}>
          <header className={styles.jobHeader}>
            <h2>AlgoAnalytics <span className={styles.jobRole}>Software Engineer, GenAI &amp; ML</span></h2>
            <span className={styles.jobDate}>Apr 2025 – Aug 2025</span>
          </header>
          <ul className={styles.jobDesc}>
            <li>Built and maintained <strong>production GenAI agents</strong> for AlgoFabric, a fintech platform for trade insights and ticker analytics, using LLMs and RAG pipelines.</li>
            <li>Used <strong>LangGraph</strong> for intent routing in the stock-answering system, owning features from design to deployment.</li>
            <li>Shipped return-metric models to AWS ECR with Docker and GitHub Actions, and <strong>reduced inference latency</strong> by optimizing preprocessing and caching.</li>
          </ul>
        </article>
        <article className={styles.job}>
          <header className={styles.jobHeader}>
            <h2>Samsung R&amp;D Institute Bangalore <span className={styles.jobRole}>ML Research Intern · PRISM</span></h2>
            <span className={styles.jobDate}>Sept 2024 – May 2025</span>
          </header>
          <ul className={styles.jobDesc}>
            <li>Fine-tuned Mistral 7B with LoRA for software development automation, achieving a <strong>42% reduction in code error rates</strong>.</li>
            <li>Engineered a Spring Boot code dataset pipeline: structured prompt generation via Gemini plus targeted GitHub repository mining.</li>
            <li>Curated <strong>10,000+ instruction-response pairs</strong> across REST APIs, JPA repositories and service layers; still used for model evaluation at SRI-B.</li>
          </ul>
        </article>
      </OutputCell>

      {/* Cell 3: Projects */}
      <InputCell n={3} id="projects">
        df_projects.<span className={styles.syntaxFunction}>head</span>(<span className={styles.syntaxNumber}>9</span>)
      </InputCell>
      <OutputCell n={3}>
        <div className={styles.tableResponsive}>
          <table className={`${styles.dataframe} ${styles.dataframeWide}`}>
            <thead>
              <tr>
                <th style={{ width: "3%" }}></th>
                <th style={{ width: "13%" }}>preview</th>
                <th style={{ width: "31%" }}>project</th>
                <th style={{ width: "19%" }}>result</th>
                <th style={{ width: "19%" }}>stack</th>
                <th style={{ width: "15%" }}>source</th>
              </tr>
            </thead>
            {projects.map((project, idx) => (
              <tbody
                key={project.slug}
                id={`project-${idx}`}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setHoveredProject(project); }}
                onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredProject(null); }}
                className={activeTitle === project.title ? styles.rowActive : undefined}
              >
                <tr>
                  <td className={styles.dfIndex}>{idx}</td>
                  <td>
                    {project.thumb ? (
                      <img src={project.thumb} alt="" loading="lazy" className={styles.dfThumb} />
                    ) : (
                      <span className={styles.dfNan}>NaN</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.dfToggle}
                      aria-expanded={activeTitle === project.title}
                      aria-controls={`project-${idx}-details`}
                      onClick={() => setOpenProject(openProject === project.title ? null : project.title)}
                    >
                      {project.title}
                    </button>
                    <span className={styles.dfShort}>{project.short}</span>
                  </td>
                  <td className={styles.dfResult}>{project.result}</td>
                  <td className={styles.dfTags}>{project.tags}</td>
                  <td><a href={project.link} target="_blank" rel="noreferrer" className={styles.dfAction}>{project.func}</a></td>
                </tr>
                {activeTitle === project.title && (
                  <tr id={`project-${idx}-details`}>
                    <td colSpan={6} style={{ padding: 0 }}>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onAnimationComplete={() => {
                          const el = document.getElementById(`project-${idx}`);
                          if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.bottom > window.innerHeight) {
                              window.scrollBy({ top: rect.bottom - window.innerHeight + 40, behavior: "smooth" });
                            }
                          }
                        }}
                        className={styles.expanded}
                      >
                        <div className={styles.expandedContentRow}>
                          <p className={styles.expandedDesc}>{project.desc}</p>
                          {project.ytVideo && (
                            <div className={styles.expandedImageWrap}>
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${project.ytVideo}?autoplay=1&mute=1&loop=1&playlist=${project.ytVideo}&controls=0`}
                                title={`${project.title} demo video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className={styles.mediaFill}
                                style={{ pointerEvents: "none" }}
                              ></iframe>
                            </div>
                          )}
                          {project.video && (
                            <div className={styles.expandedImageWrap}>
                              <video
                                src={project.video}
                                poster={project.thumb}
                                autoPlay
                                muted
                                loop
                                playsInline
                                aria-label={`${project.title} demo`}
                                className={styles.mediaFill}
                              />
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
                                  className={styles.mediaFill}
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
        <p className={styles.dfShape}>9 rows × 5 columns</p>
      </OutputCell>

      {/* Cell 4: Achievements */}
      <InputCell n={4} id="achievements">
        achievements
      </InputCell>
      <OutputCell n={4}>
        <div className={styles.tableResponsive}>
          <table className={styles.dataframe}>
            <thead>
              <tr>
                <th style={{ width: "4%" }}></th>
                <th style={{ width: "22%" }}>result</th>
                <th>event</th>
                <th style={{ width: "10%" }}>year</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((a, i) => (
                <tr key={a.event}>
                  <td className={styles.dfIndex}>{i}</td>
                  <td className={styles.dfResult}>{a.result}</td>
                  <td>{a.event}</td>
                  <td className={styles.dfYear}>{a.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OutputCell>

      {/* Cell 5: Skills */}
      <InputCell n={5} id="skills">
        skills.<span className={styles.syntaxFunction}>groupby</span>(<span className={styles.syntaxString}>"category"</span>).<span className={styles.syntaxFunction}>agg</span>(list)
      </InputCell>
      <OutputCell n={5}>
        <div className={styles.tableResponsive}>
          <table className={styles.dataframe}>
            <thead>
              <tr>
                <th style={{ width: "22%" }}>category</th>
                <th>stack</th>
              </tr>
            </thead>
            <tbody>
              {skills.map(s => (
                <tr key={s.category}>
                  <td className={styles.dfCategory}>{s.category}</td>
                  <td>{s.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OutputCell>

      {/* Cell 6: Contact */}
      <InputCell n={6} id="contact">
        contact.<span className={styles.syntaxFunction}>send</span>()
      </InputCell>
      <OutputCell n={6}>
        <div className={styles.contact}>
          <div>
            <h2 className={styles.contactTitle}>Have a role, a project or a question?</h2>
            <a href="mailto:venkatbalaji2004@gmail.com" className={styles.contactEmail}>venkatbalaji2004@gmail.com</a>
          </div>
          <a href="/contact" className={`${styles.actionBtn} ${styles.actionPrimary}`}>
            initiate_contact()
          </a>
        </div>
      </OutputCell>

      <footer className={styles.footerCell}>
        <div>Kernel idle · 6 cells run</div>
        <div className={styles.footerLinks}>
          <a href="https://github.com/VBS2004" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/venkat-balaji-s" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://kaggle.com/vbs2004" target="_blank" rel="noreferrer">Kaggle</a>
        </div>
      </footer>
    </main>
  );
}
