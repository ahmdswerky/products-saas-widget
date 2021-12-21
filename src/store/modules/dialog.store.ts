export default {
	namespaced: true,
	state: {
		opened: false,
		overlayOpened: false,
	},
	mutations: {
		open(state) {
			state.opened = true;
		},
		close(state) {
			state.opened = false;
		},
		toggle(state) {
			state.opened = !state.opened;
		},
		openOverlay(state) {
			state.overlayOpened = true;
		},
		closeOverlay(state) {
			state.overlayOpened = false;
		},
		toggleOverlay(state) {
			state.overlayOpened = !state.overlayOpened;
		},
		openAll(state) {
			state.opened = true;
			state.overlayOpened = true;
		},
		closeAll(state) {
			state.opened = false;
			state.overlayOpened = false;
		},
	},
	actions: {
		toggle({ commit, state }) {
			console.log(state);

			if (!state.opened) {
				commit('open');
			} else {
				commit('closeAll');
			}
			// console.log(state);

			// const value = state.opened;
			// alert(value);
		},
	},
	getters: {
		opened: state => state.opened,
		overlayOpened: state => state.overlayOpened,
	},
};
