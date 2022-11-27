/* eslint-disable */

const win: any = window;

export function init(key) {
	// window, document, window.Beacon || function () {}
	// !(function (e = win, t = document, n = win.Beacon || function () {}) {
	// 	function a() {
	// 		var e = t.getElementsByTagName('script')[0],
	// 			n = t.createElement('script');
	// 		(n.type = 'text/javascript'),
	// 			(n.async = !0),
	// 			(n.src = 'https://beacon-v2.helpscout.net'),
	// 			e.parentNode.insertBefore(n, e);
	// 	}
	// 	if (
	// 		((e.Beacon = n =
	// 			function (t, n, a) {
	// 				e.Beacon.readyQueue.push({ method: t, options: n, data: a });
	// 			}),
	// 		(n.readyQueue = []),
	// 		'complete' === t.readyState)
	// 	)
	// 		return a();
	// 	e.attachEvent ? e.attachEvent('onload', a) : e.addEventListener('load', a, !1);
	// });

	const start = function (e = win, t = document, n = win.Beacon || function () {}) {
		function a() {
			const e = t.getElementsByTagName('script')[0];
			const n = t.createElement('script');
			(n.type = 'text/javascript'),
				(n.async = !0),
				(n.src = 'https://beacon-v2.helpscout.net'),
				e.parentNode.insertBefore(n, e);
		}
		if (
			((e.Beacon = n =
				function (t: any, n: any, a: any) {
					e.Beacon.readyQueue.push({ method: t, options: n, data: a });
				}),
			(n.readyQueue = []),
			t.readyState === 'complete')
		)
			return a();
		e.attachEvent ? e.attachEvent('onload', a) : e.addEventListener('load', a, !1);
	};
	start();
	win.Beacon('init', key);
}

export default {
	init,
};
