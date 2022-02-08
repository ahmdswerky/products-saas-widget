import { mount } from '@vue/test-utils';
import Auth from '@/components/Auth.vue';
import Image from '@/components/global/Image.vue';
//import '@/plugins/validation';
import store from '@/store';

describe('Auth.vue', () => {
	const wrapper = mount(Auth, {
		global: {
			plugins: [store],
			components: {
				Image,
			},
		},
	});

	it('switches between sign in and sign up', async () => {
		expect(wrapper.vm.loggedIn).toBe(false);

		await store.commit('dialog/open');

		expect(wrapper.vm.open).toBe(true);
		expect(wrapper.vm.mode).toBe('signin');

		expect(wrapper.find('[data-test="signup-switch"]')).toBeTruthy();
		await wrapper.find('[data-test="signup-switch"]').trigger('click');

		expect(wrapper.vm.mode).toBe('signup');
		expect(wrapper.vm.mode).not.toBe('signin');

		expect(wrapper.find('[data-test="signin-switch"]')).toBeTruthy();
		await wrapper.find('[data-test="signin-switch"]').trigger('click');

		expect(wrapper.vm.mode).toBe('signin');
		expect(wrapper.vm.mode).not.toBe('signup');
	});

	it('inputs changes reflects on component data', async () => {
		await store.commit('dialog/open');

		expect(wrapper.find('[name="name"]').exists()).toBeFalsy();
		expect(wrapper.find('[name="email"]').exists()).toBeTruthy();
		expect(wrapper.find('[name="password"]').exists()).toBeTruthy();

		expect(wrapper.find('[name="email"]').setValue('wrong'));
		expect(wrapper.find('[name="password"]').setValue('correct-password'));

		expect(wrapper.vm.email).toBe('wrong');
		expect(wrapper.vm.password).toBe('correct-password');
	});
});
