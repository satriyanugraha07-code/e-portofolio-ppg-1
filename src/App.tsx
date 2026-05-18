/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useDeferredValue } from 'react';
import { 
  motion, AnimatePresence, useScroll, useSpring, useTransform, useInView
} from 'motion/react';
import { 
  Menu, X, Mail, Instagram, ChevronRight, ChevronLeft, ArrowRight,
  BookOpen, Layout, Zap, Award, ArrowUp,
  GraduationCap, Briefcase, Target, MousePointer2,
  Sparkles, Layers, Fingerprint, ExternalLink,
  Code2, Palette, Globe, Linkedin, Youtube, FileText,
  Cog, Wrench, Gauge
} from 'lucide-react';
import {
  artifactCategories,
  artifactItems,
  artifactSiklusTabs,
  type ArtifactAction,
  type ArtifactCategory,
  type ArtifactItem,
  type ArtifactSiklus
} from './data/artefak';

// --- Data ---

type MechanicalParticleKind = 'gear' | 'wrench' | 'gauge' | 'bolt' | 'bearing' | 'nut';

const mechanicalParticles: Array<{
  kind: MechanicalParticleKind;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  driftX: string;
  driftY: string;
  opacity: number;
  spin: string;
  color: string;
}> = [
  { kind: 'gear', size: 88, top: '12%', left: '7%', duration: 26, delay: -6, driftX: '46px', driftY: '34px', opacity: 0.18, spin: '360deg', color: 'rgba(203,255,156,0.76)' },
  { kind: 'bearing', size: 56, top: '21%', left: '81%', duration: 22, delay: -10, driftX: '-38px', driftY: '28px', opacity: 0.16, spin: '-360deg', color: 'rgba(142,255,231,0.7)' },
  { kind: 'wrench', size: 64, top: '38%', left: '12%', duration: 30, delay: -14, driftX: '34px', driftY: '-48px', opacity: 0.12, spin: '-180deg', color: 'rgba(247,248,255,0.62)' },
  { kind: 'nut', size: 46, top: '54%', left: '88%', duration: 24, delay: -3, driftX: '-54px', driftY: '-26px', opacity: 0.14, spin: '360deg', color: 'rgba(203,255,156,0.62)' },
  { kind: 'bolt', size: 34, top: '72%', left: '16%', duration: 20, delay: -8, driftX: '50px', driftY: '22px', opacity: 0.16, spin: '180deg', color: 'rgba(255,211,120,0.58)' },
  { kind: 'gauge', size: 74, top: '77%', left: '72%', duration: 28, delay: -16, driftX: '-32px', driftY: '-44px', opacity: 0.12, spin: '220deg', color: 'rgba(142,255,231,0.56)' },
  { kind: 'gear', size: 42, top: '33%', left: '58%', duration: 18, delay: -5, driftX: '26px', driftY: '36px', opacity: 0.13, spin: '-360deg', color: 'rgba(203,255,156,0.6)' },
  { kind: 'bolt', size: 28, top: '14%', left: '48%', duration: 16, delay: -1, driftX: '-24px', driftY: '42px', opacity: 0.14, spin: '-180deg', color: 'rgba(247,248,255,0.46)' },
  { kind: 'nut', size: 62, top: '86%', left: '43%', duration: 32, delay: -19, driftX: '42px', driftY: '-34px', opacity: 0.1, spin: '360deg', color: 'rgba(142,255,231,0.54)' },
  { kind: 'bearing', size: 38, top: '48%', left: '33%', duration: 19, delay: -12, driftX: '-28px', driftY: '30px', opacity: 0.13, spin: '360deg', color: 'rgba(203,255,156,0.52)' }
];

const showcaseData: any[] = [
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
    title: "Paket Refleksi Pembelajaran",
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

const MechanicalGlyph = ({ kind }: { kind: MechanicalParticleKind }) => {
  const iconClass = "mechanical-particle__icon";

  switch (kind) {
    case 'gear':
      return <Cog className={iconClass} strokeWidth={1.25} />;
    case 'wrench':
      return <Wrench className={iconClass} strokeWidth={1.35} />;
    case 'gauge':
      return <Gauge className={iconClass} strokeWidth={1.25} />;
    case 'bolt':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" role="presentation">
          <path d="M13.8 1.8 4.9 13.1h5.8l-1.2 9.1 8.9-11.5h-5.7l1.1-8.9Z" fill="currentColor" />
        </svg>
      );
    case 'bearing':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" role="presentation">
          <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="32" cy="32" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx={32 + Math.cos((angle * Math.PI) / 180) * 16}
              cy={32 + Math.sin((angle * Math.PI) / 180) * 16}
              r="3"
              fill="currentColor"
            />
          ))}
        </svg>
      );
    case 'nut':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" role="presentation">
          <path d="M32 5 55 18.5v27L32 59 9 45.5v-27L32 5Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      );
    default:
      return null;
  }
};

const MechanicalParticleField = () => (
  <div className="mechanical-bg" aria-hidden="true">
    <div className="mechanical-blueprint mechanical-blueprint--left" />
    <div className="mechanical-blueprint mechanical-blueprint--right" />
    <div className="mechanical-scanline" />
    {mechanicalParticles.map((particle, index) => (
      <div
        key={`${particle.kind}-${index}`}
        className={`mechanical-particle mechanical-particle--${particle.kind}`}
        style={{
          '--particle-size': `${particle.size}px`,
          '--particle-top': particle.top,
          '--particle-left': particle.left,
          '--particle-duration': `${particle.duration}s`,
          '--particle-delay': `${particle.delay}s`,
          '--particle-drift-x': particle.driftX,
          '--particle-drift-y': particle.driftY,
          '--particle-opacity': particle.opacity,
          '--particle-spin': particle.spin,
          '--particle-color': particle.color
        } as React.CSSProperties}
      >
        <MechanicalGlyph kind={particle.kind} />
      </div>
    ))}
  </div>
);

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
  <motion.a 
    href={href} 
    onClick={onClick}
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.96 }}
    className={`relative inline-flex items-center rounded-full px-2.5 py-2 text-[11px] font-black transition-colors duration-300 lg:px-3.5 lg:text-xs ${
      isActive ? 'text-brand-night' : 'text-white/62 hover:text-white'
    }`}
  >
    {isActive && (
      <motion.span
        layoutId="desktop-nav-active"
        className="absolute inset-0 rounded-full bg-accent shadow-[0_8px_28px_rgba(203,255,156,0.2)]"
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      />
    )}
    <span className="relative z-10 whitespace-nowrap">{children}</span>
  </motion.a>
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
  const [isReady, setIsReady] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [loaderProgress, setLoaderProgress] = useState(4);
  const [loaderStatus, setLoaderStatus] = useState('Menyiapkan web');
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const pointerStartY = useRef<number | null>(null);
  const swipeOffsetRef = useRef(0);
  const hasEntered = useRef(false);

  const enterSite = () => {
    if (!isReady || hasEntered.current) return;
    hasEntered.current = true;
    swipeOffsetRef.current = -96;
    setSwipeOffset(-96);
    setTimeout(onComplete, 180);
  };

  useEffect(() => {
    let isMounted = true;
    const assets = createLoaderAssetEntries();

    setTotalAssets(assets.length);
    setLoadedAssets(0);
    setLoaderProgress(4);
    setLoaderStatus('Menyiapkan web');

    const markAssetReady = (label: string) => {
      if (!isMounted) return;

      setLoadedAssets((current) => {
        const next = Math.min(current + 1, assets.length);
        const nextProgress = assets.length > 0
          ? 10 + Math.round((next / assets.length) * 82)
          : 92;

        setLoaderProgress(Math.min(nextProgress, 92));
        setLoaderStatus(label);
        return next;
      });
    };

    const preparePage = async () => {
      setLoaderStatus('Menyiapkan font dan layout');

      if ('fonts' in document) {
        await document.fonts.ready.catch(() => undefined);
      }

      setLoaderProgress(10);
      setLoaderStatus('Memuat gambar utama');

      await Promise.all(
        assets.map((asset) => (
          preloadLoaderImage(asset.src).then(() => markAssetReady(asset.label))
        ))
      );

      if (!isMounted) return;

      setLoaderStatus('Merapikan transisi masuk');
      setLoaderProgress(96);

      window.setTimeout(() => {
        if (!isMounted) return;
        setLoaderProgress(100);
        setLoaderStatus('Semua tampilan siap');
        setIsReady(true);
      }, 280);
    };

    preparePage();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 12) enterSite();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isReady]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isReady) return;
    pointerStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isReady || pointerStartY.current === null) return;
    const dragDistance = pointerStartY.current - event.clientY;
    const nextOffset = -Math.min(Math.max(dragDistance, 0), 96);
    swipeOffsetRef.current = nextOffset;
    setSwipeOffset(nextOffset);
  };

  const handlePointerEnd = () => {
    if (!isReady || pointerStartY.current === null) return;
    if (Math.abs(swipeOffsetRef.current) > 58) {
      enterSite();
    } else {
      swipeOffsetRef.current = 0;
      setSwipeOffset(0);
    }
    pointerStartY.current = null;
  };

  const handleScrollCapture = (event: React.UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollTop > 18) enterSite();
  };

  return (
    <motion.div 
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%", scale: 1.04, filter: "blur(16px)" }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      className="cinematic-loader fixed inset-0 z-[100] overflow-hidden bg-brand-night text-white"
    >
      <motion.img
        src={publicAsset('loader-cinematic.png')}
        alt=""
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: isReady ? 1.02 : 1.055, opacity: 1 }}
        transition={{ duration: 3.8, ease: [0.16, 1, 0.3, 1] }}
        className="cinematic-loader__image absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div className="cinematic-loader__shade absolute inset-0" />
      <div className="cinematic-loader__scan absolute inset-0" />
      <div className="cinematic-loader__sparks absolute inset-0" />
      <div className="cinematic-loader__film absolute inset-0" />
      <div
        className={`cinematic-scroll-capture ${isReady ? 'is-ready' : ''}`}
        onScroll={handleScrollCapture}
        aria-hidden="true"
      >
        <div />
      </div>

      <div className="cinematic-core pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="cinematic-core__ring cinematic-core__ring--outer" />
        <div className="cinematic-core__ring cinematic-core__ring--inner" />
        <div className="cinematic-core__ring cinematic-core__ring--blade" />
        <motion.div
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: isReady ? 1 : 0.76, scale: isReady ? 1 : 0.92 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="cinematic-core__pulse"
        />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.65 }}
          className="relative z-10 text-center"
        >
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.38em] text-accent/85">
            {isReady ? 'SIAP' : 'MENYIAPKAN'}
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-white drop-shadow-[0_0_18px_rgba(203,255,156,0.55)] md:text-5xl">
            {`${Math.round(loaderProgress)}%`}
          </div>
        </motion.div>
      </div>

      <div className="cinematic-center-control absolute left-1/2 top-1/2 z-20 w-[min(82vw,390px)] -translate-x-1/2 translate-y-[160px] md:translate-y-[210px]">
        <div
          className="h-1.5 overflow-hidden rounded-full border border-accent/20 bg-brand-night/24 shadow-[0_0_22px_rgba(203,255,156,0.16)] backdrop-blur-md"
          role="progressbar"
          aria-label="Persiapan halaman"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(loaderProgress)}
        >
          <motion.div
            className="h-full origin-left bg-accent shadow-[0_0_22px_rgba(203,255,156,0.85)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: loaderProgress / 100 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="cinematic-loader-status mt-3 text-center" aria-live="polite">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent/90">
            {loaderStatus}
          </p>
          <p className="mt-1 text-xs font-medium text-white/58">
            {isReady
              ? 'Swipe ke atas untuk masuk tanpa jeda.'
              : `${loadedAssets}/${totalAssets || '...'} aset siap`}
          </p>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-5 flex justify-center"
        >
          <div
            role="button"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') enterSite();
            }}
            className="cinematic-swipe relative flex h-14 w-[min(80vw,340px)] cursor-grab touch-none select-none items-center justify-center rounded-full border border-accent/25 bg-brand-night/38 text-white shadow-[0_18px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl active:cursor-grabbing"
          >
            <motion.div
              className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-brand-night shadow-[0_0_24px_rgba(203,255,156,0.55)]"
              animate={{ y: swipeOffset }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <ArrowUp size={17} />
            </motion.div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white/76">
              Swipe Untuk Masuk
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Sections ---

// --- Data ---
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

type LoaderAssetEntry = {
  src: string;
  label: string;
};

const loaderImageCache = new Map<string, Promise<void>>();

const preloadLoaderImage = (src: string) => {
  const cached = loaderImageCache.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    let isSettled = false;

    const finish = () => {
      if (isSettled) return;
      isSettled = true;
      window.clearTimeout(timeoutId);
      resolve();
    };

    const finishAfterDecode = () => {
      if (img.decode) {
        img.decode().catch(() => undefined).then(finish);
        return;
      }

      finish();
    };

    const timeoutId = window.setTimeout(finish, 9000);

    img.decoding = 'async';
    img.loading = 'eager';
    img.onload = finishAfterDecode;
    img.onerror = finish;
    img.src = src;

    if (img.complete) {
      finishAfterDecode();
    }
  });

  loaderImageCache.set(src, promise);
  return promise;
};

const createLoaderAssetEntries = (): LoaderAssetEntry[] => {
  const entries: LoaderAssetEntry[] = [
    { src: publicAsset('loader-cinematic.png'), label: 'Menyiapkan loading screen' },
    { src: publicAsset('logo.png'), label: 'Memuat logo dan navigasi' },
    { src: publicAsset('profile.svg'), label: 'Memuat foto profil' },
    { src: publicAsset('latarbelakang.svg'), label: 'Menyiapkan bagian profil' },
    { src: publicAsset('hiking.svg'), label: 'Menyiapkan bagian hobi' },
    { src: publicAsset('traveling.svg'), label: 'Menyiapkan bagian hobi' },
    { src: publicAsset('fotografi.svg'), label: 'Menyiapkan bagian hobi' },
    { src: publicAsset('logos/ust.png'), label: 'Memuat logo pendidikan' },
    { src: publicAsset('logos/smk.png'), label: 'Memuat logo pendidikan' },
    { src: publicAsset('logos/uns.png'), label: 'Memuat logo pendidikan' },
    { src: publicAsset('logos/sma.png'), label: 'Memuat logo pendidikan' },
    ...Array.from({ length: 12 }, (_, index) => ({
      src: publicAsset(`galeri-${String(index + 1).padStart(2, '0')}.jpg`),
      label: 'Memuat galeri dokumentasi'
    })),
    ...artifactItems
      .filter((item): item is ArtifactItem & { preview: string } => Boolean(item.preview))
      .map((item) => ({
        src: publicAsset(item.preview),
        label: 'Menyiapkan preview artefak'
      }))
  ];

  return Array.from(
    new Map(entries.map((entry) => [entry.src, entry])).values()
  );
};

const profileDetails = [
  {
    title: 'Latar Belakang',
    shortDesc: 'Lahir dan besar dengan ketertarikan pada inovasi dan pengajaran. Berfokus pada integrasi teknologi dalam pendidikan untuk menciptakan pengalaman belajar yang relevan di era digital.',
    fullDesc: 'Saya Satriya Nugraha, berasal dari Boyolali dan saat ini berdomisili di Klaten. Latar belakang budaya Jawa yang lekat dengan nilai gotong royong, tepa selira, andhap asor, dan kesederhanaan turut membentuk karakter saya menjadi pribadi yang peduli, menghargai kebersamaan, serta menjunjung tinggi etika dalam kehidupan sehari-hari.\n\nNilai-nilai tersebut menjadi landasan bagi saya dalam memandang pendidikan sebagai ruang untuk menumbuhkan manusia secara utuh, bukan hanya dari sisi pengetahuan, tetapi juga sikap, karakter, dan kepedulian sosial. Bagi saya, guru memiliki peran penting sebagai pembimbing, teladan, dan inspirator bagi peserta didik.\n\nMelalui Program PPG, saya ingin terus mengembangkan diri menjadi guru profesional yang mampu menciptakan pembelajaran yang bermakna, adaptif, dan berpusat pada peserta didik. Harapannya, saya dapat membantu peserta didik berkembang sesuai potensi, karakter, dan kebutuhan mereka masing-masing.',
    icon: <BookOpen size={24} />,
    largeIcon: <BookOpen className="w-9 h-9 md:w-11 md:h-11" />,
    meta: '3 Narasi',
    cta: 'Buka Cerita',
    previewItems: ['Asal & nilai hidup', 'Pengalaman mengajar', 'Tujuan PPG'],
    iconBgClass: 'bg-accent/10 border-accent/20 text-accent',
    textColorClass: 'text-accent',
    image: publicAsset('latarbelakang.svg'),
  },
  {
    title: 'Hobi',
    shortDesc: 'Hobi bukan hanya tentang kesenangan, tetapi juga tentang proses menjadi lebih baik. Dari hal kecil yang kita sukai, bisa tumbuh kemampuan besar yang bermanfaat di masa depan.',
    fullDesc: 'Hobi bukan hanya tentang kesenangan, tetapi juga tentang proses menjadi lebih baik. Dari hal kecil yang kita sukai, bisa tumbuh kemampuan besar yang bermanfaat di masa depan.',
    listItems: ['Hiking', 'Traveling', 'Fotografi'],
    icon: <Sparkles size={24} />,
    largeIcon: <Sparkles className="w-9 h-9 md:w-11 md:h-11" />,
    meta: '3 Hobi',
    cta: 'Lihat Hobi',
    previewItems: ['Hiking', 'Traveling', 'Fotografi'],
    iconBgClass: 'bg-[#cbff9c]/10 border-[#cbff9c]/20 text-[#cbff9c]',
    textColorClass: 'text-[#cbff9c]',
  },
  {
    title: 'Motivasi',
    shortDesc: 'Menjadi pendidik inspiratif yang melahirkan generasi cerdas dan berkarakter. Bertujuan membangun ekosistem pendidikan modern, inklusif, dan adaptif.',
    fullDesc: 'Motivasi jangka panjang saya adalah menjadi lebih dari sekadar pengajar—saya ingin menjadi sosok pendidik yang mampu menginspirasi dan memantik rasa ingin tahu siswa. Saya bermimpi suatu hari dapat berkontribusi secara signifikan dalam merumuskan kurikulum atau ekosistem pendidikan modern yang tidak hanya fokus pada kecerdasan akademis, tetapi juga ketangguhan karakter. Ekosistem yang inklusif, adaptif terhadap perubahan global, dan memerdekakan cara belajar setiap anak.',
    icon: <Target size={24} />,
    largeIcon: <Target className="w-9 h-9 md:w-11 md:h-11" />,
    meta: '1 Visi',
    cta: 'Buka Visi',
    previewItems: ['Pendidik inspiratif', 'Karakter siswa', 'Ekosistem adaptif'],
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
    imagePosition: 'object-[center_38%]'
  },
  {
    title: 'Fotografi',
    desc: 'Melalui fotografi, saya belajar melihat keindahan dalam sudut-sudut kecil. Membekukan setiap momen berharga mengajarkan saya tentang kesadaran (mindfulness) untuk selalu menghargai saat ini (present moment), serta bagaimana merangkai cerita visual tanpa menggunakan kata-kata.',
    image: publicAsset('fotografi.svg'),
    icon: '📸'
  }
];

type EducationTimelineSubItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

type EducationTimelineItem = {
  period: string;
  year: string;
  title: string;
  place: string;
  desc: string;
  logo: string;
  logoAlt: string;
  logoClassName: string;
  metaNote: string;
  subHeading: string;
  subItems: EducationTimelineSubItem[];
};

const educationTimeline: EducationTimelineItem[] = [
  {
    period: 'Sekarang',
    year: '2026',
    title: 'PPG PRAJABATAN',
    place: 'Universitas Sarjanawiyata Tamansiswa',
    desc: 'Sedang menempuh Program Pendidikan Profesi Guru di Universitas Sarjanawiyata Tamansiswa sebagai langkah pematangan diri untuk menjadi pendidik yang reflektif, humanis, dan mampu menghadirkan pembelajaran yang bermakna bagi setiap peserta didik.',
    logo: publicAsset('logos/ust.png'),
    logoAlt: 'Logo Universitas Sarjanawiyata Tamansiswa',
    logoClassName: 'object-contain scale-[1.06]',
    metaNote: '',
    subHeading: '',
    subItems: []
  },
  {
    period: 'Karier',
    year: '2025',
    title: 'GURU TEKNIK PERMESINAN',
    place: 'SMK Pancasila 1 Wonogiri',
    desc: 'Menjadi guru di SMK Pancasila 1 Wonogiri memberi saya ruang untuk belajar memimpin kelas, memahami karakter peserta didik, dan menumbuhkan semangat belajar yang tidak berhenti pada materi, tetapi juga pada pembentukan sikap dan masa depan mereka.',
    logo: publicAsset('logos/smk.png'),
    logoAlt: 'Logo SMK Pancasila 1 Wonogiri',
    logoClassName: 'object-contain scale-[1.15]',
    metaNote: '',
    subHeading: '',
    subItems: []
  },
  {
    period: 'Sarjana',
    year: '2021-2025',
    title: 'S1 PENDIDIKAN TEKNIK MESIN',
    place: 'Universitas Sebelas Maret',
    desc: 'Menempuh pendidikan selama 3,5 tahun di Universitas Sebelas Maret menjadi fase penting yang membentuk dasar keilmuan, kedisiplinan berpikir, dan keyakinan saya untuk bertumbuh di dunia pendidikan.',
    logo: publicAsset('logos/uns.png'),
    logoAlt: 'Logo Universitas Sebelas Maret',
    logoClassName: 'object-contain scale-[1.1]',
    metaNote: 'IPK 3,75',
    subHeading: 'Jejak Bermakna Selama Kuliah',
    subItems: [
      {
        label: 'Organisasi',
        value: 'Aktif dalam organisasi dan berbagai kegiatan kemahasiswaan yang membentuk kepemimpinan, keberanian berpendapat, serta kemampuan bekerja sama dengan banyak orang.',
        icon: <Sparkles size={16} />
      },
      {
        label: 'Asisten Dosen',
        value: 'Menjadi asisten dosen gambar teknik mengajarkan saya untuk teliti, bertanggung jawab, dan sabar dalam mendampingi proses belajar orang lain.',
        icon: <BookOpen size={16} />
      }
    ]
  },
  {
    period: 'Sekolah Menengah',
    year: '2018-2021',
    title: 'SMA N 1 TENGARAN',
    place: 'SMA Negeri 1 Tengaran, Kabupaten Semarang',
    desc: 'Masa belajar di SMA Negeri 1 Tengaran, Kabupaten Semarang menjadi titik awal yang menumbuhkan semangat belajar, rasa ingin tahu, dan keberanian saya untuk melangkah lebih jauh menuju dunia pendidikan tinggi.',
    logo: publicAsset('logos/sma.png'),
    logoAlt: 'Logo SMA Negeri 1 Tengaran',
    logoClassName: 'object-contain scale-[1.12]',
    metaNote: '',
    subHeading: '',
    subItems: []
  }
];

const TimelineEntry = ({
  item,
  idx
}: {
  item: EducationTimelineItem;
  idx: number;
  key?: React.Key;
}) => {
  const entryRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(entryRef, { amount: 0.35, margin: "-10% 0px -10% 0px" });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isInView) setHasEntered(true);
  }, [isInView]);

  const animationState = isInView
    ? {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }
    : hasEntered
      ? {
          opacity: 0.58,
          y: 22,
          scale: 0.985,
          filter: 'blur(1.2px)'
        }
      : {
          opacity: 0,
          y: 54,
          scale: 0.94,
          filter: 'blur(7px)'
        };

  return (
    <motion.div
      ref={entryRef}
      animate={animationState}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
      className="relative grid gap-4 rounded-2xl border border-white/10 bg-brand-night/35 p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04] md:grid-cols-[64px_minmax(0,1fr)]"
    >
      <motion.div
        animate={{
          scale: isInView ? 1 : 0.96,
          y: isInView ? 0 : 6
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-10 flex h-14 w-14 items-center justify-center"
      >
        <img
          src={item.logo}
          alt={item.logoAlt}
          className={`h-full w-full drop-shadow-[0_6px_18px_rgba(0,0,0,0.2)] ${item.logoClassName}`}
          loading="lazy"
        />
      </motion.div>
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/48">
            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
          </span>
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            {item.period}
          </span>
          <span className="rounded-full border border-blue-300/18 bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-100">
            {item.year}
          </span>
        </div>
        <h4 className="text-xl font-black text-white">{item.title}</h4>
        <p className="mt-1 text-sm font-semibold text-accent/85">{item.place}</p>
        {item.metaNote && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/46">
            {item.metaNote}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-white/62">{item.desc}</p>
        {item.subItems.length > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-accent/55 to-transparent" />
              <p className="text-xs font-mono font-bold uppercase tracking-[0.32em] text-accent">
                {item.subHeading}
              </p>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-accent/20 bg-gradient-to-br from-white/[0.05] via-brand-night/55 to-black/25 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <div className="grid divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={`${item.title}-${subItem.label}`}
                    className={`relative p-5 md:p-6 ${subIndex % 2 === 0 ? 'bg-accent/[0.1]' : 'bg-blue-400/[0.08]'}`}
                  >
                    <div className="pointer-events-none absolute right-4 top-3 text-3xl font-black text-white/6">
                      0{subIndex + 1}
                    </div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border shadow-[0_0_24px_rgba(203,255,156,0.12)] ${subIndex % 2 === 0 ? 'border-accent/25 bg-accent/16 text-accent' : 'border-blue-300/25 bg-blue-400/12 text-blue-200'}`}>
                        {subItem.icon}
                      </div>
                      <p className="text-base font-black uppercase tracking-[0.08em] text-white">
                        {subItem.label}
                      </p>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-white/82 md:text-[15px]">
                      {subItem.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const artifactSiklusLabel: Record<ArtifactSiklus, string> = {
  'siklus-1': 'Siklus 1',
  'siklus-2': 'Siklus 2',
  'siklus-3': 'Siklus 3'
};

const artifactCategoryLabel: Record<ArtifactCategory, string> = {
  rpp: 'RPP',
  materi: 'Materi',
  lkm: 'LKM',
  media: 'Media',
  asesmen: 'Asesmen',
  lainnya: 'Lainnya'
};

const getArtifactActionLabel = (action: ArtifactAction) => {
  if (action.type === 'file') return 'Buka File';
  return 'Slot Siap Isi';
};

const ArtifactCover = ({ item }: { item: ArtifactItem }) => (
  <div
    className={`artifact-cover ${item.preview ? 'artifact-cover--image' : ''}`}
    style={{
      '--artifact-accent': item.cover.accent,
      '--artifact-accent-soft': item.cover.accentSoft
    } as React.CSSProperties}
  >
    {item.preview && (
      <img
        src={publicAsset(item.preview)}
        alt={`Preview ${item.title}`}
        className="artifact-cover__preview"
        loading="lazy"
      />
    )}
    <div className="artifact-cover__badge">{item.badge}</div>
    <div className="artifact-cover__filetype">{item.fileType}</div>
    {item.preview ? (
      <div className="artifact-cover__image-caption">
        <p>{item.cover.kicker}</p>
        <span>{item.cover.subtitle}</span>
      </div>
    ) : (
      <>
        <div className="artifact-cover__content">
          <p>{item.cover.kicker}</p>
          <h4>{item.cover.title}</h4>
          <span>{item.cover.subtitle}</span>
        </div>
        <div className="artifact-cover__toolbar">
          {[0, 1, 2, 3, 4, 5].map((dot) => (
            <span key={dot} />
          ))}
        </div>
        <div className="artifact-cover__device">
          <div />
          <span />
        </div>
      </>
    )}
  </div>
);

const ArtifactCard = ({
  item,
  onOpen,
  onAnalyze
}: {
  item: ArtifactItem;
  onOpen: (item: ArtifactItem) => void;
  onAnalyze: (item: ArtifactItem) => void;
  key?: React.Key;
}) => {
  const isPlaceholder = item.action.type === 'placeholder';

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty('--pointer-x', `${x * 100}%`);
    card.style.setProperty('--pointer-y', `${y * 100}%`);
    card.style.setProperty('--parallax-x', `${(0.5 - x) * 14}px`);
    card.style.setProperty('--parallax-y', `${(0.5 - y) * 10}px`);
    card.style.setProperty('--preview-x', `${(x - 0.5) * 7}px`);
    card.style.setProperty('--preview-y', `${(y - 0.5) * 5}px`);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '42%');
    card.style.setProperty('--parallax-x', '0px');
    card.style.setProperty('--parallax-y', '0px');
    card.style.setProperty('--preview-x', '0px');
    card.style.setProperty('--preview-y', '0px');
  };

  const handleCardClick = () => {
    if (!isPlaceholder) onOpen(item);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.012 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleCardClick}
      style={{
        '--artifact-card-accent': item.cover.accent,
        '--artifact-card-accent-soft': item.cover.accentSoft,
        '--pointer-x': '50%',
        '--pointer-y': '42%',
        '--parallax-x': '0px',
        '--parallax-y': '0px',
        '--preview-x': '0px',
        '--preview-y': '0px'
      } as React.CSSProperties}
      className={`artifact-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121623]/92 transition-colors hover:border-accent/35 ${
        isPlaceholder ? '' : 'cursor-pointer'
      }`}
    >
      <ArtifactCover item={item} />
      <div className="artifact-card__body flex min-h-[232px] flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-accent">
            {artifactCategoryLabel[item.category]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/48">
            {artifactSiklusLabel[item.siklus]}
          </span>
        </div>
        <h3 className="artifact-card__title font-black leading-tight text-white">{item.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/58">{item.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-bold text-white/45">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="min-w-0 truncate font-mono text-[10px] font-semibold text-white/36">{item.fileName}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onAnalyze(item);
              }}
              className="artifact-card__action inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 text-[11px] font-black text-accent transition-all hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/15 active:translate-y-0"
            >
              Analisis
            </button>
            <button
              type="button"
              disabled={isPlaceholder}
              onClick={(event) => {
                event.stopPropagation();
                onOpen(item);
              }}
              className={`artifact-card__action inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-black transition-all active:translate-y-0 ${
                isPlaceholder
                  ? 'cursor-not-allowed border border-white/10 bg-white/[0.03] text-white/35'
                  : 'bg-accent text-brand-night shadow-[0_0_22px_rgba(203,255,156,0.18)] hover:-translate-y-0.5 hover:bg-accent/90'
              }`}
            >
              {getArtifactActionLabel(item.action)}
              {!isPlaceholder && <ArrowRight size={13} />}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const evaluationHighlights = [
  {
    marker: '01',
    accent: '#22d3ee',
    accentSoft: 'rgba(34, 211, 238, 0.15)',
    title: 'Kendala Penyusunan Produk',
    lead: 'Penyusunan produk pembelajaran tidak hanya berhenti pada pembuatan dokumen, tetapi menjadi proses menerjemahkan kebutuhan kelas ke dalam rancangan yang dapat dijalankan secara nyata.',
    diagnosis: 'Kendala paling besar muncul ketika rancangan ideal harus disesuaikan dengan kondisi kelas, kemampuan awal siswa, ketersediaan waktu, dan kesiapan media. Produk pembelajaran harus tetap sistematis, tetapi tidak boleh terlalu kaku karena situasi kelas dapat berubah ketika pembelajaran berlangsung.',
    deepDive: [
      'Pada tahap awal penyusunan, tantangan utama terletak pada penyelarasan antara tujuan pembelajaran, materi, kegiatan, LKM, media, dan asesmen. Jika salah satu komponen tidak saling terhubung, produk pembelajaran berisiko hanya menjadi dokumen administratif, bukan alat bantu yang benar-benar mengarahkan pembelajaran.',
      'Kendala berikutnya adalah menentukan tingkat kedalaman materi. Materi perlu cukup kuat secara konsep, tetapi tetap dapat dipahami oleh peserta didik dengan latar kemampuan yang beragam. Hal ini menuntut guru untuk memilih contoh, urutan penjelasan, dan bentuk latihan yang bertahap.',
      'Kendala teknis juga muncul pada pengaturan waktu. Dalam pembelajaran kejuruan, waktu tidak hanya digunakan untuk menjelaskan materi, tetapi juga untuk demonstrasi, latihan, pendampingan, koreksi, dan refleksi. Produk pembelajaran yang terlalu padat dapat membuat guru tergesa-gesa dan siswa kehilangan kesempatan memperbaiki pemahamannya.'
    ],
    impact: 'Implikasinya, produk pembelajaran harus dirancang sebagai perangkat yang hidup: jelas secara alur, kuat secara pedagogis, tetapi tetap fleksibel ketika menghadapi dinamika kelas. Produk yang baik bukan hanya lengkap, melainkan mampu membantu guru mengambil keputusan saat pembelajaran berlangsung.'
  },
  {
    marker: '02',
    accent: '#a78bfa',
    accentSoft: 'rgba(167, 139, 250, 0.15)',
    title: 'Konsep Pedagogis yang Diadopsi',
    lead: 'Produk pembelajaran disusun dengan dasar pedagogis yang menempatkan siswa sebagai subjek aktif, sehingga pembelajaran tidak hanya berpusat pada penjelasan guru.',
    diagnosis: 'Konsep pedagogis yang digunakan perlu terlihat dalam keputusan desain pembelajaran. Artinya, teori tidak cukup hanya disebutkan, tetapi harus tampak pada pemilihan aktivitas, cara guru memberi bantuan, bentuk latihan, serta cara asesmen digunakan untuk memperbaiki pembelajaran.',
    deepDive: [
      'Konstruktivisme diadopsi karena siswa perlu membangun pemahaman melalui pengalaman, contoh, pertanyaan, dan latihan. Dalam konteks pembelajaran teknik, konsep abstrak akan lebih mudah dipahami jika siswa diberi kesempatan melihat contoh, membandingkan bentuk, lalu menyusun pemahamannya sendiri melalui praktik.',
      'Experiential learning digunakan karena keterampilan kejuruan tidak cukup dipelajari melalui teori. Siswa perlu mengalami proses mencoba, menemukan kesalahan, menerima umpan balik, lalu memperbaiki pekerjaannya. Siklus pengalaman ini membuat pembelajaran lebih bermakna karena siswa belajar dari tindakan nyata.',
      'Scaffolding menjadi dasar penting karena tidak semua siswa memiliki kesiapan yang sama. Bantuan guru, contoh bertahap, petunjuk LKM, dan penguatan visual menjadi penopang awal. Bantuan tersebut kemudian dapat dikurangi ketika siswa mulai mampu bekerja lebih mandiri.',
      'Assessment for learning juga diadopsi agar penilaian tidak hanya berfungsi sebagai angka akhir. Hasil asesmen digunakan untuk membaca bagian mana yang belum dipahami siswa, jenis kesalahan yang sering muncul, dan tindakan perbaikan yang perlu dilakukan pada pembelajaran berikutnya.'
    ],
    impact: 'Dengan dasar pedagogis tersebut, produk pembelajaran diarahkan untuk membangun pemahaman konseptual, keterampilan praktik, kemandirian belajar, dan kemampuan reflektif siswa. Teori menjadi dasar pengambilan keputusan, bukan sekadar kutipan dalam dokumen.'
  },
  {
    marker: '03',
    accent: '#14b8a6',
    accentSoft: 'rgba(20, 184, 166, 0.15)',
    title: 'Faktor Keberhasilan Penerapan',
    lead: 'Keberhasilan penerapan produk pembelajaran sangat dipengaruhi oleh sejauh mana rancangan dapat diterjemahkan menjadi pengalaman belajar yang terarah di kelas.',
    diagnosis: 'Produk pembelajaran dapat dikatakan berhasil apabila mampu membantu guru mengelola alur belajar dan membantu siswa memahami materi secara bertahap. Keberhasilan tidak hanya diukur dari tersedianya perangkat, tetapi dari keterpakaian perangkat tersebut dalam proses belajar.',
    deepDive: [
      'Faktor pertama adalah kejelasan alur. Siswa perlu mengetahui apa yang dipelajari, mengapa materi itu penting, bagaimana langkah mengerjakan tugas, dan bagaimana hasil kerjanya dinilai. Ketika alur ini jelas, siswa cenderung lebih siap mengikuti pembelajaran.',
      'Faktor kedua adalah kualitas media. Media yang baik harus membantu siswa melihat konsep yang sulit dijelaskan hanya dengan kata-kata. Pada pembelajaran teknik, visualisasi contoh, tahapan kerja, dan perbandingan hasil sangat penting untuk mengurangi miskonsepsi.',
      'Faktor ketiga adalah kualitas interaksi selama pembelajaran. Produk yang baik tetap membutuhkan guru yang aktif membaca respons siswa, memberi penguatan, dan memperbaiki arahan ketika siswa menunjukkan kesulitan. Produk bukan pengganti peran guru, tetapi penguat keputusan pedagogis guru.',
      'Faktor keempat adalah kebermaknaan asesmen. Asesmen perlu memberi informasi tentang kemampuan siswa, bukan hanya menghasilkan skor. Informasi tersebut dapat digunakan untuk menentukan apakah materi perlu diulang, latihan perlu ditambah, atau bantuan perlu dibedakan.'
    ],
    impact: 'Produk dianggap berhasil ketika siswa dapat mengikuti pembelajaran dengan lebih mandiri, guru memiliki pegangan untuk membimbing, dan hasil asesmen dapat digunakan untuk memperbaiki proses. Keberhasilan produk terletak pada kemampuannya menghubungkan rencana, pelaksanaan, dan perbaikan pembelajaran berikutnya.'
  },
  {
    marker: '04',
    accent: '#f59e0b',
    accentSoft: 'rgba(245, 158, 11, 0.15)',
    title: 'Penyesuaian untuk Kelas Berbeda',
    lead: 'Produk pembelajaran perlu disiapkan agar dapat menyesuaikan kelas dengan karakter, fasilitas, budaya belajar, dan tingkat penguasaan siswa yang berbeda.',
    diagnosis: 'Setiap kelas memiliki kondisi yang tidak sama. Ada kelas yang cepat memahami instruksi, ada yang membutuhkan contoh lebih banyak, ada yang fasilitasnya lengkap, dan ada pula yang harus menyesuaikan keterbatasan alat atau waktu. Karena itu, produk pembelajaran perlu memiliki ruang adaptasi.',
    deepDive: [
      'Penyesuaian pertama berkaitan dengan tingkat kesulitan. Tugas yang sama dapat dibuat dalam beberapa level, mulai dari latihan dasar, latihan sedang, hingga tantangan lanjutan. Dengan cara ini, siswa yang membutuhkan penguatan tetap bisa mengikuti, sementara siswa yang lebih siap tetap mendapat tantangan.',
      'Penyesuaian kedua berkaitan dengan strategi kerja. Pada kelas yang besar, kerja kelompok dapat membantu pengelolaan waktu dan alat. Pada kelas yang membutuhkan pemantauan lebih detail, kerja individu atau berpasangan dapat memudahkan guru membaca kemampuan masing-masing siswa.',
      'Penyesuaian ketiga berkaitan dengan media. Jika fasilitas digital tersedia, media dapat dibuat lebih interaktif. Jika fasilitas terbatas, guru tetap dapat menggunakan contoh cetak, papan tulis, atau demonstrasi manual. Intinya, konsep utama tetap tersampaikan meskipun medianya berubah.',
      'Penyesuaian keempat berkaitan dengan asesmen. Rubrik dapat dibuat lebih ringkas untuk kelas dengan waktu terbatas, atau dibuat lebih detail untuk kelas yang membutuhkan umpan balik mendalam. Bentuk asesmen juga dapat disesuaikan dengan produk kerja, proses kerja, atau presentasi hasil.'
    ],
    impact: 'Penyesuaian ini membuat produk pembelajaran tidak bergantung pada satu kondisi ideal. Produk tetap dapat dipakai pada kelas yang berbeda karena memiliki komponen yang dapat diubah tanpa menghilangkan arah pembelajaran, tujuan kompetensi, dan kualitas asesmen.'
  }
];

const analysisSynthesis = [
  {
    label: 'RPP',
    text: 'RPP perlu menjadi peta pembelajaran yang jelas, tetapi tetap menyediakan ruang adaptasi. Bagian tujuan, kegiatan inti, asesmen, dan refleksi harus saling terhubung agar guru tidak hanya menjalankan langkah, tetapi memahami alasan pedagogis di balik setiap langkah.'
  },
  {
    label: 'Media',
    text: 'Media perlu memperjelas konsep inti, memancing perhatian, dan membantu siswa melihat contoh sebelum masuk ke praktik. Media yang baik tidak hanya menarik secara visual, tetapi juga mengurangi miskonsepsi dan mempercepat pemahaman awal.'
  },
  {
    label: 'LKM',
    text: 'LKM perlu memandu langkah kerja secara bertahap agar siswa dapat belajar mandiri sambil tetap memiliki arah yang jelas. Petunjuk, contoh, ruang jawaban, dan urutan tugas harus membantu siswa berpikir, bukan sekadar mengisi lembar kerja.'
  },
  {
    label: 'Asesmen',
    text: 'Asesmen tidak hanya menilai hasil akhir, tetapi juga membaca proses, kesulitan, dan kebutuhan penguatan berikutnya. Hasil asesmen perlu menjadi dasar revisi media, perbaikan LKM, dan penguatan materi pada pertemuan berikutnya.'
  }
];

const assessmentDocuments = [
  {
    id: 'lampiran-7',
    lampiran: 'Lampiran 7',
    title: 'Penilaian Penyusunan Perangkat Pembelajaran',
    evaluator: 'DPL dan GP',
    fileName: 'Lampiran 7.pdf',
    fileHref: 'penilaian/Lampiran 7.pdf',
    driveHref: '',
    summary: 'Instrumen penilaian penyusunan perangkat pembelajaran untuk Rancangan Pembelajaran 1-3. Isinya menilai identitas dan kompetensi, pengembangan materi, bahan, sumber, media belajar, serta kesesuaian rancangan pembelajaran.',
    focus: ['5 halaman', 'Perangkat ajar', 'Rancangan 1-3']
  },
  {
    id: 'lampiran-8',
    lampiran: 'Lampiran 8',
    title: 'Penilaian Praktik Mengajar Mahasiswa',
    evaluator: 'DPL dan GP',
    fileName: 'Lampiran 8.pdf',
    fileHref: 'penilaian/Lampiran 8.pdf',
    driveHref: '',
    summary: 'Instrumen penilaian praktik mengajar mahasiswa untuk Pembelajaran 1-3. Dokumen ini memuat penilaian membuka pelajaran, kegiatan inti, ketepatan materi, penguasaan pembelajaran, umpan balik, dan pelaksanaan kelas.',
    focus: ['4 halaman', 'Praktik mengajar', 'Pembelajaran 1-3']
  }
];

const teacherModelPillars = [
  {
    title: 'Misi Mengembangkan Diri',
    marker: 'Misi',
    tone: 'from-cyan-300/22 via-sky-400/10 to-transparent',
    accent: 'text-cyan-200',
    accentColor: '#67e8f9',
    items: [
      'Membiasakan refleksi setelah mengajar agar setiap kelemahan menjadi bahan perbaikan nyata.',
      'Mengembangkan perangkat ajar yang rapi, relevan, dan mudah dipakai di kelas kejuruan.',
      'Terus belajar teknologi pembelajaran agar materi teknik lebih visual, hidup, dan dekat dengan siswa.'
    ]
  },
  {
    title: 'Kompetensi yang Ingin Dibangun',
    marker: 'Skill',
    tone: 'from-amber-300/24 via-orange-400/10 to-transparent',
    accent: 'text-amber-200',
    accentColor: '#fde68a',
    items: [
      'Kompetensi pedagogik untuk membaca kebutuhan siswa dan memilih strategi yang tepat.',
      'Kompetensi profesional pada bidang Teknik Mesin, terutama gambar teknik dan praktik kerja industri.',
      'Kompetensi digital untuk membuat media, dokumentasi, dan evaluasi pembelajaran yang lebih modern.'
    ]
  },
  {
    title: 'Karakter Guru Ideal',
    marker: 'Karakter',
    tone: 'from-rose-300/22 via-pink-400/10 to-transparent',
    accent: 'text-rose-200',
    accentColor: '#fecdd3',
    items: [
      'Humanis tetapi tetap tegas, dekat dengan siswa tanpa kehilangan arah pembelajaran.',
      'Reflektif, jujur pada kekurangan, dan tidak berhenti memperbaiki cara mengajar.',
      'Kreatif, disiplin, komunikatif, serta mampu menjadi teladan sikap kerja bagi peserta didik.'
    ]
  }
];

const selfDevelopmentStrategies = [
  {
    step: '01',
    title: 'Audit Praktik Mengajar',
    desc: 'Mencatat bagian pembelajaran yang berhasil, bagian yang belum efektif, dan respon siswa setelah proses mengajar.'
  },
  {
    step: '02',
    title: 'Upgrade Perangkat',
    desc: 'Memperbaiki RPP, media, LKM, dan asesmen berdasarkan bukti kelas, bukan sekadar mengganti tampilan dokumen.'
  },
  {
    step: '03',
    title: 'Kolaborasi & Umpan Balik',
    desc: 'Meminta masukan dari DPL, GP, teman sejawat, dan siswa agar pengembangan diri tidak berjalan sendirian.'
  },
  {
    step: '04',
    title: 'Portofolio Bertumbuh',
    desc: 'Mengarsipkan karya, dokumentasi, penilaian, dan refleksi sebagai bukti perkembangan profesional yang bisa ditelusuri.'
  }
];

type CompetencyCategoryId = 'pedagogik' | 'teknik' | 'teknologi' | 'kepemimpinan';

const competencyCategories: Array<{
  id: CompetencyCategoryId;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  activeRing: string;
}> = [
  {
    id: 'pedagogik',
    label: 'Pedagogik',
    icon: <BookOpen size={15} />,
    gradient: 'from-accent to-accent-strong',
    activeRing: 'shadow-accent/18'
  },
  {
    id: 'teknik',
    label: 'Teknik',
    icon: <Wrench size={15} />,
    gradient: 'from-[#d9ffac] to-[#8effe7]',
    activeRing: 'shadow-accent/16'
  },
  {
    id: 'teknologi',
    label: 'Teknologi',
    icon: <Code2 size={15} />,
    gradient: 'from-accent-strong to-[#b8fff1]',
    activeRing: 'shadow-accent-strong/16'
  },
  {
    id: 'kepemimpinan',
    label: 'Kepemimpinan',
    icon: <Award size={15} />,
    gradient: 'from-[#cbff9c] to-[#fff0b8]',
    activeRing: 'shadow-accent/16'
  }
];

const competencyItems: Record<CompetencyCategoryId, Array<{
  title: string;
  level: 'Mahir' | 'Menengah';
  icon: React.ReactNode;
}>> = {
  pedagogik: [
    { title: 'Memahami karakteristik peserta didik', level: 'Menengah', icon: <Fingerprint size={34} /> },
    { title: 'Merancang pembelajaran berbasis praktik', level: 'Menengah', icon: <Layout size={34} /> },
    { title: 'Mengelola kelas dan bengkel secara efektif', level: 'Mahir', icon: <Layers size={34} /> },
    { title: 'Melaksanakan asesmen keterampilan', level: 'Mahir', icon: <Target size={34} /> },
    { title: 'Membimbing sikap dan karakter kerja siswa', level: 'Menengah', icon: <GraduationCap size={34} /> }
  ],
  teknik: [
    { title: 'Gambar Teknik dan CAD', level: 'Mahir', icon: <Palette size={34} /> },
    { title: 'Pemrograman dan Operasi CNC', level: 'Mahir', icon: <Code2 size={34} /> },
    { title: 'Fabrikasi dan Pengelasan', level: 'Menengah', icon: <Wrench size={34} /> },
    { title: 'Teknik Pemesinan Konvensional', level: 'Mahir', icon: <Cog size={34} /> },
    { title: 'Pengukuran Presisi dan Quality Control', level: 'Mahir', icon: <Gauge size={34} /> },
    { title: 'Keselamatan dan Kesehatan Kerja (K3)', level: 'Mahir', icon: <Award size={34} /> },
    { title: 'Proses Manufaktur dan Produksi', level: 'Mahir', icon: <Briefcase size={34} /> }
  ],
  teknologi: [
    { title: 'Pemanfaatan AI dalam Pembelajaran Teknik Mesin', level: 'Mahir', icon: <Sparkles size={34} /> },
    { title: 'Pembuatan Konten Digital Pembelajaran', level: 'Mahir', icon: <FileText size={34} /> },
    { title: 'Penggunaan Platform Pembelajaran Digital', level: 'Mahir', icon: <Globe size={34} /> },
    { title: 'Editing Video dan Media Pembelajaran Interaktif', level: 'Mahir', icon: <Youtube size={34} /> },
    { title: 'Literasi Digital dan Adaptasi Teknologi Industri 4.0', level: 'Mahir', icon: <Zap size={34} /> }
  ],
  kepemimpinan: [
    { title: 'Komunikasi dan Public Speaking', level: 'Mahir', icon: <Mail size={34} /> },
    { title: 'Kerja Sama dan Kolaborasi Tim', level: 'Mahir', icon: <Layers size={34} /> },
    { title: 'Kepemimpinan dan Manajemen Diri', level: 'Mahir', icon: <Target size={34} /> },
    { title: 'Pembinaan Karakter dan Etos Kerja', level: 'Menengah', icon: <GraduationCap size={34} /> },
    { title: 'Kewirausahaan dan Jiwa Inovatif', level: 'Menengah', icon: <Briefcase size={34} /> }
  ]
};

type CertificateAchievement = {
  number: string;
  title: string;
  role: string;
  issuer: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  accentSoft: string;
  preview: string;
  fileHref: string;
};

const certificateAchievements: CertificateAchievement[] = [
  {
    number: '01',
    title: 'Bootcamp NVivo',
    role: 'Pelatihan penelitian kualitatif',
    issuer: 'PT Ebiz Prima Nusa',
    category: 'Pelatihan',
    description: 'Mengikuti bootcamp penelitian kualitatif menggunakan Tool AI dan NVivo 12 selama 96 JP.',
    icon: <FileText size={22} />,
    accent: '#cbff9c',
    accentSoft: 'rgba(203, 255, 156, 0.16)',
    preview: 'sertifikat/preview/pelatihan-nvivo-ai-ebizmark-2024.jpg',
    fileHref: 'sertifikat/rapi/pelatihan-nvivo-ai-ebizmark-2024.pdf'
  },
  {
    number: '02',
    title: 'Asisten Dosen',
    role: 'Asisten Dosen',
    issuer: 'Pendidikan Teknik Mesin FKIP UNS',
    category: 'Akademik',
    description: 'Bertugas sebagai asisten dosen pada mata kuliah Menggambar Mesin semester Agustus 2022 sampai Januari 2023.',
    icon: <GraduationCap size={22} />,
    accent: '#8effe7',
    accentSoft: 'rgba(142, 255, 231, 0.14)',
    preview: 'sertifikat/preview/asisten-dosen-menggambar-mesin-2023.jpg',
    fileHref: 'sertifikat/rapi/asisten-dosen-menggambar-mesin-2023.pdf'
  },
  {
    number: '03',
    title: 'Panitia MEF',
    role: 'Panitia MEF 2022',
    issuer: 'Pendidikan Teknik Mesin UNS',
    category: 'Event',
    description: 'Berkontribusi sebagai panitia dalam Mechanical Education Festival 2022 Pendidikan Teknik Mesin Universitas Sebelas Maret.',
    icon: <Target size={22} />,
    accent: '#ffd378',
    accentSoft: 'rgba(255, 211, 120, 0.14)',
    preview: 'sertifikat/preview/panitia-mechanical-education-festival-2022.jpg',
    fileHref: 'sertifikat/rapi/panitia-mechanical-education-festival-2022.pdf'
  },
  {
    number: '04',
    title: 'Staf Pembekalan Rohani',
    role: 'Staf Pembekalan Rohani',
    issuer: 'UKM PMK FKIP UNS',
    category: 'Organisasi',
    description: 'Berkontribusi dalam kepengurusan UKM Persekutuan Mahasiswa Kristen FKIP UNS periode 2022/2023.',
    icon: <Layers size={22} />,
    accent: '#f7f8ff',
    accentSoft: 'rgba(247, 248, 255, 0.12)',
    preview: 'sertifikat/preview/staf-pembekalan-rohani-ukm-pmk-2022.jpg',
    fileHref: 'sertifikat/rapi/staf-pembekalan-rohani-ukm-pmk-2022.pdf'
  },
  {
    number: '05',
    title: 'PKL PT YPTI',
    role: 'Peserta praktik kerja industri',
    issuer: 'PT Yogya Presisi Tehnikatama Industri',
    category: 'Industri',
    description: 'Mengikuti praktik kerja industri di PT Yogya Presisi Tehnikatama Industri pada 2 Januari sampai 28 Maret 2024.',
    icon: <Briefcase size={22} />,
    accent: '#cbff9c',
    accentSoft: 'rgba(203, 255, 156, 0.14)',
    preview: 'sertifikat/preview/praktik-kerja-industri-pt-ypti-2024.jpg',
    fileHref: 'sertifikat/rapi/praktik-kerja-industri-pt-ypti-2024.pdf'
  },
  {
    number: '06',
    title: 'Wakil Ketua PMK',
    role: 'Wakil Ketua',
    issuer: 'UKM PMK FKIP UNS',
    category: 'Kepemimpinan',
    description: 'Berkontribusi sebagai wakil ketua pada kepengurusan UKM PMK FKIP UNS periode 2023/2024.',
    icon: <Award size={22} />,
    accent: '#8effe7',
    accentSoft: 'rgba(142, 255, 231, 0.14)',
    preview: 'sertifikat/preview/wakil-ketua-ukm-pmk-2023.jpg',
    fileHref: 'sertifikat/rapi/wakil-ketua-ukm-pmk-2023.pdf'
  },
  {
    number: '07',
    title: 'Diklat Anti Bullying',
    role: 'Peserta',
    issuer: 'PPG FKIP UST',
    category: 'Diklat',
    description: 'Mengikuti Diklat Anti Bullying dan Penanganan Kekerasan Seksual bagi mahasiswa PPG Calon Guru Gelombang I.',
    icon: <Sparkles size={22} />,
    accent: '#ffd378',
    accentSoft: 'rgba(255, 211, 120, 0.14)',
    preview: 'sertifikat/preview/diklat-anti-bullying-ppg-2026.jpg',
    fileHref: 'sertifikat/rapi/diklat-anti-bullying-ppg-2026.pdf'
  },
  {
    number: '08',
    title: 'Diklat Kebinekaan Global',
    role: 'Peserta',
    issuer: 'PPG FKIP UST',
    category: 'Diklat',
    description: 'Mengikuti diklat wawasan kebinekaan global bagi mahasiswa PPG Calon Guru Gelombang I tahun akademik 2025/2026.',
    icon: <Globe size={22} />,
    accent: '#f7f8ff',
    accentSoft: 'rgba(247, 248, 255, 0.12)',
    preview: 'sertifikat/preview/diklat-wawasan-kebinekaan-global-2026.jpg',
    fileHref: 'sertifikat/rapi/diklat-wawasan-kebinekaan-global-2026.pdf'
  },
  {
    number: '09',
    title: 'Webinar Kewirausahaan 2021',
    role: 'Peserta',
    issuer: 'KOMPRESI FKIP UNS',
    category: 'Kewirausahaan',
    description: 'Mengikuti webinar kewirausahaan 2021 bertema aktif dan produktif di usia muda dengan berwirausaha.',
    icon: <Briefcase size={22} />,
    accent: '#8effe7',
    accentSoft: 'rgba(142, 255, 231, 0.14)',
    preview: 'sertifikat/preview/webinar-kewirausahaan-2021.jpg',
    fileHref: 'sertifikat/rapi/webinar-kewirausahaan-2021.pdf'
  }
];

const youtubeChannelUrl = 'https://www.youtube.com/@satriyanugraha8440';
const youtubeVideoUrl = 'https://youtu.be/jMjdjtP_nMY';
const youtubeVideoId = 'jMjdjtP_nMY';
const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeShowcasePopup, setActiveShowcasePopup] = useState<number | null>(null);
  const [openDocGallery, setOpenDocGallery] = useState<number | null>(null);
  const [activeGalleryCard, setActiveGalleryCard] = useState(0);
  const [activeArtifactSiklus, setActiveArtifactSiklus] = useState<'semua' | ArtifactSiklus>('semua');
  const [activeArtifactCategory, setActiveArtifactCategory] = useState<'semua' | ArtifactCategory>('semua');
  const [activeArtifactAnalysis, setActiveArtifactAnalysis] = useState<ArtifactItem | null>(null);
  const [activeCompetencyCategory, setActiveCompetencyCategory] = useState<CompetencyCategoryId>('pedagogik');
  const [activeAnalysisHighlight, setActiveAnalysisHighlight] = useState<(typeof evaluationHighlights)[number] | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<CertificateAchievement | null>(null);
  const [isVideoSoundEnabled, setIsVideoSoundEnabled] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [hasVideoEntered, setHasVideoEntered] = useState(false);
  const docGalleryDragStart = useRef<number | null>(null);
  const galleryCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeGalleryCardRef = useRef(0);
  const galleryAutoScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const youtubeIframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoSoundEnabledRef = useRef(false);
  const deferredArtifactSiklus = useDeferredValue(activeArtifactSiklus);
  const deferredArtifactCategory = useDeferredValue(activeArtifactCategory);
  const visibleArtifactItems = artifactItems.filter((item) => {
    const matchesSiklus = deferredArtifactSiklus === 'semua' || item.siklus === deferredArtifactSiklus;
    const matchesCategory = deferredArtifactCategory === 'semua' || item.category === deferredArtifactCategory;
    return matchesSiklus && matchesCategory;
  });
  const activeCompetency = competencyCategories.find((category) => category.id === activeCompetencyCategory) ?? competencyCategories[0];
  const visibleCompetencies = competencyItems[activeCompetencyCategory];
  const navigationItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'dokumentasi', label: 'Dokumentasi' },
    { id: 'artefak', label: 'Artefak' },
    { id: 'analisis-evaluasi', label: 'Analisis' },
    { id: 'penilaian', label: 'Penilaian' },
    { id: 'model-guru', label: 'Model Guru' },
    { id: 'video', label: 'Video' },
    { id: 'sertifikat', label: 'Sertifikat' },
    { id: 'kontak', label: 'Kontak' }
  ];

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

  const documentationPhotos = [
    {
      step: '01',
      side: 'left',
      title: 'Orientasi & Pemetaan',
      summary: 'Momen awal pemetaan kebutuhan, ritme kelas, dan suasana belajar sebagai dasar menyusun langkah pembelajaran berikutnya.',
      isPhoto: true,
      photo: publicAsset('galeri-01.jpg'),
      galleryPhotos: [
        publicAsset('galeri-01.jpg'),
        publicAsset('galeri-02.jpg'),
        publicAsset('galeri-03.jpg'),
        publicAsset('galeri-04.jpg')
      ]
    },
    {
      step: '02',
      side: 'right',
      title: 'Desain Strategis',
      summary: 'Perancangan strategi, perangkat, dan arah pembelajaran agar proses di kelas lebih terarah, relevan, dan terukur.',
      isPhoto: true,
      photo: publicAsset('galeri-05.jpg'),
      galleryPhotos: [
        publicAsset('galeri-05.jpg'),
        publicAsset('galeri-06.jpg'),
        publicAsset('galeri-07.jpg'),
        publicAsset('galeri-08.jpg')
      ]
    },
    {
      step: '03',
      side: 'left',
      title: 'Implementasi Nyata',
      summary: 'Pelaksanaan pembelajaran di lapangan yang memperlihatkan interaksi nyata, praktik, dan hasil dari strategi yang telah disiapkan.',
      isPhoto: true,
      photo: publicAsset('galeri-09.jpg'),
      galleryPhotos: [
        publicAsset('galeri-09.jpg'),
        publicAsset('galeri-10.jpg'),
        publicAsset('galeri-11.jpg'),
        publicAsset('galeri-12.jpg')
      ]
    }
  ];

  const documentationGalleryItems = documentationPhotos
    .flatMap((item) => {
      const photos = item.galleryPhotos?.length ? item.galleryPhotos : [item.photo];
      return photos.map((photo, photoIndex) => ({
        id: `${item.step}-${photoIndex}`,
        step: item.step,
        title: item.title,
        photoIndex,
        totalPhotos: photos.length,
        photo
      }));
    })
    .map((item, index) => ({
      ...item,
      galleryLabel: `Galeri ${String(index + 1).padStart(2, '0')}`,
      alt: `Galeri ${String(index + 1).padStart(2, '0')}`
    }));

  const activeFullscreenItem = openDocGallery !== null ? documentationGalleryItems[openDocGallery] : null;
  const activeFullscreenPhoto = activeFullscreenItem?.photo;

  const handleDocGallerySwipe = (offsetX: number) => {
    const galleryLength = documentationGalleryItems.length;

    if (openDocGallery === null || Math.abs(offsetX) < 45 || galleryLength <= 1) return;
    setOpenDocGallery((prev) => {
      if (prev === null) return prev;
      return offsetX < 0
        ? (prev + 1) % galleryLength
        : (prev + galleryLength - 1) % galleryLength;
    });
  };

  const handleGalleryCardHover = (index: number) => {
    if (activeGalleryCardRef.current === index) return;

    activeGalleryCardRef.current = index;
    setActiveGalleryCard(index);

    if (galleryAutoScrollTimer.current) {
      clearTimeout(galleryAutoScrollTimer.current);
    }

    galleryAutoScrollTimer.current = setTimeout(() => {
      const container = document.getElementById('doc-gallery-scroll');
      const card = galleryCardRefs.current[index];
      if (!container || !card) return;

      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const centeredOffset = (cardRect.left - containerRect.left) - ((container.clientWidth - cardRect.width) / 2);

      container.scrollTo({
        left: container.scrollLeft + centeredOffset,
        behavior: 'smooth'
      });
    }, 180);
  };

  const handleOpenArtifact = (item: ArtifactItem) => {
    if (item.action.type === 'file') {
      window.open(publicAsset(item.action.href), '_blank', 'noopener,noreferrer');
    }
  };

  const sendYoutubeCommand = (func: string, args: unknown[] = []) => {
    youtubeIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args
      }),
      'https://www.youtube.com'
    );
  };

  const activateYoutubePlayback = () => {
    videoSoundEnabledRef.current = true;
    setIsVideoSoundEnabled(true);
    sendYoutubeCommand('unMute');
    sendYoutubeCommand('setVolume', [86]);
    sendYoutubeCommand('playVideo');
  };

  const muteYoutubePlayback = () => {
    videoSoundEnabledRef.current = false;
    setIsVideoSoundEnabled(false);
    sendYoutubeCommand('mute');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => {
      const sections = ['beranda', 'profil', 'dokumentasi', 'artefak', 'analisis-evaluasi', 'penilaian', 'model-guru', 'video', 'sertifikat', 'kontak'];
      const marker = window.innerHeight * 0.36;
      let current = sections[0];

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= marker) {
            current = section;
          }
        }
      });

      if (current) setActiveSection(current);
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
    if (isLoading) return;

    const videoSection = document.getElementById('video');
    if (!videoSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsVideoInView(isVisible);

        if (isVisible) {
          setHasVideoEntered(true);
          sendYoutubeCommand('playVideo');
          if (videoSoundEnabledRef.current) {
            sendYoutubeCommand('unMute');
            sendYoutubeCommand('setVolume', [86]);
          } else {
            sendYoutubeCommand('mute');
          }
        } else {
          sendYoutubeCommand('pauseVideo');
        }
      },
      { rootMargin: '-12% 0px -12% 0px', threshold: [0, 0.08, 0.18] }
    );

    observer.observe(videoSection);

    return () => {
      observer.disconnect();
      sendYoutubeCommand('pauseVideo');
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    if (activeSection === 'video') {
      setHasVideoEntered(true);
      setIsVideoInView(true);
      window.setTimeout(() => {
        sendYoutubeCommand('playVideo');
        if (videoSoundEnabledRef.current) {
          sendYoutubeCommand('unMute');
          sendYoutubeCommand('setVolume', [86]);
        } else {
          sendYoutubeCommand('mute');
        }
      }, 260);
      return;
    }

    if (hasVideoEntered) {
      setIsVideoInView(false);
      sendYoutubeCommand('pauseVideo');
    }
  }, [activeSection, hasVideoEntered, isLoading]);

  useEffect(() => {
    document.body.style.overflow = isLoading || openDocGallery !== null || activeArtifactAnalysis !== null || activeAnalysisHighlight !== null || activeCertificate !== null ? 'hidden' : 'unset';
  }, [activeAnalysisHighlight, activeArtifactAnalysis, activeCertificate, isLoading, openDocGallery]);

  useEffect(() => {
    if (activeAnalysisHighlight === null) return;

    const handleAnalysisHighlightKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveAnalysisHighlight(null);
      }
    };

    window.addEventListener('keydown', handleAnalysisHighlightKeydown);
    return () => window.removeEventListener('keydown', handleAnalysisHighlightKeydown);
  }, [activeAnalysisHighlight]);

  useEffect(() => {
    if (activeCertificate === null) return;

    const handleCertificateKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCertificate(null);
      }
    };

    window.addEventListener('keydown', handleCertificateKeydown);
    return () => window.removeEventListener('keydown', handleCertificateKeydown);
  }, [activeCertificate]);

  useEffect(() => {
    if (activeArtifactAnalysis === null) return;

    const handleAnalysisKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveArtifactAnalysis(null);
      }
    };

    window.addEventListener('keydown', handleAnalysisKeydown);
    return () => window.removeEventListener('keydown', handleAnalysisKeydown);
  }, [activeArtifactAnalysis]);

  useEffect(() => {
    if (openDocGallery === null) return;

    const handleGalleryKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDocGallery(null);
        return;
      }

      if (documentationGalleryItems.length <= 1) return;

      if (event.key === 'ArrowRight') {
        setOpenDocGallery((prev) => (prev === null ? prev : (prev + 1) % documentationGalleryItems.length));
      }

      if (event.key === 'ArrowLeft') {
        setOpenDocGallery((prev) => (prev === null ? prev : (prev + documentationGalleryItems.length - 1) % documentationGalleryItems.length));
      }
    };

    window.addEventListener('keydown', handleGalleryKeydown);
    return () => window.removeEventListener('keydown', handleGalleryKeydown);
  }, [documentationGalleryItems.length, openDocGallery]);

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
      <MechanicalParticleField />

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

            {/* Header */}
            <motion.header 
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2"
            >
        <div className="mx-auto max-w-7xl">
          <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-full border border-accent/10 bg-brand-night/72 px-3 py-1.5 shadow-[0_10px_34px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:px-4">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <a href="#beranda" className="relative z-10 flex shrink-0 items-center gap-3 lg:gap-4">
              <div className="relative w-8 h-8 md:w-10 md:h-10 group shrink-0">
                <img 
                  src={publicAsset('logo.png')} 
                  alt="Satriya Logo" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden flex-col text-left xl:flex">
                <span className="text-[11px] md:text-[13px] font-bold leading-tight whitespace-nowrap">Universitas Sarjanawiyata</span>
                <span className="text-[11px] md:text-[13px] font-bold leading-tight whitespace-nowrap">Tamansiswa</span>
              </div>
            </a>

            <nav className="relative z-10 hidden flex-1 items-center justify-end gap-1 lg:flex">
              {navigationItems.map((item) => (
                <div key={item.id} className="shrink-0">
                  <NavLink 
                    href={`#${item.id}`}
                    isActive={activeSection === item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                    }}
                  >
                    {item.label}
                  </NavLink>
                </div>
              ))}
            </nav>

            <button 
              className="relative z-10 p-2 text-white glass-card border-accent/20 bg-accent/10 rounded-xl lg:hidden"
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
              className="absolute top-full left-4 right-4 mt-2 p-4 grid gap-2 rounded-3xl border border-white/12 bg-brand-night/95 backdrop-blur-xl shadow-2xl lg:hidden"
            >
              {navigationItems.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-2xl transition-colors ${
                    activeSection === item.id
                      ? 'bg-accent text-brand-night font-black'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
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
          <Reveal direction="up" className="text-center mb-14">
            <SectionKicker>Identitas Personal</SectionKicker>
            <h2 className="text-gradient mb-6">Profil</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </Reveal>

          <div className="relative z-10 grid w-full gap-6 lg:grid-cols-12">
            <Reveal direction="right" className="lg:col-span-7">
              <div className="glass-card relative h-full overflow-hidden border-accent/20 bg-white/[0.035] p-6 md:p-8">
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="max-w-3xl">
                    <div className="mb-6 border-b border-white/10 pb-5">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent">{profileDetails[0].meta}</div>
                      <h3 className="mt-2 text-3xl font-black leading-tight text-white md:text-4xl">{profileDetails[0].title}</h3>
                    </div>

                    <div className="space-y-4 text-sm leading-7 text-white/76 md:text-[15px] md:leading-8">
                      {profileDetails[0].fullDesc.split('\n\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {profileDetails[0].previewItems.map((preview) => (
                        <span key={preview} className="rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent/90">
                          {preview}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" className="lg:col-span-5">
              <div className="space-y-5">
                {profileDetails[0].image && (
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full"
                  >
                    <div className="absolute -inset-4 rounded-[1.8rem] bg-accent/16 blur-3xl" />
                    <img
                      src={profileDetails[0].image}
                      alt="Satriya Nugraha"
                      className="relative aspect-[16/7] w-full rounded-[1.4rem] border border-white/15 object-cover object-[center_24%] shadow-[0_22px_70px_rgba(0,0,0,0.36)]"
                    />
                    <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">
                      Satriya Nugraha
                    </p>
                  </motion.div>
                )}

                <div className="glass-card relative overflow-hidden border-blue-400/20 bg-blue-400/[0.035] p-6 md:p-8">
                <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${profileDetails[2].iconBgClass}`}>
                      {profileDetails[2].icon}
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                      {profileDetails[2].meta}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white">{profileDetails[2].title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-white/72 md:text-base">
                    {profileDetails[2].fullDesc}
                  </p>
                  <div className="mt-6 grid gap-3">
                    {profileDetails[2].previewItems.map((preview) => (
                      <div key={preview} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/72">
                        <span className="h-2 w-2 rounded-full bg-blue-300" />
                        {preview}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" className="lg:col-span-12">
              <div className="space-y-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <SectionKicker>{profileDetails[1].meta}</SectionKicker>
                    <h3 className="text-3xl font-black text-white">Galeri Hobi</h3>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-white/58">
                    {profileDetails[1].shortDesc}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {hobbyDetails.map((hobby) => (
                    <motion.div
                      key={hobby.title}
                      whileHover={{ y: -6 }}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-colors hover:border-accent/35"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={hobby.image}
                          alt={hobby.title}
                          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${hobby.imagePosition || ''}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-night/80 via-brand-night/18 to-transparent" />
                        <h4 className="absolute bottom-4 left-4 text-2xl font-black text-white">{hobby.title}</h4>
                      </div>
                      <div className="p-5">
                        <p className="text-sm leading-relaxed text-white/64">{hobby.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" className="lg:col-span-12">
              <div className="relative">
                <div className="mb-8">
                  <div>
                    <SectionKicker>Riwayat Hidup</SectionKicker>
                    <h3 className="text-3xl font-black text-white md:text-4xl">Riwayat Hidup</h3>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent via-white/15 to-transparent md:block" />
                  <div className="grid gap-4">
                    {educationTimeline.map((item, idx) => (
                      <TimelineEntry
                        key={`${item.period}-${item.title}`}
                        item={item}
                        idx={idx}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Documentation Gallery Section */}
        <section id="dokumentasi" className="relative scroll-mt-16 pt-12 min-h-screen flex flex-col justify-center pb-24">
          <div className="max-w-6xl mx-auto w-full">
            <Reveal direction="up" className="text-center mb-14" parallax={-30}>
              <h2 className="text-gradient mb-6">Dokumentasi Kegiatan</h2>
              <p className="text-muted text-sm md:text-base max-w-lg mx-auto">Kumpulan momen bermakna selama proses belajar mengajar</p>
            </Reveal>

            <Reveal direction="up">
              <div className="relative group/carousel">
                {/* Left scroll arrow */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('doc-gallery-scroll');
                    if (el) el.scrollBy({ left: -260, behavior: 'smooth' });
                  }}
                  className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-brand-night/70 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:border-accent/45 hover:text-accent hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
                  aria-label="Geser kiri"
                >
                  <ChevronLeft size={24} />
                </button>
                {/* Right scroll arrow */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('doc-gallery-scroll');
                    if (el) el.scrollBy({ left: 260, behavior: 'smooth' });
                  }}
                  className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-brand-night/70 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:border-accent/45 hover:text-accent hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
                  aria-label="Geser kanan"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Accordion-style horizontal gallery */}
                <div
                  id="doc-gallery-scroll"
                  className="flex items-stretch gap-1 overflow-x-auto pb-2 scroll-smooth overflow-y-visible md:gap-1.5"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                  <style>{`#doc-gallery-scroll::-webkit-scrollbar { display: none; }`}</style>
                  {documentationGalleryItems.map((item, i) => {
                    const isActive = activeGalleryCard === i;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        ref={(el) => { galleryCardRefs.current[i] = el; }}
                        onPointerMove={() => handleGalleryCardHover(i)}
                        onFocus={() => handleGalleryCardHover(i)}
                        onClick={() => setOpenDocGallery(i)}
                        aria-label={`Buka ${item.galleryLabel}`}
                        className={`relative flex-shrink-0 overflow-hidden rounded-[22px] border border-white/12 bg-brand-night/18 cursor-pointer h-[400px] md:h-[500px] transition-[width,filter,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? 'w-[340px] md:w-[520px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] z-10 brightness-100'
                            : 'w-[118px] md:w-[150px] shadow-[0_12px_34px_rgba(0,0,0,0.3)] brightness-[0.76] hover:brightness-[0.9]'
                        }`}
                      >
                        <img
                          src={item.photo}
                          alt={item.alt}
                          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                            isActive ? 'scale-105' : 'scale-110'
                          }`}
                        />
                        <div className={`absolute inset-0 transition-opacity duration-700 ${
                          isActive
                            ? 'bg-gradient-to-t from-black/80 via-black/10 to-transparent'
                            : 'bg-gradient-to-t from-black/70 via-black/30 to-black/10'
                        }`} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Artifact Gallery Section */}
        <section id="artefak" className="artifact-portfolio relative scroll-mt-16 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-x-[-8%] top-12 h-72 rounded-full bg-accent/10 blur-[120px]" />
          <Reveal className="relative z-10 mx-auto max-w-3xl text-center" parallax={18}>
            <h2 className="text-gradient">Hasil Karya</h2>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-8 space-y-4">
            <div className="flex justify-center">
              <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-white/12 bg-brand-night/70 p-1 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                {artifactSiklusTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveArtifactSiklus(tab.id)}
                    className={`shrink-0 rounded-xl px-4 py-2 text-[11px] font-black transition-all ${
                      activeArtifactSiklus === tab.id
                        ? 'bg-accent text-brand-night shadow-[0_0_20px_rgba(203,255,156,0.28)]'
                        : 'text-white/54 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {artifactCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveArtifactCategory(category.id)}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] transition-all ${
                    activeArtifactCategory === category.id
                      ? 'border-accent/60 bg-accent/15 text-accent'
                      : 'border-white/12 bg-white/[0.035] text-white/48 hover:border-white/24 hover:text-white/78'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-8">
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-white/58 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                  <Layers size={18} />
                </div>
                <div>
                  <p className="font-black text-white">{visibleArtifactItems.length} artefak tampil</p>
                  <p className="text-xs text-white/42">Filter aktif bisa diganti per siklus atau kategori.</p>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/36">
                public/artefak/[kategori]/nama-file
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {visibleArtifactItems.map((item) => (
                  <ArtifactCard key={item.id} item={item} onOpen={handleOpenArtifact} onAnalyze={setActiveArtifactAnalysis} />
                ))}
              </AnimatePresence>
            </div>

            {visibleArtifactItems.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-white/46">
                Belum ada artefak untuk kombinasi filter ini.
              </div>
            )}
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-6">
            <div className="grid gap-4 rounded-2xl border border-accent/20 bg-accent/[0.055] p-5 backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-black text-white">Folder artefak sudah disiapkan.</p>
                <p className="mt-1 text-sm leading-relaxed text-white/58">
                  Masukkan file ke folder kategori, lalu update daftar di `src/data/artefak.ts`. Kartu baru otomatis ikut layout grid ini.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-brand-night/38 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                <MousePointer2 size={13} /> Ready for files
              </div>
            </div>
          </Reveal>
        </section>

        {/* Analysis & Evaluation Section */}
        <section id="analisis-evaluasi" className="relative scroll-mt-16 py-16 md:py-24">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-strong/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

          <Reveal direction="up" className="relative z-10 mx-auto max-w-4xl text-center" parallax={-18}>
            <SectionKicker>Analisis & Evaluasi</SectionKicker>
            <h2 className="analysis-section__title text-gradient mt-3">Analisis Produk Pembelajaran</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
              Refleksi terhadap proses penyusunan, dasar pedagogis, faktor penerapan, dan penyesuaian produk pembelajaran untuk kebutuhan kelas yang berbeda.
            </p>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-10">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {evaluationHighlights.map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -6 }}
                  style={{
                    '--analysis-accent': item.accent,
                    '--analysis-accent-soft': item.accentSoft
                  } as React.CSSProperties}
                  className="analysis-card rounded-[1.35rem] border border-white/10 bg-[#111827]/78 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors hover:border-accent/35 md:p-5"
                >
                  <div className="analysis-card__heading">
                    <div className="analysis-card__marker">{item.marker}</div>
                    <div>
                      <span />
                      <h3 className="analysis-card__title mt-3 font-black leading-snug">{item.title}</h3>
                    </div>
                  </div>
                  <div className="analysis-card__body mt-4">
                    <p className="analysis-card__lead line-clamp-3 text-sm leading-relaxed text-white/70">
                      {item.lead}
                    </p>

                    <button
                      type="button"
                      onClick={() => setActiveAnalysisHighlight(item)}
                      className="analysis-card__toggle mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-white/54 transition-all hover:border-accent/32 hover:text-accent"
                      aria-haspopup="dialog"
                    >
                      Buka Analisis
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-8">
            <div className="analysis-synthesis overflow-hidden rounded-[2rem] border border-accent/18 bg-accent/[0.045] p-6 backdrop-blur-xl md:p-7">
              <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <SectionKicker>Sintesis</SectionKicker>
                  <h3 className="text-2xl font-black leading-tight text-white md:text-3xl">
                    Arah Perbaikan Produk Pembelajaran
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/62">
                    Analisis ini menunjukkan bahwa produk pembelajaran perlu kuat secara rancangan, mudah dijalankan, dan cukup lentur untuk menyesuaikan kelas yang berbeda.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {analysisSynthesis.map((item) => (
                    <div key={item.label} className="analysis-synthesis__item rounded-2xl border border-white/10 bg-brand-night/34 p-4">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/64">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* DPL & GP Assessment Section */}
        <section id="penilaian" className="relative scroll-mt-16 py-12 md:py-16">
          <div className="pointer-events-none absolute inset-x-[-6%] top-20 h-80 rounded-full bg-accent/10 blur-[130px]" />

          <Reveal direction="up" className="relative z-10 mx-auto max-w-4xl text-center" parallax={-14}>
            <SectionKicker>Penilaian DPL dan GP</SectionKicker>
            <h2 className="analysis-section__title text-gradient mt-3">Hasil Penilaian Praktik</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
              Bagian ini disiapkan untuk menampilkan Lampiran 7 dan Lampiran 8 sebagai bukti penilaian perangkat pembelajaran dan praktik mengajar mahasiswa.
            </p>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-7">
            <div className="grid gap-5 lg:grid-cols-2">
              {assessmentDocuments.map((item) => {
                const fileUrl = encodeURI(publicAsset(item.fileHref));
                const hasDriveLink = item.driveHref.trim().length > 0;

                return (
                  <motion.article
                    key={item.id}
                    whileHover={{ y: -8 }}
                    onClick={() => window.open(fileUrl, '_blank', 'noopener,noreferrer')}
                    className="assessment-card group cursor-pointer overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#101827]/88 shadow-[0_22px_72px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors hover:border-accent/35"
                  >
                    <div className="relative h-[250px] overflow-hidden border-b border-white/10 bg-[#e9f2f7] p-3 text-slate-950">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.24),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(223,238,245,0.96))]" />
                      <div className="absolute left-0 top-0 z-10 h-14 w-14 bg-accent [clip-path:polygon(0_0,100%_0,0_100%)]" />
                      <div className="absolute right-0 bottom-0 z-10 h-20 w-20 bg-[#0e1a2c] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

                      <div className="relative z-0 h-full overflow-hidden rounded-xl border border-slate-900/12 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-0.35deg]">
                        <iframe
                          title={`Preview ${item.title}`}
                          src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                          className="pointer-events-none h-full w-full bg-white"
                        />
                        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-3 border-b border-slate-900/10 bg-white/92 px-4 py-3 backdrop-blur-sm">
                          <div>
                            <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-cyan-600">
                              {item.lampiran}
                            </p>
                            <p className="mt-0.5 max-w-[250px] truncate text-xs font-black text-slate-950">
                              Preview PDF asli
                            </p>
                          </div>
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-accent">
                            <FileText size={16} />
                          </div>
                        </div>
                        <div className="assessment-card__peek pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/42 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-brand-night shadow-[0_0_28px_rgba(203,255,156,0.35)]">
                            Lihat lebih jauh <ArrowRight size={13} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                          {item.lampiran}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                          {item.evaluator}
                        </span>
                      </div>

                      <h3 className="text-base font-black leading-tight text-white md:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">{item.summary}</p>
                      <p className="mt-3 truncate font-mono text-[10px] font-semibold text-white/36">{item.fileName}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-[11px] font-black text-brand-night transition-all hover:-translate-y-0.5 hover:bg-accent/90"
                        >
                          Preview PDF <ArrowRight size={13} />
                        </a>
                        {hasDriveLink ? (
                          <a
                            href={item.driveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[11px] font-black text-white/72 transition-all hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent"
                          >
                            Buka Drive <ExternalLink size={13} />
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[11px] font-black text-white/34"
                          >
                            Link Drive Belum Ada <ExternalLink size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* Target Teacher Model Section */}
        <section id="model-guru" className="relative scroll-mt-16 py-16 md:py-24">
          <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-cyan-400/12 blur-[110px]" />
          <div className="pointer-events-none absolute right-[-9rem] top-56 h-96 w-96 rounded-full bg-rose-400/10 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-4 left-1/3 h-72 w-72 rounded-full bg-amber-300/10 blur-[120px]" />

          <Reveal direction="up" className="relative z-10 mx-auto max-w-4xl text-center" parallax={-18}>
            <SectionKicker>Model Guru yang Dituju</SectionKicker>
            <h2 className="analysis-section__title text-gradient mt-3">Visi & Karakter Guru Profesional</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
              Gambaran utuh tentang visi, kompetensi, karakter, dan strategi pengembangan diri yang menjadi arah perjalanan saya sebagai pendidik.
            </p>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-10">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#f6efe1] p-6 text-[#111827] shadow-[0_22px_70px_rgba(0,0,0,0.28)] md:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#fb7185]/28 blur-[40px]" />
              <div className="absolute bottom-0 left-0 h-20 w-full bg-[linear-gradient(135deg,#22d3ee_0_18%,transparent_18%_100%)] opacity-75" />
              <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex flex-col">
                  <div className="inline-flex rounded-full bg-[#111827] px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#fef3c7]">
                    Visi Utama
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#111827] mt-5 max-w-lg leading-tight">
                    Visi Menjadi Guru Profesional
                  </h3>
                  <div className="mt-5 max-w-full text-sm font-medium leading-relaxed text-[#263248]/80 md:text-base">
                    <p className="mb-4">
                      Mendidik bukan sekadar memindahkan pengetahuan dari buku ke pikiran, melainkan seni menyalakan pelita keberanian dan rasa ingin tahu di dalam jiwa. Saya beraspirasi menjadi guru Teknik Mesin yang melampaui batas ruang kelas—seorang fasilitator yang adaptif, reflektif, dan menjunjung tinggi nilai-nilai humanis.
                    </p>
                    <p>
                      Di tengah pusaran inovasi teknologi dan dinamika industri yang berlari cepat, saya berkomitmen untuk merangkai pengalaman belajar yang bermakna. Setiap garis pada gambar teknik dan setiap presisi di meja kerja bengkel adalah medium untuk membentuk ketangguhan, ketelitian, dan integritas. Mengantarkan peserta didik menjadi individu yang tak hanya cakap secara kompetensi, tapi juga siap menghadapi hari esok dengan martabat.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-3">
                  {['Adaptif', 'Reflektif', 'Humanis'].map((item) => (
                    <div key={item} className="rounded-xl border border-[#111827]/10 bg-white/55 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.11em] text-[#111827]/76 shadow-[0_10px_24px_rgba(17,24,39,0.08)] md:min-w-[120px]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-6">
            <div className="grid gap-5 md:grid-cols-3">
              {teacherModelPillars.map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -8 }}
                  className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#10131f] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.22)] md:p-6 flex flex-col h-full`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
                  <div className="relative flex flex-col h-full">
                    <div className="mb-5 border-b border-white/10 pb-4">
                      <span className={`font-mono text-[10px] font-black uppercase tracking-[0.22em] ${item.accent}`}>
                        {item.marker}
                      </span>
                      <h3 className="model-pillar-title mt-2 font-black text-white">{item.title}</h3>
                    </div>
                    <ul className="space-y-4 flex-1">
                      {item.items.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/66">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.accentColor }} />
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-5">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.7rem] border border-white/10 bg-[#0f172a]/88 p-5 shadow-[0_20px_64px_rgba(0,0,0,0.26)] md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <SectionKicker>Strategi Pengembangan Diri</SectionKicker>
                    <h3 className="model-panel-title mt-2 font-black text-white">Roadmap Bertumbuh</h3>
                  </div>
                  <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.22)] md:flex">
                    <Gauge size={21} />
                  </div>
                </div>

                <div className="grid gap-2.5">
                  {selfDevelopmentStrategies.map((item) => (
                    <div key={item.step} className="grid gap-2.5 rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 md:grid-cols-[54px_1fr]">
                      <div className="font-mono text-xl font-black text-amber-200">{item.step}</div>
                      <div>
                        <h4 className="font-black text-white">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-white/58">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(145deg,#1d1237,#0e2231_52%,#2c1d0d)] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.3)] md:p-6">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-300/18 blur-[50px]" />
                <div className="absolute -bottom-20 left-0 h-48 w-48 rounded-full bg-cyan-300/14 blur-[55px]" />
                <div className="relative">
                  <SectionKicker>Harapan untuk Masa Depan</SectionKicker>
                  <h3 className="text-2xl md:text-3xl font-black text-white mt-4 leading-tight">
                    Mengajar bukan hanya mentransfer materi, tapi menyalakan arah.
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-white/66">
                    Harapannya, saya mampu menjadi guru yang membuat siswa merasa mampu, berani mencoba, dan melihat pelajaran teknik sebagai bekal masa depan. Saya ingin kelas menjadi ruang yang disiplin, hangat, produktif, dan terus berkembang bersama kebutuhan zaman.
                  </p>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-200">
                      Komitmen
                    </p>
                    <p className="mt-3 text-base font-black leading-tight text-white md:text-lg">
                      Terus belajar, terus memperbaiki perangkat, dan terus menghadirkan pembelajaran yang manusiawi sekaligus relevan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-10">
            <div className="relative py-2 md:py-4">
              <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-[min(92vw,720px)] -translate-x-1/2 rounded-full bg-accent/8 blur-[90px]" />
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[min(92vw,760px)] -translate-x-1/2 rounded-full bg-accent-strong/7 blur-[100px]" />

              <div className="relative mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/18 bg-accent/8 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-accent">
                  <Wrench size={14} />
                  Keahlian
                </div>
                <h3 className="competency-section-title mt-5 text-white">Kompetensi & Keahlian</h3>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
                  Berbagai keterampilan yang mendukung profesionalisme saya sebagai calon guru Teknik Mesin.
                </p>
              </div>

              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                {competencyCategories.map((category) => {
                  const isActive = activeCompetencyCategory === category.id;
                  return (
                    <motion.button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCompetencyCategory(category.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black transition-all md:px-5 ${
                        isActive
                          ? `border-accent/24 bg-gradient-to-r ${category.gradient} text-brand-night shadow-xl ${category.activeRing}`
                          : 'border-accent/10 bg-brand-night/30 text-white/62 hover:border-accent/24 hover:bg-accent/10 hover:text-white'
                      }`}
                      aria-pressed={isActive}
                    >
                      {category.icon}
                      {category.label}
                    </motion.button>
                  );
                })}
              </div>

              <div className="relative mt-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCompetencyCategory}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`competency-card-grid ${visibleCompetencies.length === 5 ? 'competency-card-grid--five' : ''}`}
                  >
                    {visibleCompetencies.map((item, index) => (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.045, duration: 0.34 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="competency-card-shell group relative min-h-[190px] overflow-hidden rounded-[1.45rem] p-5"
                      >
                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${activeCompetency.gradient} opacity-60`} />
                        <div className={`absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${activeCompetency.gradient} opacity-0 blur-[34px] transition-opacity duration-300 group-hover:opacity-20`} />
                        <div className="relative flex h-full flex-col items-center justify-center text-center">
                          <div className={`mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${activeCompetency.gradient} text-brand-night shadow-[0_16px_40px_rgba(24,58,68,0.24)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            {item.icon}
                          </div>
                          <p className="competency-card-title text-white">{item.title}</p>
                          <span className={`mt-4 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] ${
                            item.level === 'Mahir'
                              ? 'bg-accent-strong/12 text-accent-strong ring-1 ring-accent-strong/18'
                              : 'bg-accent/12 text-accent ring-1 ring-accent/16'
                          }`}>
                            {item.level}
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Video Section */}
        <section id="video" className="relative scroll-mt-16 py-16 md:py-24">
          <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-28 bottom-12 h-96 w-96 rounded-full bg-accent-strong/10 blur-[130px]" />

          <Reveal direction="up" className="relative z-10 mx-auto max-w-4xl text-center" parallax={-18}>
            <SectionKicker>Video</SectionKicker>
            <h2 className="analysis-section__title text-gradient mt-3">Preview Video YouTube</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
              Dokumentasi video langsung dari channel YouTube, ditampilkan penuh agar bisa diputar tanpa keluar dari halaman.
            </p>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-10">
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2rem] border border-accent/14 bg-brand-night/46 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-4"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(203,255,156,0.12),transparent_32%),radial-gradient(circle_at_82%_100%,rgba(142,255,231,0.1),transparent_34%)]" />
              <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-black">
                <div className="relative aspect-video w-full">
                  {hasVideoEntered ? (
                    <iframe
                      ref={youtubeIframeRef}
                      title="Preview video YouTube Satriya Nugraha"
                      src={`${youtubeEmbedUrl}&origin=${encodeURIComponent(window.location.origin)}`}
                      className="h-full w-full"
                      loading="eager"
                      onLoad={() => {
                        if (isVideoInView) {
                          sendYoutubeCommand('playVideo');
                          if (videoSoundEnabledRef.current) {
                            sendYoutubeCommand('unMute');
                            sendYoutubeCommand('setVolume', [86]);
                          } else {
                            sendYoutubeCommand('mute');
                          }
                        }
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(203,255,156,0.16),transparent_34%),linear-gradient(135deg,#07141c,#03070a)] px-6 text-center">
                      <div>
                        <Youtube className="mx-auto mb-4 text-accent" size={42} />
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-accent/80">
                          Video Standby
                        </p>
                        <p className="mt-2 max-w-md text-sm font-bold leading-relaxed text-white/68">
                          Video akan autoplay otomatis saat section ini benar-benar masuk layar.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mt-4 flex flex-col gap-3 px-1 pb-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-accent/80">
                    {isVideoInView ? 'Auto Play Aktif' : 'Auto Pause Aktif'}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white/78">
                    Video baru berjalan saat section ini terlihat. Default mute, lalu bisa kamu aktifkan suaranya.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={isVideoSoundEnabled ? muteYoutubePlayback : activateYoutubePlayback}
                    className={`inline-flex w-max items-center gap-2 rounded-full border px-4 py-2 text-xs font-black transition-all hover:-translate-y-0.5 ${
                      isVideoSoundEnabled
                        ? 'border-accent-strong/24 bg-accent-strong/12 text-accent-strong hover:bg-accent-strong hover:text-brand-night'
                        : 'border-accent/18 bg-accent/10 text-accent hover:bg-accent hover:text-brand-night'
                    }`}
                    aria-pressed={isVideoSoundEnabled}
                  >
                    {isVideoSoundEnabled ? 'Mute Suara' : 'Aktifkan Suara'}
                  </button>
                  <a
                    href={youtubeVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-max items-center gap-2 rounded-full border border-accent/18 bg-accent/10 px-4 py-2 text-xs font-black text-accent transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-brand-night"
                  >
                    Buka Video <ExternalLink size={14} />
                  </a>
                  <a
                    href={youtubeChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-max items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-xs font-black text-white/62 transition-all hover:-translate-y-0.5 hover:border-accent/24 hover:text-accent"
                  >
                    Channel <Youtube size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        {/* Certificate Section */}
        <section id="sertifikat" className="relative scroll-mt-16 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/24 to-transparent" />

          <Reveal direction="up" className="relative z-10 mx-auto max-w-4xl text-center" parallax={-14}>
            <SectionKicker>Sertifikat</SectionKicker>
            <h2 className="analysis-section__title text-gradient mt-3">Sertifikat & Pencapaian</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
              Kumpulan bukti pengalaman organisasi, kepanitiaan, akademik, pelatihan, dan pengembangan diri yang memperkuat profil profesional.
            </p>
          </Reveal>

          <Reveal direction="up" className="relative z-10 mt-9" cascade>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-full border border-accent/18 bg-accent/10 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                {certificateAchievements.length} Sertifikat
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/46">
                Akademik - Organisasi - Pelatihan - Industri
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {certificateAchievements.map((item, index) => (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveCertificate(item)}
                  whileHover={{ y: -8, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="certificate-card group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-night/58 p-4 text-left backdrop-blur-xl"
                  style={{
                    '--certificate-accent': item.accent,
                    '--certificate-accent-soft': item.accentSoft
                  } as React.CSSProperties}
                  aria-label={`Buka detail ${item.title}`}
                >
                  <div className="certificate-card__preview" aria-hidden="true">
                    {item.preview ? (
                      <img
                        src={publicAsset(item.preview)}
                        alt=""
                        className="certificate-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="certificate-card__paper">
                        <div className="certificate-card__paper-top">
                          <span>{item.number}</span>
                          <span>{item.category}</span>
                        </div>
                        <div className="certificate-card__paper-title">
                          <span />
                          <span />
                        </div>
                        <div className="certificate-card__paper-lines">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="certificate-card__seal">
                          {item.icon}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative mt-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-white/42">
                        Certif {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-xl text-brand-night shadow-[0_12px_30px_rgba(0,0,0,0.2)]" style={{ background: item.accent }}>
                        {item.icon}
                      </span>
                    </div>

                    <h3 className="certificate-card__title font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--certificate-accent)]">
                      {item.issuer}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-snug text-white/74">
                      {item.role}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-white/44 transition-colors group-hover:border-accent/26 group-hover:text-accent">
                      Detail <ExternalLink size={11} />
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
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

        {/* Certificate Detail Modal */}
        <AnimatePresence>
          {activeCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertificate(null)}
              className="fixed inset-0 z-[104] flex items-center justify-center bg-brand-night/84 p-2 backdrop-blur-md md:p-3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 22 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
                className="relative grid max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0d1220] shadow-[0_28px_90px_rgba(0,0,0,0.5)] lg:grid-cols-[1.14fr_0.86fr]"
              >
                <button
                  type="button"
                  onClick={() => setActiveCertificate(null)}
                  className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/55 transition-colors hover:border-accent/40 hover:text-accent md:right-6 md:top-6"
                  aria-label="Tutup detail sertifikat"
                >
                  <X size={20} />
                </button>

                <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.025] p-5 lg:border-b-0 lg:border-r lg:p-7">
                  <div
                    className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-[90px]"
                    style={{ background: activeCertificate.accentSoft }}
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-night/52 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                    <img
                      src={publicAsset(activeCertificate.preview)}
                      alt={`Sertifikat ${activeCertificate.title}`}
                      className="max-h-[72vh] w-full object-contain"
                    />
                  </div>
                </div>

                <div className="p-5 md:p-7">
                  <div className="mb-5 flex flex-wrap items-center gap-2 pr-12">
                    <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                      Sertifikat {activeCertificate.number}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/48">
                      {activeCertificate.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black leading-tight text-white md:text-4xl">
                    {activeCertificate.title}
                  </h2>
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-[color:var(--certificate-modal-accent)]" style={{ '--certificate-modal-accent': activeCertificate.accent } as React.CSSProperties}>
                    {activeCertificate.issuer}
                  </p>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white/42">
                        Peran
                      </p>
                      <p className="mt-2 text-base font-bold text-white/82">
                        {activeCertificate.role}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white/42">
                        Keterangan
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/66">
                        {activeCertificate.description}
                      </p>
                    </div>
                  </div>

                  <a
                    href={publicAsset(activeCertificate.fileHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-black text-brand-night transition-all hover:-translate-y-0.5 hover:bg-accent/90"
                  >
                    Buka PDF <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Detail Modal */}
        <AnimatePresence>
          {activeAnalysisHighlight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveAnalysisHighlight(null)}
              className="fixed inset-0 z-[104] flex items-center justify-center bg-brand-night/84 p-2 backdrop-blur-md md:p-3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 22 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`Detail ${activeAnalysisHighlight.title}`}
                style={{
                  '--analysis-accent': activeAnalysisHighlight.accent,
                  '--analysis-accent-soft': activeAnalysisHighlight.accentSoft
                } as React.CSSProperties}
                className="analysis-detail-modal relative max-h-[calc(100vh-0.75rem)] w-full max-w-[min(96vw,1220px)] overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#0d1220] shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
              >
                <button
                  type="button"
                  onClick={() => setActiveAnalysisHighlight(null)}
                  className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/55 transition-colors hover:border-accent/40 hover:text-accent"
                  aria-label="Tutup detail analisis"
                >
                  <X size={20} />
                </button>

                <div className="relative overflow-hidden bg-white/[0.025] p-4 lg:p-5">
                  <div
                    className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-[90px]"
                    style={{ background: activeAnalysisHighlight.accentSoft }}
                  />
                  <div className="relative flex gap-4 pr-11">
                    <div className="analysis-card__marker">{activeAnalysisHighlight.marker}</div>
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--analysis-accent)]">
                        Analisis Produk
                      </p>
                      <h2 className="analysis-detail-modal__title mt-1.5 font-black text-white">
                        {activeAnalysisHighlight.title}
                      </h2>
                      <p className="analysis-detail-modal__copy mt-2 max-w-5xl text-white/64">
                        {activeAnalysisHighlight.lead}
                      </p>
                    </div>
                  </div>

                  <div className="analysis-detail-modal__grid relative mt-4 grid gap-3 lg:grid-cols-2">
                    <article className="analysis-detail-modal__block analysis-detail-modal__block--featured rounded-2xl border border-white/10 bg-white/[0.032] p-3.5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--analysis-accent)]">
                        Diagnosis
                      </p>
                      <p className="analysis-detail-modal__copy mt-2 text-white/66">
                        {activeAnalysisHighlight.diagnosis}
                      </p>
                    </article>

                    <article className="analysis-detail-modal__block analysis-detail-modal__block--featured rounded-2xl border border-white/10 bg-white/[0.032] p-3.5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--analysis-accent)]">
                        Implikasi
                      </p>
                      <p className="analysis-detail-modal__copy mt-2 text-white/66">
                        {activeAnalysisHighlight.impact}
                      </p>
                    </article>

                    <article className="analysis-detail-modal__block analysis-detail-modal__block--analysis rounded-2xl border border-white/10 bg-white/[0.032] p-3.5 lg:col-span-2">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--analysis-accent)]">
                        Analisis Mendalam
                      </p>
                      <p className="analysis-detail-modal__copy mt-2 text-white/66">
                        {activeAnalysisHighlight.deepDive.join(' ')}
                      </p>
                    </article>
                  </div>
                </div>
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

        {/* Artifact Analysis Modal */}
        <AnimatePresence>
          {activeArtifactAnalysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArtifactAnalysis(null)}
              className="fixed inset-0 z-[104] flex items-center justify-center bg-brand-night/82 p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 22 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0d1220] shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
              >
                <button
                  type="button"
                  onClick={() => setActiveArtifactAnalysis(null)}
                  className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/55 transition-colors hover:border-accent/40 hover:text-accent md:right-6 md:top-6"
                  aria-label="Tutup analisis artefak"
                >
                  <X size={20} />
                </button>

                <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.025] p-5 lg:border-b-0 lg:border-r lg:p-7">
                    <div
                      className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-[90px]"
                      style={{ background: activeArtifactAnalysis.cover.accentSoft }}
                    />
                    <div className="relative">
                      <div className="mb-4 flex flex-wrap items-center gap-2 pr-12">
                        <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                          Analisis Artefak
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/48">
                          {artifactCategoryLabel[activeArtifactAnalysis.category]}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/48">
                          {artifactSiklusLabel[activeArtifactAnalysis.siklus]}
                        </span>
                      </div>

                      <h2 className="max-w-xl text-2xl font-black leading-tight text-white md:text-4xl">
                        {activeArtifactAnalysis.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/58 md:text-base">
                        {activeArtifactAnalysis.summary}
                      </p>

                      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-brand-night/45 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                        {activeArtifactAnalysis.preview ? (
                          <img
                            src={publicAsset(activeArtifactAnalysis.preview)}
                            alt={`Preview ${activeArtifactAnalysis.title}`}
                            className="max-h-[360px] w-full object-cover object-top"
                          />
                        ) : (
                          <ArtifactCover item={activeArtifactAnalysis} />
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[10px] font-semibold text-white/42">
                          {activeArtifactAnalysis.fileName}
                        </span>
                        {activeArtifactAnalysis.action.type === 'file' && (
                          <button
                            type="button"
                            onClick={() => handleOpenArtifact(activeArtifactAnalysis)}
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[11px] font-black text-brand-night transition-all hover:-translate-y-0.5 hover:bg-accent/90"
                          >
                            Buka File <ExternalLink size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-7">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                        Konteks
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/66">
                        {activeArtifactAnalysis.analysis.konteks}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      {[
                        { title: 'Tujuan', items: activeArtifactAnalysis.analysis.tujuan },
                        { title: 'Kelebihan', items: activeArtifactAnalysis.analysis.kelebihan },
                        { title: 'Kekurangan', items: activeArtifactAnalysis.analysis.kekurangan }
                      ].map((section) => (
                        <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white/46">
                            {section.title}
                          </p>
                          <ul className="mt-4 space-y-3">
                            {section.items.map((text) => (
                              <li key={text} className="flex gap-3 text-sm leading-relaxed text-white/62">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-accent/18 bg-accent/[0.045] p-5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                        Kajian Teori PPG
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/66">
                        {activeArtifactAnalysis.analysis.kajianTeori}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.main>

      <AnimatePresence>
        {openDocGallery !== null && activeFullscreenPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenDocGallery(null)}
            className="fixed inset-0 z-[105] overflow-hidden bg-black/95"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpenDocGallery(null)}
              className="absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-brand-night/70 text-white/88 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-md transition-colors hover:border-accent/45 hover:text-accent md:right-6 md:top-6"
              aria-label="Tutup galeri dokumentasi"
            >
              <X size={22} />
            </button>

            {/* Photo counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 rounded-full border border-white/10 bg-brand-night/60 px-4 py-2 font-mono text-xs text-white/70 backdrop-blur-md">
              {(openDocGallery ?? 0) + 1} / {documentationGalleryItems.length}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 h-screen w-screen flex items-center justify-center"
            >
              <div
                className="relative h-full w-full flex items-center justify-center"
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
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeFullscreenPhoto}
                    src={activeFullscreenPhoto}
                    alt={activeFullscreenItem?.alt ?? 'Dokumentasi'}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="max-h-[85vh] max-w-[90vw] object-contain select-none"
                    draggable={false}
                  />
                </AnimatePresence>

                {documentationGalleryItems.length > 1 && (
                  <>
                    {/* Left arrow button */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setOpenDocGallery((prev) => (prev === null ? prev : (prev + documentationGalleryItems.length - 1) % documentationGalleryItems.length)); }}
                      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-brand-night/60 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:border-accent/45 hover:text-accent hover:scale-110 hover:bg-brand-night/80"
                      aria-label="Foto sebelumnya"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    {/* Right arrow button */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setOpenDocGallery((prev) => (prev === null ? prev : (prev + 1) % documentationGalleryItems.length)); }}
                      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-brand-night/60 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:border-accent/45 hover:text-accent hover:scale-110 hover:bg-brand-night/80"
                      aria-label="Foto berikutnya"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-only Bottom Navigation Bar */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="md:hidden fixed bottom-6 left-4 right-4 z-[100] flex justify-center"
      >
        <motion.nav 
          className="flex max-w-full items-center gap-1 overflow-x-auto p-2 bg-brand-night/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
          style={{ scrollbarWidth: 'none' }}
        >
          {[
            { id: 'beranda', icon: <Layout size={20} /> },
            { id: 'profil', icon: <GraduationCap size={20} /> },
            { id: 'dokumentasi', icon: <Briefcase size={20} /> },
            { id: 'artefak', icon: <Target size={20} /> },
            { id: 'analisis-evaluasi', icon: <Award size={20} /> },
            { id: 'penilaian', icon: <FileText size={20} /> },
            { id: 'model-guru', icon: <Sparkles size={20} /> },
            { id: 'video', icon: <Youtube size={20} /> },
            { id: 'sertifikat', icon: <Award size={20} /> },
            { id: 'kontak', icon: <Mail size={20} /> }
          ].map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setActiveSection(item.id);
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative shrink-0 rounded-xl p-2.5 transition-colors ${
                activeSection === item.id ? 'text-brand-night' : 'text-white/40 hover:text-white'
              }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="mobile-bottom-nav-active"
                  className="absolute inset-0 rounded-xl bg-accent shadow-lg shadow-accent/20"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 block">
                {item.icon}
              </span>
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
