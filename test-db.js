import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  },
  log: ['query', 'error', 'warn']
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const count = await prisma.todo.count();
    console.log(`Success! Todo count: ${count}`);
    
    // Create a test todo
    const todo = await prisma.todo.create({
      data: {
        title: 'Test todo'
      }
    });
    console.log('Created todo:', todo);
    
    // Fetch all todos
    const todos = await prisma.todo.findMany();
    console.log('All todos:', todos);
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();