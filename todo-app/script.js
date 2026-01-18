// declare elements in the DOM
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
// function to add a new todo item
addBtn.addEventListener("click", addTodo);
function addTodo() {
  const todoText = input.value.trim();
  if (todoText == "") {
    alert("Please enter a task");
    return;
  }
  // add li to ul
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = todoText;
  li.appendChild(span);
  todoList.appendChild(li);
  saveTodos();
  updateCounter();
  // add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  li.appendChild(deleteBtn);

  // make delete button functional
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTodos();
    updateCounter();
  });

  // add doneButton
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "✔️";
  doneBtn.addEventListener("click", () => {
    span.classList.toggle("completed");
    saveTodos();
    updateCounter();
  });
  li.appendChild(doneBtn);
}
// add local storage functionality
function saveTodos() {
  const todos = [];
  document.querySelectorAll("#todo-list li ").forEach(function (li) {
    const text = document.querySelector("span").innerText;
    const completed = document
      .querySelector("span")
      .classList.contains("completed");
    todos.push({ text: text, completed: completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// add load functionality
window.addEventListener("load", loadTodos);

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos === null) return;

  const todos = JSON.parse(savedTodos);

  todos.forEach(function (todo) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = todo.text;

    if (todo.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";

    deleteBtn.addEventListener("click", function () {
      li.remove();
      saveTodos();
      updateCounter();
    });

    span.addEventListener("click", function () {
      span.classList.toggle("completed");
      saveTodos();
      updateCounter();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    updateCounter();
  });
}
// add enter key functionality
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
// add counter functionality
const counter = document.getElementById("counter");
function updateCounter() {
  const count = document.querySelectorAll("#todo-list li").length;
  counter.innerText = `total tasks: ${count}`;
}

// add clear all functionality
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
  todoList.innerHTML = "";
  saveTodos();
  updateCounter();
});
