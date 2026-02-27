"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#blaqhouse", label: "BlaqHouse" },
  { href: "/#upcoming-events", label: "Upcoming Events" },
  { href: "/#contact", label: "Contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [hasViewPortHeight, setHasViewPortHeight] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/make-booking") {
        setHasViewPortHeight(true);
        return;
      }

      const threshold = window.innerHeight;
      const isVisible = window.scrollY > threshold;
      setHasViewPortHeight(isVisible);
      if (!isVisible) setMobileOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      if (!overlayRef.current || !menuRef.current) return;
      const overlay = overlayRef.current;
      const menu = menuRef.current;
      const links = menu.querySelectorAll(".mobile-nav-link");

      gsap.killTweensOf([overlay, menu, links]);

      if (mobileOpen) {
        gsap.set([overlay, menu], { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(overlay, { autoAlpha: 1, duration: 0.2, ease: "power2.out" }, 0)
          .to(
            menu,
            { x: "0%", autoAlpha: 1, duration: 0.35, ease: "power3.out" },
            0,
          )
          .fromTo(
            links,
            { y: 10, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.25,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.12,
          );
        return;
      }

      gsap
        .timeline({
          onComplete: () => {
            gsap.set([overlay, menu], { pointerEvents: "none" });
          },
        })
        .to(menu, { x: "100%", duration: 0.3, ease: "power3.in" }, 0)
        .to(overlay, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.08);
    },
    { scope: menuRef, dependencies: [mobileOpen] },
  );

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.to(headerRef.current, {
        y: hasViewPortHeight ? 0 : -40,
        autoAlpha: hasViewPortHeight ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    },
    { scope: headerRef, dependencies: [hasViewPortHeight] },
  );

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <section
        ref={headerRef}
        className="fixed left-0 right-0 top-2 sm:top-4 z-40"
      >
        <div className="page-container">
          <nav className="w-full rounded-2xl border-[0.5px] border-gray-600 bg-white/10 backdrop-blur-2xl px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
            <div className="relative w-[140px] sm:w-[180px] lg:w-[200px] h-[44px] sm:h-[52px] shrink-0">
              <Image
                src="/images/blaqmix_logo_black.png"
                alt="Blaqmix_logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <ul className="flex gap-x-5 lg:gap-x-7 text-xs sm:text-sm font-body-inter font-medium list-none max-md:hidden text-white">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="hover:link-hovered">
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-10 h-10 rounded-xl border border-gray-500 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-gray-400 transition-all duration-300"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} className="text-lg" />
              </button>
              <Link
                href="/make-booking"
                className="hidden md:block px-3 py-2 sm:px-4 sm:py-3 bg-black rounded-t-2xl rounded-br-2xl font-body-inter font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap hover:bg-blaqmix-red transition-all duration-300"
              >
                Book DJ now
              </Link>
            </div>
          </nav>
        </div>
      </section>

      {hasViewPortHeight && (
        <>
          {/* Mobile menu overlay */}
          <div
            ref={overlayRef}
            role="presentation"
            onClick={closeMenu}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Mobile menu panel */}
          <div
            ref={menuRef}
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-[#0d0d0d] border-l border-gray-700 shadow-2xl md:hidden flex flex-col pointer-events-none"
            style={{ transform: "translateX(100%)" }}
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-700">
              <span className="font-clash-display font-semibold text-lg text-white">
                Menu
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-10 h-10 rounded-xl border border-gray-600 bg-white/5 flex items-center justify-center text-white hover:bg-blaqmix-red hover:border-blaqmix-red transition-all duration-300"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="mobile-nav-link py-3 px-4 rounded-xl text-white font-body-inter font-medium text-base hover:bg-white/10 hover:text-blaqmix-red transition-all duration-300"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/make-booking"
                onClick={closeMenu}
                className="mobile-nav-link mt-4 py-4 px-5 rounded-2xl bg-blaqmix-red text-white font-body-inter font-semibold text-center hover:bg-blaqmix-red/90 transition-all duration-300"
              >
                Book DJ now
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
