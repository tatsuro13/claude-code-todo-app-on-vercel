import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

function App() {
  const todos: Todo[] = [
    {
      id: '1',
      title: '朝食を作る',
      completed: true,
      createdAt: new Date('2024-01-15T08:00:00'),
      updatedAt: new Date('2024-01-15T08:30:00'),
    },
    {
      id: '2',
      title: 'メールをチェックする',
      completed: false,
      createdAt: new Date('2024-01-15T09:00:00'),
      updatedAt: new Date('2024-01-15T09:00:00'),
    },
    {
      id: '3',
      title: 'ミーティングに参加する',
      completed: false,
      createdAt: new Date('2024-01-15T10:00:00'),
      updatedAt: new Date('2024-01-15T10:00:00'),
    },
    {
      id: '4',
      title: 'プロジェクトの進捗報告書を作成する',
      completed: false,
      createdAt: new Date('2024-01-15T11:00:00'),
      updatedAt: new Date('2024-01-15T11:00:00'),
    },
    {
      id: '5',
      title: '買い物リストを作成する',
      completed: true,
      createdAt: new Date('2024-01-15T14:00:00'),
      updatedAt: new Date('2024-01-15T14:30:00'),
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '24px 16px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px',
          }}>
            Todo App
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
          }}>
            タスクを管理しましょう
          </p>
        </header>
        
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App