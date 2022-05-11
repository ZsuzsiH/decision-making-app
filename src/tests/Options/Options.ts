export const Options = () => {

  it('Should not save option with empty fields', async () => {
    await page.locator('[data-testid="AddCircleIcon"]').click();
    await page.locator('#option-save').click();
    expect(await page.waitForSelector('text=Name is required')).toBeTruthy();
    expect(await page.waitForSelector('text=Invalid number')).toBeTruthy();
  })

  it('Should save option if all fields are filled in', async () => {
    await page.locator('input[name="name"]').fill('lasagna');
    await page.locator('input[name="kcal"]').fill('450');
    await page.locator('input[name="taste"]').fill('60');
    await page.locator('#option-save').click();
    expect(await page).not.toHaveSelector('text=Name is required')
    expect(await page).not.toHaveSelector('text=Invalid number');
  })

  it('Should add second option', async () => {
    await page.locator('[data-testid="AddCircleIcon"]').click();
    await page.locator('input[name="name"]').nth(1).fill('chicken breast');
    await page.locator('input[name="kcal"]').nth(1).fill('200');
    await page.locator('input[name="taste"]').nth(1).fill('40');
    await page.locator('#option-save').click();
    expect(await page).not.toHaveSelector('text=Name is required')
    expect(await page).not.toHaveSelector('text=Invalid number');
  })

  it('Should proceed to next step with two options', async () => {
    await page.locator('button:has-text("Show the results")').click();
    expect(await page.waitForSelector('text=Your results')).toBeTruthy();
  })
}