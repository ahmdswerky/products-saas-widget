<template>
	<div class="grid grid-cols-2 gap-4">
		<button
			@click="select('credit_card')"
			:class="{ 'ring-sky-500 bg-sky-50': selected === 'credit_card', 'ring-gray-300': selected !== 'credit_card' }"
			class="p-6 rounded-md ring-2 transition-all flex justify-center items-center flex-col space-y-3"
		>
			<Image class="max-h-12 max-w-full" src="payment-methods/credit-card.png" alt="" />
			<span :class="{ 'text-gray-800': selected === 'credit_card' }" class="text-lg text-gray-600">Credit Card</span>
		</button>
		<button
			@click="select('paypal')"
			:class="{ 'ring-sky-500 bg-sky-50': selected === 'paypal', 'ring-gray-300': selected !== 'paypal' }"
			class="p-6 rounded-md ring-2 transition-all flex justify-center items-center flex-col space-y-3"
		>
			<Image class="max-h-12 max-w-full" src="payment-methods/paypal.png" alt="" />
			<span :class="{ 'text-gray-800': selected === 'paypal' }" class="text-lg text-gray-600">PayPal</span>
		</button>
		<!--<button
			class="p-6 rounded-md ring-2 transition-all ring-gray-300 flex justify-center items-center flex-col space-y-3"
		>
			<Image class="max-h-12 max-w-full" src="payment-methods/paypal.png" alt="" />
			<span :class="{ 'text-gray-800': selected === 'credit_card' }" class="text-lg text-gray-600">Cancel</span>
		</button>-->
	</div>
	<div class="grid gap-4 mt-6">
		<CreditCard
			v-if="merchants.stripe"
			:merchant-id="merchants.stripe"
			:product-id="productId"
			:price="price"
			:currency="currency"
			v-show="selected === 'credit_card'"
		/>
		<Paypal
			v-if="merchants.paypal"
			:merchant-id="merchants.paypal"
			:product-id="productId"
			:price="price"
			:currency="currency"
			v-show="selected === 'paypal'"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CreditCard from '@/components/payment/CreditCard.vue';
import PayPal from '@/components/payment/PayPal.vue';
import emitter from '@/plugins/emitter';

export default defineComponent({
	components: {
		CreditCard,
		Paypal: PayPal,
	},

	props: {
		merchants: {
			type: Object,
			requried: true,
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

	setup() {
		const { commit } = useStore();
		const router = useRouter();
		const selected = ref('credit_card');

		function select(method) {
			selected.value = method;
		}

		emitter.on('payment:finished', () => {
			emitter.emit('confetti:fire');
			emitter.emit('payments:refresh');
			commit('dialog/open');
			router.push({
				name: 'List',
			});
		});

		// function getData() {}

		return {
			select,
			selected,
		};
	},
});
</script>
