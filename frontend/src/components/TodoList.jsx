function TodoList({ todos, onUpdate, onDelete }) {
  if (!Array.isArray(todos)) return null;

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty">No todos yet. Add one above! 🎉</p>
      ) : (
        todos.map(todo => (
          <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
            />
            <div className="todo-content">
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
            </div>
            <button className="delete-btn" onClick={() => onDelete(todo._id)}>🗑️</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;
