import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Vercel環境では環境変数が自動的に設定される
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;

if (!databaseUrl) {
  throw new Error('Database URL is not configured. Please set DATABASE_URL or POSTGRES_PRISMA_URL environment variable.');
}

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// 開発環境でのホットリロード対策
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}