/**
 * MONA'S BEAUTY SALON - MAIN SCRIPT
 * Business Location: Shahkot, Punjab, Pakistan
 * Phone: 0300 8771307 / +92 300 8771307
 */

"use strict";

// CONFIGURATION CONSTANTS
const BUSINESS_PHONE = "923008771307";
const WHATSAPP_ENABLED = false; // Owner toggleable after confirmation

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCurrentYear();
  initAppointmentForm();
  initGalleryLightbox();
  initFaqAccordion();
});

/**
 * 1. Mobile Navigation Logic
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    toggleBtn.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileMenu.classList.add("open");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    toggleBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.classList.remove("open");
    body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Close when clicking nav link
  const links = mobileMenu.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });
}

/**
 * 2. Dynamic Year Hydration
 */
function initCurrentYear() {
  const year = new Date().getFullYear();
  const yearElements = [
    "current-year",
    "current-year-about",
    "current-year-services",
    "current-year-contact",
    "current-year-privacy",
    "current-year-terms"
  ];

  yearElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });
}

/**
 * 3. Appointment Form Logic & Validation
 */
function initAppointmentForm() {
  const form = document.getElementById("appointment-form");
  const responseBox = document.getElementById("form-response-message");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset State
    let isValid = true;
    const nameInput = document.getElementById("user_name");
    const phoneInput = document.getElementById("user_phone");

    // Clear Errors
    form.querySelectorAll(".form-group").forEach(group => group.classList.remove("has-error"));

    // Name Validation
    if (!nameInput.value.trim()) {
      setError(nameInput);
      isValid = false;
    }

    // Phone Validation
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
      setError(phoneInput);
      isValid = false;
    }

    if (isValid) {
      const clientName = nameInput.value.trim();
      
      // Dynamic Static Response (No Fake Backend Claims)
      responseBox.className = "form-response success";
      responseBox.innerHTML = `
        <strong>Thank you, ${escapeHTML(clientName)}!</strong><br>
        Your enquiry has been prepared. Please call Mona's Beauty Salon directly at 
        <a href="tel:+923008771307"><strong>0300 8771307</strong></a> to confirm your exact timing.
      `;

      form.reset();
    }
  });

  function setError(inputElement) {
    const group = inputElement.closest(".form-group");
    if (group) group.classList.add("has-error");
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

/**
 * 4. Lightbox Gallery Logic
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      if (src) {
        lightboxImg.src = src;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
      }
    });

    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/**
 * 5. Accordion Logic for FAQs
 */
function initFaqAccordion() {
  const triggers = document.querySelectorAll(".faq-trigger");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".faq-item");
      const content = item.querySelector(".faq-content");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other items
      document.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
          otherItem.querySelector(".faq-content").style.maxHeight = null;
        }
      });

      // Toggle Current
      if (isExpanded) {
        trigger.setAttribute("aria-expanded", "false");
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        trigger.setAttribute("aria-expanded", "true");
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}
