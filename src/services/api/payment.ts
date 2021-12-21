import api from '@/services/api';

export function getPayments(query = {}) {
	return api.get(`payments`, {
		params: {
			...query,
			auth: true,
		},
	});
}

export function createCard(method, token) {
	return api.post(`customers/cards`, {
		method,
		token,
	});
}

export function attachPaymentMethod(method, methodId) {
	return api.post(`customers/payment-method`, {
		method,
		method_id: methodId,
	});
}

export function createPayment(data) {
	return api.post(`payments`, { ...data });
}

export function updatePayment(id, method, paymentId) {
	return api.post(`payments/${id}`, {
		_method: 'PUT',
		method,
		payment_id: paymentId,
	});
}
