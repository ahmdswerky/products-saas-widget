import { createStore } from 'vuex';
import currency from '@/store/modules/currency.store';
import display from '@/store/modules/display.store';
import keys from '@/store/modules/keys.store';
import dialog from '@/store/modules/dialog.store';
import auth from '@/store/modules/auth.store';

export default createStore({
	modules: {
		currency,
		display,
		keys,
		auth,
		dialog,
	},
});
