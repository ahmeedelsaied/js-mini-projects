const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categorySelect = document.getElementById("expenseCategory");
const addBtn = document.getElementById("addExpenseBtn");

const list = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const filterCategory = document.getElementById("filterCategory");

// Load from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Initial render
renderExpenses(expenses);

// Add Expense
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;

  if (!name || !amount || !category) return;

  const expense = {
    id: Date.now(),
    name,
    amount,
    category,
  };

  expenses.push(expense);
  saveToStorage();
  renderExpenses(expenses);
  clearInputs();
});

// Render expenses
function renderExpenses(data) {
  list.innerHTML = "";

  data.forEach((exp) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${exp.name}</td>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>
        <button class="btn btn-sm btn-danger"
          onclick="deleteExpense(${exp.id})">
          Delete
        </button>
      </td>
    `;

    list.appendChild(tr);
  });

  updateTotal(data);
}

// Delete
function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  saveToStorage();
  renderExpenses(expenses);
}

// Total
function updateTotal(data) {
  const total = data.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmount.innerText = total;
}

// Filter
filterCategory.addEventListener("change", () => {
  const value = filterCategory.value;

  if (value === "") {
    renderExpenses(expenses);
  } else {
    const filtered = expenses.filter((exp) => exp.category === value);
    renderExpenses(filtered);
  }
});

// Save
function saveToStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Clear
function clearInputs() {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.value = "";
}
