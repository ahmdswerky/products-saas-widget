import axios from 'axios';
import { computed } from 'vue';
import axiosRetry from 'axios-retry';
import store from '@/store';

const api = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
});

axiosRetry(axios, { retries: 3 });

api.interceptors.request.use(config => {
	const apiKey = computed(() => store.getters['keys/apiKey']);

	return {
		...config,
		headers: {
			...config.headers,
			'api-key': apiKey.value,
		},
	};
});

export default api;
