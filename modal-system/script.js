const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

function closeModal() {
  modal.classList.remove("active");

  setTimeout(() => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }, 200);
}

// Open
openBtn.addEventListener("click", openModal);

// Close button
closeBtn.addEventListener("click", closeModal);

// Click outside
overlay.addEventListener("click", closeModal);

// ESC key close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
