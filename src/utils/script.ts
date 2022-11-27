interface ExtraScriptProps {
	[key: string]: string;
}

interface Options {
	// extra: ExtraScriptProps;
	extra: any;
	callback: Function;
}

export function loadScript(src: string, options: any = { callback: () => {}, extra: {} }) {
	const script = document.createElement('script');

	if (options.extra) {
		Object.entries(options.extra).forEach(([key, value]) => {
			if (typeof value === 'string') {
				script.setAttribute(key, value);
			}
		});
	}

	script.src = src;

	document.body.appendChild(script);

	script.onload = function onLoad() {
		if (options.callback && typeof options.callback === 'function') {
			options.callback();
		}
	};
}
