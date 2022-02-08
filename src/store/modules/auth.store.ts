import Cookies from 'js-cookie';
import { TinyEmitter } from 'tiny-emitter';
import { getUser } from '@/services/api/auth';
import emitter from '@/plugins/emitter';

const auth = {
	namespaced: true,
	state: () => ({
		dialog: true,
		loggedIn: false,
		token: Cookies.get('mjhvhqhbhdo') || null,
		user: {},
	}),
	mutations: {
		setToken(state, token: string | null) {
			state.token = token;
		},
		showDialog(state, show = true) {
			state.dialog = show;
		},
		setUser(state, user) {
			state.user = user;
		},
		setLoggedIn(state, loggedIn: boolean) {
			state.loggedIn = loggedIn;
		},
	},
	actions: {
		setToken({ commit }, token: string | null) {
			commit('setToken', token);
			Cookies.set('mjhvhqhbhdo', token);
		},
		signIn({ commit, dispatch }, { user, token }) {
			dispatch('setToken', token);
			commit('setUser', user);
			commit('setLoggedIn', true);
			emitter.emit('auth:signed');
		},
		signOut({ commit }) {
			commit('setToken', null);
			commit('setUser', {});
			commit('setLoggedIn', false);
			Cookies.remove('mjhvhqhbhdo');
			emitter.emit('auth:signedout');
		},
		checkAuth({ dispatch }) {
			const token = Cookies.get('mjhvhqhbhdo');

			if (!token) {
				dispatch('signOut');
			} else {
				getUser()
					.then(({ data }) => {
						dispatch('signIn', {
							token,
							user: data.user,
						});
					})
					.catch(() => {
						dispatch('signOut');
					});
			}
		},
	},
	getters: {
		token: state => state.token,
		dialog: state => state.dialog,
		loggedIn: state => state.loggedIn,
		user: state => state.user,
	},
};

export default auth;
