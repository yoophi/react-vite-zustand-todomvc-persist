import { useEffect, useRef, useState } from "react";

export function TodoInput({
  handleSubmit,
}: {
  handleSubmit: (title: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(title);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}
