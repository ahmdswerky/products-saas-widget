<template>
	<img v-bind="$attrs" :src="link" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
	props: {
		src: {
			type: String,
		},
	},

	setup(props) {
		const baseURL = process.env.NODE_ENV !== 'production' ? window.origin : process.env.VUE_APP_WEBSITE_URL;
		const link = computed(() => `${baseURL}/images/${props.src}`);

		return {
			link,
		};
	},
});
</script>
