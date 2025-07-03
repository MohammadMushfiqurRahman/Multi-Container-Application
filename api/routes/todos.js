const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /todos — get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /todos — create a new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        task: req.body.task
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /todos/:id — get a single todo by id
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo);
});

// PUT /todos/:id — update a single todo by id
router.put('/:id', getTodo, async (req, res) => {
    if (req.body.task != null) {
        res.todo.task = req.body.task;
    }
    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /todos/:id — delete a single todo by id
router.delete('/:id', getTodo, async (req, res) => {
    try {
        await res.todo.deleteOne();
        res.json({ message: 'Deleted Todo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a todo by ID
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.todo = todo;
    next();
}

module.exports = router;