<template>
	<!--<div id="nav">
		<RouterLink to="/">Home</RouterLink> |
		<RouterLink to="/about">About</RouterLink>
	</div>-->

	<div class="relative">
		<MainNavbar />

		<RouterView />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType } from 'vue';
import { useStore } from 'vuex';
import MainNavbar from '@/components/shared/MainNavbar.vue';
import { Display } from '@/types/widget';

const w: any = window;

export default defineComponent({
	name: 'App',

	components: {
		MainNavbar,
	},

	props: {
		clientId: {
			type: String,
			required: false,
			default: () => w.ljkbamkwa,
		},
		display: {
			// type: String as PropType<Display>,
			type: String,
			default: '4x3',
			// validator(value: string) {
			//	return ['6x2', '4x3', '4x2', '3x4'].includes(value);
			// },
		},
		item: {
			type: String,
			required: false,
		},
	},

	setup(props) {
		onBeforeMount(() => {
			const { commit } = useStore();
			commit('keys/setApiKey', props.clientId);
			commit('display/setDisplay', props.display);
		});
	},
});
</script>
