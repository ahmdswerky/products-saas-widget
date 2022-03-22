// const mapping = ["p", "a", "c", "k"];

//const keyid = 'ljkbamkwa';

(function (baseURL, scriptId, windowId, scriptName, keyid = 'ljkbamkwa') {
	// const baseURL = "https://products-list.test";
	// const scriptId = "product-list-script";
	const script = document.createElement(scriptName);
	//script.src = `${baseURL}/products-list.js`;
	script.src = `${baseURL}/products.js`;
	script.id = scriptId;
  //const events = {
  //  fireLoaded: 'products-list:loaded',
  //};

	document.head.append(script);

	window[windowId] = {
		loaded: false,
		fireLoaded: () => {
			const event = new Event();
			const eventName = 'dispatchEvent';

			window[eventName](event);
		},
	};

  window[keyid] = '{{API_KEY}}'

  //events.map(name => {
  //  window[windowId][name] = () => {
  //    events[name];
  //  };
  //})

	//script.onload = () => {
	//	const events = {
	//		loaded: true,
	//	};
	//	// const event = "loaded";
	//	//events.map(event => {
	//	//	window[windowId][event] = true;
	//	//});

	//	window[windowId].fireLoaded();
	//};
//})('https://products-list.test', 'product-list-script', 'productLists', 'script');
})('https://d39j6ddzqa3pp1.cloudfront.net/v1', 'product-list-script', 'productLists', 'script');
