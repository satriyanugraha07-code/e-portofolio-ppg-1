/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, AnimatePresence, useScroll, useSpring, useTransform, useInView
} from 'motion/react';
import { 
  Menu, X, Mail, Instagram, ChevronRight, ChevronLeft, ArrowRight,
  BookOpen, Layout, Zap, Award, ArrowUp,
  GraduationCap, Briefcase, Target, MousePointer2,
  Sparkles, Layers, Fingerprint, ArrowDown, ExternalLink,
  Code2, Palette, Globe, Linkedin, Youtube
} from 'lucide-react';

// --- Data ---

const showcaseData = [
  {
    title: "Rencana Pelaksanaan Pembelajaran (RPP)",
    meta: "Perencanaan",
    summary: "Rancangan pembelajaran yang menyatukan tujuan, aktivitas, dan asesmen dalam alur yang lebih rapi dan mudah dipresentasikan.",
    bullets: [],
    directLink: "rpp",
    icon: <Layout className="w-12 h-12 text-accent" />,
    accent: "rgba(203, 255, 156, 0.22)"
  },
  {
    title: "Media Ajar",
    meta: "Media",
    summary: "Kumpulan media pembelajaran interaktif, bahan ajar, dan materi pendukung untuk proses pembelajaran yang lebih menarik.",
    bullets: [
      "Media pembelajaran interaktif dan modern.",
      "Bahan ajar yang mudah dipahami siswa.",
      "Mendukung pembelajaran jarak jauh dan tatap muka."
    ],
    directLink: "media",
    icon: <Zap className="w-12 h-12 text-accent-strong" />,
    accent: "rgba(142, 255, 231, 0.22)"
  },
  {
    title: "Asesmen Diagnostik dan Formatif",
    meta: "Asesmen",
    summary: "Dokumen evaluasi dan rubrik dapat ditampilkan dengan gaya showcase sehingga pembaca langsung paham nilai utamanya.",
    bullets: [
      "Menonjolkan kualitas berpikir dan perencanaan.",
      "Tetap bersih walau isi kontennya formal.",
      "Cocok untuk bukti profesional yang lebih meyakinkan."
    ],
    icon: <Target className="w-12 h-12 text-orange-300" />,
    accent: "rgba(255, 211, 120, 0.2)"
  },
  {
    title: "Paket Refleksi dan Tindak Lanjut",
    meta: "Refleksi",
    summary: "Bagian refleksi dibuat lebih menarik dengan perpaduan visual, narasi, dan bullet insight yang singkat tapi terasa kuat.",
    bullets: [
      "Mudah dipakai untuk menampilkan growth mindset.",
      "Membantu portfolio terasa lebih personal.",
      "Menjadi penutup yang kuat untuk keseluruhan cerita."
    ],
    icon: <Award className="w-12 h-12 text-pink-300" />,
    accent: "rgba(255, 174, 221, 0.2)"
  }
];

// --- Components ---

const Reveal = ({ children, delay = 0, direction = "up", cascade = false, className = "", parallax = 0 }: { children: React.ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right" | "none", cascade?: boolean, className?: string, parallax?: number, key?: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const enterTop = viewportHeight * 0.88;
      const enterBottom = viewportHeight * 0.12;
      const exitTop = viewportHeight * 1.12;
      const exitBottom = -viewportHeight * 0.12;

      setIsVisible((current) => {
        if (current) {
          return rect.top < exitTop && rect.bottom > exitBottom;
        }
        return rect.top < enterTop && rect.bottom > enterBottom;
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const directions = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 },
    none: { scale: 0.95, opacity: 0 }
  };

  const container = {
    hidden: { ...directions[direction] },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: cascade ? 0.08 : 0
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {cascade ? React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      )) : children}
    </motion.div>
  );
};

const MagneticLink = ({ children, href, className = "" }: { children: React.ReactNode, href: string, className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const opensNewTab = !href.startsWith('#');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.a>
  );
};

const TextReveal = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const letters = Array.from(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, margin: "-5% 0px -5% 0px" });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isInView) setHasEntered(true);
  }, [isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
    }),
    exit: {
      opacity: 0,
      filter: "blur(5px)",
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : hasEntered ? "exit" : "hidden"}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const NavLink = ({ href, children, isActive, onClick }: { href: string, children: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all duration-300 ${
      isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
    }`}
  >
    {children}
  </a>
);

const ParallaxText = ({ children, baseHeight = 50 }: { children: React.ReactNode, baseHeight?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [baseHeight, -baseHeight]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const SectionKicker = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-xs uppercase tracking-widest text-white/70 mb-4">
    {children}
  </p>
);

const TiltCard = ({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    cardRef.current.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px) scale(1.02)`;
    cardRef.current.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(203,255,156,0.1)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
    cardRef.current.style.boxShadow = '';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card p-6 transition-all duration-500 ease-out border border-white/5 active:scale-95 md:active:scale-100 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

const ShowcaseCard = ({ item, isActive, onClickDetail }: { item: any, isActive: boolean, onClickDetail?: () => void, key?: any }) => (
  <motion.div
    initial={false}
    animate={{ 
      opacity: isActive ? 1 : 0.4,
      scale: isActive ? 1 : 0.95,
      filter: isActive ? "blur(0px)" : "blur(4px)"
    }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="h-full"
  >
     <div className="glass-card p-8 md:p-14 relative overflow-hidden h-full flex flex-col justify-center border-accent/20">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
           {item.icon}
        </div>
        
        <div className="relative z-10">
           <SectionKicker>{item.meta}</SectionKicker>
           <h3 className="text-3xl md:text-5xl font-bold mb-6 italic tracking-tighter">{item.title}</h3>
           <p className="text-muted leading-relaxed mb-8 text-lg max-w-xl">
             {item.summary}
           </p>
           
           <div className="grid md:grid-cols-2 gap-4">
              {item.bullets.map((bullet: string, i: number) => (
                <div key={i} className="flex gap-3 text-sm text-white/70 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                   <span>{bullet}</span>
                </div>
              ))}
           </div>
           
           {(item.popupDetails || item.link || item.directLink) && (
             item.directLink ? (
               <motion.button 
                 whileHover={{ x: 5 }}
                 className="mt-12 inline-flex items-center gap-2 text-accent font-bold group/link cursor-pointer"
                 onClick={onClickDetail}
               >
                  <span>Detail Project</span>
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
               </motion.button>
             ) : (
               <motion.button 
                 whileHover={{ x: 5 }}
                 className="mt-12 flex items-center gap-2 text-accent font-bold group/link"
                 onClick={onClickDetail}
               >
                  <span>Detail Project</span>
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
               </motion.button>
             )
           )}
        </div>
     </div>
  </motion.div>
);
const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const CoolLoader = ({ onComplete }: { onComplete: () => void, key?: any }) => {
  return (
    <motion.div 
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-night"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-brand-night to-brand-night" />
      
      <div className="text-center w-full max-w-md px-6 relative z-10 flex flex-col items-center">
         <motion.h1 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-xl md:text-2xl font-bold tracking-[0.2em] text-accent/90 mb-8 uppercase"
         >
           PPG PRAJABATAN 2026
         </motion.h1>

         {/* Loading Bar */}
         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full origin-left bg-accent shadow-[0_0_15px_rgba(203,255,156,0.6)] will-change-transform"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => setTimeout(onComplete, 300)}
            />
         </div>
      </div>
    </motion.div>
  );
};

const rppData = {
  1: {
    title: "RPP Siklus 1 - Proyeksi Ortogonal",
    file: "rpp-siklus1.pdf",
    modul: { fase: "E/10", jp: "8 JP", topik: "Proyeksi", mode: "Praktik" },
    identitas: [
      ['Penyusun', 'Satriya Nugraha, S.Pd.'],
      ['Instansi', 'Universitas Sarjanawiyata Tamansiswa'],
      ['Tahun Penyusunan', '2026'],
      ['Jenjang Sekolah', 'Fase E/10 SMK'],
      ['Mata Pelajaran', 'Dasar-dasar Teknik Mesin (Gambar Teknik)'],
      ['Alokasi Waktu', '8 x 45 / 8 JP']
    ],
    kompetensiAwal: ['Alat gambar manual', 'Satuan alat ukur', 'Aturan garis teknik'],
    tujuanPembelajaran: [
      ['1.1', 'Peserta didik mampu memahami konsep proyeksi ortogonal pada sistem proyeksi Amerika dan Eropa dalam gambar teknik dengan benar.'],
      ['1.2', 'Peserta didik mampu membuat gambar proyeksi benda sederhana menggunakan sistem proyeksi Amerika dan Eropa sesuai kaidah gambar teknik dengan tepat dan rapi. (KKTP)']
    ],
    indikator: [
      ['1.1.1', 'Peserta didik mampu menjelaskan pengertian proyeksi ortogonal dalam gambar teknik dengan benar.'],
      ['1.1.2', 'Peserta didik mampu membedakan sistem proyeksi Amerika (third angle projection) dan sistem proyeksi Eropa (first angle projection) dengan tepat.'],
      ['1.2.1', 'Peserta didik mampu menentukan posisi tampak depan, tampak atas, dan tampak samping pada sistem proyeksi Amerika dan Eropa dengan benar.'],
      ['1.2.2', 'Peserta didik mampu membuat gambar proyeksi benda sederhana menggunakan sistem proyeksi Amerika dan Eropa sesuai standar gambar teknik.']
    ]
  },
  2: {
    title: "RPP Siklus 2 - Gambar Isometri",
    file: "rpp-siklus2.pdf",
    modul: { fase: "E/10", jp: "6 JP", topik: "Isometri", mode: "Praktik" },
    identitas: [
      ['Penyusun', 'Satriya Nugraha, S.Pd.'],
      ['Instansi', 'Universitas Sarjanawiyata Tamansiswa'],
      ['Tahun Penyusunan', '2026'],
      ['Jenjang Sekolah', 'Fase E/10 SMK'],
      ['Mata Pelajaran', 'Dasar-dasar Teknik Mesin (Gambar Teknik)'],
      ['Alokasi Waktu', '6 x 45 / 6 JP']
    ],
    kompetensiAwal: ['Proyeksi ortogonal', 'Sistem proyeksi Amerika/Eropa', 'Penggunaan alat gambar'],
    tujuanPembelajaran: [
      ['2.1', 'Peserta didik mampu memahami konsep gambar isometri dan aturan pembuatannya dalam teknik mesin.'],
      ['2.2', 'Peserta didik mampu membuat gambar isometri benda sederhana dengan proporsi dan sudut yang tepat.']
    ],
    indikator: [
      ['2.1.1', 'Peserta didik mampu menjelaskan pengertian dan karakteristik gambar isometri.'],
      ['2.1.2', 'Peserta didik mampu membedakan gambar isometri dengan proyeksi ortogonal.'],
      ['2.2.1', 'Peserta didik mampu menggambar sumbu isometri dengan sudut 30 derajat.'],
      ['2.2.2', 'Peserta didik mampu membuat gambar isometri benda sederhana dari proyeksi ortogonal.']
    ]
  },
  3: {
    title: "RPP Siklus 3 - Gambar Perspektif",
    file: "rpp-siklus3.pdf",
    modul: { fase: "E/10", jp: "6 JP", topik: "Perspektif", mode: "Praktik" },
    identitas: [
      ['Penyusun', 'Satriya Nugraha, S.Pd.'],
      ['Instansi', 'Universitas Sarjanawiyata Tamansiswa'],
      ['Tahun Penyusunan', '2026'],
      ['Jenjang Sekolah', 'Fase E/10 SMK'],
      ['Mata Pelajaran', 'Dasar-dasar Teknik Mesin (Gambar Teknik)'],
      ['Alokasi Waktu', '6 x 45 / 6 JP']
    ],
    kompetensiAwal: ['Gambar isometri', 'Proyeksi ortogonal', 'Teknik dasar menggambar'],
    tujuanPembelajaran: [
      ['3.1', 'Peserta didik mampu memahami konsep gambar perspektif dan titik hilang (vanishing point).'],
      ['3.2', 'Peserta didik mampu membuat gambar perspektif satu titik dan dua titik hilang.']
    ],
    indikator: [
      ['3.1.1', 'Peserta didik mampu menjelaskan pengertian gambar perspektif dan titik hilang.'],
      ['3.1.2', 'Peserta didik mampu membedakan perspektif satu titik dan dua titik hilang.'],
      ['3.2.1', 'Peserta didik mampu membuat gambar perspektif satu titik hilang dengan benar.'],
      ['3.2.2', 'Peserta didik mampu membuat gambar perspektif dua titik hilang dengan benar.']
    ]
  }
};

const RppPage = ({ onBack }: { onBack: () => void }) => {
  const [activeSiklus, setActiveSiklus] = useState<1 | 2 | 3>(1);
  const data = rppData[activeSiklus];

  return (
    <motion.div
      key="rpp-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-brand-night text-white"
    >
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_8%,rgba(203,255,156,0.14),transparent_34%),radial-gradient(circle_at_84%_16%,rgba(142,255,231,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%)]" />
      
      {/* Floating Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex items-center justify-between gap-4 px-4 py-3 border border-white/10 rounded-2xl bg-brand-night/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest"
            >
              <ChevronLeft size={18} /> Kembali
            </button>
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((siklus) => (
                <button
                  key={siklus}
                  onClick={() => setActiveSiklus(siklus as 1 | 2 | 3)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSiklus === siklus
                      ? 'bg-accent text-brand-night shadow-[0_4px_20px_rgba(203,255,156,0.3)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  RPP Siklus {siklus}
                </button>
              ))}
            </div>
            
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-white/60">
              <BookOpen size={16} className="text-accent" /> Modul
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSiklus}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(203,255,156,0.16),transparent_34%)] pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold mb-4">
                  Dokumen Perangkat Ajar
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-3xl mb-4">
                  {data.title}
                </h1>
                <p className="text-white/50 text-xs md:text-sm mb-6">
                  Rencana Pelaksanaan Pembelajaran (RPP) - Satriya Nugraha, S.Pd.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${import.meta.env.BASE_URL}${data.file}`}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-brand-night px-5 py-2.5 text-xs font-bold hover:bg-accent/90 transition-colors shadow-[0_4px_20px_rgba(203,255,156,0.3)]"
                  >
                    <ArrowDown size={15} /> Download PDF
                  </a>
                  <a
                    href={`${import.meta.env.BASE_URL}${data.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink size={14} /> Buka di Tab Baru
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-6 pb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="border-l-2 border-accent pl-3 text-base md:text-lg font-black">Preview Dokumen</h2>
                <a
                  href={`${import.meta.env.BASE_URL}${data.file}`}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold text-accent hover:bg-accent hover:text-brand-night transition-colors"
                >
                  <ArrowDown size={15} /> Download
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                  <div>
                    <p className="font-bold text-white">{data.title}</p>
                    <p className="text-xs text-white/45">Letakkan file PDF sebagai public/{data.file} untuk menampilkan preview asli.</p>
                  </div>
                  <a
                    href={`${import.meta.env.BASE_URL}${data.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-white/55 hover:text-accent transition-colors"
                  >
                    Buka File <ExternalLink size={14} />
                  </a>
                </div>
                <div className="relative h-[520px] bg-brand-night/45">
                  <iframe
                    title={`Preview ${data.title}`}
                    src={`${import.meta.env.BASE_URL}${data.file}#toolbar=0&navpanes=0`}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const MediaPage = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'bahan' | 'media' | 'lainnya'>('bahan');

  const tabs = [
    { id: 'bahan', label: 'Bahan Ajar', desc: 'Materi pembelajaran tertulis' },
    { id: 'media', label: 'Media Ajar', desc: 'Video, animasi, infografis' },
    { id: 'lainnya', label: 'Lainnya', desc: 'Dokumen pendukung' }
  ];

  return (
    <motion.div
      key="media-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-brand-night text-white"
    >
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_8%,rgba(142,255,231,0.14),transparent_34%),radial-gradient(circle_at_84%_16%,rgba(203,255,156,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%)]" />
      
      {/* Floating Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex items-center justify-between gap-4 px-4 py-3 border border-white/10 rounded-2xl bg-brand-night/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest"
            >
              <ChevronLeft size={18} /> Kembali
            </button>
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'bahan' | 'media' | 'lainnya')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-accent-strong text-brand-night shadow-[0_4px_20px_rgba(142,255,231,0.3)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-white/60">
              <Zap size={16} className="text-accent-strong" /> Media
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(142,255,231,0.16),transparent_34%)] pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-strong/10 border border-accent-strong/20 text-accent-strong text-[10px] font-semibold mb-4">
                  Media Pembelajaran
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-3xl mb-4">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
                <p className="text-white/50 text-xs md:text-sm mb-6">
                  {tabs.find(t => t.id === activeTab)?.desc} - Satriya Nugraha, S.Pd.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full bg-accent-strong text-brand-night px-5 py-2.5 text-xs font-bold hover:bg-accent-strong/90 transition-colors shadow-[0_4px_20px_rgba(142,255,231,0.3)]">
                    <ArrowDown size={15} /> Download Semua
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="border-l-2 border-accent-strong pl-3 text-base md:text-lg font-black">Daftar Dokumen</h2>
              </div>
              
              {/* Placeholder untuk daftar dokumen */}
              <div className="grid gap-3">
                {[
                  { name: 'Bahan Ajar Proyeksi.pdf', size: '2.5 MB', type: 'PDF' },
                  { name: 'Worksheet Gambar Teknik.docx', size: '1.2 MB', type: 'DOCX' },
                  { name: 'Modul Pembelajaran Lengkap.pdf', size: '5.8 MB', type: 'PDF' }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.035] hover:border-accent-strong/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-strong/10 flex items-center justify-center text-accent-strong font-bold text-xs">
                        {doc.type}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{doc.name}</p>
                        <p className="text-xs text-white/40">{doc.size}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-accent-strong transition-colors">
                      <ArrowDown size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6 pb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="border-l-2 border-accent-strong pl-3 text-base md:text-lg font-black">Preview</h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center">
                <p className="text-white/40 text-sm">
                  Preview dokumen akan muncul di sini.\nTaruh file PDF di folder public/media/ untuk menampilkan preview.
                </p>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Sections ---

// --- Data ---
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const profileDetails = [
  {
    title: 'Latar Belakang',
    shortDesc: 'Lahir dan besar dengan ketertarikan pada inovasi dan pengajaran. Berfokus pada integrasi teknologi dalam pendidikan untuk menciptakan pengalaman belajar yang relevan di era digital.',
    fullDesc: 'Saya Satriya Nugraha, berasal dari Boyolali dan kini berdomisili di Klaten. Nilai-nilai budaya Jawa seperti gotong royong, tepa selira, andhap asor, dan kesederhanaan membentuk saya menjadi pribadi yang peduli, menghargai kebersamaan, dan menjunjung etika.\n\nPengalaman belajar, menjadi asisten dosen di Universitas Sebelas Maret, aktif berorganisasi, serta mengajar di Wonogiri menguatkan tekad saya untuk menjadi guru. Saya menyadari bahwa guru bukan hanya penyampai materi, tetapi juga pembimbing dan inspirator bagi peserta didik.\n\nMelalui Program PPG, saya ingin menjadi guru profesional yang mampu menciptakan pembelajaran bermakna, adaptif, dan berpusat pada peserta didik, sehingga dapat membantu mereka berkembang sesuai potensi dan karakternya.',
    iconBgClass: 'bg-accent/10 border-accent/20 text-accent',
    textColorClass: 'text-accent',
    image: publicAsset('latarbelakang.svg'),
  },
  {
    title: 'Hobi',
    shortDesc: 'Hobi bukan hanya tentang kesenangan, tetapi juga tentang proses menjadi lebih baik. Dari hal kecil yang kita sukai, bisa tumbuh kemampuan besar yang bermanfaat di masa depan.',
    fullDesc: 'Hobi bukan hanya tentang kesenangan, tetapi juga tentang proses menjadi lebih baik. Dari hal kecil yang kita sukai, bisa tumbuh kemampuan besar yang bermanfaat di masa depan.',
    listItems: ['Hiking', 'Traveling', 'Fotografi'],
    iconBgClass: 'bg-[#cbff9c]/10 border-[#cbff9c]/20 text-[#cbff9c]',
    textColorClass: 'text-[#cbff9c]',
  },
  {
    title: 'Motivasi',
    shortDesc: 'Menjadi pendidik inspiratif yang melahirkan generasi cerdas dan berkarakter. Bertujuan membangun ekosistem pendidikan modern, inklusif, dan adaptif.',
    fullDesc: 'Motivasi jangka panjang saya adalah menjadi lebih dari sekadar pengajar—saya ingin menjadi sosok pendidik yang mampu menginspirasi dan memantik rasa ingin tahu siswa. Saya bermimpi suatu hari dapat berkontribusi secara signifikan dalam merumuskan kurikulum atau ekosistem pendidikan modern yang tidak hanya fokus pada kecerdasan akademis, tetapi juga ketangguhan karakter. Ekosistem yang inklusif, adaptif terhadap perubahan global, dan memerdekakan cara belajar setiap anak.',
    iconBgClass: 'bg-blue-400/10 border-blue-400/20 text-blue-400',
    textColorClass: 'text-blue-400',
  }
];

const hobbyDetails = [
  {
    title: 'Hiking',
    desc: 'Mendaki gunung bagi saya adalah cara untuk menguji ketahanan mental dan fisik. Di setiap langkah menuju puncak, terdapat pelajaran tentang kesabaran, kerja sama tim, dan rasa syukur akan kebesaran alam. Selain itu, hiking membantu saya tetap fokus dan resilien dalam menghadapi rintangan kehidupan.',
    image: publicAsset('hiking.svg'),
    icon: '⛰️'
  },
  {
    title: 'Traveling',
    desc: 'Perjalanan membuka jendela wawasan dan mengubah perspektif. Setiap destinasi yang saya kunjungi adalah buku terbuka yang mengajarkan keragaman budaya, adaptasi, dan cara berkomunikasi dengan masyarakat lokal. Pengalaman ini merekatkan toleransi dan nilai-nilai kebersamaan.',
    image: publicAsset('traveling.svg'),
    icon: '✈️',
    imagePosition: 'object-[center_85%]'
  },
  {
    title: 'Fotografi',
    desc: 'Melalui fotografi, saya belajar melihat keindahan dalam sudut-sudut kecil. Membekukan setiap momen berharga mengajarkan saya tentang kesadaran (mindfulness) untuk selalu menghargai saat ini (present moment), serta bagaimana merangkai cerita visual tanpa menggunakan kata-kata.',
    image: publicAsset('fotografi.svg'),
    icon: '📸'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeProfilePopup, setActiveProfilePopup] = useState<number | null>(null);
  const [activeHobbyPopup, setActiveHobbyPopup] = useState<number | null>(null);
  const [activeShowcasePopup, setActiveShowcasePopup] = useState<number | null>(null);
  const [activePage, setActivePage] = useState<'home' | 'rpp' | 'media'>('home');
  const [openDocGallery, setOpenDocGallery] = useState<number | null>(null);
  const [activeDocGallery, setActiveDocGallery] = useState(0);
  const docGalleryDragStart = useRef<number | null>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [journeyProgress, setJourneyProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 1]);
  const profileRotate = useTransform(scrollYProgress, [0, 0.2], [2, 0]);
  const handleDocGallerySwipe = (offsetX: number) => {
    const galleryLength = openDocGallery === null
      ? documentationPhotos.length
      : (documentationPhotos[openDocGallery]?.galleryPhotos?.length ?? 1);

    if (Math.abs(offsetX) < 45 || galleryLength <= 1) return;
    setActiveDocGallery((prev) => (
      offsetX < 0
        ? (prev + 1) % galleryLength
        : (prev + galleryLength - 1) % galleryLength
    ));
  };
  const documentationPhotos = [
    {
      step: '01',
      side: 'left',
      title: 'Orientasi & Pemetaan',
      isPhoto: true,
      photo: publicAsset('fase1.jpg'),
      galleryPhotos: [
        publicAsset('fase1-1.jpg'),
        publicAsset('fase1-2.jpg'),
        publicAsset('fase1-3.jpg'),
        publicAsset('fase1-4.jpg')
      ]
    },
    {
      step: '02',
      side: 'right',
      title: 'Desain Strategis',
      isPhoto: true,
      photo: publicAsset('fase2.jpg'),
      galleryPhotos: [publicAsset('fase2.jpg')]
    },
    {
      step: '03',
      side: 'left',
      title: 'Implementasi Nyata',
      isPhoto: true,
      photo: publicAsset('fase3.jpg'),
      galleryPhotos: [publicAsset('fase3.jpg')]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => {
      const sections = ['beranda', 'profil', 'perjalanan', 'artefak', 'kontak'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -200 && rect.top <= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);

      if (journeyRef.current) {
        const rect = journeyRef.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const total = rect.height || 1;
        const progress = (viewportCenter - rect.top) / total;
        setJourneyProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    handleScroll();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden">
      {/* Elegant SVG Topography Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="elegant-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#elegant-pattern)" className="text-accent" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <CoolLoader onComplete={() => setIsLoading(false)} key="cool-loader" />
        ) : (
          <motion.div 
            key="main-content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
              }
            }}
            className="relative z-10 w-full"
          >
            {/* Elegant Architectural Ornaments */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1.5 } }
              }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {/* Abstract Corner Brackets */}
              <div className="absolute top-8 left-8 md:top-12 md:left-12 w-16 h-16 border-t-[1.5px] border-l-[1.5px] border-accent/30 rounded-tl-xl" />
              <div className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 border-t-[1.5px] border-r-[1.5px] border-accent/30 rounded-tr-xl" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-16 h-16 border-b-[1.5px] border-l-[1.5px] border-accent/30 rounded-bl-xl" />
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 border-b-[1.5px] border-r-[1.5px] border-accent/30 rounded-br-xl" />
              
              {/* Floating Plus Signs (+ pattern) */}
              <div className="absolute top-[20%] left-[10%] md:left-[15%] text-accent/20 font-mono text-xs">+</div>
              <div className="absolute top-[35%] right-[5%] md:right-[10%] text-accent/20 font-mono text-xs">+</div>
              <div className="absolute bottom-[30%] left-[8%] md:left-[8%] text-accent/20 font-mono text-xs">+</div>
              <div className="absolute bottom-[15%] right-[10%] md:right-[20%] text-accent/20 font-mono text-xs">+</div>
              <div className="absolute top-[60%] left-[20%] md:left-[40%] text-accent/10 font-mono text-xs">+</div>
              <div className="absolute top-[10%] right-[30%] md:right-[40%] text-accent/10 font-mono text-xs">+</div>

              {/* Ambient Glowing Orbs for depth (Static & Lighter) */}
              <div 
                className="absolute top-[10%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-surface rounded-full blur-[100px] md:blur-[150px] opacity-20 pointer-events-none"
              />
              <div 
                className="absolute bottom-[20%] right-[15%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent rounded-full blur-[120px] md:blur-[160px] opacity-[0.05] pointer-events-none"
              />
              <div 
                className="absolute top-[40%] left-[50%] w-[250px] h-[250px] bg-accent-strong rounded-full blur-[100px] opacity-5 pointer-events-none"
              />
            </motion.div>

            <div 
              className="fixed pointer-events-none z-10 w-[300px] h-[300px] rounded-full blur-[80px] bg-accent/10 opacity-50"
              style={{ transform: `translate(${cursorPos.x - 150}px, ${cursorPos.y - 150}px)` }}
            />
            <div className="fixed top-0 left-0 right-0 h-1.5 z-[60]">
              <motion.div className="h-full bg-accent shadow-[0_0_20px_rgba(203,255,156,0.5)] origin-left" style={{ scaleX }} />
            </div>

            <motion.div 
              style={{ y: orbY1 }}
              className="fixed top-20 left-[10%] w-[30rem] h-[30rem] rounded-full blur-[150px] bg-accent/10 animate-float-orb pointer-events-none z-0" 
            />
            <motion.div 
              style={{ y: orbY2 }}
              className="fixed bottom-40 right-[10%] w-[35rem] h-[35rem] rounded-full blur-[150px] bg-accent/10 animate-float-orb-reverse pointer-events-none z-0" 
            />

            <AnimatePresence mode="wait">
              {activePage === 'rpp' && (
                <RppPage
                  onBack={() => {
                    setActivePage('home');
                    setTimeout(() => {
                      const element = document.getElementById('artefak');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                />
              )}
              {activePage === 'media' && (
                <MediaPage
                  onBack={() => {
                    setActivePage('home');
                    setTimeout(() => {
                      document.getElementById('artefak')?.scrollIntoView({ behavior: 'smooth' });
                    }, 80);
                  }}
                />
              )}
            </AnimatePresence>

            {/* Header */}
            <motion.header 
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2"
            >
        <div className="max-w-6xl mx-auto">
          <div className="relative flex items-center justify-between gap-4 md:gap-6 px-4 py-1.5 border border-white/10 rounded-full bg-brand-blue/40 backdrop-blur-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <a href="#beranda" className="flex items-center gap-4 md:gap-6">
              <div className="relative w-8 h-8 md:w-10 md:h-10 group shrink-0">
                <img 
                  src={publicAsset('logo.png')} 
                  alt="Satriya Logo" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] md:text-[13px] font-bold leading-tight whitespace-nowrap">Universitas Sarjanawiyata</span>
                <span className="text-[11px] md:text-[13px] font-bold leading-tight whitespace-nowrap">Tamansiswa</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-2">
              {['Beranda', 'Profil', 'Perjalanan', 'Artefak', 'Kontak'].map((item) => (
                <div key={item}>
                  <NavLink 
                    href={`#${item.toLowerCase()}`}
                    isActive={activeSection === item.toLowerCase()}
                    onClick={() => setActiveSection(item.toLowerCase())}
                  >
                    {item}
                  </NavLink>
                </div>
              ))}
            </nav>

            <button 
              className="md:hidden p-2 text-white glass-card border-accent/20 bg-accent/10 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu size={24} className="text-accent" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-2 p-4 grid gap-2 rounded-3xl border border-white/12 bg-brand-night/95 backdrop-blur-xl shadow-2xl md:hidden"
            >
              {['Beranda', 'Profil', 'Perjalanan', 'Artefak', 'Kontak'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      <motion.main 
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="max-w-6xl mx-auto px-4 md:px-6 space-y-16 lg:space-y-24 pb-24"
      >
        {/* Hero Section */}
        <section id="beranda" className="relative flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-center lg:justify-center min-h-[85vh] lg:min-h-screen pt-16 lg:pt-12">
            <Reveal direction="up" cascade className="z-10 relative text-center lg:text-left flex flex-col items-center lg:items-start" parallax={-3}>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2 md:mb-4">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
                <SectionKicker>PPG PRAJABATAN 2026</SectionKicker>
              </div>
              
              <div className="overflow-visible mb-2 md:mb-4">
                <TextReveal 
                  text="Satriya" 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter justify-center lg:justify-start" 
                />
                <TextReveal 
                  text="Nugraha" 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-accent italic opacity-90 -mt-1 md:-mt-2 justify-center lg:justify-start" 
                  delay={0.2}
                />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-accent/10 border border-accent/20 px-3 py-1 rounded-lg inline-flex items-center mb-4 md:mb-6"
              >
                <p className="text-accent font-bold text-[10px] md:text-xs font-mono tracking-wider flex items-center gap-2">
                  <Fingerprint size={12} /> NIM 3542325
                </p>
              </motion.div>
              
              <p className="text-muted text-sm md:text-base max-w-sm md:max-w-md mb-6 md:mb-8 leading-relaxed font-light mx-auto lg:mx-0">
                Menyeimbangkan seni mengajar dengan inovasi digital. Portfolio ini adalah bukti nyata perjalanan transformasi profesional saya.
              </p>
            
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-accent/50 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-accent/20 hover:border hover:border-accent/30 transition-all text-white group-hover:text-[#E4405F] shadow-xl z-10 cursor-pointer">
                    <Instagram size={22} className="md:w-6 md:h-6" />
                  </div>
                  
                  {/* Popup Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-brand-dark/95 backdrop-blur-md border border-accent/30 rounded-xl p-3 shadow-2xl min-w-[180px]">
                      <div className="text-xs text-muted mb-2 px-2">Pilih Akun IG</div>
                      <a 
                        href="https://www.instagram.com/_satriyanugraha/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors text-sm text-white hover:text-accent"
                      >
                        <Instagram size={14} />
                        <span>_satriyanugraha</span>
                      </a>
                      <a 
                        href="https://www.instagram.com/shutterriya/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors text-sm text-white hover:text-accent mt-1"
                      >
                        <Instagram size={14} />
                        <span>shutterriya</span>
                      </a>
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-brand-dark/95 border-l border-t border-accent/30 rotate-45"></div>
                  </div>
                </div>

                <MagneticLink href="https://www.linkedin.com/in/satriya-nugraha/" className="group relative">
                  <div className="absolute -inset-1 bg-accent/50 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-accent/20 hover:border hover:border-accent/30 transition-all text-white group-hover:text-[#0A66C2] shadow-xl z-10">
                    <Linkedin size={22} className="md:w-6 md:h-6" />
                  </div>
                </MagneticLink>
                
                <MagneticLink href="https://www.youtube.com/@satriyanugraha8440" className="group relative">
                  <div className="absolute -inset-1 bg-accent/50 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-accent/20 hover:border hover:border-accent/30 transition-all text-white group-hover:text-[#FF0000] shadow-xl z-10">
                    <Youtube size={22} className="md:w-6 md:h-6" />
                  </div>
                 </MagneticLink>
                
                <MagneticLink href="#kontak" className="group relative">
                  <div className="absolute -inset-1 bg-accent/50 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-accent/20 hover:border hover:border-accent/30 transition-all text-white group-hover:text-[#EA4335] shadow-xl z-10">
                    <Mail size={22} className="md:w-6 md:h-6" />
                  </div>
                </MagneticLink>
              </div>
            </Reveal>

            <div className="relative hidden lg:flex items-center justify-center">
              <Reveal direction="none" className="relative group" parallax={10}>
                <motion.div 
                  animate={{ 
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-20 bg-accent/5 blur-[120px] rounded-full opacity-60" 
                />
                
                <div className="relative z-10 flex justify-center items-center">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[90px] xl:text-[130px] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-b from-accent to-brand-night opacity-30 whitespace-nowrap z-0 uppercase tracking-tighter flex flex-col items-center pointer-events-none select-none">
                    <span>TEKNIK MESIN</span>
                    <span>TEKNIK MESIN</span>
                    <span>TEKNIK MESIN</span>
                    <span>TEKNIK MESIN</span>
                  </div>
                  <motion.div 
                    style={{ rotate: profileRotate }}
                    className="relative z-10 w-[360px] xl:w-[480px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                  >
                    <img 
                      src={publicAsset('profile.svg')} 
                      alt="Portrait Satriya" 
                      className="w-full h-auto object-contain transition-all duration-1000 hover:scale-105"
                      style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)', maskImage: 'linear-gradient(to top, transparent 0%, black 20%)' }}
                    />
                  </motion.div>
                </div>
              </Reveal>
            </div>

            {/* Mobile Hero Visual */}
            <div className="lg:hidden mt-12 relative flex justify-center items-center px-4">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[56px] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-b from-accent to-brand-night opacity-30 whitespace-nowrap z-0 uppercase tracking-tighter flex flex-col items-center pointer-events-none select-none">
                 <span>TEKNIK MESIN</span>
                 <span>TEKNIK MESIN</span>
                 <span>TEKNIK MESIN</span>
                 <span>TEKNIK MESIN</span>
               </div>
               <Reveal direction="none" className="relative flex justify-center z-10 w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                 <div className="relative w-full max-w-[360px]">
                   <img 
                     src={publicAsset('profile.svg')} 
                     alt="Portrait Satriya" 
                     className="w-full h-auto object-contain"
                     style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)', maskImage: 'linear-gradient(to top, transparent 0%, black 20%)' }}
                   />
                 </div>
               </Reveal>
            </div>
        </section>


        {/* Profile Section */}
        <section id="profil" className="relative scroll-mt-16 pt-12 min-h-screen flex flex-col justify-center pb-24">
          <Reveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-[72px] font-bold tracking-tight text-white mb-6">Profile</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
            {profileDetails.map((item, i) => (
              <Reveal key={i} direction={i === 0 ? "right" : i === 1 ? "up" : "left"} delay={0.1 * (i + 1)} className="h-full">
                <div 
                  onClick={() => setActiveProfilePopup(i)}
                  className="glass-card p-6 md:p-8 flex flex-col items-center text-center hover:border-accent/30 transition-all h-full group bg-white/[0.02] cursor-pointer"
                >
                  {item.icon && (
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${item.iconBgClass}`}>
                      {item.icon}
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-muted text-xs md:text-sm leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Journey Section */}
        <section id="perjalanan" className="relative scroll-mt-16 pt-12 min-h-screen flex flex-col justify-center pb-24">
          <div className="max-w-4xl mx-auto">
            <Reveal direction="up" className="text-center mb-24" parallax={-30}>
              <SectionKicker>Artefak</SectionKicker>
              <h2 className="text-gradient">Dokumentasi</h2>
              <p className="text-muted max-w-xl mx-auto mt-6">Kumpulan dokumentasi pembelajaran, pengalaman, dan bukti kegiatan yang menggambarkan perjalanan profesional saya.</p>
            </Reveal>

            <div ref={journeyRef} className="relative space-y-24">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block">
                <motion.div 
                  style={{ scaleY: journeyProgress, originY: 0 }}
                  className="absolute inset-0 bg-accent shadow-[0_0_15px_rgba(203,255,156,0.3)]" 
                />
              </div>
              
              {[
                ...documentationPhotos,
                { step: '04', side: 'right', title: 'Siklus Reflektif', desc: 'Mengevaluasi hasil dan merancang langkah perbaikan yang berkelanjutan.', icon: <Target className="w-5 h-5" />, isPhoto: false }
              ].map((item, i) => (
                <div key={i}>
                  <Reveal direction={item.side === 'left' ? 'right' : 'left'} delay={i * 0.1} parallax={item.side === 'left' ? -20 : 20}>
                    <div className={`flex flex-col md:flex-row items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2">
                      {item.isPhoto ? (
                        <div className="glass-card border-accent/20 bg-accent/5 hover:border-accent/50 transition-all shadow-lg shadow-accent/5 relative overflow-hidden rounded-2xl">
                          <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 hover:opacity-100 transition-opacity duration-700 blur-[2px] z-10" />
                          
                          {/* Container dengan Hover State */}
                          <div>
                            {/* Foto Area dengan Hover Trigger */}
                            <div className="relative overflow-hidden rounded-t-2xl">
                              <img 
                                src={item.photo} 
                                alt={item.title}
                                className="w-full h-[280px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-night/80 via-brand-night/20 to-transparent" />
                            </div>
                          </div>
                          
                          <div className="relative z-20 p-6 flex items-center justify-center">
                            <motion.button
                              type="button"
                              whileHover={{ x: 5 }}
                              onClick={() => {
                                if (openDocGallery === i) {
                                  setOpenDocGallery(null);
                                  return;
                                }
                                setOpenDocGallery(i);
                                setActiveDocGallery(0);
                              }}
                              className="inline-flex items-center gap-2 text-accent font-bold text-sm tracking-wide group/link cursor-pointer"
                            >
                              <span>{openDocGallery === i ? 'Perkecil' : 'Lihat lebih jauh'}</span>
                              <ArrowRight size={16} className={`transition-transform ${openDocGallery === i ? 'rotate-90' : 'group-hover/link:translate-x-1'}`} />
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <TiltCard className={`p-10 border-accent/20 bg-accent/5 hover:border-accent/50 transition-all ${item.side === 'right' ? 'md:text-right' : ''} shadow-lg shadow-accent/5 relative group/journey`}>
                          <div className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover/journey:opacity-100 transition-opacity duration-700 blur-[2px]" />
                          <span className="text-accent font-mono text-sm mb-4 block font-bold tracking-widest">{item.icon} PHASE {item.step}</span>
                          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                          <p className="text-muted leading-relaxed">{item.desc}</p>
                        </TiltCard>
                      )}
                    </div>
                    
                    <div className="relative flex items-center justify-center z-10">
                      <motion.div 
                        whileInView={{ scale: [1, 1.2, 1] }}
                        className="w-14 h-14 rounded-full bg-brand-deep border-4 border-accent flex items-center justify-center shadow-[0_0_30px_rgba(203,255,156,0.3)]"
                      >
                        <span className="text-xs font-bold text-accent">{item.step}</span>
                      </motion.div>
                    </div>
                    
                    <div className="md:w-1/2 hidden md:flex items-center justify-center min-h-[430px] overflow-visible">
                      <AnimatePresence mode="wait">
                        {item.isPhoto && openDocGallery === i && (() => {
                          const galleryPhotos = 'galleryPhotos' in item ? item.galleryPhotos : [item.photo];

                          return (
                          <motion.div
                            key={`doc-gallery-${activeDocGallery}`}
                            initial={{ opacity: 0, x: item.side === 'left' ? 36 : -36, scale: 0.94 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: item.side === 'left' ? 24 : -24, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            onPointerDown={(event) => {
                              docGalleryDragStart.current = event.clientX;
                            }}
                            onPointerUp={(event) => {
                              if (docGalleryDragStart.current === null) return;
                              handleDocGallerySwipe(event.clientX - docGalleryDragStart.current);
                              docGalleryDragStart.current = null;
                            }}
                            onPointerCancel={() => {
                              docGalleryDragStart.current = null;
                            }}
                            className={`relative ${item.side === 'left' ? 'translate-x-10 lg:translate-x-16' : '-translate-x-10 lg:-translate-x-16'} w-[min(52vw,640px)] max-w-none cursor-grab select-none active:cursor-grabbing`}
                          >
                            <div className="absolute -inset-10 rounded-full bg-accent/10 blur-3xl" />
                            {galleryPhotos.map((photo, photoIndex) => {
                              const offset = photoIndex - activeDocGallery;
                              const isActive = offset === 0;
                              return (
                                <motion.div
                                  key={photo}
                                  animate={{
                                    x: offset * 20,
                                    y: Math.abs(offset) * 12,
                                    rotate: offset * 4,
                                    scale: isActive ? 1 : 0.92,
                                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.38,
                                    zIndex: isActive ? 3 : 2 - Math.abs(offset)
                                  }}
                                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                  className={`absolute inset-0 ${isActive ? '' : 'pointer-events-none'}`}
                                >
                                  <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-brand-night shadow-[0_26px_70px_rgba(0,0,0,0.45)] ring-1 ring-accent/10">
                                    <img
                                      src={photo}
                                      alt={`${item.title} ${photoIndex + 1}`}
                                      draggable={false}
                                      className="h-full w-full select-none object-cover"
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                            <div className="relative aspect-[4/3]" />
                            <div className="relative z-10 mt-4 flex items-center justify-center gap-4">
                              <div className="flex gap-2">
                                {galleryPhotos.map((photo, photoIndex) => (
                                  <button
                                    key={photo}
                                    type="button"
                                    onClick={() => setActiveDocGallery(photoIndex)}
                                    className={`h-2 rounded-full transition-all ${photoIndex === activeDocGallery ? 'w-5 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Showcase Section */}
        <section id="artefak" className="space-y-12 scroll-mt-16 pt-12 min-h-screen flex flex-col justify-center pb-24">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8" parallax={20}>
            <div className="max-w-2xl">
              <SectionKicker>Featured Projects</SectionKicker>
              <h2 className="text-gradient">Highlights Artefak</h2>
            </div>
            <p className="text-muted text-sm max-w-xs">Eksplorasi RPP, media ajar, dan asesmen pilihan.</p>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <Reveal direction="left" className="lg:col-span-4 flex flex-col gap-3" parallax={-20}>
              {showcaseData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveShowcase(i)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    activeShowcase === i 
                      ? 'bg-white/5 border-white/20 shadow-xl' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <span className={`text-[10px] font-mono tracking-widest uppercase mb-1 block ${activeShowcase === i ? 'text-accent' : 'text-white/30'}`}>
                    {item.meta}
                  </span>
                  <span className={`text-lg font-bold ${activeShowcase === i ? 'text-white' : 'text-white/50'}`}>
                    {item.title}
                  </span>
                  {activeShowcase === i && (
                    <motion.div 
                      layoutId="active-showcase-bar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                    />
                  )}
                </button>
              ))}
            </Reveal>

            <Reveal direction="right" className="lg:col-span-8" parallax={20}>
              <AnimatePresence mode="wait">
                <ShowcaseCard 
                  key={activeShowcase}
                  item={showcaseData[activeShowcase]}
                  isActive={true}
                  onClickDetail={() => {
                    const link = showcaseData[activeShowcase].directLink;
                    if (link === 'rpp' || link === 'media') {
                      setActivePage(link);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      return;
                    }
                    setActiveShowcasePopup(activeShowcase);
                  }}
                />
              </AnimatePresence>
            </Reveal>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative px-8">
          <div className="absolute right-0 top-0 w-80 h-80 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
          <Reveal direction="up" cascade className="max-w-3xl mb-20" parallax={-40}>
            <SectionKicker>Principle Guide</SectionKicker>
            <ParallaxText baseHeight={30}>
              <h2 className="text-gradient">Fundamental <br /> Values</h2>
            </ParallaxText>
            <p className="text-muted text-lg mt-6 leading-relaxed">Nilai-nilai ini adalah kompas dalam setiap keputusan desain dan pengajaran yang saya ambil.</p>
          </Reveal>
          
          <Reveal direction="up" cascade delay={0.2} className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Impact First', desc: 'Setiap elemen visual harus memiliki fungsi pedagogis yang jelas, bukan sekadar dekorasi.', meta: 'Pilar 01' },
              { title: 'Fluid Logic', desc: 'Navigasi dan penyampaian pesan harus mengalir secara alami mengikuti intuisi manusia.', meta: 'Pilar 02' },
              { title: 'Radical Honesty', desc: 'Portfolio ini menampilkan proses apa adanya, termasuk tantangan dan ruang perbaikan.', meta: 'Pilar 03' }
            ].map((item, i) => (
              <div key={i}>
                <TiltCard className="flex flex-col gap-6 h-full border-white/5 bg-white/2 hover:border-accent/50 transition-all p-12 group/value shadow-lg shadow-accent/5">
                  <span className="font-mono text-[10px] text-accent tracking-[0.2em]">{item.meta}</span>
                  <h3 className="text-2xl font-bold group-hover/value:text-accent transition-colors">{item.title}</h3>
                  <p className="text-muted leading-relaxed font-light">{item.desc}</p>
                </TiltCard>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="relative scroll-mt-16 pt-12 min-h-[85vh] flex flex-col justify-center pb-24">
          <div className="glass-card p-12 md:p-24 border-white/10 bg-brand-deep/30 relative overflow-hidden group">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute -top-40 -right-40 w-[60rem] h-[60rem] bg-accent/20 blur-[180px] rounded-full pointer-events-none" 
            />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <Reveal direction="left">
                <div>
                  <SectionKicker>Final Word</SectionKicker>
                  <h2 className="text-gradient leading-tight mb-10 italic">Mari Berkolaborasi Mendobrak <span className="text-accent">Batas Pendidikan.</span></h2>
                  <p className="text-muted/80 text-xl leading-relaxed max-w-lg font-light">
                    Jika Anda melihat potensi dalam pendekatan ini, saya sangat terbuka untuk diskusi, masukan, atau peluang kolaborasi lainnya.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2} cascade className="flex flex-col gap-6">
                {[
                  { label: "Email Portfolio", value: "satriyanugraha@student.uns.ac.id", icon: <Mail size={24} />, href: "mailto:satriyanugraha@student.uns.ac.id" },
                  { label: "Social", value: "LinkedIn", icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/satriya-nugraha/" },
                  { label: "Social", value: "YouTube", icon: <Youtube size={24} />, href: "https://www.youtube.com/@satriyanugraha8440" },
                  { label: "Social Presence", value: "@_satriyanugraha", icon: <Instagram size={24} />, href: "https://www.instagram.com/_satriyanugraha/" }
                ].map((link, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ scale: 1.02, x: 10 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-8 glass-card border-white/5 bg-white/3 hover:bg-white/8 transition-all group/link"
                  >
                    <div className="p-5 rounded-full bg-accent text-brand-night shadow-[0_10px_30px_rgba(203,255,156,0.3)]">
                      {link.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] block mb-1">{link.label}</span>
                      <span className="text-base md:text-lg lg:text-xl font-bold group-hover/link:text-accent transition-colors break-all md:break-normal">{link.value}</span>
                    </div>
                  </motion.a>
                ))}
                
                <motion.button 
                  whileHover={{ y: -5 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-center gap-4 p-8 text-white/30 hover:text-white transition-colors group/top mt-4 border-t border-white/5"
                >
                  <ArrowUp size={20} className="group-hover/top:-translate-y-2 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-[0.3em]">Return to Top</span>
                </motion.button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Profile Detail Modal */}
        <AnimatePresence>
          {activeProfilePopup !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProfilePopup(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-night/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl glass-card border border-white/10 bg-brand-deep p-6 md:p-8 lg:p-10 overflow-hidden mx-4"
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-night blur-[100px] rounded-full pointer-events-none" />

                <button 
                  onClick={() => setActiveProfilePopup(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white z-50 group pointer-events-auto"
                >
                  <X size={24} className="md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
                </button>

                <div className="relative z-10 w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProfilePopup}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col"
                    >
                      {/* Title */}
                      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${profileDetails[activeProfilePopup].textColorClass}`}>
                        {profileDetails[activeProfilePopup].title}
                      </h3>

                      {/* Layout Logic */}
                      {profileDetails[activeProfilePopup].image && activeProfilePopup === 0 ? (
                        // Specialized "Latar Belakang" Layout based on screenshot
                        <div className="flex flex-col gap-4 md:gap-6">
                          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-12 items-start">
                            {/* Paragraphs */}
                            <div className="text-white/90 text-sm md:text-base leading-relaxed font-light space-y-3">
                              {profileDetails[activeProfilePopup].fullDesc.split('\n\n').map((para, idx) => (
                                <p key={idx}>{para}</p>
                              ))}
                            </div>
                            
                            {/* Image Right Area */}
                            <Reveal direction="left" className="flex justify-center">
                              <div className="relative group w-full max-w-[220px] lg:max-w-full">
                                <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-50" />
                                <img 
                                  src={profileDetails[activeProfilePopup].image} 
                                  alt="Profile" 
                                  className="relative w-full aspect-[4/5] object-cover rounded-xl border border-white/20 shadow-2xl"
                                />
                                <p className="mt-2 text-center text-white/30 text-[10px] tracking-widest uppercase italic">
                                  Satriya Nugraha, S.Pd
                                </p>
                              </div>
                            </Reveal>
                          </div>
                        </div>
                      ) : (
                        // Default layout for other popups
                        <div className={`grid grid-cols-1 ${profileDetails[activeProfilePopup].image ? 'lg:grid-cols-[1.2fr_0.8fr]' : ''} gap-12 lg:gap-20 items-start`}>
                          <div className={activeProfilePopup === 1 ? 'w-full' : ''}>
                            {profileDetails[activeProfilePopup].largeIcon && (
                              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border mb-8 flex items-center justify-center ${profileDetails[activeProfilePopup].iconBgClass}`}>
                                {profileDetails[activeProfilePopup].largeIcon}
                              </div>
                            )}
                            
                            <div className="text-white/90 text-sm md:text-base leading-relaxed font-light space-y-4">
                              {profileDetails[activeProfilePopup].fullDesc.split('\n\n').map((para, idx) => (
                                <p key={idx}>{para}</p>
                              ))}
                              
                              {/* Render list items if they exist - specific style for Hobi */}
                              {profileDetails[activeProfilePopup].listItems && activeProfilePopup === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
                                  {profileDetails[activeProfilePopup].listItems.map((item, idx) => (
                                    <div key={idx} onClick={() => setActiveHobbyPopup(idx)} className="glass-card p-6 flex flex-col items-center justify-center text-center border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors rounded-2xl group relative overflow-hidden cursor-pointer">
                                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-110 transition-transform border border-accent/20 p-1">
                                        <div 
                                          className="w-full h-full rounded-full bg-cover bg-center" 
                                          style={{ backgroundImage: `url(${hobbyDetails[idx].image})` }} 
                                        />
                                      </div>
                                      <span className="font-bold text-lg text-white group-hover:text-accent transition-colors relative z-10">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Render normal list items for other sections if needed */}
                              {profileDetails[activeProfilePopup].listItems && activeProfilePopup !== 1 && (
                                <ul className="mt-4 space-y-2">
                                  {profileDetails[activeProfilePopup].listItems.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                      <span className="font-medium text-white">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          {profileDetails[activeProfilePopup].image && (
                            <Reveal direction="left" className="flex justify-center flex-col items-center">
                              <div className="relative group">
                                <div className={`absolute -inset-6 opacity-30 blur-3xl rounded-full transition-opacity duration-500 group-hover:opacity-50 bg-white`} />
                                <img 
                                  src={profileDetails[activeProfilePopup].image} 
                                  alt="Profile Picture" 
                                  className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-3xl border-4 border-white/10 shadow-3xl"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </Reveal>
                          )}
                        </div>
                      )}
                      
                      {/* Navigation Buttons for Profile Modal */}
                      <div className="flex items-center justify-start gap-4 mt-8 pt-4 border-t border-white/10 w-full">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProfilePopup((prev) => prev !== null ? (prev === 0 ? profileDetails.length - 1 : prev - 1) : null);
                          }}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        
                        <div className="flex gap-2">
                          {profileDetails.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-none ${idx === activeProfilePopup ? 'bg-accent w-4' : 'bg-white/20'}`} 
                            />
                          ))}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProfilePopup((prev) => prev !== null ? (prev === profileDetails.length - 1 ? 0 : prev + 1) : null);
                          }}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hobby Detail Modal */}
        <AnimatePresence>
          {activeHobbyPopup !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveHobbyPopup(null)}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-night/40 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl glass-card border border-white/10 bg-brand-deep p-6 md:p-8 lg:p-10 overflow-hidden mx-4 rounded-3xl"
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-night blur-[100px] rounded-full pointer-events-none" />

                <button 
                  onClick={() => setActiveHobbyPopup(null)}
                  className="absolute top-4 right-4 md:top-5 md:right-5 p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white z-50 group pointer-events-auto"
                >
                  <X size={18} className="md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeHobbyPopup}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center mt-2"
                  >
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
                        {hobbyDetails[activeHobbyPopup].title}
                      </h3>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-8">
                        {hobbyDetails[activeHobbyPopup].desc}
                      </p>
                      
                      {/* Navigation Buttons */}
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHobbyPopup((prev) => prev !== null ? (prev === 0 ? hobbyDetails.length - 1 : prev - 1) : null);
                          }}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        
                        <div className="flex gap-2">
                          {hobbyDetails.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-none ${idx === activeHobbyPopup ? 'bg-accent w-4' : 'bg-white/20'}`} 
                            />
                          ))}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHobbyPopup((prev) => prev !== null ? (prev === hobbyDetails.length - 1 ? 0 : prev + 1) : null);
                          }}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <img 
                        src={hobbyDetails[activeHobbyPopup].image} 
                        alt={hobbyDetails[activeHobbyPopup].title} 
                        className={`w-full aspect-[4/3] lg:aspect-square object-cover rounded-2xl border border-white/10 shadow-2xl ${hobbyDetails[activeHobbyPopup].imagePosition || ''}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Showcase Detail Modal */}
        <AnimatePresence>
          {activeShowcasePopup !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveShowcasePopup(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-night/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0f1115] border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              >
                <button 
                  onClick={() => setActiveShowcasePopup(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white z-50 pointer-events-auto group"
                >
                  <X size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                {showcaseData[activeShowcasePopup].popupDetails ? (
                  <div className="space-y-8 mt-2">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        {showcaseData[activeShowcasePopup].icon}
                      </div>
                      <div>
                        <div className="text-accent text-sm font-bold uppercase tracking-wider mb-1">
                          {showcaseData[activeShowcasePopup].meta}
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-white">
                          {showcaseData[activeShowcasePopup].title}
                        </h2>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                      {showcaseData[activeShowcasePopup].popupDetails.items.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h3 className="text-xl font-bold text-accent mb-3">{item.title}</h3>
                          <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    
                    {showcaseData[activeShowcasePopup].popupDetails.link && (
                      <div className="flex justify-center pt-8 border-t border-white/5 mt-8">
                        <motion.a 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={showcaseData[activeShowcasePopup].popupDetails.link}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-accent text-brand-night px-8 py-4 rounded-full font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(203,255,156,0.3)]"
                        >
                          Buka Halaman Baru <ExternalLink size={20} />
                        </motion.a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                     <p className="text-white/50 text-lg">Detail belum tersedia untuk proyek ini.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.main>

      {/* Mobile-only Bottom Navigation Bar */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="md:hidden fixed bottom-6 left-6 right-6 z-[100] flex justify-center"
      >
        <motion.nav 
          className="flex items-center gap-1 p-2 bg-brand-night/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
        >
          {[
            { id: 'beranda', icon: <Layout size={20} /> },
            { id: 'profil', icon: <GraduationCap size={20} /> },
            { id: 'perjalanan', icon: <Briefcase size={20} /> },
            { id: 'artefak', icon: <Target size={20} /> },
            { id: 'kontak', icon: <Mail size={20} /> }
          ].map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-xl transition-all ${
                activeSection === item.id 
                  ? 'bg-accent text-brand-night font-bold shadow-lg shadow-accent/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.nav>
      </motion.div>

      <motion.footer 
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="max-w-6xl mx-auto px-6 py-12 text-center text-white/40 border-t border-white/5 mb-24 md:mb-0 relative z-10 w-full"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Satriya Nugraha - E-Portfolio Interaktif 2026</p>
      </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
