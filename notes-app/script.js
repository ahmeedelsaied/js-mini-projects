const notesContainer = document.getElementById("notesContainer");
const saveBtn = document.getElementById("saveNoteBtn");
const titleInput = document.getElementById("noteTitle");
const bodyInput = document.getElementById("noteBody");
const searchInput = document.getElementById("searchInput");
let currentEditId = null;

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Render notes عند فتح الصفحة
renderNotes(notes);

// Add Note
saveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title === "" || body === "") return;

  if (currentEditId) {
    // Edit mode
    notes = notes.map(note =>
      note.id === currentEditId
        ? { ...note, title, body }
        : note
    );
    currentEditId = null;
  } else {
    // Add mode
    const note = {
      id: Date.now(),
      title,
      body,
      date: new Date().toLocaleString(),
      pinned: false
    };
    notes.unshift(note);
  }

  saveToStorage();
  renderNotes(notes);
  clearInputs();
});


// Render Function
function renderNotes(notesArray) {
  notesContainer.innerHTML = "";

  const sortedNotes = [...notesArray].sort(
    (a, b) => b.pinned - a.pinned
  );

  sortedNotes.forEach(note => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";

    col.innerHTML = `
      <div class="card note-card ${note.pinned ? 'border-warning' : ''}">
        <div class="card-body">
          <h5 class="card-title">
            ${note.title}
            ${note.pinned ? '📌' : ''}
          </h5>

          <p class="card-text">${note.body}</p>
          <small class="text-muted">${note.date}</small>

          <div class="mt-3 d-flex gap-2">
            <button class="btn btn-sm btn-secondary"
              onclick="editNote(${note.id})">
              Edit
            </button>

            <button class="btn btn-sm btn-warning"
              onclick="togglePin(${note.id})">
              ${note.pinned ? 'Unpin' : 'Pin'}
            </button>

            <button class="btn btn-sm btn-danger"
              onclick="deleteNote(${note.id})">
              Delete
            </button>
          </div>
        </div>
      </div>
    `;

    notesContainer.appendChild(col);
  });
}
// Edit Note
function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  titleInput.value = note.title;
  bodyInput.value = note.body;
  currentEditId = id;

  const modal = new bootstrap.Modal(
    document.getElementById("noteModal")
  );
  modal.show();
}

function togglePin(id) {
  notes = notes.map(note =>
    note.id === id
      ? { ...note, pinned: !note.pinned }
      : note
  );

  saveToStorage();
  renderNotes(notes);
}


// Delete Note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveToStorage();
  renderNotes(notes);
}

// Save to localStorage
function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Clear inputs
function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  currentEditId = null;
}


// Search
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(value) ||
    note.body.toLowerCase().includes(value)
  );

  renderNotes(filtered);
});
