<template>
	<div>
		<ProductsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductsList from '@/components/ProductsList.vue';

export default defineComponent({
	name: 'List',

	components: {
		ProductsList,
	},
});
</script>
