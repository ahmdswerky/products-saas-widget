<template>
	<div class="relative">
		<!--<KeepAlive>
			<MainNavbar />
		</KeepAlive>-->
		<TransitionRoot
			:show="overlayOpened"
			enter="transition-all"
			enter-from="opacity-0"
			enter-to="opacity-100"
			leave="transition-all"
			leave-from="opacity-100"
			leave-to="opacity-0"
		>
			<div class="bg-black bg-opacity-20 absolute top-0 right-0 bottom-0 left-0 z-10"></div>
		</TransitionRoot>
		<div class="container mx-auto">
			<div class="grid grid-cols-2 gap-x-10 p-20">
				<div class="w-1/3s w-full max-h-screen relative">
					<RouterLink
						v-if="!loading"
						to="/"
						class="absolute top-0 left-0 flex justify-center items-center space-x-2 bg-gray-200 text-gray-600 font-semibold m-4 rounded-full px-4 py-2 opacity-75 hover:opacity-100 transition-all"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						<span>Back to Home</span>
					</RouterLink>
					<div
						v-if="loading"
						style="height: calc(100vh - 10rem)"
						class="bg-gray-200 rounded-xl w-full h-full animate-pulse"
					></div>
					<img
						v-else
						style="max-height: calc(100vh - 10rem)"
						class="h-fulls select-none object-cover w-full rounded-xl"
						:src="product?.photo?.path"
					/>
				</div>
				<div class="space-y-5 flex flex-col">
					<div v-if="loading" class="bg-gray-200 rounded-lg h-12 w-1/2 animate-pulse block"></div>
					<h1 v-else class="text-4xl font-bold">{{ product.title }}</h1>

					<div v-if="loading" class="bg-gray-200 rounded-lg h-8 w-1/6 animate-pulse block"></div>
					<h3 v-if="!loading && product.usd_price" class="text-3xl block">
						{{ currencyFormat(product.usd_price, 'USD') }}
					</h3>

					<div v-if="loading" class="bg-gray-200 rounded-lg h-6 w-1/3 animate-pulse block"></div>
					<div v-else>
						<div v-if="product.quantity > 0" class="text-green-400 space-x-2 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							<span class="text-gray-500 text-sm">In stock and ready to ship</span>
						</div>
						<div v-else class="text-red-400 space-x-2 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
							</svg>
							<span class="text-gray-500 text-sm">Out of stock</span>
						</div>
					</div>

					<div v-if="loading" class="space-y-2 animate-pulse space-y-2 w-full flexs sflex-col">
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-300 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-full animate-pulse sflex-shrink-0"></div>
						<div class="bg-gray-200 rounded-lg h-5 w-1/3 animate-pulse sflex-shrink-0"></div>
					</div>
					<p v-else class="text-gray-500 w-full text-justify block">
						{{ product.description }}
					</p>

					<div v-if="loading" class="bg-gray-200 rounded-lg h-12 w-full animate-pulse block"></div>

					<div v-if="!loading && !showPayment">
						<button
							type="button"
							@click.prevent="togglePayment"
							:disabled="product.quantity <= 0"
							:class="{
								'bg-sky-600 hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500': product.quantity > 0,
								'bg-gray-400 cursor-default': product.quantity <= 0,
							}"
							class="purchase-btn mt-6 w-full border scale-90 border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none"
						>
							Purchase
						</button>
					</div>

					<TransitionRoot
						:show="showPayment"
						enter="transition-all transform duration-500"
						enter-from="opacity-0 translate-y-20s sscale-90"
						enter-to="opacity-100 translate-y-0s sscale-100"
						leave="transition-all transform duration-500"
						leave-from="opacity-100 translate-y-0s sscale-100"
						leave-to="opacity-0 translate-y-20s sscale-90"
					>
						<PaymentMethods
							v-if="merchants && Object.keys(merchants)"
							:merchants="merchants"
							:product-id="product.id"
							:price="product.usd_price"
							:currency="product.currency"
						/>
					</TransitionRoot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { TransitionRoot } from '@headlessui/vue';
import { useStore } from 'vuex';
import PaymentMethods from '@/components/payment/PaymentMethods.vue';
// import MainNavbar from '@/components/shared/MainNavbar.vue';
import { currencyFormat } from '@/utils';
import emitter from '@/plugins/emitter';
import { show } from '@/services/api/products';
import Product from '@/types/product';

export default defineComponent({
	components: {
		// MainNavbar,
		RouterLink,
		TransitionRoot,
		PaymentMethods,
	},

	setup() {
		const router = useRouter();
		const route = useRoute();
		const params = computed(() => route.params);
		const { getters, commit } = useStore();
		const pendingOpen = ref(false);
		// const id = computed(() => params.value.id);
		const loggedIn = computed(() => getters['auth/loggedIn']);
		const overlayOpened = computed(() => getters['dialog/overlayOpened']);
		const id = ref(params.value.id);
		const merchants = ref({});
		const loading = ref(true);
		const showPayment = ref(false);
		// const product: Ref<Product> = ref({});
		const product = ref<Product>({});

		function getProduct() {
			loading.value = true;
			show(id.value)
				.then(({ data }) => {
					product.value = data.product;
					data.product.merchant.metas.forEach(meta => {
						merchants.value[meta.gateway.key] = meta.reference_id;
					});
				})
				.catch(() => {
					router.replace({
						name: 'NotFound',
					});
				})
				.finally(() => {
					loading.value = false;
				});
		}

		watch(
			() => route.params.id,
			value => {
				if (value !== undefined) {
					id.value = value;
					commit('dialog/closeAll');
					getProduct();
				}
			}
		);

		function togglePayment() {
			if (product.value.quantity > 0) {
				if (!loggedIn.value) {
					pendingOpen.value = true;
					commit('dialog/openAll');
				} else {
					showPayment.value = !showPayment.value;
				}
			}
		}

		onMounted(() => {
			emitter.on('auth:signed', () => {
				if (pendingOpen.value) {
					showPayment.value = true;
				}
			});

			emitter.on('auth:signedout', () => {
				if (pendingOpen.value) {
					showPayment.value = false;
				}
			});

			getProduct();
		});

		return {
			overlayOpened,
			loading,
			merchants,
			product,
			showPayment,
			togglePayment,
			currencyFormat,
		};
	},
});
</script>
