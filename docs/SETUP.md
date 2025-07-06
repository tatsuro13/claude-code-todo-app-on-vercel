# Todo App セットアップガイド

## ローカル開発環境のセットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### 初期セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   `.env`ファイルを作成し、以下の内容を設定します：
   ```env
   # ローカル開発用データベース（SQLite）
   DATABASE_URL="file:./dev.db"
   ```
   
   注: ローカル開発ではSQLiteを使用するため、PostgreSQLのインストールは不要です。

3. **データベースのセットアップ**
   ```bash
   # Prismaクライアントの生成
   npm run db:generate
   
   # データベースマイグレーションの実行
   npm run db:migrate
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

   アプリケーションは http://localhost:5173 で起動します。

## Vercelへのデプロイ

### 前提条件
- Vercelアカウント
- GitHubリポジトリとの連携

### デプロイ手順

1. **Vercel Postgresの設定**
   - Vercelダッシュボードで「Storage」→「Create Database」→「Postgres」を選択
   - データベースを作成すると、以下の環境変数が自動的に設定されます：
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - その他の接続情報

2. **プロジェクトのデプロイ**
   - Vercelダッシュボードで「Import Project」を選択
   - GitHubリポジトリを選択
   - 環境変数は自動的に設定されます

3. **本番環境のマイグレーション**
   デプロイ後、以下のコマンドを実行：
   ```bash
   npx prisma migrate deploy
   ```

## 環境変数の詳細

### ローカル開発環境
- `DATABASE_URL`: SQLiteデータベースファイルのパス（例: `file:./dev.db`）

### 本番環境（Vercel）
以下の環境変数はVercel Postgresによって自動的に設定されます：
- `POSTGRES_PRISMA_URL`: Prisma用の接続URL（接続プール無効）
- `POSTGRES_URL_NON_POOLING`: マイグレーション用の接続URL
- `POSTGRES_URL`: 通常の接続URL
- `POSTGRES_DATABASE`: データベース名
- `POSTGRES_HOST`: ホスト名
- `POSTGRES_PASSWORD`: パスワード
- `POSTGRES_USER`: ユーザー名

## トラブルシューティング

### データベース接続エラー
- `.env`ファイルの`DATABASE_URL`が正しいことを確認
- ローカル開発ではSQLiteを使用（`file:./dev.db`）
- 初回実行時は`npm run db:migrate`でデータベースを作成

### Vercelデプロイエラー
- Vercel Postgresが正しく設定されていることを確認
- 環境変数が正しく設定されていることを確認
- ビルドログを確認して詳細なエラーメッセージを確認

### API接続エラー
- 開発サーバーが起動していることを確認
- APIエンドポイントのURLが正しいことを確認
- CORSエラーの場合は、APIハンドラーでCORSヘッダーが設定されていることを確認