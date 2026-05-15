"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      className={className}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <>
      <motion.div className={styles.progressBar} style={{ scaleX }} />

      <main className={styles.main}>
        {/* Hero Section */}
        <section id="home" className={styles.hero} ref={heroRef}>
          <motion.div
            className={styles.heroContent}
            style={{ y: heroY, opacity: heroOpacity }}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                },
              },
            }}
          >
            <motion.div className={styles.eyebrowWrapper} variants={FADE_UP_ANIMATION_VARIANTS}>
              <span className={styles.eyebrow}>Based in Tamil Nadu, India</span>
              <div className={styles.statusDot}></div>
            </motion.div>
            
            <motion.h1 className={styles.heroTitle} variants={FADE_UP_ANIMATION_VARIANTS}>
              <span className={styles.gradientText}>Venkat Balaji S</span>
            </motion.h1>
            
            <motion.p className={styles.heroSubtitle} variants={FADE_UP_ANIMATION_VARIANTS}>
              Software Engineer & Machine Learning Researcher shaping data into intelligent systems.
            </motion.p>

            <motion.div className={styles.heroActions} variants={FADE_UP_ANIMATION_VARIANTS}>
              <MagneticButton className={styles.primaryButton} onClick={() => window.location.href = '/contact'}>
                Let's Talk <ArrowUpRight size={18} />
              </MagneticButton>
              <div className={styles.socialLinks}>
                <a href="https://github.com/VBS2004" target="_blank" rel="noopener noreferrer"><GithubIcon size={24} /></a>
                <a href="https://www.linkedin.com/in/venkat-balaji-s/" target="_blank" rel="noopener noreferrer"><LinkedinIcon size={24} /></a>
              </div>
            </motion.div>

            <motion.div className={styles.heroMetrics} variants={FADE_UP_ANIMATION_VARIANTS}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>9.47</span>
                <span className={styles.metricLabel}>CGPA at VIT</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>Expert</span>
                <span className={styles.metricLabel}>Kaggle Notebooks</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>AWS</span>
                <span className={styles.metricLabel}>Solutions Architect</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={styles.section}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Experience</h2>
            <p className={styles.sectionDesc}>Building scalable ML infrastructure and intelligent backends.</p>
          </motion.div>

          <div className={styles.timeline}>
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15, type: "spring", bounce: 0.3 }}
              >
                <div className={styles.timelineMarker}></div>
                <motion.div
                  className={styles.timelineContent}
                  whileHover={{ scale: 1.02, x: 5, boxShadow: "var(--shadow-md)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className={styles.timelineMeta}>
                    <h3>{exp.company}</h3>
                    <span className={styles.timelineDate}>{exp.date}</span>
                  </div>
                  <h4 className={styles.timelineRole}>{exp.role}</h4>
                  <p>{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={styles.section}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Selected Work</h2>
            <p className={styles.sectionDesc}>A showcase of multi-agent AI, deep learning, and full-stack development.</p>
          </motion.div>

          <div className={styles.projectGrid}>
            {projects.map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.projectCard} ${project.wide ? styles.projectCardWide : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover="hover"
                variants={{
                  hover: { y: -10, borderColor: "var(--accent)" },
                }}
              >
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <ul className={styles.tagList}>
                    {project.tags.map((tag, j) => (
                      <li key={j}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  className={styles.projectOverlay}
                  initial="initial"
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                >
                  <p>{project.details}</p>
                  <span className={styles.viewLink}>
                    {project.cta} <ArrowUpRight size={18} />
                  </span>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={styles.section}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Technical Arsenal</h2>
            <p className={styles.sectionDesc}>Tools and frameworks I use to solve complex problems.</p>
          </motion.div>

          <div className={styles.skillsContainer}>
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className={styles.skillCategory}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -5, boxShadow: "var(--shadow-md)" }}
              >
                <h3>{skill.category}</h3>
                <p>{skill.items}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <motion.div 
            className={styles.footerBrand}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Let&apos;s build something extraordinary.</h2>
            <Link href="/contact" className={styles.footerCta}>
              Start a conversation <ArrowUpRight />
            </Link>
          </motion.div>
          <div className={styles.footerLinks}>
            <a href="mailto:venkatbalaji2004@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/venkat-balaji-s/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/VBS2004" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.kaggle.com/vbs2004" target="_blank" rel="noopener noreferrer">Kaggle</a>
          </div>
        </div>
      </footer>
    </>
  );
}

// Data
const experiences = [
  {
    company: "IDFC FIRST Bank",
    date: "Jan 2026 to Present",
    role: "Application Engineer",
    description:
      "Developing backend modules in an enterprise application development bootcamp. Focusing on RESTful service design and system integration within scalable architectures.",
  },
  {
    company: "Samsung R&D Institute Bangalore",
    date: "Sept 2024 to May 2025",
    role: "ML Research Intern (Samsung PRISM)",
    description:
      "Fine-tuned Mistral 7B with LoRA for software development automation on a custom dataset, achieving a 42% reduction in code error rates. Engineered a proprietary Spring Boot code dataset pipeline utilizing Gemini and targeted GitHub repository mining.",
  },
  {
    company: "AlgoAnalytics",
    date: "Apr 2025 to Aug 2025",
    role: "Software Engineer (GenAI & ML)",
    description:
      "Built and maintained production GenAI agents for AlgoFabric, a fintech platform providing trade insights and ticker analytics using LLMs and RAG pipelines. Developed ML models to derive performance metrics from financial return data via APIs, deployed via Docker and GitHub Actions to AWS ECR.",
  },
];

const projects = [
  {
    title: "AnyCompare",
    subtitle: "Multi-Agent AI Product Research Tool",
    tags: ["Exa AI", "DeepSeek", "Agent Orchestration"],
    details:
      "Built a multi-agent research platform to aggregate, analyze, and compare products across the web. Shipped Reddit sentiment analysis feature to surface community opinions. Launched on Product Hunt.",
    link: "https://anycompare.app",
    cta: "Visit Project",
    wide: false,
  },
  {
    title: "BirdCLEF 2026",
    subtitle: "Bird Sound Classification System",
    tags: ["EfficientNet-B1", "CBAM Attention", "OpenVINO"],
    details:
      "Designed custom architecture using EfficientNet-B1 + CBAM attention + GeM Pooling + Emformer temporal modeling on mel spectrograms for multi-label bird species classification.",
    link: "https://www.kaggle.com/code/vbs2004",
    cta: "View Kernel",
    wide: false,
  },
  {
    title: "BirdID",
    subtitle: "Full-Stack Species Identification",
    tags: ["React", "Flask", "PyTorch"],
    details:
      "Audio-to-mel spectrogram pipeline with PyTorch EfficientNetB0 classifier. Real-time predictions powered by a React frontend, Flask REST API, and Redis caching.",
    link: "https://github.com/VBS2004/BirdSoundIdentifier",
    cta: "View Repo",
    wide: false,
  },
  {
    title: "Custom RAG Pipeline",
    subtitle: "LLM Integration with Hybrid Search",
    tags: ["FAISS", "BM25", "Selenium"],
    details:
      "Built Selenium-based web scrapers feeding a FAISS vector store. Improved retrieval accuracy by 45% over baseline keyword search with hybrid BM25 and dense retrieval reranking.",
    link: "https://github.com/VBS2004/RAG-LLM--Retrievel-from-google",
    cta: "View Repo",
    wide: false,
  },
  {
    title: "Survival Outcome Prediction",
    subtitle: "Post-HCT Healthcare ML Challenge",
    tags: ["Neural Networks", "XGBoost", "Survival Analysis"],
    details:
      "Ranked top 150 globally (1,200+ participants) in CIBMTR healthcare ML challenge on Kaggle. Handled class imbalance via PR-AUC optimization using an ensemble of neural networks and gradient boosting.",
    link: "https://www.kaggle.com/code/vbs2004/cibmtr-neural-network",
    cta: "View Solution",
    wide: true,
  },
];

const skills = [
  {
    category: "ML & AI",
    items: "PyTorch, TensorFlow, scikit-learn, Transformers (HuggingFace), LangChain, LLM Fine-tuning (LoRA/SFT), RAG, XGBoost, LightGBM, CBAM, EfficientNet, Mistral, Gemini API",
  },
  {
    category: "Languages",
    items: "Python, Java, Go, R, SQL, Bash, C++, JavaScript",
  },
  {
    category: "Backend & Data",
    items: "Flask, Spring Boot, REST APIs, pandas, NumPy, Redis, MySQL, AWS (S3, RDS, Lambda, ECR)",
  },
  {
    category: "Frontend & Tools",
    items: "React, Docker, Git, Selenium, Playwright, Jupyter, Power BI, ggplot2",
  },
];
