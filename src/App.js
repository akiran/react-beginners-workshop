import React, { useState } from "react";
import classNames from "classnames";
import { v4 } from "uuid";

const defaultTodos = [
  { id: 1, title: "Learn react", completed: true },
  { id: 2, title: "Learn css", completed: false },
];

function TodoInput({ addTodo }) {
  const [title, setTitle] = useState("");
  function handleKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    addTodo({
      id: v4(),
      title,
      completed: false,
    });
    setTitle("");
  }
  return (
    <input
      className="new-todo"
      placeholder="what needs to be done?"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

function Todo({ todo, onToggle, editing, onDelete }) {
  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <label>{todo.title}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
    </li>
  );
}

function TodoList({ todos, toggle, activeTodoCount, toggleAll, deleteTodo }) {
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={toggleAll}
        checked={activeTodoCount === 0}
      />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={() => toggle(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </section>
  );
}

function Footer({
  activeTodoCount,
  nowShowing,
  setFilter,
  completedCount,
  clearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong>{" "}
        {activeTodoCount === 1 ? "item" : "items"} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => setFilter("all")}
            className={classNames({ selected: nowShowing === "all" })}
          >
            All
          </a>
        </li>{" "}
        <li>
          <a
            href="#/"
            onClick={() => setFilter("active")}
            className={classNames({
              selected: nowShowing === "active",
            })}
          >
            Active
          </a>
        </li>{" "}
        <li>
          <a
            href="#/"
            onClick={() => setFilter("completed")}
            className={classNames({
              selected: nowShowing === "completed",
            })}
          >
            Completed
          </a>
        </li>
      </ul>
      {completedCount > 0 ? (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

function filterTodos(todos, nowShowing) {
  if (nowShowing === "all") {
    return todos;
  }
  if (nowShowing === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (nowShowing === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [nowShowing, setFilter] = useState("all");
  const activeTodos = todos.filter((todo) => !todo.completed);
  const activeTodoCount = activeTodos.length;
  const completedCount = todos.length - activeTodoCount;

  function toggleAll() {
    setTodos(todos.map((todo) => ({ ...todo, completed: !!activeTodoCount })));
  }

  function toggle(id) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function addTodo(todo) {
    const newTodos = todos.concat(todo);
    setTodos(newTodos);
  }

  function clearCompleted() {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  const currentTodos = filterTodos(todos, nowShowing);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput addTodo={addTodo} />
      </header>
      <TodoList
        todos={currentTodos}
        activeTodoCount={activeTodoCount}
        toggleAll={toggleAll}
        toggle={toggle}
        deleteTodo={deleteTodo}
      />
      <Footer
        activeTodoCount={activeTodoCount}
        nowShowing={nowShowing}
        setFilter={setFilter}
        completedCount={completedCount}
        clearCompleted={clearCompleted}
      />
    </section>
  );
}

export default App;
