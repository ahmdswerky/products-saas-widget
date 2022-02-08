<template>
	<div class="flex px-4 border-t border-pink-100 flex-col space-y-2s mb-3">
		<div v-if="!loading && !products?.length" class="flex flex-col space-y-4 py-8 justify-center items-center">
			<!--<img class="opacity-70" src="@/assets/images/empty-products.png" />-->
			<!--<img class="opacity-70" src="@/assets/images/empty-products.png" />-->
			<Image class="opacity-70" src="empty-products.png" />
			<h4 class="text-pink-400 font-semibold text-sm">Your purchases will appear in here.</h4>
		</div>
		<div class="space-y-2 my-4" v-else-if="loading">
			<div v-for="i in 4" :key="i" class="flex justify-between">
				<div class="flex items-center w-2/3 space-x-2">
					<div class="w-6 h-9 rounded-md bg-gray-200 animate-pulse"></div>
					<div class="w-3/4 h-3 rounded bg-gray-200 animate-pulse"></div>
				</div>
				<div class="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
			</div>
		</div>
		<!--v-for="{ id, slug, title, price, photo } in products"-->
		<div v-else class="space-y-2">
			<div class="flex items-center justify-between">
				<h2 class="text-gray-600 my-4 text-sm font-semibold">Your latest purchases</h2>

				<Paginator @change="getData" class="no-padding-x" color="text-pink-400" :pagination="pagination" simple sm />
			</div>
			<div v-for="{ product, usd_amount } in products" :key="product.id" class="flex items-center justify-between">
				<RouterLink
					:to="{ name: 'Show', params: { id: product.slug } }"
					class="flex items-center relative space-x-2 w-2/3"
				>
					<img
						v-if="product.photo && product.photo.path"
						class="w-6 h-9 rounded-md flex-shrink-0"
						:src="product.photo.path"
					/>
					<span :title="product.title" class="text-gray-600 flex-grow block truncate">{{ product.title }}</span>
				</RouterLink>
				<span class="text-gray-700">{{ currencyFormat(usd_amount, 'USD') }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { onKeyPressed, onKeyStroke } from '@vueuse/core';
import { useStore } from 'vuex';
import confetti from 'canvas-confetti';
import { currencyFormat } from '@/utils';
import { getPayments } from '@/services/api/payment';
import Paginator from '@/components/shared/Paginator.vue';
import emitter from '@/plugins/emitter';

export default defineComponent({
	components: {
		RouterLink,
		Paginator,
	},

	setup() {
		const { commit } = useStore();
		const pagination = ref({});
		const loading = ref(true);
		const products = ref([]);

		function getData(page = 1) {
			loading.value = true;

			getPayments({ limit: 4, page })
				.then(({ data }) => {
					products.value = data.data;

					// eslint-disable-next-line camelcase
					const { total, current_page, last_page, per_page, has_more } = data;
					pagination.value = {
						total,
						last_page,
						per_page,
						current_page,
						has_more,
					};
				})
				.finally(() => {
					loading.value = false;
				});
		}

		onMounted(() => {
			getData();
		});

		// emitter.on(`payments:pagination`, data => {
		//	pagination.value = data;
		// });

		// emitter.on('payments:paginate', getData);

		emitter.on('payments:refresh', getData);

		emitter.on('confetti:fire', () => {
			confetti({
				origin: {
					x: 100,
				},
				particleCount: 150,
				spread: 60,
			});
		});

		onKeyStroke('Escape', e => {
			commit('dialog/closeAll');
		});

		return {
			loading,
			pagination,
			products,
			getData,
			currencyFormat,
		};
	},
});
</script>

<style scoped></style>
