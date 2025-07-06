import { test, expect } from '@playwright/test'

test.describe('Error Handling', () => {
  test('should display error message when API fails to load todos', async ({ page }) => {
    await page.route('**/api/todos', route => {
      route.fulfill({
        status: 500,
        body: 'Internal Server Error'
      })
    })
    
    await page.goto('/')
    
    await expect(page.getByText('エラー: Failed to fetch todos')).toBeVisible({ timeout: 10000 })
  })

  test('should display error message when creating todo fails', async ({ page }) => {
    await page.goto('/')
    
    await page.route('**/api/todos', route => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 500,
          body: 'Failed to create todo'
        })
      } else {
        route.continue()
      }
    })
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('This will fail')
    await input.press('Enter')
    
    await expect(page.getByText('エラー: Failed to add todo')).toBeVisible({ timeout: 10000 })
  })

  test('should display error message when updating todo fails', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('Test todo')
    await input.press('Enter')
    
    await page.waitForTimeout(500)
    
    await page.route('**/api/todos/*', route => {
      if (route.request().method() === 'PATCH') {
        route.fulfill({
          status: 500,
          body: 'Failed to update todo'
        })
      } else {
        route.continue()
      }
    })
    
    const checkbox = page.locator('.group').first().locator('button').first()
    await checkbox.click()
    
    await expect(page.getByText('エラー: Failed to update todo')).toBeVisible({ timeout: 10000 })
  })

  test('should display error message when deleting todo fails', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('Todo to delete')
    await input.press('Enter')
    
    await page.waitForTimeout(500)
    
    await page.route('**/api/todos/*', route => {
      if (route.request().method() === 'DELETE') {
        route.fulfill({
          status: 500,
          body: 'Failed to delete todo'
        })
      } else {
        route.continue()
      }
    })
    
    const todoItem = page.locator('.group').first()
    await todoItem.hover()
    await todoItem.locator('button').nth(1).click()
    
    await expect(page.getByText('エラー: Failed to delete todo')).toBeVisible({ timeout: 10000 })
  })

  test('should recover from errors and continue functioning', async ({ page }) => {
    await page.goto('/')
    
    await page.route('**/api/todos', route => {
      if (route.request().method() === 'POST') {
        route.abort()
      } else {
        route.continue()
      }
    }, { times: 1 })
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const input = page.getByPlaceholder('タスクを入力...')
    await input.fill('This will fail first')
    await input.press('Enter')
    
    await page.waitForTimeout(1000)
    
    await page.unroute('**/api/todos')
    
    await page.getByRole('button', { name: 'Add a task' }).click()
    const secondInput = page.getByPlaceholder('What needs to be done?')
    await secondInput.fill('This should work')
    await secondInput.press('Enter')
    
    await expect(page.getByText('This should work')).toBeVisible({ timeout: 10000 })
  })
})