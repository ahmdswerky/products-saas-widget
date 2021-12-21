import { computed } from 'vue';
import { getUser } from '@/services/api/auth';
import store from '@/store';

export function authenitcation(to, from, next) {
	const loggedIn = computed(() => store.getters['auth/loggedIn']);
	const token = computed(() => store.getters['auth/token']);
	const user = computed(() => store.getters['auth/user']);

	if (loggedIn.value) {
		next();
	} else if (!(user.value && user.value.id) && token.value) {
		getUser()
			.then(({ data }) => {
				store
					.dispatch('auth/signIn', {
						user: data.user,
						token: token.value,
					})
					.then(() => {
						next();
					});
			})
			.catch(() => {
				store.dispatch('auth/signOut');
			});
	} else {
		next();
	}
}

export function isAuthenticated() {
	return store.getters['auth/loggedIn'];
}
