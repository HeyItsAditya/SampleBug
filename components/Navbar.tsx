"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Hero from "./Hero";
import OurClients from "./OurClients";
import Counter from "./Counter";
import BugAnimation from "./BugAnimation";
import Footer from "./Footer";

export default function Header() {
  const navItems = [
    {
      name: "Products",
      link: "#features",
      children: [
        { name: "For Individuals", link: "/individuals" },
        { name: "For Businesses", link: "/businesses" },
      ],
    },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];

  const [openDropdown, setOpenDropdown] = useState<string | number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside (only if locked)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdowns = document.querySelectorAll(".desktop-dropdown");
      let clickedInside = false;

      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target as Node)) clickedInside = true;
      });

      if (!clickedInside) {
        setOpenDropdown(null);
        setHoveredIndex(null);
      }
    };

    if (openDropdown === "locked") {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openDropdown]);

  // Mobile outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="top-0 z-50 bg-white dark:bg-neutral-900 shadow-md">
      <Navbar>
        <NavBody>
          <NavbarLogo />

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => {
              const isOpen =
                openDropdown === "locked"
                  ? hoveredIndex === idx
                  : hoveredIndex === idx || openDropdown === idx;

              let closeTimeout: NodeJS.Timeout;

              return (
                <div
                  key={idx}
                  className="relative desktop-dropdown"
                  onMouseEnter={() => {
                    clearTimeout(closeTimeout);
                    if (openDropdown !== "locked") {
                      setHoveredIndex(idx);
                      setOpenDropdown(idx);
                    }
                  }}
                  onMouseLeave={() => {
                    if (openDropdown !== "locked") {
                      closeTimeout = setTimeout(() => {
                        setHoveredIndex(null);
                        setOpenDropdown(null);
                      }, 250); // 👈 delay in ms (tweak 200–300)
                    }
                  }}
                >
                  <button
                    aria-haspopup={!!item.children}
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      if (openDropdown === "locked" && hoveredIndex === idx) {
                        // Unlock (close)
                        setOpenDropdown(null);
                        setHoveredIndex(null);
                      } else {
                        // Lock this dropdown open
                        setHoveredIndex(idx);
                        setOpenDropdown("locked");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (openDropdown === "locked" && hoveredIndex === idx) {
                          setOpenDropdown(null);
                          setHoveredIndex(null);
                        } else {
                          setHoveredIndex(idx);
                          setOpenDropdown("locked");
                        }
                      } else if (e.key === "Escape") {
                        setOpenDropdown(null);
                        setHoveredIndex(null);
                      }
                    }}
                    className="flex items-center gap-1 text-neutral-600 dark:text-neutral-200 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
                  >
                    {item.name}
                    {item.children && (
                      <span
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <Image
                          src="/dropdown.png"
                          width={12}
                          height={12}
                          alt="arrow"
                        />
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  {item.children && isOpen && (
                    <div
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-100 dark:border-neutral-700 z-50"
                      role="menu"
                      onMouseEnter={() => clearTimeout(closeTimeout)}
                      onMouseLeave={() => {
                        if (openDropdown !== "locked") {
                          closeTimeout = setTimeout(() => {
                            setHoveredIndex(null);
                            setOpenDropdown(null);
                          }, 250);
                        }
                      }}
                    >
                      <ul className="flex flex-col py-2">
                        {item.children.map((child, cidx) => (
                          <li key={cidx}>
                            <Link
                              href={child.link}
                              className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700 focus:outline-none"
                              onClick={() => {
                                setOpenDropdown(null);
                                setHoveredIndex(null);
                              }}
                              role="menuitem"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-4">
            <NavbarButton className="bg-blue-600" variant="secondary">
              Free Trial
            </NavbarButton>
            <NavbarButton className="bg-blue-950 text-white" variant="primary">
              Free Audit
            </NavbarButton>
          </div>
        </NavBody>

        {/* MOBILE NAVIGATION */}
        <MobileNav className="md:hidden">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClickAction={handleMobileMenuToggle}
            />
          </MobileNavHeader>

          <div ref={mobileMenuRef}>
            <MobileNavMenu
              className={`${isMobileMenuOpen ? "block" : "hidden"}`}
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      >
                        {item.name}
                      </button>
                      {openDropdown === index && (
                        <div className="pl-4">
                          {item.children.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              href={child.link}
                              className="block px-4 py-2 text-sm hover:text-blue-600"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </MobileNavMenu>
          </div>
        </MobileNav>
      </Navbar>
      <Hero />
    </div>
  );
}