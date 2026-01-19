const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
buttons.forEach(button => {
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
                currentValue = eval(currentValue);
                display.innerText = currentValue;
            } catch (error) {
                display.innerText = "Error";
                currentValue = "";
            }
            return;
        }
        // Append the value to the current input
        if (currentValue === "0" && value !== ".") {
            currentValue = value;
        } else {
            currentValue += value;
        }
        display.innerText = currentValue;
    });
});