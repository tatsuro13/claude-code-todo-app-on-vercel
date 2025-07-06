import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Vercel環境では環境変数が自動的に設定される
// ローカルではDATABASE_URL、本番ではPOSTGRES_PRISMA_URLを使用
const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Database URL is not configured. Please set DATABASE_URL or POSTGRES_PRISMA_URL environment variable.');
}

// 本番環境かどうかを判定
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.POSTGRES_PRISMA_URL;

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: isProduction ? ['error'] : ['query', 'error', 'warn'],
});

// 開発環境でのホットリロード対策
if (!isProduction) {
  global.prisma = prisma;
}