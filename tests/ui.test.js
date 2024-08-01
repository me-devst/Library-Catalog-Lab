//import the test and expect functions from the @playwright/test package. These functions are used for defining tests and making assertions within the tests
const { test, expect } = require("@playwright/test");
const appUrl = 'http://localhost:3000';
const appUrlLogin = 'http://localhost:3000/login';

//asynchronous function that takes an argument the browser page that will be used
test('Verify "All Books" link is visible', async({page})=> {
    //open the URL application page
    await page.goto(appUrl);
    
    //wait for the navigation bar to load
    await page.waitForSelector('nav.navbar');

    //get link "All Books" on the page
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" Button Is Visible', async({page})=> {
    //open the URL application page
    await page.goto(appUrl);
    
    //wait for the navigation bar to load
    await page.waitForSelector('nav.navbar');

    //get link "Login" on the page
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify That the "Register" Button Is Visible', async({page})=> {
    //open the URL application page
    await page.goto(appUrl);
    
    //wait for the navigation bar to load
    await page.waitForSelector('nav.navbar');

    //get link "Register" on the page
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "Register" Link Text', async({page})=> {
    //open the URL application page
    await page.goto(appUrl);
    
    //wait for the navigation bar to load
    await page.waitForSelector('nav.navbar');

    //get link "Register" on the page
    const registerButton = await page.$('a[href="/register"]');
    const registerLinkText = await registerButton.textContent();

    expect(registerLinkText).toEqual('Register');
});

//Navigation Bar for Logged-In Users

test('Verify "All Books" link is visible after login', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fill the input fields with the predefined credentials and click on the [Submit] button
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    //get link "All Books" on the page
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
}); 


test('Verify That the "My Books" link Is Visible after login', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fill the input fields with the predefined credentials and click on the [Submit] button
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    //get link "My Books" on the page
    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
}); 

test('Verify That the "Add Book" link is visible after login', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fill the input fields with the predefined credentials and click on the [Submit] button
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');

    //get link "Add Books" on the page
    const addBookLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookLink.isVisible();

    expect(isLinkVisible).toBe(true);
}); 

test('Verify That the User Email Address Is Visible', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fill the input fields with the predefined credentials and click on the [Submit] button
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');

    await page.click('input[type="submit"]');

    //get div user text content
    const divUserContent = await page.textContent('#user');    

    expect(divUserContent).toContain('peter@abv.bg');
}); 

test('Submit the Form with Valid Credentials', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fill the input fields with the predefined credentials and click on the [Submit] button
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]'); 

    expect(page.url()).toBe('http://localhost:3000/catalog');
}); 

test('Submit the Form with Empty Input Fields', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //click on the [Submit] button
    await page.click('input[type="submit"]');

    //listen for the dialog event, visualizing an alert popup window with a warning message
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/catalog"]'); 
    expect(page.url()).toBe(appUrlLogin);
}); 

test('Submit the Form with Empty Email Input Field', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fills in password click on the [Submit] button
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');

    //listen for the dialog event, visualizing an alert popup window with a warning message
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/catalog"]'); 
    expect(page.url()).toBe(appUrlLogin);
}); 

test('Submit the Form with Empty Password Input Field', async({page})=> {
    //open the URL application page
    await page.goto(appUrlLogin);
    
    //fills in password click on the [Submit] button
    await page.fill('#email', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    //listen for the dialog event, visualizing an alert popup window with a warning message
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/catalog"]'); 
    expect(page.url()).toBe(appUrlLogin);
}); 