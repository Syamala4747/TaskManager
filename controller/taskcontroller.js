const Task = require("../model/taskmodel");

// ✅ Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json({ message: "Task created successfully!", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found!" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid Task ID" });
  }
};

// ✅ Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found!" });
    res.json({ message: "Task updated!", task });
  } catch (error) {
    res.status(400).json({ error: "Invalid Task ID" });
  }
};

// ✅ Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found!" });
    res.json({ message: "Task deleted!" });
  } catch (error) {
    res.status(400).json({ error: "Invalid Task ID" });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
