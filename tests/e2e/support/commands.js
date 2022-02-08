let i = 1;

Cypress.Commands.add('captureScreenshot', name => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	const date = `${yyyy}-${mm}-${dd}`;
	const number = i < 10 ? `0${i}` : i.toString();
	cy.screenshot(`${number}.${name}-${date}`);
	i++;
});

Cypress.Commands.add('login', (email = 'test@test.com', password = 'password') => {
	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);

	cy.get('button[type="submit"]').click();
});
