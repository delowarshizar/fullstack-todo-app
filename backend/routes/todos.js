import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// ✅ Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ✅ Add a new todo
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      completed: false,
    });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving todo" });
  }
});

export default router;
