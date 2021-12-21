<template>
	<div class="relative">
		<!--<KeepAlive>
			<MainNavbar />
		</KeepAlive>-->

		<div :class="!loading ? `grid-cols-${cols}` : ''" class="main-font grid gap-6 p-4 w-ful pt-16">
			<div :class="`grid-cols-${cols}`" class="grid gap-6 p-4" v-if="loading">
				<div class="space-y-2" v-for="i in 12" :key="i">
					<div class="bg-gray-100 relative rounded-md h-102 animate-pulse">
						<span
							class="absolute rounded-md bg-gray-200 block bottom-0 right-0 w-14 h-8 mr-2 mb-2 py-2 animate-pulse"
						></span>
					</div>
					<span class="rounded-md bg-gray-100 h-6 block w-2/3 animate-pulse"></span>
					<span class="rounded-md bg-gray-100 h-5 w-1/2 block animate-pulse"></span>
					<span class="rounded-md bg-gray-100 h-12 block w-full animate-pulse"></span>
				</div>
			</div>

			<!--<div v-if="loading" class="flex justify-center items-center h-screen w-full">
				<svg
					class="animate-spin h-10 w-10 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</div>-->

			<div v-else class="space-y-2" v-for="product in products" :key="product.id">
				<div class="rounded-md relative h-102">
					<img class="rounded-md w-full h-full object-cover" :src="product.photo?.path" />
					<div
						class="absolute rounded-md h-1/3 right-0 bottom-0 left-0 bg-gradient-to-t from-black bg-opacity-20 opacity-50"
					></div>
					<div
						v-if="product.quantity <= 0"
						class="bg-gray-400 cursor-default flex justify-center items-center space-x-2 text-white px-2 text-xs rounded-sm absolute top-0 left-0 -mr-3s ml-2 bg-opacity-90 mt-2 font-semibold"
					>
						<svg
							class="h-6 w-4"
							version="1.0"
							xmlns="http://www.w3.org/2000/svg"
							width="512.000000pt"
							height="512.000000pt"
							viewBox="0 0 512.000000 512.000000"
							preserveAspectRatio="xMidYMid meet"
						>
							<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
								<path
									d="M985 4484 c-517 -283 -948 -523 -958 -533 -10 -10 -21 -37 -24 -60
l-6 -42 286 -287 287 -287 -281 -281 c-257 -257 -281 -284 -286 -320 -4 -33
-1 -46 18 -68 13 -14 150 -96 304 -181 l280 -153 5 -536 5 -536 25 -23 c14
-14 445 -254 957 -536 650 -356 942 -511 963 -511 21 0 313 155 963 511 512
282 943 522 957 536 l25 23 5 536 5 536 280 153 c154 85 290 166 303 180 25
30 28 64 8 103 -8 15 -136 148 -285 297 l-271 270 286 287 287 287 -6 42 c-3
23 -14 50 -24 60 -34 33 -677 381 -714 386 -30 4 -42 0 -68 -23 -44 -41 -51
-90 -18 -130 15 -17 133 -88 291 -174 146 -80 266 -147 266 -150 0 -3 -103
-108 -229 -234 l-229 -229 -823 452 c-453 249 -827 456 -831 460 -4 3 96 110
222 236 l231 230 62 -34 c469 -259 463 -256 518 -202 38 39 41 101 5 134 -38
36 -579 327 -607 327 -13 0 -36 -7 -49 -16 -14 -9 -145 -136 -292 -283 l-268
-266 -267 266 c-148 147 -279 274 -293 283 -13 9 -36 16 -50 16 -15 0 -413
-213 -965 -516z m1179 57 l228 -228 -44 -25 c-23 -14 -398 -220 -832 -458
l-788 -433 -232 233 c-127 128 -226 234 -221 236 6 3 377 207 825 454 448 247
820 449 825 449 6 1 113 -102 239 -228z m1219 -817 c446 -246 813 -447 815
-449 5 -4 -1625 -895 -1638 -895 -7 0 -380 201 -828 447 l-814 447 34 17 c18
10 384 212 813 448 429 236 786 430 793 430 6 1 378 -200 825 -445z m-1823
-1031 l832 -456 -229 -229 c-125 -125 -232 -228 -237 -228 -8 0 -1600 870
-1646 900 -12 8 32 56 215 240 126 126 231 230 232 230 1 0 376 -205 833 -457z
m3065 227 c126 -126 227 -231 224 -234 -10 -10 -1632 -899 -1648 -903 -10 -2
-95 75 -244 225 l-229 229 829 456 c455 250 830 456 833 456 3 1 108 -102 235
-229z m-3228 -1084 c307 -168 533 -286 548 -286 15 0 36 5 48 11 12 6 145 133
295 282 l272 272 273 -272 c149 -149 282 -276 294 -282 12 -6 33 -11 48 -11
20 0 937 492 1103 592 l32 20 0 -430 0 -430 -817 -448 c-449 -247 -820 -450
-825 -452 -4 -2 -9 235 -10 527 l-3 531 -28 27 c-20 21 -37 28 -67 28 -30 0
-47 -7 -67 -28 l-28 -27 -3 -531 c-1 -292 -6 -529 -10 -527 -5 2 -376 205
-825 452 l-817 448 0 430 0 430 33 -20 c17 -11 267 -148 554 -306z"
								/>
								<path
									d="M2514 1839 c-57 -28 -67 -114 -18 -160 54 -51 146 -18 160 57 14 77
-70 138 -142 103z"
								/>
								<path
									d="M4004 4504 c-35 -17 -54 -50 -54 -94 0 -41 51 -90 95 -90 40 0 90 38
99 75 10 40 -18 94 -58 110 -43 18 -44 18 -82 -1z"
								/>
							</g>
						</svg>

						<span> Out of stock </span>
					</div>
					<span class="text-white font-bold absolute bottom-0 right-0 m-5 text-2xl">
						<!--{{ currencyFormat(product.price, product.currency) }}-->
						{{ currencyFormat(product.usd_price, 'USD') }}
					</span>
				</div>
				<h3 class="text-gray-900 font-semibold">
					<RouterLink :to="{ name: 'Show', params: { id: product.slug } }">
						{{ product.title }}
					</RouterLink>
				</h3>
				<h5 class="text-gray-500 text-sm">{{ product.category }}</h5>
				<RouterLink
					:to="{ name: 'Show', params: { id: product.slug } }"
					class="rounded-md bg-gray-100 block hover:bg-gray-200 hover:text-gray-800 text-gray-700 text-center w-full font-semibold py-2"
				>
					Purchase
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { RouterLink } from 'vue-router';
// import MainNavbar from '@/components/shared/MainNavbar.vue';
import { useStore } from 'vuex';
import { currencyFormat } from '@/utils';
import { index } from '@/services/api/products';
import Product from '@/types/product';
import emitter from '@/plugins/emitter';

export default defineComponent({
	name: 'ProductsList',

	components: {
		// MainNavbar,
	},

	setup() {
		const { getters } = useStore();
		const loading: Ref<Boolean> = ref(true);
		const display = computed(() => {
			return {
				count: getters['display/count'],
				cols: getters['display/cols'],
			};
		});
		const products: Ref<Product[]> = ref([]);

		function getData(page = 1) {
			loading.value = true;

			index(page, display.value.count)
				.then(({ data }) => {
					// eslint-disable-next-line camelcase
					const { total, current_page, last_page, per_page, has_more } = data;
					products.value = data.data;
					emitter.emit('products:pagination', {
						total,
						last_page,
						per_page,
						current_page,
						has_more,
					});
				})
				.finally(() => {
					loading.value = false;
				});
		}

		emitter.on('products:paginate', getData);

		onMounted(() => {
			getData();
		});

		return {
			loading,
			cols: display.value.cols,
			products,
			currencyFormat,
		};
	},
});
</script>

<style lang="scss" scoped>
//@import '@/assets/style/main.scss';
</style>
