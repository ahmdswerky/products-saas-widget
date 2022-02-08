// https://docs.cypress.io/api/introduction/api.html
//const baseURL = `http://localhost:9000/#/`;
//const baseURL = Cypress.config().baseUrl;

function toggleAuthPopup() {
	cy.get('#auth-switch').click();
}

describe('Authentication Tests', () => {
	it('user should be signed in for payment', async () => {
		cy.visit(Cypress.config().appUrl);

		cy.wait(400);
		cy.get('.product:not(.empty) .purchase-btn').first().click();
		cy.captureScreenshot('product-page-opened');

		// go to a product that is in stock
		cy.wait(150);
		cy.get('.purchase-btn').click();
		cy.captureScreenshot('purchase-button-clicked');

		cy.get('#auth-form').should('be.visible');

		// login
		cy.login();
		cy.captureScreenshot('user-logged-in');

		cy.wait(200);

		cy.get('#payment-methods-wrapper').should('be.visible');
		cy.captureScreenshot('payment-methods-displayed');
	});
});
