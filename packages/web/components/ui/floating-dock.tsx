"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

interface FloatingDockProps {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  label: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items, className, label }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold mb-2">{label}</h3>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex flex-wrap h-auto sm:h-16 gap-2 sm:gap-4 items-end rounded-2xl bg-gray-800 p-2 sm:px-4 sm:pb-3"
      >
        {items.map((item, index) => (
          <IconContainer key={index} mouseX={mouseX} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = React.useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square w-10 sm:w-auto rounded-full bg-gray-600 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {width.get() > 60 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white text-xs absolute -top-8 whitespace-nowrap"
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-2xl">{icon}</span>
      </motion.div>
    </Link>
  );
}