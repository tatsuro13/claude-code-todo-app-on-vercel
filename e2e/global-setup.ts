import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

async function globalSetup() {
  console.log('Setting up test environment...')

  // データベースファイルのパス
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  const dbJournalPath = path.join(process.cwd(), 'prisma', 'dev.db-journal')
  
  // 既存のデータベースファイルを削除
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath)
    console.log('Removed existing database file')
  }
  
  // ジャーナルファイルも削除
  if (fs.existsSync(dbJournalPath)) {
    fs.unlinkSync(dbJournalPath)
  }

  // Prismaのマイグレーションを実行
  console.log('Running database migrations...')
  execSync('npm run db:push', { stdio: 'inherit' })

  console.log('Test environment setup complete')
}

export default globalSetup