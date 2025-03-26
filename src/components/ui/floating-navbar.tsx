"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface FloatingNavProps {
  navItems?: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "For Candidates", link: "/candidate-form" },
  { name: "Dashboard", link: "/dashboard" },
  { name: "For Recruiters", link: "/recruiter-search" },
];

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems = defaultNavItems,
  className,
}) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Listen to scroll events to determine the navbar’s visibility (floating behavior)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Always show the navbar when near the top
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // scrolling down → hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // scrolling up → show
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md",
            className
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Brand */}
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">
                  SkillTrack
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-blue-600",
                      pathname === item.link
                        ? "text-blue-600"
                        : "text-gray-700"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white shadow-md">
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    className={cn(
                      "block py-3 px-4 text-base font-medium rounded-md transition-colors",
                      pathname === item.link
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
