import { test, expect } from '@playwright/test'

test.describe('Todo Creation', () => {
  test('should create a new todo when clicking Add button and entering text', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    
    const newTodoInput = page.getByPlaceholder('タスクを入力...')
    await expect(newTodoInput).toBeFocused()
    
    const todoText = 'New test todo item'
    await newTodoInput.fill(todoText)
    await newTodoInput.press('Enter')
    
    await expect(page.getByText(todoText)).toBeVisible()
    
    const todoItem = page.locator('.group').filter({ hasText: todoText })
    await expect(todoItem).toBeVisible()
  })

  test('should create multiple todos sequentially', async ({ page }) => {
    await page.goto('/')
    
    const todos = ['First todo', 'Second todo', 'Third todo']
    
    for (const todoText of todos) {
      await page.getByRole('button', { name: 'Add a task' }).click()
      const input = page.getByPlaceholder('タスクを入力...')
      await input.fill(todoText)
      await input.press('Enter')
      
      await expect(page.getByText(todoText)).toBeVisible()
    }
    
    for (const todoText of todos) {
      await expect(page.getByText(todoText)).toBeVisible()
    }
  })

  test('should not create todo with empty text', async ({ page }) => {
    await page.goto('/')
    
    const initialCount = await page.locator('.group').count()
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.press('Enter')
    
    const newCount = await page.locator('.group').count()
    expect(newCount).toBe(initialCount)
  })

  test('should cancel todo creation with Escape key', async ({ page }) => {
    await page.goto('/')
    
    const initialCount = await page.locator('.group').count()
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('This should be cancelled')
    await input.press('Escape')
    
    await expect(page.getByText('This should be cancelled')).not.toBeVisible()
    
    const newCount = await page.locator('.group').count()
    expect(newCount).toBe(initialCount)
  })
})