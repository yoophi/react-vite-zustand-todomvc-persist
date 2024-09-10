import { useTodoStore } from "../api/use-todo-store.ts";
import { TodoInput } from "./TodoInput.tsx";

export function TodoHeader() {
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (title: string) => addTodo({ title });

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoInput handleSubmit={handleSubmit} />
    </header>
  );
}
