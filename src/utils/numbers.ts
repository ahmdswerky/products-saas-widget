export function custom() {
	return 'custom';
}

export function currencyFormat(value: number, currency: string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
	}).format(value);
}
