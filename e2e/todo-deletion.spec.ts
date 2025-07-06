import { test, expect } from '@playwright/test'

test.describe('Todo Deletion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    
    const todos = ['First todo to delete', 'Second todo to delete', 'Third todo to delete']
    for (const todoText of todos) {
      await page.getByRole('button', { name: 'Add a task' }).click()
      const input = page.getByPlaceholder('タスクを入力...')
      await input.fill(todoText)
      await input.press('Enter')
    }
    
    await page.waitForTimeout(500)
  })

  test('should delete individual todo when delete button is clicked', async ({ page }) => {
    const firstTodoText = 'First todo to delete'
    const todoItem = page.locator('.group').filter({ hasText: firstTodoText })
    
    await todoItem.hover()
    
    const deleteButton = todoItem.locator('button').nth(1)
    await expect(deleteButton).toBeVisible()
    
    await deleteButton.click()
    
    await expect(page.getByText(firstTodoText)).not.toBeVisible()
    
    await expect(page.getByText('Second todo to delete')).toBeVisible()
    await expect(page.getByText('Third todo to delete')).toBeVisible()
  })

  test('should delete all todos when header trash icon is clicked', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept())
    
    const deleteAllButton = page.locator('button[aria-label="すべてのタスクを削除"]')
    await deleteAllButton.click()
    
    await expect(page.getByText('First todo to delete')).not.toBeVisible()
    await expect(page.getByText('Second todo to delete')).not.toBeVisible()
    await expect(page.getByText('Third todo to delete')).not.toBeVisible()
    
    await expect(page.getByText('Add a task')).toBeVisible()
  })

  test('should cancel delete all when cancel is clicked in confirmation dialog', async ({ page }) => {
    page.on('dialog', dialog => dialog.dismiss())
    
    const deleteAllButton = page.locator('button[aria-label="すべてのタスクを削除"]')
    await deleteAllButton.click()
    
    await expect(page.getByText('First todo to delete').first()).toBeVisible()
    await expect(page.getByText('Second todo to delete')).toBeVisible()
    await expect(page.getByText('Third todo to delete')).toBeVisible()
  })

  test('should delete multiple todos individually', async ({ page }) => {
    const firstTodo = page.locator('.group').filter({ hasText: 'First todo to delete' })
    await firstTodo.hover()
    await firstTodo.locator('button').nth(1).click()
    
    await expect(page.getByText('First todo to delete')).not.toBeVisible()
    
    const thirdTodo = page.locator('.group').filter({ hasText: 'Third todo to delete' })
    await thirdTodo.hover()
    await thirdTodo.locator('button').nth(1).click()
    
    await expect(page.getByText('Third todo to delete')).not.toBeVisible()
    
    await expect(page.getByText('Second todo to delete')).toBeVisible()
    
    const remainingCount = await page.locator('.group').count()
    expect(remainingCount).toBe(1)
  })

  test('should not show delete button when not hovering', async ({ page }) => {
    const todoItem = page.locator('.group').first()
    const deleteButton = todoItem.locator('button').nth(1)
    
    await expect(deleteButton).not.toBeVisible()
    
    await todoItem.hover()
    await expect(deleteButton).toBeVisible()
    
    await page.locator('h2').hover()
    await expect(deleteButton).not.toBeVisible()
  })
})