import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Todo } from "../model/Todo";

export type Filter = "All" | "Active" | "Completed";

type State = {
  todos: Todo[];
  filter: Filter;
};

type Action = {
  addTodo: (todo: Omit<Todo, "id" | "completed">) => void;
  removeTodo: (id: Pick<Todo, "id">) => void;
  updateTodoTitle: (args: Pick<Todo, "id" | "title">) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
  toggleTodoCompleted: (id: Pick<Todo, "id">) => void;
  toggleAll: () => void;
  activeTodosCount: () => number;
  filteredTodos: () => Todo[];
};

const initialTodos = [
  {
    id: 1,
    completed: true,
    title: "Taste JavaScript",
  },
  {
    id: 2,
    completed: false,
    title: "Buy a unicorn",
  },
  {
    id: 3,
    completed: true,
    title: "Learn React",
  },
  {
    id: 4,
    completed: false,
    title: "Learn Zustand",
  },
  {
    id: 5,
    completed: false,
    title: "멀티 탭에서 Zustand를 통해 상태관리하는 법 공부하기",
  },
] as Todo[];

type TodoState = State & Action;

export const useTodoStore = create(
  persist<TodoState>(
    (set, get) => ({
      todos: initialTodos,
      filter: "All" as Filter,
      activeTodosCount: () =>
        get().todos.filter((todo) => todo.completed !== true).length,
      filteredTodos: () => {
        const filter = get().filter;
        if (filter === "Active") {
          return get().todos.filter((todo) => todo.completed !== true);
        } else if (filter === "Completed") {
          return get().todos.filter((todo) => todo.completed === true);
        } else {
          return get().todos;
        }
      },
      addTodo: ({ title }) => {
        const prevTodos = get().todos;
        const nextId = Math.max(...prevTodos.map((todo) => todo.id)) + 1;
        set({
          todos: [...get().todos, { id: nextId, title, completed: false }],
        });
      },
      updateTodoTitle: ({ id, title }) => {
        set({
          todos: [
            ...get().todos.map((todo) =>
              todo.id !== id ? todo : { ...todo, title },
            ),
          ],
        });
      },
      removeTodo: ({ id }) => {
        set({ todos: [...get().todos.filter((todo) => todo.id !== id)] });
      },
      setFilter: (filter) => void set({ ...get(), filter }),
      clearCompleted: () =>
        void set({
          ...get(),
          todos: [...get().todos.filter((todo) => !todo.completed)],
        }),
      toggleTodoCompleted: ({ id }) =>
        void set({
          ...get(),
          todos: [
            ...get().todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
          ],
        }),
      toggleAll: () =>
        void set({
          ...get(),
          todos: [...get().todos.map((todo) => ({ ...todo, completed: true }))],
        }),
    }),
    {
      name: "todo-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
