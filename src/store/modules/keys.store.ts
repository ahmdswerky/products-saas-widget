export default {
	namespaced: true,
	state: {
		apiKey: null,
	},
	mutations: {
		setApiKey(state, apiKey) {
			state.apiKey = apiKey;
		},
	},
	getters: {
		apiKey: state => state.apiKey,
	},
};
