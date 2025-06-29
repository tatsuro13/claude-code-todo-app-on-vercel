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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Todo App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            シンプルで美しいタスク管理アプリ
          </p>
        </header>
        
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App