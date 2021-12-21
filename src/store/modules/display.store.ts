export default {
	namespaced: true,
	state: {
		cols: 6,
		rows: 2,
	},
	mutations: {
		setDisplay(state, dimentions) {
			[state.cols, state.rows] = dimentions.split('x');
		},
	},
	getters: {
		display: state => `${state.cols}x${state.rows}`,
		count: state => state.cols * state.rows,
		cols: state => state.cols,
		rows: state => state.rows,
	},
};
