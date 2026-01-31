// Get Inputs
const baseColor = document.getElementById("base");
const widthRange = document.getElementById("width");
const heightRange = document.getElementById("height");
const radiusRange = document.getElementById("border-radius");
const opacityRange = document.getElementById("opacity");

// Get Image
const image = document.querySelector("#preview");

// Base Color (Border Color)
baseColor.addEventListener("input", () => {
  image.style.border = `5px solid ${baseColor.value}`;
});

// Width Control
widthRange.addEventListener("input", () => {
  image.style.width = widthRange.value + "%";
});

// Height Control
heightRange.addEventListener("input", () => {
  image.style.height = heightRange.value + "%";
});

// Border Radius Control
radiusRange.addEventListener("input", () => {
  image.style.borderRadius = radiusRange.value + "px";
});

// Opacity Control
opacityRange.addEventListener("input", () => {
  image.style.opacity = opacityRange.value;
});
