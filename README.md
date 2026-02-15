# Redux Todo (CDN)

A small todo app built with Redux Toolkit via CDN. It stores todos in localStorage so they persist across page reloads.

## Run with Live Server (VS Code)

1. Open this folder in VS Code.
2. Install the "Live Server" extension (by Ritwick Dey) if you do not have it.
3. Open [todo.html](todo.html) and click "Go Live" in the status bar.
4. The app opens in your browser (usually at http://127.0.0.1:5500).

## Files

- [todo.html](todo.html) - HTML entry point with import map and script tag.
- [todo.js](todo.js) - Redux logic, UI rendering, localStorage persistence.
- [todo.css](todo.css) - Styling.

## Notes

- localStorage is used to save todos under the key "redux-todo-items".
- If you open the HTML file with file://, some browsers may limit localStorage. Use Live Server instead.
