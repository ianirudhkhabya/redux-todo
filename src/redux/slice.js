import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load todos from local storage
const loadTodosFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem("todos");
    if (todos === null) {
      return [];
    }
    return JSON.parse(todos);
  } catch (error) {
    console.error("Error loading todos from local storage:" + error);
    return [];
  }
};

// Initial state of the todo slice
const initialState = {
  todos: loadTodosFromLocalStorage(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add a new todo item
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
        completed: false,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Remove a todo item
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Toggle the todo item
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
