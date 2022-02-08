// https://docs.cypress.io/api/introduction/api.html
//const baseURL = `http://localhost:9000/#/`;
//const baseURL = Cypress.config().baseUrl;
const { basename } = require('path');

//let i = 1;

//function captureScreenshot(name) {
//	const today = new Date();
//	const dd = String(today.getDate()).padStart(2, '0');
//	const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//	const yyyy = today.getFullYear();
//	const date = `${yyyy}-${mm}-${dd}`;
//	const number = i < 10 ? `0${i}` : i.toString();
//	//cy.screenshot(`${number}.${name}-${date}`);
//	i++;
//}

//function clearOldScreenshots() {
//	const filename = basename(__filename)
//}

function toggleAuthPopup() {
	//cy.get('[data-test="auth-switch"]').click();
	cy.get('#auth-switch').click();
}

describe('Authentication Tests', () => {
	it('validates the login form', () => {
		cy.visit(Cypress.config().appUrl);
		cy.clearOldScreenshots(basename(__filename));

		// open popup
		toggleAuthPopup();
		cy.captureScreenshot('popup-opened');

		cy.login('incorrect@email.net', 'incorrect-password');
		//cy.get('input[name="email"]').type('incorrect@email.net');
		//cy.get('input[name="password"]').type('incorrect-password');

		//cy.captureScreenshot('incorrect-login-data-filled');
		//cy.get('button[type="submit"]').click();
		cy.captureScreenshot('incorrect-credintials-errors');

		cy.get('#email-error').should('be.visible');

		// close popup
		toggleAuthPopup();
		cy.captureScreenshot('popup-closed');
	});

	it('signs user in and out', () => {
		cy.visit(Cypress.config().appUrl);

		// open popup
		toggleAuthPopup();
		cy.captureScreenshot('popup-opened');
		//cy.login('ahmdswerky@gmail.com', 'password', () => {
		//	cy.captureScreenshot('login-data-filled');
		//});
		cy.login();
		//cy.get('input[name="email"]').type('test@test.com');
		//cy.get('input[name="password"]').type('password');

		//cy.captureScreenshot('login-data-filled');
		//cy.get('button[type="submit"]').click();
		cy.captureScreenshot('user-logged-in');

		// open popup
		toggleAuthPopup();
		cy.captureScreenshot('popup-re-opened');

		// close popup
		toggleAuthPopup();
		cy.captureScreenshot('popup-closed');

		// open popup
		toggleAuthPopup();
		cy.captureScreenshot('open-popup-before-sign-out');

		cy.get('#logout-button').click();
		cy.captureScreenshot('popup-closed-after-sign-out');
	});
});
