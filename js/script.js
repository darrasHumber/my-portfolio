const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");

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
    emailError.textContent = "Oops! That doesn’t look like a valid email 🤔";
    isValid = false;
  }

  if (subjectInput.value.trim() === "") {
    subjectError.textContent = "What’s this about? Please add a subject 📝";
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    messageError.textContent =
      "We’d love to hear from you! Please write a message 💬";
    isValid = false;
  }

  if (isValid) {
    alert("Thank you for reaching out! We’ll get back to you soon. 😊");
    form.reset();
  } else {
    fadeOutErrorMessages();
  }
});
