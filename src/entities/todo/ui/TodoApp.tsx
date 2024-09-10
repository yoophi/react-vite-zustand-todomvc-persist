import { TodoHeader } from "./TodoHeader.tsx";
import { TodoBody } from "./TodoBody.tsx";
import { TodoFooter } from "./TodoFooter.tsx";
import { Filter, useTodoStore } from "../api/use-todo-store.ts";

export function TodoApp() {
  const activeTodosCount = useTodoStore((state) => state.activeTodosCount());
  const { filter, setFilter, clearCompleted } = useTodoStore((state) => state);

  const handleClearCompleted = () => clearCompleted();
  const handleFilterChange = (filter: Filter) => setFilter(filter);

  return (
    <section className="todoapp">
      <TodoHeader />
      <TodoBody />
      <TodoFooter
        activeTodosCount={activeTodosCount}
        currentFilter={filter}
        handleFilterChange={handleFilterChange}
        handleClearCompleted={handleClearCompleted}
      />
    </section>
  );
}
