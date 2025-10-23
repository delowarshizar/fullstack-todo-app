import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Todos:', response.data);
      setTodos(response.data); // should be an array
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load todos');
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(API_URL, todoData);
      setTodos([response.data, ...todos]);
    } catch (err) {
      console.error(err);
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updates);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (err) {
      console.error(err);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete todo');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>📝 Full-Stack Todo App</h1>
      {error && <div className="error">{error}</div>}
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
