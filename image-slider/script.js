const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

let index = 0;

function showSlide(i) {

  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
  });
});

const dots = document.querySelectorAll(".dot");

showSlide(index);

// Next
nextBtn.addEventListener("click", () => {
  index++;
  if (index === slides.length) index = 0;
  showSlide(index);
});

// Prev
prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) index = slides.length - 1;
  showSlide(index);
});

// Auto Play
setInterval(() => {
  index++;
  if (index === slides.length) index = 0;
  showSlide(index);
}, 3000);

// Keyboard control
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});
