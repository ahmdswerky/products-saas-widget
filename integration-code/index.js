// const mapping = ["p", "a", "c", "k"];

(function (baseURL, scriptId, windowId, scriptName) {
	// const baseURL = "https://products-list.test";
	// const scriptId = "product-list-script";
	const script = document.createElement(scriptName);
	script.src = `${baseURL}/products-list.js`;
	script.id = scriptId;

	document.head.append(script);

	window[windowId] = {
		loaded: false,
		fireLoaded: () => {
			const event = new Event('products-list:loaded');
			const eventName = 'dispatchEvent';

			window[eventName](event);
		},
	};

	script.onload = () => {
		const events = {
			loaded: true,
		};
		// const event = "loaded";
		events.map(event => {
			window[windowId][event] = true;
		});

		window[windowId].fireLoaded();
	};
})('https://products-list.test', 'product-list-script', 'productLists', 'script');
