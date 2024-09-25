import { TodoHeader } from "./TodoHeader";
import { TodoBody } from "./TodoBody";
import { TodoFooter } from "./TodoFooter";
import { Filter, useTodoStore } from "../api/use-todo-store";

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
