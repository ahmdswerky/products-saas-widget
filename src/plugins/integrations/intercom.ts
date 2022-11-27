import CryptoJS from 'crypto-js';

const win: any = window;

export function init(key = 'jemy2fml') {
	win.intercomSettings = {
		api_base: 'https://api-iam.intercom.io',
		app_id: key,
	};

	const ic: any = win.Intercom;
	if (typeof ic === 'function') {
		ic('reattach_activator');
		ic('update', win.intercomSettings);
	} else {
		const d = document;
		const i: any = function (...args) {
			i.c(args);
		};
		i.q = [];
		i.c = function (args) {
			i.q.push(args);
		};
		win.Intercom = i;
		const l: any = function () {
			const s: any = d.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = `https://widget.intercom.io/widget/${key}`;
			const x: any = d.getElementsByTagName('script')[0];
			x.parentNode.insertBefore(s, x);
			s.onload = function () {
				console.log('loaded inter');
			};
		};
		if (document.readyState === 'complete') {
			l();
		} else if (win.attachEvent) {
			win.attachEvent('onload', l);
		} else {
			win.addEventListener('load', l, false);
		}
	}

	// win.intercomSettings = {
	//   api_base: "https://api-iam.intercom.io",
	//   app_id: key,
	//   name: "<%= current_user.name %>", // Full name
	//   email: "<%= current_user.email %>", // Email address
	//   created_at: "<%= current_user.created_at.to_i %>" // Signup date as a Unix timestamp
	// };
}

export function setUser({ key = 'jemy2fml', name, email, createdAt }) {
	const userHash = CryptoJS.HmacSHA256(email, 'AyucV1qBcVWOvuSQbzgmw0wXyUGvbx4QR9ABh3Dh');

	win.Intercom('boot', {
		api_base: 'https://api-iam.intercom.io',
		app_id: key,
		name,
		email,
		created_at: createdAt,
		user_hash: `${userHash}`,
	});

	win.Intercom('update');
}

export default {
	init,
	setUser,
};
