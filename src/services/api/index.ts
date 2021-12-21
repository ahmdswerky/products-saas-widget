import axios from 'axios';
import { computed } from 'vue';
import axiosRetry from 'axios-retry';
import store from '@/store';
import router from '@/router';

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

api.interceptors.response.use(
	config => {
		return {
			...config,
		};
	},
	error => {
		if (error.response && error.response.status && error.response.status === 404) {
			router.replace({
				name: 'NotFound',
			});
		}
	}
);

export default api;
