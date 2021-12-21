import Cookies from 'js-cookie';

export default {
	namespaced: true,
	state: {
		currency: Cookies.get('lkcamlfkad') || 'USD',
	},
	mutations: {
		setCurrency(state, currency) {
			state.currency = currency;
		},
	},
	actions: {
		selectCurrency({ commit }, currency) {
			commit('setCurrency', currency);
			Cookies.set('lkcamlfkad', currency);
		},
	},
	getters: {
		currency: state => state.currency,
	},
};
