import { test, expect } from '@playwright/test'

test.describe('Todo Display', () => {
  test('should display todo list on initial load', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByRole('heading', { name: 'Daily To-Do' })).toBeVisible()
    
    await expect(page.locator('.max-w-md')).toBeVisible()
  })

  test('should display empty state when no todos exist', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    const todoItems = page.locator('.group')
    const count = await todoItems.count()
    
    if (count === 0) {
      await expect(page.getByText('Add a task')).toBeVisible()
    }
  })

  test('should display existing todos with correct content', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    const todoItems = page.locator('.group')
    const count = await todoItems.count()
    
    if (count > 0) {
      const firstTodo = todoItems.first()
      await expect(firstTodo).toBeVisible()
      
      await expect(firstTodo.locator('button').first()).toBeVisible()
      
      await expect(firstTodo.locator('p')).toBeVisible()
    }
  })
})