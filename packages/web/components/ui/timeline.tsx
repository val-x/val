"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [height, setHeight] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHeight(latest * 100);
  });

  return (
    <div ref={ref} className="relative w-full">
      <div className="absolute left-0 sm:left-8 top-0 h-full w-[1px] bg-neutral-200 dark:bg-neutral-800">
        <motion.div
          className="absolute left-0 top-0 h-full w-full bg-blue-500"
          style={{ scaleY: height / 100, transformOrigin: "top" }}
        />
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-10 sm:mb-20">
          <div className="flex flex-row sm:flex-col items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {index + 1}
            </div>
            {index !== data.length - 1 && (
              <div className="h-[1px] sm:h-full w-full sm:w-[1px] bg-blue-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};