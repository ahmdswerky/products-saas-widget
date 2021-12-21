import { mount, shallowMount } from '@vue/test-utils';
import Paginator from '@/components/shared/Paginator.vue';

describe('Paginator.vue | page [first]', () => {
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
		},
	});

	it('displays the right results start', () => {
		expect(wrapper.find('#pagination--showing-results-start').text()).toEqual(page.toString());
	});

	it('displays the right results at the end', () => {
		expect(wrapper.find('#pagination--showing-results-end').text()).toEqual((perPage * page).toString());
	});

	it('displays the right total items', () => {
		expect(wrapper.find('#pagination--total').text()).toEqual(total.toString());
	});

	it('previous button is disabled on the [first] page', () => {
		expect(wrapper.find('#pagination--prev').attributes('disabled')).toBe('');
	});

	it('next button is disabled on the [first] page', () => {
		expect(wrapper.find('#pagination--next').attributes('disabled')).not.toBe('');
	});
});

describe('Paginator.vue | page [last]', () => {
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
		},
	});

	it('displays the right results start', () => {
		expect(wrapper.find('#pagination--showing-results-start').text()).toEqual((perPage * (page - 1) + 1).toString());
	});

	it('displays the right results end', () => {
		expect(wrapper.find('#pagination--showing-results-end').text()).toEqual((page * perPage).toString());
	});

	it('displays the right total items', () => {
		expect(wrapper.find('#pagination--total').text()).toEqual(total.toString());
	});

	it('previous button is disabled on the [first] page', () => {
		expect(wrapper.find('#pagination--prev').attributes('disabled')).not.toBe('');
	});

	it('next button is disabled on the [first] page', () => {
		expect(wrapper.find('#pagination--next').attributes('disabled')).toBe('');
	});
});

describe('Paginator.vue | page [in-between]', () => {
	const lastPage = 5;
	// get a random page between the first page and the last and not either.
	const page = Math.ceil(Math.random() * (lastPage - 2)) + 1;
	const total = 50;
	const perPage = 10;
	const hasMore = true;
	const pagination = {
		current_page: page,
		total,
		per_page: perPage,
		last_page: lastPage,
		has_more: hasMore,
	};

	const wrapper = mount(Paginator, {
		props: {
			pagination,
		},
	});

	it('previous button is not disabled on the [in-between] page', () => {
		expect(wrapper.find('#pagination--prev').attributes('disabled')).not.toBe('');
	});

	it('next button is not disabled on the [in-between] page', () => {
		expect(wrapper.find('#pagination--next').attributes('disabled')).not.toBe('');
	});

	it('click on the next button emitts the next page number', async () => {
		await wrapper.find('#pagination--next').trigger('click');

		expect(wrapper.emitted('change')[0]).toEqual([page + 1]);
	});
});
