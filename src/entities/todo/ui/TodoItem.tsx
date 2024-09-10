import { useState } from "react";
import { Todo } from "../model/Todo";

type TodoItemProps = {
  todo: Todo;
  handleChangeTodoCompleted: (id: number) => void;
  handleRemoveTodo: (id: number) => void;
  handleChangeTodoTitle: (id: number, title: string) => void;
};

export function TodoItem({
  todo,
  handleChangeTodoCompleted,
  handleChangeTodoTitle,
  handleRemoveTodo,
}: TodoItemProps) {
  const [title, setTitle] = useState<string>(todo.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const showInput = () => setIsEditing(true);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleChangeTodoTitle(todo.id, title);
    setIsEditing(false);
  };

  return (
    <li
      className={todo.completed ? "completed" : isEditing ? "editing" : "view"}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleChangeTodoCompleted(todo.id)}
        />
        <label onDoubleClick={showInput}>{todo.title} </label>
        <button className="destroy" onClick={() => handleRemoveTodo(todo.id)} />
      </div>
      <form onSubmit={onSubmit}>
        <input
          className="edit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </li>
  );
}
