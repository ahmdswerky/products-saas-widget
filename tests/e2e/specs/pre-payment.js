// https://docs.cypress.io/api/introduction/api.html
//const baseURL = `http://localhost:9000/#/`;
//const baseURL = Cypress.config().baseUrl;

let i = 1;

function captureScreenShot(name) {
	const number = i < 10 ? `0${i}` : i.toString();
	cy.screenshot(`${number}.${name}`);
	i++;
}

function toggleAuthPopup() {
	cy.get('#auth-switch').click();
}

describe('Authentication Tests', () => {
	it('user should be signed in for payment', async () => {
		cy.visit(Cypress.config().appUrl);

		cy.wait(100).then(() => {
			// go to a product that is in stock
			cy.get('.product:not(.empty) .purchase-btn').first().click();
			cy.wait(150).then(() => {
				cy.get('.purchase-btn').click();

				//cy.get('#auth-wrapper').contains('Sign in');
				//cy.get('#auth-wrapper').should('be.visible');
				cy.get('#auth-form').should('be.visible');

				// login
				cy.get('input[name="email"]').type('ahmdswerky@gmail.com');
				cy.get('input[name="password"]').type('password');

				//captureScreenShot('login-data-filled');
				cy.get('button[type="submit"]').click();

				cy.get('#payment-methods-wrapper').should('be.visible');
			});
		});
	});
});
