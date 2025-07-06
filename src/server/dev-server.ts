import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { prisma } from './db.js';
import { z } from 'zod';

const app = new Hono();

// Enable CORS
app.use('/*', cors());

// Request validation schemas
const createTodoSchema = z.object({
  title: z.string().min(1).max(255),
});

const updateTodoSchema = z.object({
  completed: z.boolean().optional(),
});

// GET /api/todos - Get all todos
app.get('/api/todos', async (c) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return c.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return c.json({ error: 'Failed to fetch todos' }, 500);
  }
});

// POST /api/todos - Create a new todo
app.post('/api/todos', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createTodoSchema.parse(body);
    const todo = await prisma.todo.create({
      data: {
        title: validatedData.title,
      },
    });
    return c.json(todo, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid request data', details: error.errors }, 400);
    }
    console.error('Error creating todo:', error);
    return c.json({ error: 'Failed to create todo' }, 500);
  }
});

// PATCH /api/todos/:id - Update a todo
app.patch('/api/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = updateTodoSchema.parse(body);
    const todo = await prisma.todo.update({
      where: { id },
      data: validatedData,
    });
    return c.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid request data', details: error.errors }, 400);
    }
    console.error('Error updating todo:', error);
    return c.json({ error: 'Failed to update todo' }, 500);
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await prisma.todo.delete({
      where: { id },
    });
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return c.json({ error: 'Failed to delete todo' }, 500);
  }
});

// DELETE /api/todos - Delete all todos
app.delete('/api/todos', async (c) => {
  try {
    await prisma.todo.deleteMany();
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting all todos:', error);
    return c.json({ error: 'Failed to delete todos' }, 500);
  }
});

const PORT = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(PORT),
});

console.log(`Development API server running on http://localhost:${PORT}`);