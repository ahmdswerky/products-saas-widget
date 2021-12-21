<template>
	<div class="h-16 absolute top-0 right-0 left-0 z-20 flex justify-between items-center px-4">
		<div>
			<RouterLink
				v-if="route.name === 'NotFound'"
				to="/"
				class="absolutes top-0 left-0 flex justify-center items-center space-x-2 bg-gray-200 text-gray-600 font-semibold m-4 rounded-full px-4 py-2 opacity-75 hover:opacity-100 transition-all"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				<span>Back to Home</span>
			</RouterLink>
		</div>
		<!--<div>Pagination</div>-->
		<Paginator @change="getProducts" event="products" :pagination="pagination" v-if="route.name === 'List'" />
		<!--<div class="relatives">-->
		<!--<button @click="toggleOpen" class="relative z-50">
				<img
					v-if="loggedIn && user.avatar && user.avatar.path"
					class="w-11 h-11 rounded-full shadow"
					:src="user.avatar?.path"
				/>
				<Image v-else class="w-11 h-11 rounded-full shadow" src="avatar-1.png" />
			</button>-->
		<!--<div v-if="open" class="rounded-md bg-white mt-12s pt-12 shadow absolute top-0 right-0 z-40 w-72">-->
		<!--<div class="p-4">-->
		<!--<h3 v-if="!loggedIn" class="font-semibold text-gray-700">Sign in</h3>-->
		<!--<h3 v-else class="font-semibold text-gray-700">Welcome {{ user.name }} 🙂</h3>-->
		<!--<h3 v-if="loggedIn" class="font-semibold text-gray-700 p-4">Welcome {{ user.name }} 🙂</h3>-->
		<!--</div>-->
		<Auth />
		<!--<LatestProducts v-if="loggedIn" />-->
		<!--<footer v-if="loggedIn" class="w-full">
				<button
					@click="logout"
					class="px-4 py-3 w-full text-sm font-semibold rounded-b-md bg-red-100 hover:bg-red-200 text-red-600"
				>
					Sign out
				</button>
			</footer>-->
		<!--</div>-->
		<!--</div>-->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, RouterLink } from 'vue-router';
import Auth from '@/components/Auth.vue';
import emitter from '@/plugins/emitter';
import Paginator from '@/components/shared/Paginator.vue';
// import LatestProducts from '@/components/LatestProducts.vue';

export default defineComponent({
	components: {
		RouterLink,
		Paginator,
		Auth,
		// LatestProducts,
	},

	setup() {
		const pagination = ref({});
		const { getters, commit, dispatch } = useStore();
		const open = computed(() => getters['dialog/opened']);
		const loggedIn = computed(() => getters['auth/loggedIn']);
		const user = computed(() => getters['auth/user']);
		const route = computed(() => useRoute());

		function getProducts(page) {
			emitter.emit('products:paginate', page);
		}

		function toggleOpen() {
			dispatch('dialog/toggle');
		}

		emitter.on(`products:pagination`, data => {
			pagination.value = data;
		});

		function logout() {
			dispatch('auth/signOut').then(() => {
				commit('dialog/closeAll');
			});
		}

		return {
			loggedIn,
			pagination,
			open,
			user,
			route,
			getProducts,
			toggleOpen,
			logout,
		};
	},
});
</script>

<style scoped></style>
