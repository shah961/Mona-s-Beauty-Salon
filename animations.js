/**
 * MONA'S BEAUTY SALON - ANIMATION ENGINE
 * GSAP Scroll Reveals & Subtle Luxury Transitions
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Respect User Preference for Reduced Motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return; // Skip JS heavy animations
  }

  // Check if GSAP CDN is available
  if (typeof gsap !== "undefined") {
    initGSAPAnimations();
  }
});

function initGSAPAnimations() {
  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Entrance Sequence
  const heroTitle = document.querySelector(".hero-title");
  const heroLead = document.querySelector(".hero-lead");
  const heroCta = document.querySelector(".hero-cta-group");
  const heroImg = document.querySelector(".hero-image-wrapper");

  if (heroTitle) {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    timeline
      .from(heroTitle, { y: 30, opacity: 0, delay: 0.2 })
      .from(heroLead, { y: 20, opacity: 0 }, "-=0.6")
      .from(heroCta, { y: 20, opacity: 0 }, "-=0.6");

    if (heroImg) {
      timeline.from(heroImg, { scale: 0.95, opacity: 0, duration: 1.2 }, "-=0.8");
    }
  }

  // 2. Scroll Reveals for Cards and Sections
  if (typeof ScrollTrigger !== "undefined") {
    // Service Cards Stagger Reveal
    const serviceCards = document.querySelectorAll(".service-card");
    if (serviceCards.length > 0) {
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: ".services-preview",
          start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }

    // Trust Grid Counter Reveal
    const trustCards = document.querySelectorAll(".trust-card");
    if (trustCards.length > 0) {
      gsap.from(trustCards, {
        scrollTrigger: {
          trigger: ".trust-section",
          start: "top 85%"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power1.out"
      });
    }

    // Feature Cards Reveal
    const featureCards = document.querySelectorAll(".feature-card");
    if (featureCards.length > 0) {
      gsap.from(featureCards, {
        scrollTrigger: {
          trigger: ".why-choose-us",
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  }
}
