# Todo App Project

## 技術スタック
- Frontend: React 18 + TypeScript + Vite
- Backend: Hono (Edge Runtime対応)
- Database: Vercel Postgres
- ORM: Prisma + TypedSQL
- Testing: Vitest (Unit), Playwright (E2E)
- Deployment: Vercel

## プロジェクト構造
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

## コーディング規約
- TypeScript: strict mode有効
- インデント: スペース2つ
- 命名規則:
  - コンポーネント: PascalCase
  - 関数・変数: camelCase
  - 定数: UPPER_SNAKE_CASE
- import順序: React → 外部ライブラリ → 内部モジュール

## 開発コマンド
- 開発サーバー: `npm run dev`
- ビルド: `npm run build`
- 型チェック: `npm run typecheck`
- リント: `npm run lint`
- テスト実行: `npm test`
- E2Eテスト: `npm run test:e2e`
- DB生成: `npm run db:generate`
- DBマイグレーション: `npm run db:migrate`
- DB Studio: `npm run db:studio`
- TypedSQL生成: `npm run db:generate -- --sql`

## データベース
- DB: Vercel Postgres
- ORM: Prisma + TypedSQL
- マイグレーション: Prisma Migrate
- 接続: Vercel環境変数自動設定

## 環境変数
- `POSTGRES_PRISMA_URL`: Prisma接続用（接続プール無効）
- `POSTGRES_URL_NON_POOLING`: マイグレーション用
- 注: Vercel Postgresダッシュボードで自動設定される

## API設計
- RESTful設計に従う
- エンドポイント: `/api/todos`
- レスポンス形式: JSON
- エラーハンドリング: 適切なHTTPステータスコード

## UI/UXガイドライン
- レスポンシブデザイン (モバイルファースト)
- アクセシビリティ: WCAG 2.1 AA準拠
- カラースキーム: モダンでミニマル
- アニメーション: 控えめで高速

## デプロイ設定
- Vercel Functions使用
- 環境変数: Vercelダッシュボードで管理
- Edge Runtime最適化
- プレビューデプロイ自動化
- Vercel Postgres自動プロビジョニング

## テスト方針
- ユニットテスト: ビジネスロジックとユーティリティ
- 統合テスト: APIエンドポイント
- E2Eテスト: 主要ユーザーフロー
- カバレッジ目標: 80%以上

## 禁止事項
- console.log()の本番環境への残存
- any型の使用 (必要な場合はコメント必須)
- 未使用のimport/変数
- マジックナンバーの直接使用