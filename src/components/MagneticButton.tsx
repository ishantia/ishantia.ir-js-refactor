import React, { useCallback, useRef } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type MagneticButtonProps = AnchorProps | ButtonProps;

export function MagneticButton({
  children,
  className = "",
  strength = 0.24,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !ref.current) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      x.set(offsetX * strength);
      y.set(offsetY * strength);
    },
    [shouldReduceMotion, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      className="inline-flex"
    >
      {"href" in props && props.href !== undefined ? (
        <a className={className} {...(props as AnchorProps)}>
          {children}
        </a>
      ) : (
        <button className={className} {...(props as ButtonProps)}>
          {children}
        </button>
      )}
    </m.div>
  );
}
