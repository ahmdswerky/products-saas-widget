<template>
	<div class="relative">
		<!--<stripe-elements
			v-if="loading && clientSecret"
			class="ring-2 ring-gray-300 focus:ring-sky-500 rounded-md px-4 py-3"
			v-slot="{ elements }"
			ref="elms"
			@focus="() => alert('1')"
			stripe-key="stripeKey"
			:instance-options="{}"
			:elements-options="{}"
		>
			<StripeElement ref="card" :elements="elements" :options="{}" />
		</stripe-elements>-->

		<div
			v-if="paying || payed"
			:class="{ 'bg-white bg-opacity-50  text-sky-500': paying, 'bg-teal-500 text-white': payed }"
			class="absolute z-1000 rounded-lg -m-2 top-0 right-0 bottom-0 left-0 flex justify-center items-center space-x-3"
		>
			<svg
				v-if="!payed"
				class="animate-spin h-6 w-6"
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
			<svg
				v-if="payed"
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
			<span v-if="!payed" class="font-semibold">Processing</span>
		</div>

		<div v-show="loading" class="bg-gray-200 rounded-xl w-full animate-pulse h-12"></div>
		<div
			v-show="loading"
			class="mt-6 bg-gray-200 rounded-md w-full animate-pulse h-12 flex justify-center items-center"
		></div>

		<div v-show="!loading">
			<form class="space-y-2" @submit.prevent="pay">
				<div class="sr-combo-inputs-row">
					<div
						class="sr-input sr-card-element bg-gray-200s credit-card-input ring-2s ring-gray-400 rounded-md py-3 px-4"
						id="credit-card-element"
					></div>
					<span class="text-red-400 h-5 block text-sm">{{ errors }}</span>
				</div>

				<div class="sr-field-error" id="card-errors" role="alert"></div>
				<button
					@click="pay"
					type="button"
					class="w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none bg-sky-600 hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
				>
					{{ `Pay ${currencyFormat(price, 'USD')}` }}
				</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { StripeCardElement, loadStripe, Stripe } from '@stripe/stripe-js';
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { currencyFormat } from '@/utils';
import { createPayment, createCard, attachPaymentMethod, updatePayment } from '@/services/api/payment';
import emitter from '@/plugins/emitter';

export default defineComponent({
	name: 'CreditCard',

	props: {
		merchantId: {
			type: String,
			required: true,
		},
		productId: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
	},

	setup(props: any) {
		const stripeKey = process.env.VUE_APP_STRIPE_CLIENT_ID;
		let payment = null;
		let paymentId = null;
		let clientSecret = null;
		const loading = ref(true);
		const errors = ref(null);
		let card = null;
		const paying = ref(false);
		const payed = ref(false);
		let stripe: Stripe = null;

		function createCardElement() {
			const elements = stripe.elements({
				clientSecret,
			});

			card = elements.create('card', {
				classes: {
					base: 'border',
					complete: 'border-teal-400 bg-teal-50',
					invalid: 'border-red-400 bg-red-50',
				},
			});

			card.mount('#credit-card-element');

			card.on('ready', () => {
				loading.value = false;
			});

			card.on('change', ({ error }) => {
				// errors.value = error && error.message
				errors.value = error?.message || null;
				// loading.value = false;
			});
		}

		function createClientSecret() {
			createPayment({
				product_id: props.productId,
				amount: 105,
				method: 'credit_card',
			}).then(({ data }) => {
				payment = data.payment;
				clientSecret = data.client_secret;
				paymentId = data.payment_id;
			});
		}

		function init() {
			loadStripe(process.env.VUE_APP_STRIPE_CLIENT_ID, {
				// stripeAccount: props.merchantId,
			})
				.then(data => {
					stripe = data;
				})
				.then(() => {
					createPayment({
						product_id: props.productId,
						amount: 105,
						method: 'credit_card',
					})
						.then(({ data }) => {
							payment = data.payment;
							clientSecret = data.client_secret;
							paymentId = data.payment_id;
							createCardElement();
						})
						.catch(error => {
							console.log(error);
						});
				});

			// createPayment({
			//	product_id: props.productId,
			//	amount: 105,
			//	method: 'credit_card',
			// }).then(({ data }) => {
			//	clientSecret = data.client_secret;
			// });
		}

		function pay() {
			paying.value = true;

			stripe
				.createPaymentMethod({
					type: 'card',
					card,
				})
				.then(({ paymentMethod }) => {
					attachPaymentMethod('credit_card', paymentMethod.id)
						.then(({ data }) => {
							console.log(data);
						})
						.then(() => {
							stripe.createToken(card).then(response => {
								const { error, token } = response;
								// alert(JSON.stringify(token));
								if (error) {
									// alert(JSON.stringify(error));
								} else {
									createCard('credit_card', token.id).then(() => {
										stripe
											.confirmCardPayment(clientSecret, {
												payment_method: {
													card,
												},
											})
											.then(() => {
												updatePayment(payment.id, 'paypal', paymentId).then(res => {
													paying.value = false;
													payed.value = true;

													setTimeout(() => {
														emitter.emit('payment:finished');
													}, 500);
												});
											});
									});
								}
							});
						});
				})
				.catch(error => {
					console.log(error);
				});
		}

		// function pay() {
		//	const cardElement = card.stripeElement;

		//	elms.value.instance.createToken(cardElement).then(result => {
		//		// Handle result.error or result.token
		//		console.log(result);
		//	});
		// }

		init();

		return {
			// ...props,
			stripeKey,
			paying,
			payed,
			errors,
			clientSecret,
			currencyFormat,
			loading,
			pay,
		};
	},
});
</script>

<style scoped></style>
