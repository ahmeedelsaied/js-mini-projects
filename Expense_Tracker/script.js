const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categorySelect = document.getElementById("expenseCategory");
const addBtn = document.getElementById("addExpenseBtn");

const list = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const filterCategory = document.getElementById("filterCategory");
const categorySummary = document.getElementById("categorySummary");

let currentEditId = null;

// Load
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
renderExpenses(expenses);

// Add / Edit
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;

  if (!name || !amount || !category) return;

  if (currentEditId) {
    expenses = expenses.map(exp =>
      exp.id === currentEditId
        ? { ...exp, name, amount, category }
        : exp
    );
    currentEditId = null;
    addBtn.innerText = "Add";
  } else {
    expenses.push({
      id: Date.now(),
      name,
      amount,
      category
    });
  }

  saveToStorage();
  renderExpenses(expenses);
  clearInputs();
});

// Render
function renderExpenses(data) {
  list.innerHTML = "";

  data.forEach(exp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${exp.name}</td>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>
        <button class="btn btn-sm btn-secondary"
          onclick="editExpense(${exp.id})">Edit</button>
        <button class="btn btn-sm btn-danger"
          onclick="deleteExpense(${exp.id})">Delete</button>
      </td>
    `;
    list.appendChild(tr);
  });

  updateTotal(data);
  updateCategorySummary(data);
}

// Edit
function editExpense(id) {
  const exp = expenses.find(e => e.id === id);
  if (!exp) return;

  nameInput.value = exp.name;
  amountInput.value = exp.amount;
  categorySelect.value = exp.category;

  currentEditId = id;
  addBtn.innerText = "Update";
}

// Delete
function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;
  expenses = expenses.filter(exp => exp.id !== id);
  saveToStorage();
  renderExpenses(expenses);
}

// Total
function updateTotal(data) {
  const total = data.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmount.innerText = total;
}

// Category Summary
function updateCategorySummary(data) {
  const summary = {};
  data.forEach(exp => {
    summary[exp.category] = (summary[exp.category] || 0) + exp.amount;
  });

  categorySummary.innerHTML = Object.entries(summary)
    .map(([cat, total]) => `<p>${cat}: ${total} EGP</p>`)
    .join("");
}

// Filter
filterCategory.addEventListener("change", () => {
  const value = filterCategory.value;
  if (value === "") {
    renderExpenses(expenses);
  } else {
    renderExpenses(expenses.filter(exp => exp.category === value));
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

// Enter key
amountInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addBtn.click();
});
