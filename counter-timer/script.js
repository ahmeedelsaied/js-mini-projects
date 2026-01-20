// counter logic

let count = 0;
const counterDisplay = document.getElementById("counter-value");
const incrementButton = document.getElementById("increment-btn");
const decrementButton = document.getElementById("decrement-btn");
const resetButton = document.getElementById("reset-btn");

function updateDisplay() {
  counterDisplay.textContent = count;
}

function animate(element) {
  element.style.transform = "scale(1.2)";
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 150);
}

incrementButton.addEventListener("click", () => {
  count++;
  updateDisplay();
  animate(counterDisplay);
});

decrementButton.addEventListener("click", () => {
  if (count > 0) {
    count--;
    updateDisplay();
    animate(counterDisplay);
  }
});
resetButton.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});

// timer logic
let timer;
let seconds = 0;
const timerDisplay = document.getElementById("timer-value");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetTimerButton = document.getElementById("reset-timer-btn");

function updateTimerDisplay() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${mins}:${secs}`;
}
startButton.addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});
resetTimerButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  updateTimerDisplay();
});

// Initialize displays
updateDisplay();
updateTimerDisplay();

// add keyboard support for counter
document.addEventListener("keydown", (e) => {
  // Counter
  if (e.key === "ArrowUp") {
    count++;
    counterDisplay.innerText = count;
    animate(counterDisplay);
  }

  if (e.key === "ArrowDown") {
    if (count > 0) {
      count--;
      counterDisplay.innerText = count;
      animate(counterDisplay);
    }
  }

  // Timer
  if (e.key === " ") {
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      interval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
      }, 1000);
    }
  }

  if (e.key === "r") {
    seconds = 0;
    updateTimerDisplay();
  }
});
