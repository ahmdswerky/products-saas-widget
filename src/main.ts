import { createApp, h } from 'vue';
import wrapper from 'vue3-webcomponent-wrapper';
import App from '@/App.vue';
import Image from '@/components/global/Image.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins/validation';
import 'tailwindcss/tailwind.css';
import '@/assets/style/main.scss';

const createAppInstance = component => {
	const app = createApp(component);
	app.use(store).use(router);
	app.component('Image', Image);
	return app;
};

const webComponent = wrapper(App, createAppInstance, h);

window.customElements.define('simple-products-list', webComponent);
