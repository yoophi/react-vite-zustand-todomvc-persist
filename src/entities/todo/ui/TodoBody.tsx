import { useTodoStore } from "../api/use-todo-store";
import { TodoList } from "./TodoList";

export function TodoBody() {
  const {
    filteredTodos,
    toggleTodoCompleted,
    toggleAll,
    removeTodo,
    updateTodoTitle,
  } = useTodoStore();
  const todos = filteredTodos();

  const handleChangeTodoCompleted = (id: number) => toggleTodoCompleted({ id });
  const handleRemoveTodo = (id: number) => removeTodo({ id });
  const handleChangeTodoTitle = (id: number, title: string) =>
    updateTodoTitle({ id, title });
  const handleToggleAll = () => toggleAll();

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onClick={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList
        todos={todos}
        handleChangeTodoCompleted={handleChangeTodoCompleted}
        handleRemoveTodo={handleRemoveTodo}
        handleChangeTodoTitle={handleChangeTodoTitle}
      />
    </section>
  );
}
