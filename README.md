Prepare the Environment (In the Terminal)

# Install the dependencies to be able to run & develop the application. It will create folder "node_modules". Info in: package.json  
npm install

# Start the front end. Script starts http on local host. Info in: package.json 
npm run start-fe

# Start the backend (executes "node server.js"). Info in: package.json 
npm run start-be

# UI Tests
# Install/update the playwright/test framework
npm install -D @playwright/test

# Install new browsers
npx playwright install

# Run UI tests with Playwright. Script Info in: package.json
npm run test:ui

# or with debug
npm run test:ui-debug




