const { dirname, join } = require('path');

Cypress.Commands.add('login', (email, password, beforeSubmit = () => {}) => {
	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);
	beforeSubmit();
	cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('clearOldScreenshots', filename => {
	//alert(join())
	//alert(filename);
	alert(process.env.NODE_PATH);
	//alert(dirname(require.main.filename));
});

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
