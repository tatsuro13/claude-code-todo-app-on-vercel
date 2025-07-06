import { test, expect } from '@playwright/test'

test.describe('Todo App Critical Path', () => {
  test.beforeEach(async ({ page }) => {
    // データベースをリセット
    await page.request.post('http://localhost:3000/api/test/reset')
    
    await page.goto('/')
    // 初期ロードの完了を待つ
    await page.waitForLoadState('networkidle')
  })

  test('ユーザーは新しいTodoを作成できる', async ({ page }) => {
    // Add a taskボタンをクリック
    await page.getByRole('button', { name: 'Add a task' }).click()
    
    // 入力フィールドにフォーカスが当たっていることを確認
    const input = page.getByPlaceholder('タスクを入力...')
    await expect(input).toBeFocused()
    
    // Todoを入力してEnterキーで作成
    const todoText = 'Buy groceries'
    await input.fill(todoText)
    await input.press('Enter')
    
    // Todoが表示されたことを確認
    await expect(page.getByText(todoText)).toBeVisible()
  })

  test('ユーザーはTodoを完了にできる', async ({ page }) => {
    // まずTodoを作成
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('Complete this task')
    await input.press('Enter')
    
    // チェックボックスをクリック
    const todoItem = page.locator('.group').first()
    const checkbox = todoItem.locator('button').first()
    await checkbox.click()
    
    // 完了状態になったことを確認（打ち消し線とチェックマーク）
    await expect(checkbox.locator('svg')).toBeVisible()
    await expect(todoItem.locator('p')).toHaveCSS('text-decoration-line', 'line-through')
    
    // 完了タブに切り替えてTodoが表示されることを確認
    await page.getByRole('button', { name: '完了 (1)' }).click()
    await expect(page.getByText('Complete this task')).toBeVisible()
    
    // 未完了タブではTodoが表示されないことを確認
    await page.getByRole('button', { name: '未完了 (0)' }).click()
    await expect(page.getByText('Complete this task')).not.toBeVisible()
  })

  test('ユーザーはTodoを削除できる', async ({ page }) => {
    // まずTodoを作成
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('Delete this task')
    await input.press('Enter')
    
    // Todoアイテムにホバーして削除ボタンを表示
    const todoItem = page.locator('.group').first()
    await todoItem.hover()
    
    // 削除ボタンをクリック
    const deleteButton = todoItem.locator('button').nth(1)
    await deleteButton.click()
    
    // Todoが削除されたことを確認
    await expect(page.getByText('Delete this task')).not.toBeVisible()
  })

  test('ユーザーは複数のTodoを管理できる', async ({ page }) => {
    // 3つのTodoを作成
    const todos = ['First task', 'Second task', 'Third task']
    
    for (const todo of todos) {
      await page.getByRole('button', { name: 'Add a task' }).click()
      const input = page.getByPlaceholder('タスクを入力...')
      await input.fill(todo)
      await input.press('Enter')
      await page.waitForTimeout(200) // 各操作間に短い待機
    }
    
    // すべてのTodoが表示されていることを確認
    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible()
    }
    
    // 2番目のTodoを完了にする
    const secondTodo = page.locator('.group').nth(1)
    await secondTodo.locator('button').first().click()
    
    // 2番目のTodoのみが完了状態になっていることを確認
    await expect(secondTodo.locator('button').first().locator('svg')).toBeVisible()
    await expect(page.locator('.group').first().locator('button').first().locator('svg')).not.toBeVisible()
    await expect(page.locator('.group').nth(2).locator('button').first().locator('svg')).not.toBeVisible()
    
    // 完了タブに切り替えて1つのTodoが表示されることを確認
    await page.getByRole('button', { name: '完了 (1)' }).click()
    await expect(page.getByText('Second task')).toBeVisible()
    await expect(page.getByText('First task')).not.toBeVisible()
    await expect(page.getByText('Third task')).not.toBeVisible()
  })

  test('ユーザーはページをリロードしてもTodoが保持されることを確認できる', async ({ page }) => {
    // Todoを作成
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('Persistent task')
    await input.press('Enter')
    
    // ページをリロード
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Todoが保持されていることを確認
    await expect(page.getByText('Persistent task')).toBeVisible()
  })

  test('ユーザーはタブでTodoをフィルタリングできる', async ({ page }) => {
    // 未完了と完了のTodoを作成
    const activeTodos = ['Active task 1', 'Active task 2']
    const completedTodos = ['Completed task 1', 'Completed task 2']
    
    // 未完了のTodoを作成
    for (const todo of activeTodos) {
      await page.getByRole('button', { name: 'Add a task' }).click()
      const input = page.getByPlaceholder('タスクを入力...')
      await input.fill(todo)
      await input.press('Enter')
      await page.waitForTimeout(200)
    }
    
    // 完了のTodoを作成
    for (const todo of completedTodos) {
      await page.getByRole('button', { name: 'Add a task' }).click()
      const input = page.getByPlaceholder('タスクを入力...')
      await input.fill(todo)
      await input.press('Enter')
      await page.waitForTimeout(200)
    }
    
    // 完了のTodoにチェックを入れる
    const todoItems = page.locator('.group')
    await todoItems.nth(2).locator('button').first().click()
    await todoItems.nth(3).locator('button').first().click()
    
    // 未完了タブ（デフォルト）では未完了のTodoのみ表示
    await expect(page.getByText('Active task 1')).toBeVisible()
    await expect(page.getByText('Active task 2')).toBeVisible()
    await expect(page.getByText('Completed task 1')).not.toBeVisible()
    await expect(page.getByText('Completed task 2')).not.toBeVisible()
    
    // 完了タブに切り替えると完了のTodoのみ表示
    await page.getByRole('button', { name: '完了 (2)' }).click()
    await expect(page.getByText('Active task 1')).not.toBeVisible()
    await expect(page.getByText('Active task 2')).not.toBeVisible()
    await expect(page.getByText('Completed task 1')).toBeVisible()
    await expect(page.getByText('Completed task 2')).toBeVisible()
    
    // 完了タブではAdd a taskボタンが表示されない
    await expect(page.getByRole('button', { name: 'Add a task' })).not.toBeVisible()
  })
})