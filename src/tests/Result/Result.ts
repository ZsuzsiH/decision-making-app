export const Result = () => {
    it('Should show the correct criteria', async () => {
        expect(await page.locator(
            "_react=PropertyNodeType[id = 'property-0']",
            { has: page.locator('text=50') }
        )).toBeTruthy();
        expect(await page.locator(
            "_react=PropertyNodeType[id = 'property-1']",
            { has: page.locator('text=50') }
        )).toBeTruthy();
    })
    it('Should show the correct properties', async () => {
        expect(await page.locator(
            "_react=OptionNodeType[id = 'option-0']",
            { has: page.locator('text=72') }
        )).toBeTruthy();
        expect(await page.locator(
            "_react=OptionNodeType[id = 'option-1']",
            { has: page.locator('text=83') }
        )).toBeTruthy();
    })
    it('Should show the correct winner', async () => {
        expect(await page.locator(
            "_react=WinnerNodeType[id = 'winner-1']",
            { has: page.locator("text='chicken breast'") }
        )).toBeTruthy();
    })
}
