// https://docs.cypress.io/api/introduction/api.html
//const baseURL = `http://localhost:9000/#/`;
//const baseURL = Cypress.config().baseUrl;

function toggleAuthPopup() {
	cy.get('#auth-switch').click();
}

describe('Payment', () => {
	it('can click on an x and y dimentions', () => {
		cy.visit(Cypress.config().appUrl);

		cy.wait(400);
		// go to a product that is in stock
		cy.get('.product:not(.empty) .purchase-btn').first().click();

		cy.wait(1000);

		toggleAuthPopup();
		cy.login();

		cy.get('.purchase-btn').click();
		cy.get('#paypal-switch').click();

		cy.wait(6000);

		cy.get('#paypal-button-container').shoulb('be.visible');
	});
});
