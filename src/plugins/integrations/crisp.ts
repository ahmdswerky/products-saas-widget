const w: any = window;

export function init(key) {
	w.$crisp = [];
	w.$crisp.push(['safe', true]);
	w.CRISP_WEBSITE_ID = key;
	// (function () {
	const d: any = document;
	const s: any = d.createElement('script');
	s.src = 'https://client.crisp.chat/l.js';
	s.async = 1;
	// s.onload = () => w.$crisp.push(['safe', true]);
	d.getElementsByTagName('head')[0].appendChild(s);
	// })();
}

export default {
	init,
};
