export const Intro = () => {
  it('Should say welcome text', async () => {
    expect(await page.waitForSelector('text="Welcome!"')).toBeTruthy();
    expect(await page.waitForSelector('text="What is your name?"')).toBeTruthy();
  })

  it('Should say not proceed with empty name field', async () => {
    await page.locator('input[name="name"]').press('Enter');
    expect(await page.waitForSelector('text=Name is required')).toBeTruthy();
  })

  it('Should proceed with filled in name', async () => {
    await page.locator('input[name="name"]').fill('Zsuzsi');
    await page.locator('input[name="name"]').press('Enter');
    expect(await page.waitForSelector('text=Welcome Zsuzsi!')).toBeTruthy();
  })

  it('Should give an explanation', async () => {
    expect(await page.waitForSelector('text=Welcome Zsuzsi!')).toBeTruthy();
    expect(await page.waitForSelector('text=This is a simple tool to help you make decisions.')).toBeTruthy();
    expect(await page.waitForSelector('text=First you need to define the criteria on which you want to base your decision.')).toBeTruthy();
    expect(await page.waitForSelector('text=Are you ready?')).toBeTruthy();
    await page.locator('button:has-text("Let\'s do it")').click();
    expect(await page.waitForSelector('text=Now let\'s set some criteria.')).toBeTruthy();
  })
}