/* eslint-disable no-unused-expressions */

import { loadScript } from '@/utils';

const win: any = window;

export function init(key) {
	loadScript(`https://code.jquery.com/jquery-3.6.1.min.js`, {
		callback() {
			loadScript(`https://fw-cdn.com/${key}.js`, {
				extra: {
					chat: 'true',
				},
			});
		},
	});

	// window.fcSettings = {
	//   onInit: function() {
	//     window.fcWidget.setExternalId("john.doe1987");
	//     window.fcWidget.user.setFirstName("John");
	//     window.fcWidget.user.setEmail("john.doe@gmail.com");
	//     window.fcWidget.user.setProperties({
	//       plan: "Pro",                 // meta property 1
	//       status: "Active"                // meta property 2
	//     });
	//   }
	// }
	// <script src='//fw-cdn.com/1*****7/2*****9.js' chat='true'></script>

	// function initFreshChat() {
	// 	win.fcWidget.init({
	// 		token: key,
	// 		host: 'https://wchat.freshchat.com',
	// 	});
	// }

	// function initialize(l: any, t: any): void {
	// 	let e: any;
	// 	const i = l;
	// 	i.getElementById(t)
	// 		? initFreshChat()
	// 		: (((e = i.createElement('script')).id = t),
	// 		  (e.async = !0),
	// 		  (e.src = 'https://wchat.freshchat.com/js/widget.js'),
	// 		  (e.onload = initFreshChat),
	// 		  i.head.appendChild(e));
	// }

	// function initiateCall() {
	// 	initialize(document, 'Freshdesk Messaging-js-sdk');
	// }

	// win.addEventListener ? win.addEventListener('load', initiateCall, !1) : win.attachEvent('load', initiateCall, !1);
}

export function setUser({ name, email, createdAt }) {
	const [firstName, ...rest] = `${name}`.split(' ');

	win.fcSettings = {
		onInit() {
			win.fcWidget.user.setProperties({
				firstName,
				lastName: rest.join(' '),
				email,
			});
		},
	};
}

export default {
	init,
	setUser,
};
