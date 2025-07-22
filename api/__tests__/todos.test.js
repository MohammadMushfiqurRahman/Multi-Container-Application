const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('../routes/todos');
const Todo = require('../models/Todo');

const app = express();
app.use(express.json());
app.use('/todos', todoRoutes);

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
    await Todo.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Todos API', () => {
    it('should get all todos', async () => {
        const todo = new Todo({ task: 'test' });
        await todo.save();
        const res = await request(app).get('/todos');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
    });

    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ task: 'test' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.task).toBe('test');
    });

    it('should get a single todo by id', async () => {
        const todo = new Todo({ task: 'test' });
        await todo.save();
        const res = await request(app).get(`/todos/${todo._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.task).toBe('test');
    });

    it('should update a single todo by id', async () => {
        const todo = new Todo({ task: 'test' });
        await todo.save();
        const res = await request(app)
            .put(`/todos/${todo._id}`)
            .send({ task: 'updated test' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.task).toBe('updated test');
    });

    it('should delete a single todo by id', async () => {
        const todo = new Todo({ task: 'test' });
        await todo.save();
        const res = await request(app).delete(`/todos/${todo._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Deleted Todo');
    });
});