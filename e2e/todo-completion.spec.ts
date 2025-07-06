import { test, expect } from '@playwright/test'

test.describe('Todo Completion Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    
    const todoText = 'Test todo for completion'
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill(todoText)
    await input.press('Enter')
    
    await expect(page.getByText(todoText)).toBeVisible()
  })

  test('should mark todo as completed when checkbox is clicked', async ({ page }) => {
    const todoItem = page.locator('.group').first()
    const checkbox = todoItem.locator('button').first()
    const todoText = todoItem.locator('p')
    
    await expect(checkbox.locator('svg')).not.toBeVisible()
    await expect(todoText).not.toHaveCSS('text-decoration-line', 'line-through')
    
    await checkbox.click()
    
    await expect(checkbox.locator('svg')).toBeVisible()
    await expect(todoText).toHaveCSS('text-decoration-line', 'line-through')
    await expect(todoText).toHaveCSS('color', 'rgb(107, 114, 128)')
  })

  test('should mark todo as incomplete when checkbox is clicked again', async ({ page }) => {
    const todoItem = page.locator('.group').first()
    const checkbox = todoItem.locator('button').first()
    const todoText = todoItem.locator('p')
    
    await checkbox.click()
    await expect(checkbox.locator('svg')).toBeVisible()
    
    await checkbox.click()
    
    await expect(checkbox.locator('svg')).not.toBeVisible()
    await expect(todoText).not.toHaveCSS('text-decoration-line', 'line-through')
    await expect(todoText).toHaveCSS('color', 'rgb(0, 0, 0)')
  })

  test('should toggle multiple todos independently', async ({ page }) => {
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('Second todo item')
    await input.press('Enter')
    
    const firstTodo = page.locator('.group').first()
    const secondTodo = page.locator('.group').nth(1)
    
    const firstCheckbox = firstTodo.locator('button').first()
    const secondCheckbox = secondTodo.locator('button').first()
    
    await firstCheckbox.click()
    
    await expect(firstCheckbox.locator('svg')).toBeVisible()
    await expect(secondCheckbox.locator('svg')).not.toBeVisible()
    
    await secondCheckbox.click()
    
    await expect(firstCheckbox.locator('svg')).toBeVisible()
    await expect(secondCheckbox.locator('svg')).toBeVisible()
    
    await firstCheckbox.click()
    
    await expect(firstCheckbox.locator('svg')).not.toBeVisible()
    await expect(secondCheckbox.locator('svg')).toBeVisible()
  })

  test('should persist completion state after page reload', async ({ page }) => {
    const todoItem = page.locator('.group').first()
    const checkbox = todoItem.locator('button').first()
    
    await checkbox.click()
    await expect(checkbox.locator('svg')).toBeVisible()
    
    await page.reload()
    
    const reloadedTodoItem = page.locator('.group').first()
    const reloadedCheckbox = reloadedTodoItem.locator('button').first()
    await expect(reloadedCheckbox.locator('svg')).toBeVisible()
  })
})