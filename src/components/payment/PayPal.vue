<template>
	<div class="mt-4s relative">
		<div id="paypal-button-container"></div>
		<div v-show="loading" class="mt-4s bg-gray-200 rounded-md w-full animate-pulse h-14"></div>

		<div
			v-if="paying || payed"
			:class="{ 'bg-white bg-opacity-50  text-sky-500': paying, 'bg-teal-500 text-white': payed }"
			class="absolute z-1000 rounded-lg top-0 -m-2 right-0 bottom-0 left-0 flex justify-center items-center space-x-3"
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

		<!--<div
			v-if="paying || payed"
			:class="{ 'bg-gray-900 bg-opacity-50 -m-2': paying, 'bg-teal-500': payed }"
			class="absolute z-1000 text-white rounded-lg top-0 right-0 bottom-0 left-0 flex justify-center items-center space-x-3"
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
		</div>-->
	</div>
</template>

<script lang="ts">
import { loadScript } from '@paypal/paypal-js';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { createPayment, updatePayment } from '@/services/api/payment';
import emitter from '@/plugins/emitter';

// ATthCZPxjyQFymiEusxCVjMJianEpUFZYKWF2W9srTRNaRc8ZGLsvXJ82rOZtCV9X9VO8KUeYFQnYrS-

// declare global {
//    interface Window { paypal: any; }
// }

export default defineComponent({
	name: 'PayPal',

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
		let payment = null;
		let paymentId = '';
		const loading = ref(true);
		const paying = ref(false);
		const payed = ref(false);

		function init() {
			createPayment({
				product_id: props.productId,
				amount: 105,
				method: 'paypal',
			}).then(({ data }) => {
				payment = data.payment;
				paymentId = data.payment_id;

				loadScript({
					'client-id': process.env.VUE_APP_PAYPAL_CLIENT_ID,
					components: 'buttons,funding-eligibility,marks',
					debug: true,
					currency: 'USD',
					'merchant-id': props.merchantId,
					'disable-funding': 'card',
					intent: 'capture',
				}).then(paypal => {
					loading.value = false;
					paypal
						.Buttons({
							// fundingSource: 'paypal.FUNDING.PAYPAL',
							style: {
								layout: 'vertical',
								color: 'gold',
								shape: 'rect',
								label: 'paypal',
							},
							createOrder(datas, actions): any {
								// const res = actions.order.create({
								//	purchase_units: [
								//		{
								//			amount: {
								//				value: '10.00',
								//			},
								//		},
								//	],
								// });

								return paymentId;

								// return '';

								// return res;
							},
							onApprove(info, actions) {
								paying.value = true;

								setTimeout(() => {
									emitter.emit('payment:finished');
								}, 500);

								// updatePayment(payment.id, 'paypal', paymentId).then(res => {
								//	paying.value = false;
								//	payed.value = true;

								//	setTimeout(() => {
								//		emitter.emit('payment:finished');
								//	}, 500);
								// });

								return new Promise(resolve => resolve());
							},
							// createOrder(data, actions) {
							//	console.log(data, actions);
							//	// Set up the transaction
							//	// return actions.order.create({
							//	//	purchase_units: [
							//	//		{
							//	//			amount: {
							//	//				value: '0.01',
							//	//			},
							//	//		},
							//	//	],
							//	// });
							// },
							// onApprove(data, actions) {
							//	console.log(data, actions);
							// },
						})
						.render('#paypal-button-container');
				});
			});
		}

		init();

		// function loadScript() {
		//	const script = document.createElement('script');
		//	script.src =
		//		'https://www.paypal.com/sdk/js?client-id=ATthCZPxjyQFymiEusxCVjMJianEpUFZYKWF2W9srTRNaRc8ZGLsvXJ82rOZtCV9X9VO8KUeYFQnYrS-&components=buttons';
		//	script.onload = () => {
		//		(<any>window).paypal
		//			.Buttons({
		//				style: {
		//					layout: 'vertical',
		//					color: 'blue',
		//					shape: 'rect',
		//					label: 'paypal',
		//				},
		//				createOrder(data, actions) {
		//					console.log(data, actions);
		//					// Set up the transaction
		//					// return actions.order.create({
		//					//	purchase_units: [
		//					//		{
		//					//			amount: {
		//					//				value: '0.01',
		//					//			},
		//					//		},
		//					//	],
		//					// });
		//				},
		//				onApprove(data, actions) {
		//					console.log(data, actions);
		//				},
		//			})
		//			.render('#paypal-button-container');
		//	};

		//	document.head.appendChild(script);
		// }

		// onBeforeMount(() => {
		//	// loadScript();
		// });

		return {
			payed,
			paying,
			loading,
		};
	},
});
</script>

<style scoped></style>
