import LogRocket from 'logrocket';

export function init(key = 'products/products-dev') {
	LogRocket.init(key);
}

export function setUser({ name, email, createdAt }) {
	LogRocket.identify(email, {
		name,
		email,
	});
}

export default {
	init,
	setUser,
};
