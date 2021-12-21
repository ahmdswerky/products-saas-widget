<template>
	<div
		v-if="typeof page === 'number'"
		:title="simple ? 'page' : ''"
		:class="{ 'bg-white': !simple, ...classes }"
		class="px-4 py-3 flex items-center justify-between"
	>
		<div class="flex-1 flex items-center justify-between">
			<div>
				<nav
					:class="{ 'space-x-4': !simple, 'space-x-2': simple }"
					class="relative z-10 inline-flex items-center rounded-md"
					aria-label="Pagination"
				>
					<button
						id="pagination--prev"
						@click="paginate(-1)"
						:disabled="page <= 1"
						:class="{
							'hover:bg-gray-200': page > 1 && !simple,
							'hover:bg-gray-100': page <= 1 && !simple,
							'cursor-default': page <= 1,
							'bg-gray-100': !simple,
							'p-2': !sm,
							'p-1': sm,
							[color]: true,
						}"
						class="relative inline-flex items-center rounded-md text-sm font-medium"
					>
						<svg
							:class="{ 'h-5 w-5': !sm, 'h-4 w-4': sm }"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					<div v-if="!simple">
						<p class="text-sm text-gray-700">
							Showing
							<span id="pagination--showing-results-start" class="font-medium">{{ perPage * (page - 1) + 1 }}</span>
							to
							<span id="pagination--showing-results-end" class="font-medium">{{ perPage * page }}</span>
							of
							<span id="pagination--total" class="font-medium">{{ total }}</span>
							results
						</p>
					</div>

					<div v-else>
						<p class="text-sm text-gray-700">
							<span id="pagination--page" class="font-medium">{{ page }}</span>
							<!--of
							<span class="font-medium">{{ lastPage }}</span>-->
						</p>
					</div>

					<button
						id="pagination--next"
						@click="paginate(+1)"
						:disabled="!hasMore"
						:class="{
							'hover:bg-gray-200': hasMore && !simple,
							'hover:bg-gray-100': !hasMore && !simple,
							'cursor-default': !hasMore,
							'bg-gray-100': !simple,
							'p-2': !sm,
							'p-1': sm,
							[color]: true,
						}"
						class="relative inline-flex items-center rounded-md text-sm font-medium"
					>
						<svg
							:class="{ 'h-5 w-5': !sm, 'h-4 w-4': sm }"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</nav>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, defineEmits } from 'vue';
import { tryOnBeforeUnmount } from '@vueuse/shared';
import emitter from '@/plugins/emitter';

export default defineComponent({
	props: {
		// event: {
		//	type: String,
		//	required: true,
		// },
		pagination: {
			type: Object,
			required: true,
		},
		simple: {
			type: Boolean,
			default: false,
		},
		sm: {
			type: Boolean,
			default: false,
		},
		classes: {
			type: String,
		},
		color: {
			type: String,
			default: 'text-gray-500',
		},
	},

	// emits: defineEmits<{
	//	(e: 'change', page: number): void;
	// }>(),

	setup(props, { emit }) {
		// const emit = defineEmits(['change']);
		// const emit = defineEmits<{
		//	(e: 'change', page: number): void;
		// }>();
		const pagination = computed(() => ({ ...props.pagination }));

		const page = computed(() => pagination.value.current_page);
		const lastPage = computed(() => pagination.value.last_page);
		const total = computed(() => pagination.value.total);
		const perPage = computed(() => pagination.value.per_page);
		const hasMore = computed(() => pagination.value.has_more);

		// const page = computed(() => props.pagination.current_page);
		// const lastPage = ref(props.pagination.last_page);
		// const total = ref(props.pagination.total);
		// const perPage = ref(props.pagination.per_page);
		// const hasMore = ref(props.pagination.has_more);

		// alert(page.value);
		// alert(lastPage.value);
		// alert(total.value);
		// alert(perPage.value);
		// alert(hasMore.value);

		// const page = ref(1);
		// const lastPage = ref(1);
		// const total = ref(0);
		// const perPage = ref(0);
		// const hasMore = ref(false);

		function paginate(steps) {
			// alert(JSON.stringify(page.value + steps));
			// alert(JSON.stringify(page.value));
			// alert(JSON.stringify(pagination.current_page));
			pagination.value.current_page = page.value + steps;
			emit('change', pagination.value.current_page);
			// emitter.emit(`${props.event}:paginate`, page.value);
		}

		// emitter.on(`payments:pagination`, data => {
		//	alert(JSON.stringify(data));
		// });

		// emitter.on(`${props.event}:pagination`, data => {
		//	// alert(`${props.event}: ${JSON.stringify(data)}`);
		//	page.value = data.current_page;
		//	total.value = data.total;
		//	hasMore.value = data.has_more;
		//	lastPage.value = data.last_page;
		//	perPage.value = data.per_page;
		// });

		tryOnBeforeUnmount(() => {
			pagination.value.page = 1;
			pagination.value.lastPage = 1;
			pagination.value.total = 0;
			pagination.value.perPage = 0;
			pagination.value.hasMore = false;
		});

		return {
			page,
			total,
			lastPage,
			perPage,
			hasMore,
			paginate,
		};
	},
});
</script>
