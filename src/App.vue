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
const allowed: Display[] = ['4x3', '6x2', '4x2', '3x4'];
const defaultDisplay = allowed[0];

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
			// type: String as () => Display,
			// type: String as PropType<'4x3' | '4x2'>,
			type: String,
			default: () => defaultDisplay,
			// type: Function as PropType<() => '4x3'>,
			validator(value: Display) {
				return allowed.includes(value);
			},
			// validator(value: string) {
			//	return ['6x2', '4x3', '4x2', '3x4'].includes(value);
			// },
		},
		item: {
			type: String,
			required: false,
		},
	},

	setup(props: any) {
		onBeforeMount(() => {
			const { commit } = useStore();
			commit('keys/setApiKey', props.clientId);
			commit('display/setDisplay', allowed.includes(props.display) ? props.display : defaultDisplay);
		});
	},
});
</script>
