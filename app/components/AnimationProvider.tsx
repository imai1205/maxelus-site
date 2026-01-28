"use client";

import { useEffect, useRef, useState, ReactNode, createContext, useContext, memo, useCallback } from "react";

// Intersection Observer Hook for scroll animations - Optimized with single observer
const observerCallbacks = new Map<Element, (isVisible: boolean) => void>();
let globalObserver: IntersectionObserver | null = null;

function getGlobalObserver() {
  if (!globalObserver && typeof window !== "undefined") {
    globalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observerCallbacks.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
  }
  return globalObserver;
}

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = getGlobalObserver();
    const currentRef = ref.current;
    
    if (currentRef && observer) {
      observerCallbacks.set(currentRef, (visible) => {
        if (visible) {
          setIsVisible(true);
          // Cleanup after becoming visible (once)
          observer.unobserve(currentRef);
          observerCallbacks.delete(currentRef);
        }
      });
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observer) {
        observer.unobserve(currentRef);
        observerCallbacks.delete(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}

// Parallax scroll context - Optimized with RAF throttling
const ParallaxContext = createContext<{ scrollY: number }>({ scrollY: 0 });

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
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

// Animated Section Component - Memoized
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "flip" | "rotate";
  delay?: number;
  duration?: number;
}

export const AnimatedSection = memo(function AnimatedSection({ 
  children, 
  className = "", 
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getTransform = useCallback(() => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up": return "translateY(24px)";
        case "fade-down": return "translateY(-24px)";
        case "fade-left": return "translateX(24px)";
        case "fade-right": return "translateX(-24px)";
        case "zoom-in": return "scale(0.9)";
        case "zoom-out": return "scale(1.1)";
        case "rotate": return "rotate(6deg)";
        default: return "none";
      }
    }
    return "none";
  }, [animation, isVisible]);

  return (
    <div
      ref={ref}
      className={`gpu-accelerate ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
});

// Staggered Animation Container - Optimized
interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredContainer = memo(function StaggeredContainer({ 
  children, 
  className = "", 
  staggerDelay = 80 
}: StaggeredContainerProps) {
  const { ref, isVisible } = useScrollAnimation();
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="gpu-accelerate"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? index * staggerDelay : 0}ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? index * staggerDelay : 0}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
});

// Text Reveal Animation - Simplified
interface TextRevealProps {
  text: string;
  className?: string;
  charDelay?: number;
  wordMode?: boolean;
}

export const TextReveal = memo(function TextReveal({ 
  text, 
  className = "", 
  charDelay = 20, 
  wordMode = true 
}: TextRevealProps) {
  const { ref, isVisible } = useScrollAnimation();
  const elements = wordMode ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={className}>
      {elements.map((char, index) => (
        <span
          key={index}
          className="inline-block gpu-accelerate"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 300ms cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? index * charDelay : 0}ms, transform 300ms cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? index * charDelay : 0}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
          {wordMode && index < elements.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
});

// Counter Animation - Optimized
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter = memo(function AnimatedCounter({ 
  end, 
  duration = 1500, 
  suffix = "", 
  prefix = "", 
  className = "" 
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
});

// Floating Animation Component - CSS only
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export const FloatingElement = memo(function FloatingElement({ 
  children, 
  className = "", 
  duration = 3,
  delay = 0 
}: FloatingElementProps) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
});

// Magnetic Hover Effect - Simplified
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const Magnetic = memo(function Magnetic({ 
  children, 
  className = "", 
  strength = 0.2 
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
});

// 3D Tilt Card - Simplified
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  style?: React.CSSProperties;
}

export const TiltCard = memo(function TiltCard({ 
  children, 
  className = "", 
  maxTilt = 8,
  style
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * maxTilt * -1;
    const tiltY = (x - 0.5) * maxTilt;
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`);
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out gpu-accelerate ${className}`}
      style={{ transform, transformStyle: "preserve-3d", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
});

// Lightweight Gradient Orbs - CSS only
export const GradientOrbs = memo(function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[100px] bg-gradient-radial from-[#fff100] to-transparent"
        style={{
          top: "-15%",
          left: "-5%",
          animation: "orb-float 20s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.1] blur-[80px] bg-gradient-radial from-[#fdc700] to-transparent"
        style={{
          bottom: "10%",
          right: "-3%",
          animation: "orb-float 25s ease-in-out infinite reverse"
        }}
      />
    </div>
  );
});

// Simplified Cursor - CSS only, no JS tracking
export const CursorFollower = memo(function CursorFollower() {
  // Disabled for performance - use CSS hover effects instead
  return null;
});
