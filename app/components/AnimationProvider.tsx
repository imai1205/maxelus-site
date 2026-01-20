"use client";

import { useEffect, useRef, useState, ReactNode, createContext, useContext } from "react";

// Intersection Observer Hook for scroll animations
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// Parallax scroll context
const ParallaxContext = createContext<{ scrollY: number }>({ scrollY: 0 });

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxContext.Provider value={{ scrollY }}>
      {children}
    </ParallaxContext.Provider>
  );
}

export function useParallax() {
  return useContext(ParallaxContext);
}

// Animated Section Component
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "flip" | "rotate";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  animation = "fade-up",
  delay = 0,
  duration = 700,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up": return "opacity-0 translate-y-16";
        case "fade-down": return "opacity-0 -translate-y-16";
        case "fade-left": return "opacity-0 translate-x-16";
        case "fade-right": return "opacity-0 -translate-x-16";
        case "zoom-in": return "opacity-0 scale-75";
        case "zoom-out": return "opacity-0 scale-125";
        case "flip": return "opacity-0 rotateY-90";
        case "rotate": return "opacity-0 rotate-12";
        default: return "opacity-0";
      }
    }
    return "opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0";
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${className} ${getAnimationClass()}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      {children}
    </div>
  );
}

// Staggered Animation Container
interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredContainer({ children, className = "", staggerDelay = 100 }: StaggeredContainerProps) {
  const { ref, isVisible } = useScrollAnimation();
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDuration: "600ms",
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Text Reveal Animation
interface TextRevealProps {
  text: string;
  className?: string;
  charDelay?: number;
  wordMode?: boolean;
}

export function TextReveal({ text, className = "", charDelay = 30, wordMode = false }: TextRevealProps) {
  const { ref, isVisible } = useScrollAnimation();
  const elements = wordMode ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={className}>
      {elements.map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDuration: "400ms",
            transitionDelay: isVisible ? `${index * charDelay}ms` : "0ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          {char === " " ? "\u00A0" : char}
          {wordMode && index < elements.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

// Counter Animation
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "", className = "" }: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// Floating Animation Component
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({ 
  children, 
  className = "", 
  amplitude = 10, 
  duration = 3,
  delay = 0 
}: FloatingElementProps) {
  return (
    <div
      className={className}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        ["--float-amplitude" as string]: `${amplitude}px`
      }}
    >
      {children}
    </div>
  );
}

// Magnetic Hover Effect
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// 3D Tilt Card
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * maxTilt * -1;
    const tiltY = (x - 0.5) * maxTilt;
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Gradient Orb Background
export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #fff100 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
          animation: "orb-float-1 20s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #fdc700 0%, transparent 70%)",
          bottom: "10%",
          right: "-5%",
          animation: "orb-float-2 25s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #00c950 0%, transparent 70%)",
          top: "40%",
          left: "30%",
          animation: "orb-float-3 18s ease-in-out infinite"
        }}
      />
    </div>
  );
}

// Particle Background
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const particleCount = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 241, 0, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 241, 0, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}

// Cursor Follower
export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
          width: isHovering ? "60px" : "20px",
          height: isHovering ? "60px" : "20px",
          borderRadius: "50%",
          backgroundColor: "#fff100",
          opacity: 0.8
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          transition: "all 0.15s ease-out",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 241, 0, 0.5)"
        }}
      />
    </>
  );
}
