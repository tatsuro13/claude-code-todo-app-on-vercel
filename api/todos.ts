import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Prismaクライアントを初期化
const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Request validation schemas
const createTodoSchema = z.object({
  title: z.string().min(1).max(255),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }


  try {
    switch (req.method) {
      case 'GET': {
        // Get all todos
        const todos = await prisma.todo.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json(todos);
      }

      case 'POST': {
        // Create a new todo
        const validatedData = createTodoSchema.parse(req.body);
        const newTodo = await prisma.todo.create({
          data: {
            title: validatedData.title,
          },
        });
        return res.status(201).json(newTodo);
      }

      case 'DELETE': {
        // Delete all todos
        await prisma.todo.deleteMany();
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
    
    // より詳細なエラー情報を返す
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'production' ? 'Database operation failed' : errorMessage
    });
  } finally {
    await prisma.$disconnect();
  }
}