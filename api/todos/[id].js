import { prisma } from '../../src/server/db.js';
import { z } from 'zod';

// Request validation schema
const updateTodoSchema = z.object({
  completed: z.boolean().optional(),
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  try {
    switch (req.method) {
      case 'PATCH': {
        // Update a todo
        const validatedData = updateTodoSchema.parse(req.body);
        const updatedTodo = await prisma.todo.update({
          where: { id },
          data: validatedData,
        });
        return res.status(200).json(updatedTodo);
      }

      case 'DELETE': {
        // Delete a todo
        await prisma.todo.delete({
          where: { id },
        });
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: error.errors });
    }
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}