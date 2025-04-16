// DOM Elements
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");

const detailsButtons = document.querySelectorAll(".details-button");
const toggleThemeButton = document.getElementById("toggleTheme");
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

// Save form data to localStorage when inputs change
const formInputs = [nameInput, emailInput, subjectInput, messageInput];
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    localStorage.setItem(`form_${input.id}`, input.value);
  });
});

// Load saved form data on page load
window.addEventListener("DOMContentLoaded", () => {
  formInputs.forEach((input) => {
    const savedValue = localStorage.getItem(`form_${input.id}`);
    if (savedValue) input.value = savedValue;
  });
});

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function () {
  // Add scroll animation to sections
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Typed.js Initialization
const typed = new Typed("#typed-text", {
  strings: [
    "Mathematician",
    "Data Scientist",
    "Problem Solver",
    "Web Developer",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  showCursor: true,
  cursorChar: "|",
});

// Second typed.js instance
const specialties = new Typed("#specialties", {
  strings: [
    "Python",
    "Data Science",
    "Machine Learning",
    "Web Development",
    "Problem Solving",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  showCursor: true,
  cursorChar: "|",
});

// Form Validation
form.addEventListener("submit", function (event) {
  event.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please tell us your name 😊";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "We need your email to get back to you 📧";
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Oops! That doesn't look like a valid email 🤔";
    isValid = false;
  }

  if (subjectInput.value.trim() === "") {
    subjectError.textContent = "What's this about? Please add a subject 📝";
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    messageError.textContent =
      "We'd love to hear from you! Please write a message 💬";
    isValid = false;
  }

  if (isValid) {
    // Submit animation
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate form submission
    setTimeout(() => {
      submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitButton.style.backgroundColor = "var(--ACCENT-COLOR)";

      // Clear localStorage after successful submission
      formInputs.forEach((input) => {
        localStorage.removeItem(`form_${input.id}`);
      });

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitButton.innerHTML = "Send Message";
        submitButton.style.backgroundColor = "";
      }, 2000);
    }, 1500);
  } else {
    fadeOutErrorMessages();
  }
});

// Fade Out Error Messages
function fadeOutErrorMessages() {
  const errorMessages = [nameError, emailError, subjectError, messageError];

  setTimeout(() => {
    errorMessages.forEach((error) => {
      if (error.textContent !== "") {
        error.style.opacity = "0.5";
      }
    });
  }, 5000);

  setTimeout(() => {
    errorMessages.forEach((error) => {
      if (error.textContent !== "") {
        error.textContent = "";
        error.style.opacity = "1";
      }
    });
  }, 10000);
}

// Show/Hide Project Details
detailsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const projectCard = button.closest(".project-card");
    const details = projectCard.querySelector(".project-details");
    details.classList.toggle("open");

    if (details.classList.contains("open")) {
      button.textContent = "Hide Details";
      // Scroll the details into view
      details.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      button.textContent = "Show Details";
    }
  });
});

// Dark Mode Toggle
toggleThemeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateButtonIcon();
});

// Update Dark Mode Button Icon
function updateButtonIcon() {
  const icon = toggleThemeButton.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.className = "fas fa-sun"; // Sun icon for light mode option
  } else {
    icon.className = "fas fa-moon"; // Moon icon for dark mode option
  }
}

// Load Saved Theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

updateButtonIcon();

// Add transition for filtered projects
projects.forEach((project) => {
  project.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});

// Project Filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const selectedCategory = this.getAttribute("data-category");

    projects.forEach((project) => {
      const projectCategory = project.getAttribute("data-category");

      if (selectedCategory === "all" || projectCategory === selectedCategory) {
        project.style.opacity = "1";
        project.style.transform = "scale(1)";
        setTimeout(() => {
          project.style.display = "block";
        }, 10);
      } else {
        project.style.opacity = "0";
        project.style.transform = "scale(0.8)";
        setTimeout(() => {
          project.style.display = "none";
        }, 300);
      }
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // Adjust for header height
        behavior: "smooth",
      });
    }
  });
});
