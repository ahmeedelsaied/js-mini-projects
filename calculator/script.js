const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    // Handle clear button
    if (value === "AC") {
      currentValue = "";
      display.innerText = "0";
      return;
    }
    // Handle delete button
    if (value === "DEL") {
      currentValue = currentValue.slice(0, -1);
      display.innerText = currentValue || "0";
      return;
    }
    // Handle equals button
    if (value === "=") {
      try {
        currentValue = eval(currentValue).toString().slice(0, 10);
        display.innerText = currentValue;
      } catch (error) {
        display.innerText = "Error";
        currentValue = "";
      }
      return;
    }
    // Append the value to the current input
    const operators = ["+", "-", "*", "/"];

    const lastChar = currentValue.slice(-1);

    // منع تكرار العمليات
    if (operators.includes(value) && operators.includes(lastChar)) {
      return;
    }

    currentValue += value;
    display.innerText = currentValue;
  });
});
// add keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", "."].includes(e.key)) {
    currentValue += e.key;
    display.innerText = currentValue;
  }

  if (e.key === "Enter") {
    try {
      currentValue = eval(currentValue);
      display.innerText = currentValue;
    } catch {
      display.innerText = "Error";
      currentValue = "";
    }
  }

  if (e.key === "Backspace") {
    currentValue = currentValue.slice(0, -1);
    display.innerText = currentValue || "0";
  }

  if (e.key === "Escape") {
    currentValue = "";
    display.innerText = "0";
  }
});
