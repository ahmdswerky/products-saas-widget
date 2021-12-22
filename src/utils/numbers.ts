export function randomBetween(min, max) {
	return Math.ceil(Math.random() * (max - 2)) + min;
}

export function currencyFormat(value: number, currency: string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
	}).format(value);
}
