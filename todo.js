// Import Redux Toolkit utilities
import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "redux-todo-items";
// Load todos from localStorage when the app starts
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Ignore write errors (storage full, privacy mode, etc.)
  }
}
// Create a Redux slice (state + reducers combined)
const slice = createSlice({
  name: "todos",
  initialState: loadTodos(),
  reducers: {
    add: {
      reducer: (state, action) => { state.push(action.payload); },
      prepare: (text) => ({ payload: { id: nanoid(), text, completed: false } })
    },
    toggle: (state, action) => {
      const t = state.find(x => x.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    remove: (state, action) => state.filter(x => x.id !== action.payload)
  }
});
// Create the Redux store
const store = configureStore({
  reducer: { todos: slice.reducer }
});
// Extract action creators from the slice
const { add, toggle, remove } = slice.actions;

const listEl = document.getElementById("list");
const inputEl = document.getElementById("input");
const formEl = document.getElementById("form");
// Render function: updates the UI based on current state
function render() {
  listEl.innerHTML = "";
  for (const todo of store.getState().todos) {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.style.textDecoration = todo.completed ? "line-through" : "none";

    li.appendChild(text);

    li.addEventListener("click", () => store.dispatch(toggle(todo.id)));

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "✕";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      store.dispatch(remove(todo.id));
    });

    li.appendChild(del);
    listEl.appendChild(li);
  }
}
// Initial render
render();
// Re-render whenever state changes
store.subscribe(render);
// Save to localStorage whenever state changes
store.subscribe(() => {
  saveTodos(store.getState().todos);
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;
  store.dispatch(add(text));
  inputEl.value = "";
  inputEl.focus();
});
// Expose store to browser console (for debugging)
window.store = store;
