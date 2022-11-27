/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint prefer-template: 0 */
/* eslint no-multi-assign: 0 */

const win: any = window;

export function init(writeKey = 'Cg8oWGL6FzytvIYIq9Jh6RfiF1l2JKp0') {
	const analytics = (win.analytics = win.analytics || []);
	if (!analytics.initialize)
		if (analytics.invoked) win.console && console.error && console.error('Segment snippet included twice.');
		else {
			analytics.invoked = !0;
			analytics.methods = [
				'trackSubmit',
				'trackClick',
				'trackLink',
				'trackForm',
				'pageview',
				'identify',
				'reset',
				'group',
				'track',
				'ready',
				'alias',
				'debug',
				'page',
				'once',
				'off',
				'on',
				'addSourceMiddleware',
				'addIntegrationMiddleware',
				'setAnonymousId',
				'addDestinationMiddleware',
			];
			analytics.factory = function (e) {
				return function (...args) {
					const t = Array.prototype.slice.call(args);
					t.unshift(e);
					analytics.push(t);
					return analytics;
				};
			};
			for (let e = 0; e < analytics.methods.length; e += 1) {
				const key = analytics.methods[e];
				analytics[key] = analytics.factory(key);
			}
			analytics.load = function (key, e) {
				const t = document.createElement('script');
				t.type = 'text/javascript';
				t.async = !0;
				t.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
				const n = document.getElementsByTagName('script')[0];
				n.parentNode.insertBefore(t, n);
				analytics._loadOptions = e;
			};
			analytics._writeKey = writeKey;
			analytics.SNIPPET_VERSION = '4.15.3';
			analytics.load(writeKey);
			analytics.page();
		}
}

export function setUser({ name, email, createdAt }) {
	win.analytics.identify(email, {
		name,
		email,
		created_at: createdAt,
	});
}

export default {
	init,
	setUser,
};
