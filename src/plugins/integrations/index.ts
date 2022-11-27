/* eslint-disable no-undef */
import crisp from '@/plugins/integrations/crisp';
import logrocket from '@/plugins/integrations/logrocket';
import intercom from '@/plugins/integrations/intercom';
import freshchat from '@/plugins/integrations/freshchat';
import hotjar from '@/plugins/integrations/hotjar';
import segment from '@/plugins/integrations/segment';
import helpscout from '@/plugins/integrations/helpscout';
import googleAnalytics from '@/plugins/integrations/google-analytics';

interface Integration {
	[key: string]: {
		init: (...args) => any;
		setUser?: (...args) => any;
		[key: string]: Function;
	};
}

export const integrations: Integration = {
	crisp,
	logrocket,
	intercom,
	'freshwork-chat': freshchat,
	hotjar,
	segment,
	helpscout,
	'google-analytics': googleAnalytics,
};

export function initializeIntegrations(integrationNames) {
	const w: any = window;
	w.enabledIntegrations = [];

	console.log(integrationNames);

	Object.entries(integrationNames).forEach(([integration, key]) => {
		w.enabledIntegrations.push();

		console.log(`✅ ${integration} integrated`);

		integrations[integration].init(key);
	});

	// for (let i = 0; i < Object.keys(integrationNames).length; i += 1) {
	// 	const integration = integrationNames[i];
	// 	w.enabledIntegrations.push(integrationNames[i]);
	// 	// console.log(integrations[integration]);
	// 	console.log(integration);
	// 	console.log(`✅ ${integration} integrated`);
	// 	// integration();
	// 	// integrations[integration].init();
	// }

	// Object.keys(integrationNames).forEach((integration: Function): void => {
	// 	integration();
	// });
}
