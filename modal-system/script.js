const overlay = document.querySelector(".overlay");
const openButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".closeBtn");

let activeModal = null;

// Open Modal (Reusable)
function openModal(modalId) {
  activeModal = document.getElementById(modalId);

  activeModal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  document.body.classList.add("lock-scroll");

  setTimeout(() => {
    activeModal.classList.add("active");
  }, 10);
}

// Close Modal
function closeModal() {
  if (!activeModal) return;

  activeModal.classList.remove("active");

  setTimeout(() => {
    activeModal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.classList.remove("lock-scroll");
    activeModal = null;
  }, 200);
}

// Open buttons
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.dataset.modal;
    openModal(modalId);
  });
});

// Close buttons
closeButtons.forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

// Click outside
overlay.addEventListener("click", closeModal);

// ESC close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
