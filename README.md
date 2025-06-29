# Todo App on Vercel

モダンな技術スタックで構築されたシンプルで高速なTodoアプリケーション。

## 🚀 技術スタック

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Hono (Edge Runtime対応)
- **Database**: Vercel Postgres
- **ORM**: Prisma + TypedSQL
- **Testing**: Vitest (Unit), Playwright (E2E)
- **Deployment**: Vercel

## 📋 機能

- ✅ Todoの作成・編集・削除
- ✅ 完了状態の管理
- ✅ リアルタイムの更新
- ✅ レスポンシブデザイン
- ✅ ダークモード対応

## 🛠️ セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Vercelアカウント（デプロイ用）

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/claude-code-todo-app-on-vercel.git
cd claude-code-todo-app-on-vercel

# 依存関係のインストール
npm install
```

### 環境変数の設定

`.env.example`をコピーして`.env`を作成：

```bash
cp .env.example .env
```

Vercel Postgresの接続情報を設定：

```env
POSTGRES_PRISMA_URL=your_postgres_prisma_url
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling
```

### データベースの準備

```bash
# Prismaクライアントの生成
npm run db:generate

# マイグレーションの実行
npm run db:migrate
```

## 🚀 開発

```bash
# 開発サーバーの起動
npm run dev
```

http://localhost:5173 でアプリケーションにアクセスできます。

## 📝 利用可能なスクリプト

```bash
npm run dev          # 開発サーバーの起動
npm run build        # プロダクションビルド
npm run preview      # ビルドのプレビュー
npm run typecheck    # TypeScriptの型チェック
npm run lint         # ESLintの実行
npm run test         # Vitestでユニットテスト
npm run test:e2e     # Playwrightでe2eテスト
npm run db:generate  # Prismaクライアントの生成
npm run db:migrate   # データベースマイグレーション
npm run db:studio    # Prisma Studioの起動
```

## 🏗️ プロジェクト構造

```
src/
├── app/          # Reactコンポーネント
├── server/       # Honoサーバー
├── components/   # 共通コンポーネント
├── hooks/        # カスタムフック
└── types/        # TypeScript型定義
prisma/
├── schema.prisma # Prismaスキーマ定義
└── sql/          # TypedSQLクエリ
```

## 🚀 デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)でプロジェクトをインポート
2. Vercel Postgresデータベースを追加
3. 環境変数が自動的に設定される
4. デプロイを実行

```bash
# Vercel CLIを使用する場合
vercel
```

## 🧪 テスト

```bash
# ユニットテストの実行
npm run test

# E2Eテストの実行
npm run test:e2e
```

## 🤝 コントリビューション

プルリクエストは歓迎します。大きな変更の場合は、まずissueを作成して変更内容を説明してください。

## 📄 ライセンス

[MIT](LICENSE)

## 🙏 謝辞

このプロジェクトは[Claude Code](https://claude.ai/code)を使用して作成されました。