/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint prefer-const: 0 */

const win: any = window;

export function init(key) {
	// (function (h = win, o = document, t = 'https://static.hotjar.com/c/hotjar-', j = '.js?sv=', a, r) {
	const h = win;
	const o = document;
	const t = 'https://static.hotjar.com/c/hotjar-';
	const j = '.js?sv=';
	// let a: any;
	// let r: any;

	h.hj =
		h.hj ||
		function (...args) {
			(h.hj.q = h.hj.q || []).push(args);
		};
	h._hjSettings = { hjid: key, hjsv: 6 };
	let a = o.getElementsByTagName('head')[0];
	let r: any = o.createElement('script');
	r.async = 1;
	r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
	a.appendChild(r);
	// })(window, docukment, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

export default {
	init,
};
