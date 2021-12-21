import api from '@/services/api';

export function index(page, limit = null) {
	return api.get(`products`, {
		params: {
			page,
			limit,
		},
	});
}

export function show(id) {
	return api.get(`products/${id}`);
}
