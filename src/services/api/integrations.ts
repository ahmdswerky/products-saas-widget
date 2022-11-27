import api from '@/services/api';

export function getIntegrations(page = 1, limit = null) {
	return api.get(`integrations`, {
		params: {
			limit: 300,
			used: true,
			available: true,
		},
	});
}
