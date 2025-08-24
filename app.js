// ==========================
// FORMULAIRES MULTI-ÉTAPES
// ==========================
function initMultiStepForms() {
  document.querySelectorAll(".multi-step-form").forEach(form => {
    const steps = form.querySelectorAll(".form-step");
    const nextBtns = form.querySelectorAll(".btn-next");
    const prevBtns = form.querySelectorAll(".btn-prev");
    const stepperItems = form.querySelectorAll(".stepper-item");

    let currentStep = 0;

    function showStep(step) {
      steps.forEach((s, i) => s.classList.toggle("is-active", i === step));
      stepperItems.forEach((item, i) => {
        item.classList.toggle("completed", i < step);
        item.classList.toggle("is-active", i === step);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    nextBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });

    showStep(currentStep);
  });
}

// ==========================
// API HELPERS
// ==========================
async function apiRequest(url, method, data, auth = false) {
  const headers = {};
  let body;

  if (data instanceof FormData) {
    body = data; // Pour upload fichiers
  } else if (data) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { method, headers, body });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, data: json };
}

function displayError(id, message) {
  const box = document.getElementById(id);
  if (box) box.textContent = message;
}

// ==========================
// AUTHENTIFICATION
// ==========================
function initAuthForms() {
  // Connexion
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      displayError("login-error", ""); // reset
      const formData = Object.fromEntries(new FormData(loginForm));

      const { ok, data } = await apiRequest("/api/auth/login", "POST", formData);
      if (ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "profil.html";
      } else {
        displayError("login-error", data.message || "Erreur de connexion");
      }
    });
  }

  // Inscription
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async e => {
      e.preventDefault();
      displayError("register-error", "");
      const formData = Object.fromEntries(new FormData(registerForm));

      const { ok, data } = await apiRequest("/api/auth/register", "POST", formData);
      if (ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "profil.html";
      } else {
        displayError("register-error", data.message || "Erreur d'inscription");
      }
    });
  }
}

// ==========================
// ESPACE HÔTE (ajout expérience)
// ==========================
function initHostExperienceForm() {
  const hostForm = document.getElementById("hostExpForm");
  if (hostForm) {
    hostForm.addEventListener("submit", async e => {
      e.preventDefault();
      displayError("host-error", "");

      const formData = new FormData(hostForm);

  const { ok, data } = await apiRequest("/experiences", "POST", formData, true);
      if (ok) {
        window.location.href = "profil.html";
      } else {
        displayError("host-error", data.message || "Erreur lors de la création");
      }
    });
  }
}

// ==========================
// PROFIL (charger données utilisateur)
// ==========================
async function loadUserProfile() {
  if (document.getElementById("profilPage")) {
    const { ok, data } = await apiRequest("/api/users/me", "GET", null, true);
    if (ok) {
      document.getElementById("userName").textContent = data.name;
      document.getElementById("userEmail").textContent = data.email;
    } else {
      window.location.href = "connexion.html";
    }
  }
}

// ==========================
// INITIALISATION
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  initMultiStepForms();
  initAuthForms();
  initHostExperienceForm();
  loadUserProfile();
});
