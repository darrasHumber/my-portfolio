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

// Typed.js Initialization
const typed = new Typed("#typed-text", {
  strings: [
    "Python.",
    "Data Science.",
    "Machine Learning.",
    "Web Development.",
    "Problem Solving.",
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
    alert("Thank you for reaching out! We'll get back to you soon. 😊");
    form.reset();
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
    const details = button.parentElement.nextElementSibling;
    details.classList.toggle("open");

    if (details.classList.contains("open")) {
      button.textContent = "Hide Details";
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

// Project Filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const selectedCategory = this.getAttribute("data-category");

    projects.forEach((project) => {
      const projectCategory = project.getAttribute("data-category");

      if (selectedCategory === "all" || projectCategory === selectedCategory) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});
