export const Properties = () => {
  it('Should say not proceed with empty name field', async () => {
    await page.locator('text=Now let\'s set some criteria.Don\'t worry about it too much, you can always come b >> button').click();
    expect(await page.waitForSelector('text=Name is required')).toBeTruthy();
  })

  it('Should enable adding properties if name is provided', async () => {
    await page.locator('input[name="name"]').fill('meals');
    await page.locator('input[name="name"]').press('Enter');
    expect(await page.waitForSelector('text=Now add some criteria')).toBeTruthy();
    expect(await page.waitForSelector('[data-testid="AddCircleIcon"]')).toBeTruthy();
  })

  it('Should not save property with empty fields', async () => {
    await page.locator('[data-testid="AddCircleIcon"]').click();
    await page.locator('#property-save').click();
    expect(await page.waitForSelector('text=Name is required')).toBeTruthy();
    expect(await page.waitForSelector('text=Invalid number')).toBeTruthy();
  })

  it('Should save property if all fields are filled in', async () => {
    await page.locator('text=Name is requiredName is required >> input[name="name"]').fill('kcal');
    await page.locator('text=Criteria importanceInvalid number >> span').nth(1).click();
    await page.locator('text=the lower the better >> input[type="checkbox"]').check();
    await page.locator('#property-save').click();
    expect(await page).not.toHaveSelector('text=Name is required')
    expect(await page).not.toHaveSelector('text=Invalid number');
  })

  it('Should add second property', async () => {
    await page.locator('[data-testid="AddCircleIcon"]').click();
    await page.locator('input[name="name"]').nth(2).fill('taste');
    await page.locator('.Properties_propertyList__IOO5H div:nth-child(2) .css-1p5q5e5-MuiStack-root .MuiSlider-colorPrimary .MuiSlider-rail').click();
    await page.locator('#property-save').click();
    expect(await page).not.toHaveSelector('text=Name is required')
    expect(await page).not.toHaveSelector('text=Invalid number');
  })

  it('Should proceed to next step with two properties', async () => {
    await page.locator('button:has-text("Next step")').click();
    expect(await page.waitForSelector('text=Now let\'s set the options to choose from.')).toBeTruthy();
  })
}