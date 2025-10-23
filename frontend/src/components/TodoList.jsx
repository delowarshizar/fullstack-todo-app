function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet. Add one above! 🎉</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                onUpdate(todo._id, { completed: !todo.completed })
              }
            />
            <span>{todo.title}</span>
            {todo.description && <p>{todo.description}</p>}
            <button
              onClick={() => onDelete(todo._id)}
              className="delete-btn"
            >
              🗑️
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;
