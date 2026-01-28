const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Forms
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

// Buttons
const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");

// Inputs
const inputs = document.querySelectorAll("input");

// =======================
// Panel Animation
// =======================

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Input Animation Effect

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", () => {
    input.style.transform = "scale(1)";
  });
});

// =======================
// Sign Up Validation
// =======================

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = signupForm.querySelector('input[type="text"]').value.trim();
  const email = signupForm.querySelector('input[type="email"]').value.trim();
  const password = signupForm
    .querySelector('input[type="password"]')
    .value.trim();

  if (!name || !email || !password) {
    showError(signupForm);
    return;
  }

  showLoading(signupBtn);

  setTimeout(() => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Account Created Successfully 🎉");
    signupBtn.innerHTML = "Sign Up";
    container.classList.remove("right-panel-active");
  }, 1500);
});

// =======================
// Sign In Validation
// =======================
fname = document.getElementById("fname");
LName = document.getElementById("LName");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signinForm.querySelector('input[type="email"]').value.trim();
  const password = signinForm
    .querySelector('input[type="password"]')
    .value.trim();

  if (!email || !password) {
    showError(signinForm);
    return;
  }

  showLoading(signinBtn);

  setTimeout(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
      alert(`Welcome Back ${fname.value} ${LName.value} 😊`);
    } else {
      alert("Wrong Email Or Password ❌");
    }

    signinBtn.innerHTML = "Sign In";
  }, 1500);
});

// =======================
// Helper Functions
// =======================

function showLoading(button) {
  button.innerHTML = "Loading...";
  button.disabled = true;

  setTimeout(() => {
    button.disabled = false;
  }, 1500);
}

function showError(form) {
  form.classList.add("shake");

  setTimeout(() => {
    form.classList.remove("shake");
  }, 500);
}
