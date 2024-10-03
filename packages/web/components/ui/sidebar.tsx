"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarTrigger = () => {
  const { open, setOpen } = useSidebar();
  return (
    <button
      className="fixed top-4 right-4 z-50 md:hidden"
      onClick={() => setOpen(!open)}
    >
      {open ? (
        <IconX className="h-6 w-6" />
      ) : (
        <IconMenu2 className="h-6 w-6" />
      )}
    </button>
  );
};

export const SidebarContent = ({
  className,
  links,
}: {
  className?: string;
  links: Links[];
}) => {
  const { open, setOpen } = useSidebar();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className={cn(
            "fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg z-40 overflow-y-auto",
            className
          )}
        >
          <nav className="flex flex-col p-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                onClick={() => setOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};