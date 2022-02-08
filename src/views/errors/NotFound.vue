<template>
	<div style="background-color: #f1f5f9" class="flex flex-col justify-center space-y-6 items-center h-screen w-screen">
		<div class="flex flex-col space-y-6">
			<RouterLink
				v-if="route.name === 'NotFound'"
				to="/"
				class="absolutes top-0 left-0 flex justify-center items-center space-x-2 bg-gray-200 text-gray-600 font-semibold m-4 rounded-full px-4 py-2 opacity-75 hover:opacity-100 transition-all mr-auto"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				<span>Back to Home</span>
			</RouterLink>
			<Image src="404-cropped.gif" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

export default defineComponent({
	components: {
		RouterLink,
	},

	setup() {
		const route = computed(() => useRoute());

		return {
			route,
		};
	},
});
</script>
