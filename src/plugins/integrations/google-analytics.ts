/* eslint-disable */

import { loadScript } from '@/utils';

const win: any = window;

export function init(key) {
	loadScript(`https://www.googletagmanager.com/gtag/js?id=${key}`, {
		callback() {
			win.dataLayer = win.dataLayer || [];
			function gtag(...args) {
				win.dataLayer.push(args);
			}

			gtag('js', new Date());

			gtag('config', key);
		},
	});
}

export function setUser({ name, email, createdAt }) {
	//
}

export default {
	init,
	setUser,
};
