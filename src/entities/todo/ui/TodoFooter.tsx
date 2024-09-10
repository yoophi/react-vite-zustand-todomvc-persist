import { Filter } from "../api/use-todo-store";

type TodoFooterProps = {
  activeTodosCount: number;
  currentFilter: Filter;
  handleClearCompleted: () => void;
  handleFilterChange: (filter: Filter) => void;
};

export function TodoFooter({
  activeTodosCount,
  currentFilter,
  handleClearCompleted,
  handleFilterChange,
}: TodoFooterProps) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodosCount}</strong> item left
      </span>

      <ul className="filters">
        {["All", "Active", "Completed"].map((filter) => (
          <li>
            <a
              className={currentFilter === filter ? "selected" : undefined}
              onClick={() => handleFilterChange(filter as Filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>

      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
