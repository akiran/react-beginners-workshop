import React from "react";
const todos = [
  { id: 1, title: "Learn react" },
  { id: 2, title: "Learn css" },
];

function TodoInput() {
  return <input className="new-todo" placeholder="what needs to be done?" />;
}

function Todo({ todo }) {
  return (
    <li>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          // checked={this.props.todo.completed}
          // onChange={this.props.onToggle}
        />
        <label>{todo.title}</label>
        <button className="destroy" />
      </div>
    </li>
  );
}

function TodoList() {
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        // onChange={this.toggleAll}
        // checked={activeTodoCount === 0}
      />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </section>
  );
}

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput />
      </header>
      <TodoList />
    </section>
  );
}

export default App;
