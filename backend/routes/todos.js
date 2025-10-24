import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      description: description || "",
      completed: false,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
