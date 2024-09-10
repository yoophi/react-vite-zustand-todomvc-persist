import { useEffect } from "react";
import { useTodoStore } from "../api/use-todo-store.ts";
import { TodoItem } from "./TodoItem.tsx";
import { Todo } from "../model/Todo.ts";

type TodoListProps = {
  todos: Todo[];
  handleChangeTodoCompleted: (id: number) => void;
  handleRemoveTodo: (id: number) => void;
  handleChangeTodoTitle: (id: number, title: string) => void;
};

export function TodoList({
  todos,
  handleChangeTodoCompleted,
  handleRemoveTodo,
  handleChangeTodoTitle,
}: TodoListProps) {
  const updateStore = () => {
    useTodoStore.persist.rehydrate();
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", updateStore);
    window.addEventListener("focus", updateStore);
    window.addEventListener("storage", updateStore);
    return () => {
      document.removeEventListener("visibilitychange", updateStore);
      window.removeEventListener("focus", updateStore);
      window.removeEventListener("storage", updateStore);
    };
  }, []);

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeTodoCompleted={handleChangeTodoCompleted}
          handleChangeTodoTitle={handleChangeTodoTitle}
          handleRemoveTodo={handleRemoveTodo}
        />
      ))}
    </ul>
  );
}
