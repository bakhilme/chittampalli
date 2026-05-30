/**
 * Chittampalli Exports Private Limited
 * Main JavaScript Entry Point
 *
 * This file initializes all interactive functionality for the website.
 * It uses progressive enhancement — core content is accessible without JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure JS class is present (belt-and-suspenders with inline <head> script)
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Set active navigation link based on current page
  setActiveNavLink();

  // Initialize mobile hamburger menu
  initMobileMenu();

  // Initialize scroll-triggered animations
  initScrollAnimations();

  // Initialize smooth scrolling for anchor links
  initSmoothScroll();

  // Initialize contact form if on contact page
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    initContactForm(contactForm);
  }
});

/**
 * Highlights the current page's navigation link.
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * Initializes mobile hamburger menu toggle behavior.
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  const body = document.body;

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
      toggle.focus();
    }
  });

  // Close menu when a nav link is clicked
  nav.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }
    });
  });
}

/**
 * Initializes intersection observer for scroll-triggered animations.
 * Elements with [data-animate] attribute fade/slide in when visible.
 * Respects prefers-reduced-motion: shows elements immediately if enabled.
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (animatedElements.length === 0) return;

  // Respect prefers-reduced-motion: show all elements immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements if IntersectionObserver is not supported
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Enables smooth scrolling for anchor links pointing to page sections.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * Initializes the contact form with validation and submission handling.
 * @param {HTMLFormElement} form - The contact form element
 */
function initContactForm(form) {
  form.addEventListener('submit', (e) => {
    handleFormSubmit(e, form);
  });
}

/**
 * Handles contact form submission.
 * Prevents default, validates, constructs mailto link, opens mail client.
 * Disables submit button to prevent double-submit; re-enables after mailto
 * construction or after 5 seconds, whichever occurs first (Requirement 6.7).
 * @param {Event} e - The submit event
 * @param {HTMLFormElement} form - The contact form element
 */
function handleFormSubmit(e, form) {
  e.preventDefault();

  const isValid = validateContactForm(form);

  if (!isValid) {
    const firstError = form.querySelector('.error-msg:not(:empty)');
    if (firstError && firstError.previousElementSibling) {
      firstError.previousElementSibling.focus();
    }
    return;
  }

  // Disable submit button to prevent double submission
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Safety timeout: re-enable after 5 seconds regardless (Requirement 6.7)
  let reEnabled = false;
  const safetyTimeout = setTimeout(() => {
    if (!reEnabled) {
      reEnabled = true;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  }, 5000);

  try {
    // Build mailto link with form data
    const formData = new FormData(form);
    const mailtoLink = buildMailtoLink(formData);

    // Open user's default mail client via the mailto link
    window.location.href = mailtoLink;

    // Re-enable submit button immediately after mailto construction (Requirement 6.7)
    if (!reEnabled) {
      reEnabled = true;
      clearTimeout(safetyTimeout);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }

    // Display success confirmation message (Requirement 6.2)
    showSuccessMessage(form, 'Thank you for your inquiry. We will respond within 24 hours.');
    form.reset();
  } catch (error) {
    // Display error message if mailto link construction fails (Requirement 6.9)
    showErrorMessage(form, 'Your inquiry could not be processed. Please try again or email us directly.');

    // Re-enable submit button immediately on error (Requirement 6.9)
    if (!reEnabled) {
      reEnabled = true;
      clearTimeout(safetyTimeout);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  }
}

/**
 * Validates the contact form fields and displays error messages.
 * @param {HTMLFormElement} form - The contact form element
 * @returns {boolean} - true if all validations pass
 */
function validateContactForm(form) {
  const rules = {
    name: { required: true, minLength: 2 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    country: { required: true, minLength: 2 },
    message: { required: true, minLength: 10 }
  };

  let isValid = true;

  for (const [field, rule] of Object.entries(rules)) {
    const input = form.elements[field];
    if (!input) continue;

    const value = input.value.trim();
    const errorEl = input.nextElementSibling;

    if (rule.required && !value) {
      showError(input, errorEl, `${capitalize(field)} is required`);
      isValid = false;
    } else if (rule.minLength && value.length < rule.minLength) {
      showError(input, errorEl, `${capitalize(field)} must be at least ${rule.minLength} characters`);
      isValid = false;
    } else if (rule.pattern && !rule.pattern.test(value)) {
      showError(input, errorEl, `Please enter a valid ${field}`);
      isValid = false;
    } else {
      clearError(input, errorEl);
    }
  }

  return isValid;
}

/**
 * Displays an error message for a form field and marks the input as invalid.
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorEl - The error message element
 * @param {string} message - The error message text
 */
function showError(input, errorEl, message) {
  if (input) {
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
  }
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.setAttribute('role', 'alert');
  }
}

/**
 * Clears an error message for a form field and removes invalid state.
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorEl - The error message element
 */
function clearError(input, errorEl) {
  if (input) {
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
  }
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.removeAttribute('role');
  }
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Builds a mailto link from form data.
 * @param {FormData} formData - The form data
 * @returns {string} - The mailto URL
 */
function buildMailtoLink(formData) {
  const email = 'info@chittampalliexports.com';
  const subject = encodeURIComponent(`Export Inquiry from ${formData.get('name')} - ${formData.get('company') || 'Individual'}`);
  const body = encodeURIComponent(
    `Name: ${formData.get('name')}\n` +
    `Email: ${formData.get('email')}\n` +
    `Company: ${formData.get('company') || 'N/A'}\n` +
    `Country: ${formData.get('country')}\n` +
    `Product Interest: ${formData.get('product-interest') || 'Not specified'}\n\n` +
    `Message:\n${formData.get('message')}`
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}

/**
 * Shows a success message after form submission.
 * @param {HTMLFormElement} form - The form element
 * @param {string} message - The success message
 */
function showSuccessMessage(form, message) {
  let msgEl = form.querySelector('.form-success');
  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.className = 'form-success';
    msgEl.setAttribute('role', 'status');
    msgEl.setAttribute('aria-live', 'polite');
    form.appendChild(msgEl);
  }
  msgEl.textContent = message;
}

/**
 * Shows an error message after form submission failure.
 * @param {HTMLFormElement} form - The form element
 * @param {string} message - The error message
 */
function showErrorMessage(form, message) {
  let msgEl = form.querySelector('.form-error');
  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.className = 'form-error';
    msgEl.setAttribute('role', 'alert');
    msgEl.setAttribute('aria-live', 'assertive');
    form.appendChild(msgEl);
  }
  msgEl.textContent = message;
}
