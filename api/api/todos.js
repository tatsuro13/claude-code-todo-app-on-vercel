import { prisma } from '../src/server/db.js';
import { z } from 'zod';
// Request validation schemas
const createTodoSchema = z.object({
    title: z.string().min(1).max(255),
});
export default async function handler(req, res) {
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
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid request data', details: error.errors });
        }
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
