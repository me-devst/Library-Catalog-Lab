//import the test and expect functions from the @playwright/test package. These functions are used for defining tests and making assertions within the tests
const { test, expect } = require("@playwright/test");

//asynchronous function that takes an argument the browser page that will be used
test('Verify "All Books" link is visible', async({page})=> {
    //open the URL application page
    await page.goto('http://localhost:3000');
    
    //wait for the navigation bar to load
    await page.waitForSelector('nav.navbar');

    //get link "All Books" link on the page
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});