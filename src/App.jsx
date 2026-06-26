import { useState, useEffect, useRef, useCallback } from "react";
import {
  Cpu, Code2, Database, Globe, Server, Camera, Github, Linkedin, Mail,
  Phone, ArrowRight, ArrowUpRight, Download, Menu, X, ExternalLink,
  Bot, Activity, GitBranch, Terminal, MapPin, GraduationCap, FileText,
} from "lucide-react";

/* ============================================================
   EDIT ME — swap these for your real details before deploying.
   ============================================================ */
const CONFIG = {
  name: "Rohit Barwal",
  roles: ["Robotics & Automation Engineer", "AI/ML Engineer", "Software Developer"],
  location: "India",
  email: "rohitbarwal7299@gmail.com",
  phone: "+91 74474 87279",
  linkedin: "https://linkedin.com/in/your-handle",
  github: "ROHITBARWALHVKFNF",
  resumeUrl: "https://drive.google.com/file/d/1kFEE9EH5VqdOOI3jmOUwmekrEny5asZ-/view?usp=drivesdk",
};

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "domains", label: "Domains" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: Camera, label: "AI & Computer Vision",
    items: ["Python", "PyTorch", "OpenCV", "YOLOv8", "MediaPipe", "GenAi", "Langchain/LlamaIndex", "RAG / NLP"],
  },
  {
    icon: Code2, label: "Software Engineering",
    items: ["Go", "Java", "Python", "Git", "REST APIs", "OOP"],
  },
  {
    icon: Cpu, label: "Embedded & Robotics",
    items: ["ESP32", "Arduino", "ROS", "PCA9685", "Sensors", "Actuators", "Serial Comm"],
  },
  {
    icon: Database, label: "Data & Storage",
    items: ["SQLite", "MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    icon: Globe, label: "Web & Product",
    items: ["React", "Streamlit", "Node.js", "HTML / CSS / JS"],
  },
  {
    icon: Server, label: "Infra & Tooling",
    items: ["Docker", "Linux", "Prometheus", "AWS", "n8n"],
  },
];

const PROJECTS = [
  {
    tag: "COMPUTER VISION",
    title: "Smart Traffic Control System",
    github: "https://github.com/ROHITBARWALHVKFNF/Smart-Traffic-Control-System",

    problem: "Fixed-timing signals don't respond to real load — a junction stays congested even when one approach is empty.",
    approach: "Real-time vehicle detection on live camera feeds with YOLOv8. Counts are logged to SQLite, signal timing is recalculated per cycle, and the whole thing is monitored on a Streamlit dashboard.",
    stack: ["Python", "YOLOv8", "OpenCV", "SQLite", "Streamlit"],
    outcomes: [
      "Per-lane vehicle counts in real time",
      "Dynamic green-light allocation instead of fixed timers",
      "Live dashboard for monitoring and debugging",
    ],
    flow: ["Camera Feed", "YOLOv8 Detection", "Count & Classify", "SQLite Log", "Signal Logic", "Dashboard"],
  },
  {
    tag: "ROBOTICS",
    title: "Gesture-Controlled Robotic Arm",
    github: "https://github.com/ROHITBARWALHVKFNF/Gesture-Control-Robotic-Arm",
    problem: "Driving a 7-DOF arm usually means a controller or pre-programmed paths — not natural for quick demos or assistive use.",
    approach: "MediaPipe hand-landmark tracking maps finger and wrist position to joint angles, streamed over serial to an ESP32 driving a PCA9685 PWM controller.",
    stack: ["Python", "ROS", "OpenCV", "pyserial", "ESP32", "PCA9685", "Mediapipe"],
    outcomes: [
      "7 degrees of freedom mapped to natural hand motion",
      "Custom pulse-width calibration per servo",
      "Stable real-time control over serial",
    ],
    flow: ["Webcam", "Hand Landmarks", "Gesture → Angle Map", "Serial Command", "ESP32", "Servo Motion"],
  },
  {
    tag: "SAAS PLATFORM",
    title: "Ev Charging Ecosystem",
    github: "https://github.com/ROHITBARWALHVKFNF/EV-Charging-Ecosystem",

    problem: "EV drivers often arrive at charging stations only to find chargers occupied, offline, or blocked, resulting in long wait times and poor charging experiences.",
    approach: "A full-stack EV charging reservation and queue management platform that provides real-time charger availability, slot booking, ETA-based reservations, payments, and operator analytics. The system connects EV drivers, charging station operators, apartment societies, and fleet managers through a unified platform.",
    stack: ["Flutter",
      "FastAPI",
      "PostgreSQL",
      "Google Maps API",
      "WebSockets",
      "Docker",
      "AWS",
      "UPI Payment Gateway"],
    outcomes: [
      "Real-time charger availability tracking",
      "EV charging slot reservation system",
      "Queue and waitlist management",
      "Operator dashboard with utilization analytics",
      "Integrated digital payments",
      "Reduced charger idle time and user waiting time",
    ],
    flow: ["EV Driver",
      "Location & ETA Engine",
      "Charging Station Discovery",
      "Availability Service",
      "Reservation Engine",
      "Payment Gateway",
      "Charging Station Dashboard",
      "Analytics & Reporting"],
  },
  {
    tag: "MULTI-AGENT AI SYSTEM",
    title: "Agentic AI Financial Analyst Copilot",

    github: "https://github.com/ROHITBARWALHVKFNF/Agentic-AI-Financial-Analyst-Copilot",

    problem: "Investment analysts, CFOs, and fund managers must process massive volumes of financial documents, market data, earnings calls, and economic indicators to make informed decisions. Traditional analysis is time-consuming and struggles to keep pace with rapidly changing financial information.",

    approach: "A self-correcting multi-agent financial copilot that thinks, retrieves, validates, forecasts, and reasons across financial data sources. The platform leverages Agentic RAG, financial forecasting models, valuation engines, and specialized AI agents to autonomously generate actionable investment insights, risk assessments, scenario analyses, and executive reports.",

    stack: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Python",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "ChromaDB",
      "OpenAI/Groq",
      "Prophet",
      "XGBoost",
      "Docker",
      "AWS",
      "React"
    ],

    outcomes: [
      "Multi-agent financial reasoning workflow",
      "Self-correcting retrieval and validation",
      "Automated company valuation engine",
      "Investment recommendation scoring",
      "Scenario and sensitivity analysis",
      "Portfolio risk assessment",
      "Earnings call sentiment intelligence",
      "Executive and investor report automation"
    ],

    flow: [
      "Annual Reports & Market Data",
      "Data Extraction Agent",
      "RAG Retrieval Agent",
      "Financial Analysis Agent",
      "Forecasting Agent",
      "Risk Detection Agent",
      "Valuation Agent",
      "Investment Advisor Agent",
      "Report Generation Agent",
      "CFO & Investor Dashboard"
    ]
  },
  {
    tag: "AGENTIC AI + QUANT RESEARCH",
    title: "Earnings Call Sentiment Platform",

    github: "https://github.com/ROHITBARWALHVKFNF/Earning-Call-Sentiment-Analysis-for-Stock-Market",

    problem: "Financial professionals must analyze thousands of earnings transcripts, management guidance updates, and market reactions every quarter. Manual review is slow and often fails to uncover predictive sentiment signals hidden within large volumes of financial text.",

    approach: "A multi-agent financial research system where specialized AI agents collaborate to retrieve earnings transcripts, analyze management sentiment, detect guidance changes, forecast stock reactions, perform event studies, validate findings, and generate investment recommendations. The platform combines Agentic RAG, FinBERT, forecasting models, and quantitative backtesting into a self-correcting research workflow.",

    stack: [
      "LangGraph",
      "LangChain",
      "Python",
      "FastAPI",
      "FinBERT",
      "HuggingFace",
      "PyTorch",
      "Pandas",
      "PostgreSQL",
      "ChromaDB",
      "OpenAI",
      "XGBoost",
      "VectorBT",
      "Docker",
      "AWS",
      "React"
    ],

    outcomes: [
      "Multi-agent financial research workflow",
      "Earnings call sentiment intelligence",
      "Guidance change detection",
      "Management confidence scoring",
      "Stock reaction forecasting",
      "Event-study automation",
      "Trading strategy generation",
      "Investment recommendation scoring",
      "Risk-aware portfolio insights",
      "Executive financial reports"
    ],

    flow: [
      "Earnings Call Transcripts",
      "Transcript Retrieval Agent",
      "Sentiment Analysis Agent",
      "Guidance Detection Agent",
      "Market Data Agent",
      "Forecasting Agent",
      "Validation Agent",
      "Event Study Agent",
      "Investment Research Agent",
      "Investor Dashboard"
    ]
  },
  {
    tag: "COMPUTER VISION + DEEP LEARNING",
    title: "Medical Image Disease Detection using Deep Learning",

    github: "https://github.com/ROHITBARWALHVKFNF/Medical-Image-Disease-Detection-using-Deep-Learning",

    problem:
      "Healthcare professionals must analyze thousands of medical images daily, making disease diagnosis time-consuming and prone to human error. Manual interpretation of chest X-rays can delay diagnosis, while subtle abnormalities may be overlooked. An AI-powered system can assist clinicians by providing fast, accurate, and explainable disease predictions.",

    approach:
      "An end-to-end deep learning platform that leverages transfer learning to classify diseases from medical images. The system preprocesses medical images, performs disease prediction using pretrained CNN models, explains predictions with Grad-CAM visualizations, tracks experiments with MLflow, stores prediction history, and serves results through FastAPI and Streamlit. The application is containerized with Docker and designed for cloud deployment.",

    stack: [
      "Python",
      "PyTorch",
      "OpenCV",
      "Transfer Learning",
      "ResNet50",
      "EfficientNet",
      "DenseNet121",
      "Grad-CAM",
      "FastAPI",
      "Streamlit",
      "MLflow",
      "SQLite",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "AWS"
    ],

    outcomes: [
      "Automated medical image classification",
      "Disease prediction with confidence scores",
      "Transfer learning-based diagnosis",
      "Grad-CAM explainable AI visualizations",
      "Medical image preprocessing pipeline",
      "Prediction history management",
      "REST API for inference",
      "Interactive Streamlit dashboard",
      "Experiment tracking with MLflow",
      "Cloud-ready Docker deployment"
    ],

    flow: [
      "Medical Image Upload",
      "Image Preprocessing",
      "Transfer Learning Model",
      "Disease Prediction",
      "Confidence Score Generation",
      "Grad-CAM Explainability",
      "Prediction Validation",
      "Prediction History Storage",
      "FastAPI Backend",
      "Streamlit Dashboard"
    ]
  }
];

const PRODUCTS = [

  {
    title: "AI Voice Agent for Dental Clinics",
    desc: "A voice agent architecture for Indian SMEs with regional-language support, fallback handling, and unit-economics modeling baked into the pricing.",
    stack: ["Voice AI", "Sarvam AI", "Hindi/Regional NLP"],
  },
  {
    title: "AI Pharma operations Copilot",
    desc: "An AI-powered workflow assistant designed for pharmaceutical distributors, manufacturers, and SMEs. The system automates order management, inventory inquiries, sales reporting, and customer support through whatsapp interactions, enabling faster operations and reduced manual workload.",
    stack: [,
      "Python",
      "FastAPI",
      "PostgreSQL",
      "WhatsApp Business API",
      "Docker"],
  }
];

const DOMAINS = [
  {
    icon: Cpu, title: "Robotics & Embedded Systems",
    desc: "Servo control, sensor integration, and the firmware layer between code and motion.",
    projects: ["Gesture-Controlled Robotic Arm", "ESP32 / PCA9685 servo control"],
  },
  {
    icon: Camera, title: "Computer Vision & Applied AI",
    desc: "Models that run against live video, not just static benchmarks.",
    projects: ["Smart Traffic Control System", "AI Financial Analyst"],
  },
  {
    icon: GitBranch, title: "Software Systems & Automation",
    desc: "The infrastructure and workflow layer — from a broker built in Go to AI agents running in production for SMEs.",
    projects: ["Saas Platform", "WhatsApp & voice AI agents"],
  },
];

const EXPERIENCE = [

  {
    role: "College Final Year Project", org: "Gesture-Controlled Robotic Arm",
    desc: "Hardware integration, firmware, and pulse-width calibration across 7 servo joints.",
  },
  {
    role: "Independent Project Lead", org: "Smart Traffic Control System",
    desc: "Owned dataset collection, model training, and deployment of a real-time CV pipeline end to end.",
  },
  {
    role: "Building with Mates", org: "Ev Charging Ecosystem",
    desc: "Spec-driven build of a distributed event broker across 13 phases, from TCP layer to metrics.",
  },
  {
    role: "Independent Project Lead", org: "AI Financial Analyst Copilot",
    desc: "An AI-powered financial analyst that automatically analyzes company financial statements, generates investment insights, forecasts future performance, identifies risks, and answers financial questions in natural language.",
  },
  {
    role: "Independent Project Lead", org: "Earnings Call Sentiment Platform",
    desc: "A multi-agent financial research system where specialized AI agents collaborate to retrieve earnings transcripts, analyze management sentiment, detect guidance changes, forecast stock reactions, perform event studies, validate findings, and generate investment recommendations.",
  },

  {
    role: "In progress", org: "AI Automation for Indian SMEs",
    desc: "Designing voice and WhatsApp AI agents for dental clinics, real estate, Pharmacy and coaching institutes.",
  },
];

/* ---------------- helpers ---------------- */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--cyan)" }}>
      {"// "}{children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      className="font-mono text-xs px-2.5 py-1 rounded-md"
      style={{ background: "var(--bg-soft-2)", color: "var(--mono-text)", border: "1px solid var(--line)" }}
    >
      {children}
    </span>
  );
}

function FlowStrip({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="px-2 py-1 rounded" style={{ background: "var(--bg-soft-2)", border: "1px solid var(--line)" }}>
            {s}
          </span>
          {i < steps.length - 1 && <ArrowRight size={12} style={{ color: "var(--line)" }} />}
        </span>
      ))}
    </div>
  );
}

/* ---------------- HUD widget (signature element) ---------------- */

function DetectionHUD() {
  const reduced = useReducedMotion();
  const [stats, setStats] = useState({ vehicles: 14, wait: 9, fps: 27, signal: "GREEN" });

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setStats({
        vehicles: 8 + Math.floor(Math.random() * 15),
        wait: 4 + Math.floor(Math.random() * 11),
        fps: 24 + Math.floor(Math.random() * 7),
        signal: Math.random() > 0.5 ? "GREEN" : "RED",
      });
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  const boxes = [
    { top: "18%", left: "10%", w: "26%", h: "30%", label: "car" },
    { top: "52%", left: "55%", w: "32%", h: "34%", label: "bus" },
    { top: "12%", left: "62%", w: "16%", h: "20%", label: "bike" },
  ];

  return (
    <div
      className="rounded-xl overflow-hidden w-full max-w-md"
      style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 font-mono text-[11px]"
        style={{ borderBottom: "1px solid var(--line)", color: "var(--muted)" }}
      >
        <span>LIVE_FEED // junction_04.mp4</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: stats.signal === "GREEN" ? "#22C55E" : "#EF4444" }}
          />
          {stats.signal}
        </span>
      </div>

      <div className="relative aspect-[4/3]" style={{ background: "#070C18" }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {boxes.map((b, i) => (
          <div
            key={i}
            className={`absolute ${reduced ? "" : "hud-pulse"}`}
            style={{
              top: b.top, left: b.left, width: b.w, height: b.h,
              border: "1.5px solid var(--cyan)",
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <span
              className="absolute -top-5 left-0 font-mono text-[10px] px-1 rounded"
              style={{ background: "var(--cyan)", color: "#04141A" }}
            >
              {b.label}
            </span>
          </div>
        ))}
        {!reduced && (
          <div className="absolute left-0 right-0 h-px scanline" style={{ background: "var(--cyan)", opacity: 0.6 }} />
        )}
      </div>

      <div
        className="grid grid-cols-3 divide-x font-mono text-[11px]"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        {[
          ["VEHICLES", stats.vehicles],
          ["AVG WAIT", `${stats.wait}s`],
          ["FPS", stats.fps],
        ].map(([k, v]) => (
          <div key={k} className="px-3 py-2.5" style={{ borderColor: "var(--line)" }}>
            <div style={{ color: "var(--muted)" }}>{k}</div>
            <div className="text-sm" style={{ color: "var(--text)" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");

  const handleNavClick = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        "--bg": "#0B1120", "--bg-soft": "#111A2E", "--bg-soft-2": "#16213B",
        "--line": "#1E2A45", "--blue": "#3B82F6", "--cyan": "#06B6D4",
        "--signal": "#F59E0B", "--text": "#E7ECF5", "--muted": "#8B97AC",
        "--mono-text": "#9FB4D8",
        background: "var(--bg)", color: "var(--text)",
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        *:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
        ::selection { background: var(--blue); color: white; }
        @keyframes hudpulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .hud-pulse { animation: hudpulse 2.4s ease-in-out infinite; }
        @keyframes scan { 0% { top: 4%; } 100% { top: 94%; } }
        .scanline { animation: scan 3.2s linear infinite; }
        @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .boot-1 { animation: fadein .6s ease-out both; }
        .boot-2 { animation: fadein .6s ease-out .15s both; }
        .boot-3 { animation: fadein .6s ease-out .3s both; }
        @media (prefers-reduced-motion: reduce) {
          .hud-pulse, .scanline, .cursor-blink, .boot-1, .boot-2, .boot-3 { animation: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur"
        style={{ background: "rgba(11,17,32,0.85)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => handleNavClick("about")}
            className="font-mono text-sm"
            style={{ color: "var(--text)" }}
          >
            rohit's
            <span style={{ color: "var(--cyan)" }}>_</span>
            portfolio
            <span style={{ color: "var(--cyan)" }}>_</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNavClick(n.id)}
                className="font-mono text-xs tracking-wide transition-colors"
                style={{ color: active === n.id ? "var(--cyan)" : "var(--muted)" }}
              >
                {n.label}
              </button>
            ))}
            <a
              href={CONFIG.resumeUrl}
              className="font-mono text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
              style={{ background: "var(--blue)", color: "#fff" }}
            >
              <Download size={13} /> Resume
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3" style={{ borderTop: "1px solid var(--line)" }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => handleNavClick(n.id)} className="font-mono text-sm text-left py-1" style={{ color: "var(--muted)" }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-sm mb-5 boot-1" style={{ color: "var(--muted)" }}>
              rohit's_portfolio_<span className="cursor-blink">_</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1] mb-5 boot-2">
              {CONFIG.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6 boot-2">
              {CONFIG.roles.map((r) => <Pill key={r}>{r}</Pill>)}
            </div>
            <p className="text-base leading-relaxed mb-8 max-w-md boot-3" style={{ color: "var(--muted)" }}>
              I build intelligent software and automation systems that bridge the physical and digital worlds. By combining robotics, embedded systems, computer vision, machine learning, and modern software engineering, I develop end-to-end solutions from hardware integration and data processing to AI-driven decision-making and scalable applications. My focus is on building reliable, maintainable, and production-ready systems that deliver measurable real-world impact.
            </p>
            <div className="flex flex-wrap gap-3 boot-3">
              <button
                onClick={() => handleNavClick("projects")}
                className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2"
                style={{ background: "var(--blue)", color: "#fff" }}
              >
                View Projects <ArrowRight size={15} />
              </button>
              <a
                href={CONFIG.resumeUrl}
                className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2"
                style={{ border: "1px solid var(--line)", color: "var(--text)" }}
              >
                <Download size={15} /> Resume
              </a>
              <button
                onClick={() => handleNavClick("contact")}
                className="px-5 py-2.5 text-sm font-medium flex items-center gap-1"
                style={{ color: "var(--cyan)" }}
              >
                Contact <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <DetectionHUD />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>about</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6 max-w-xl">
            Engineering intelligent systems that solve real-world problems
          </h2>
          <p className="max-w-2xl leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
            I specialize in designing and developing end to end, AI driven systems by combining robotics, embedded engineering, computer vision, machine learning, and scalable software architecture. From controlling hardware at the edge to deploying cloud-based AI applications, I focus on building robust, production-ready solutions that are practical, efficient, and designed for real-world impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex items-start gap-3">
              <GraduationCap size={20} style={{ color: "var(--cyan)" }} className="mt-0.5" />
              <div>
                <div className="text-sm font-medium">B.E. Automation &amp; Robotics</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Final year</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} style={{ color: "var(--cyan)" }} className="mt-0.5" />
              <div>
                <div className="text-sm font-medium">{CONFIG.location}</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>Open to relocation</div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {["Machine Learning", "Deep Learning", "Robotics", "Computer Vision", "Control Systems", "Data Structures"].map((c) => (
              <Pill key={c}>{c}</Pill>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>skills</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-10">Six layers, one stack</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} className={`delay-[${i * 60}ms]`}>
                <div
                  className="rounded-xl p-5 h-full"
                  style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}
                >
                  <Icon size={20} style={{ color: "var(--cyan)" }} className="mb-3" />
                  <div className="font-medium mb-3 text-sm">{s.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="font-mono text-[11px] px-2 py-1 rounded" style={{ background: "var(--bg-soft-2)", color: "var(--mono-text)" }}>
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>projects</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-10">Featured work</h2>
        </Reveal>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p) => (
            <Reveal key={p.title}>
              <div className="rounded-xl p-6 sm:p-8" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="font-mono text-[11px] mb-2" style={{ color: "var(--signal)" }}>{p.tag}</div>
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1.5 rounded-md flex items-center gap-1.5"
                      style={{
                        border: "1px solid var(--line)",
                        color: "var(--text)"
                      }}
                    >
                      <Github size={13} />
                      Code
                    </a>

                    <a
                      href={p.caseStudy}
                      className="text-xs font-mono px-3 py-1.5 rounded-md flex items-center gap-1.5"
                      style={{ color: "var(--cyan)" }}
                    >
                      Case Study
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <div className="text-xs font-mono mb-1.5" style={{ color: "var(--muted)" }}>PROBLEM</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono mb-1.5" style={{ color: "var(--muted)" }}>APPROACH</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.approach}</p>
                  </div>
                </div>
                <ul className="grid sm:grid-cols-3 gap-2 mb-6">
                  {p.outcomes.map((o) => (
                    <li key={o} className="text-sm flex gap-2" style={{ color: "var(--text)" }}>
                      <span style={{ color: "var(--cyan)" }}>›</span> {o}
                    </li>
                  ))}
                </ul>
                <FlowStrip steps={p.flow} />
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.stack.map((s) => <Pill key={s}>{s}</Pill>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Applied project */}
        <Reveal className="mt-14">
          <div className="font-mono text-xs tracking-widest mb-5" style={{ color: "var(--signal)" }}>// applied ai projects</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PRODUCTS.map((pr) => (
              <div key={pr.title} className="rounded-xl p-5" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                <Bot size={18} style={{ color: "var(--signal)" }} className="mb-3" />
                <div className="font-medium text-sm mb-2">{pr.title}</div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{pr.desc}</p>
                <div className="flex flex-wrap gap-1.5">{pr.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* DOMAINS */}
      <section id="domains" className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>domains</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-10">Where I build</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {DOMAINS.map((d) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title}>
                <div className="rounded-xl p-6 h-full" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                  <Icon size={22} style={{ color: "var(--blue)" }} className="mb-4" />
                  <div className="font-medium mb-2">{d.title}</div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{d.desc}</p>
                  <div className="flex flex-col gap-1.5">
                    {d.projects.map((pr) => (
                      <div key={pr} className="text-xs font-mono flex items-center gap-1.5" style={{ color: "var(--mono-text)" }}>
                        <span style={{ color: "var(--cyan)" }}>·</span> {pr}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>experience</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-10">Build log</h2>
        </Reveal>
        <div className="flex flex-col">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.org}>
              <div className="flex gap-5 py-5" style={{ borderTop: i === 0 ? "1px solid var(--line)" : "1px solid var(--line)" }}>
                <div className="font-mono text-xs pt-1 w-20 shrink-0" style={{ color: "var(--muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-medium text-sm">{e.role} <span style={{ color: "var(--muted)" }}>— {e.org}</span></div>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GITHUB + WRITING */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <Reveal>
          <div className="font-mono text-xs tracking-widest mb-5" style={{ color: "var(--cyan)" }}>// activity</div>
          <h3 className="font-display text-xl font-semibold mb-4">On GitHub</h3>
          <div className="rounded-xl p-5" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${CONFIG.github}&show_icons=true&theme=transparent&hide_border=true&title_color=06B6D4&icon_color=3B82F6&text_color=8B97AC`}
              alt="GitHub stats"
              className="w-full mb-3"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <a
              href={`https://github.com/${CONFIG.github}`}
              className="text-sm font-mono flex items-center gap-1.5"
              style={{ color: "var(--cyan)" }}
            >
              <Github size={14} /> github.com/{CONFIG.github}
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className="font-mono text-xs tracking-widest mb-5" style={{ color: "var(--cyan)" }}>// writing</div>
          <h3 className="font-display text-xl font-semibold mb-4">Notes &amp; write-ups</h3>
          <div className="flex flex-col gap-2">
            {[
              "How YOLOv8 Works",
              "What Is RAG, and Why It Matters",
              "Inside a Real-Time Traffic Control Pipeline",
              "Calibrating Servos: PWM Math for Robotic Arms",
            ].map((t) => (
              <div key={t} className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                <span className="text-sm flex items-center gap-2"><FileText size={14} style={{ color: "var(--muted)" }} /> {t}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color: "var(--signal)", border: "1px solid var(--line)" }}>SOON</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>contact</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4 max-w-lg">
            Building something with computer vision, robotics, or AI automation? Let's talk.
          </h2>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={`mailto:${CONFIG.email}`} className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2" style={{ background: "var(--blue)", color: "#fff" }}>
              <Mail size={15} /> {CONFIG.email}
            </a>
            <a href={`tel:${CONFIG.phone}`} className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2" style={{ border: "1px solid var(--line)" }}>
              <Phone size={15} /> {CONFIG.phone}
            </a>
            <a href={CONFIG.linkedin} className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2" style={{ border: "1px solid var(--line)" }}>
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={`https://github.com/${CONFIG.github}`} className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2" style={{ border: "1px solid var(--line)" }}>
              <Github size={15} /> GitHub
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs" style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}>
        <span>{CONFIG.name} · {new Date().getFullYear()}</span>
        <span className="flex items-center gap-1.5"><Activity size={12} /> status: building</span>
      </footer>
    </div>
  );
}
