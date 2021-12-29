// https://docs.cypress.io/api/introduction/api.html
//const baseURL = `http://localhost:9000/#/`;
//const baseURL = Cypress.config().baseUrl;
const { basename } = require('path');

let i = 1;

function captureScreenShot(name) {
	const number = i < 10 ? `0${i}` : i.toString();
	cy.screenshot(`${number}.${name}`);
	i++;
}

//function clearOldScreenshots() {
//	const filename = basename(__filename)
//}

function toggleAuthPopup() {
	cy.get('#auth-switch').click();
}

describe('Authentication Tests', () => {
	it('user can sign in and out', async () => {
		cy.visit(Cypress.config().appUrl);
		cy.clearOldScreenshots(basename(__filename));

		// open popup
		toggleAuthPopup();
		captureScreenShot('popup-opened');
		//cy.login('ahmdswerky@gmail.com', 'password', () => {
		//	captureScreenShot('login-data-filled');
		//});
		cy.get('input[name="email"]').type('ahmdswerky@gmail.com');
		cy.get('input[name="password"]').type('password');

		captureScreenShot('login-data-filled');
		cy.get('button[type="submit"]').click();
		captureScreenShot('user-logged-in');

		// open popup
		toggleAuthPopup();
		captureScreenShot('popup-re-opened');

		cy.contains('#auth-wrapper h3', 'Welcome');

		// close popup
		toggleAuthPopup();
		captureScreenShot('popup-closed');

		// open popup
		toggleAuthPopup();
		captureScreenShot('open-popup-before-sign-out');

		cy.get('#logout-button').click();

		// open popup
		toggleAuthPopup();
		captureScreenShot('close-popup-after-sign-out');
	});
});
