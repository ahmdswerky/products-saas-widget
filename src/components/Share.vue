<template>
	<div class="relative rounded-md bg-white border border-gray-500">
		<button v-for="provider of providers" :key="provider" class="w-8 h-8">
			{{ provider }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const providers = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u={{URL}}`,
			twitter: `https://twitter.com/intent/tweet?url={{URL}}&text={{TEXT}}`,
			pinterest: `https://pinterest.com/pin/create/button/?url={{URL}}&media={{PHOTO}}&description={{TEXT}}`,
			tumbler: `http://www.tumblr.com/share?v=3&u={{URL}}&t={{TEXT}}`,
		};

		return {
			providers,
		};
	},
});
</script>
