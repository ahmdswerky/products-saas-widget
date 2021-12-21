import { shallowMount } from '@vue/test-utils';
import Paginator from '@/components/shared/Paginator.vue';

describe('Paginator.vue | page [first] (simple)', () => {
	const page = 1;
	const total = 50;
	const perPage = 10;
	const lastPage = 5;
	const hasMore = true;
	const pagination = {
		current_page: page,
		total,
		per_page: perPage,
		last_page: lastPage,
		has_more: hasMore,
	};

	const wrapper = shallowMount(Paginator, {
		props: {
			pagination,
			simple: true,
		},
	});

	it('displays the right page number', () => {
		expect(wrapper.find('#pagination--page').text()).toEqual(page.toString());
	});

	it('previous button is disabled on the [first] page', () => {
		expect(wrapper.find('#pagination--prev').attributes('disabled')).toBe('');
	});

	it('next button is disabled on the [first] page', () => {
		expect(wrapper.find('#pagination--next').attributes('disabled')).not.toBe('');
	});
});

describe('Paginator.vue | page [last] (simple)', () => {
	const lastPage = 5;
	const page = lastPage;
	const total = 50;
	const perPage = 10;
	const hasMore = false;
	const pagination = {
		current_page: page,
		total,
		per_page: perPage,
		last_page: lastPage,
		has_more: hasMore,
	};

	const wrapper = shallowMount(Paginator, {
		props: {
			pagination,
			simple: true,
		},
	});

	it('displays the right page number', () => {
		expect(wrapper.find('#pagination--page').text()).toEqual(page.toString());
	});

	it('previous button is disabled on the [last] page', () => {
		expect(wrapper.find('#pagination--prev').attributes('disabled')).not.toBe('');
	});

	it('next button is disabled on the [last] page', () => {
		expect(wrapper.find('#pagination--next').attributes('disabled')).toBe('');
	});
});
