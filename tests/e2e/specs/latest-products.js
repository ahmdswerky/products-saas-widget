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
	it('latest-products', async () => {
		cy.server();
		cy.route({
			method: 'GET',
			url: 'http://localhost:8000/api/payments?limit=4&page=1&auth=true',
		}).as('payments');

		cy.visit(Cypress.config().appUrl);

		cy.wait('@payments')
			.its('request.body')
			.should(data => {
				alert(JSON.stringify(data));
			});

		//expect(true).toBe(true);
	});
});
