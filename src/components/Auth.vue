<template>
	<div id="auth-wrapper" class="relative -mt-12" ref="authWrapper">
		<button
			id="auth-switch"
			@click="toggleOpen"
			:class="{ 'mx-autos': !open }"
			class="absolute top-0 right-0 z-50 m-1 w-11"
		>
			<img
				draggable="false"
				v-if="loggedIn && user.avatar && user.avatar.path"
				class="w-11 h-11 rounded-full select-none"
				:src="user.avatar?.path"
			/>
			<Image draggable="false" v-else class="w-11 h-11 rounded-full select-none" src="avatar-1.png" />
		</button>

		<div
			:class="{
				'w-80 rounded-md': open && !expanded,
				'transition-all w-102 h-semi-screen rounded-md': open && expanded,
				'w-0 h-0 p-0 rounded-full': !open,
				'bg-pink-50': loggedIn,
				'bg-sky-100': !loggedIn,
			}"
			class="absolute bg-whites top-0 right-0 shadow-lg"
			ref="authWrapper"
		>
			<header class="flex justify-between items-center p-2">
				<template v-if="open">
					<template v-if="!loggedIn">
						<h3 v-if="mode === 'signin'" class="font-semibold text-gray-700 mx-4 my-2">
							<span>Sign in</span>
							<span class="text-gray-400 mx-1">or</span>
							<span
								@click="selectMode('signup')"
								class="text-sky-500 hover:text-sky-600 text-sm cursor-pointer select-none"
								>Sign up</span
							>
						</h3>
						<h3 v-if="mode === 'signup'" class="font-semibold text-gray-700 mx-4 my-2">
							<span>Sign up</span>
							<span class="text-gray-400 mx-1">or</span>
							<span
								@click="selectMode('signin')"
								class="text-sky-500 hover:text-sky-600 text-sm cursor-pointer select-none"
								>Sign in</span
							>
						</h3>
					</template>
					<template v-else>
						<div class="flex justify-start items-center">
							<!--<button @click="expanded = !expanded" class="text-rose-400 hover:bg-rose-100 p-1 rounded-md mx-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
									/>
								</svg>
							</button>-->
							<h3 v-if="loggedIn" class="font-semibold text-gray-700 p-3 flex items-center space-x-2">
								<span>Welcome {{ user.name }}</span>
								<Image draggable="false" class="h-6 select-none" src="confetti.png" />
							</h3>
						</div>
					</template>
				</template>

				<!--<button @click="toggleOpen" :class="{ 'mx-auto': !open }" class="relatives z-50 m-0">
					<img
						v-if="loggedIn && user.avatar && user.avatar.path"
						class="w-11 h-11 rounded-full shadow"
						:src="user.avatar?.path"
					/>
					<Image v-else class="w-11 h-11 rounded-full shadow" src="avatar-1.png" />
				</button>-->
			</header>
			<div>
				<!--<h3 v-if="mode === 'signin'" class="font-semibold text-gray-700 mx-4 my-2">
				<span>Sign in</span>
				<span class="text-gray-400 mx-1">or</span>
				<span @click="selectMode('signup')" class="text-sky-400 text-sm cursor-pointer select-none">Sign up</span>
			</h3>
			<h3 v-if="mode === 'signup'" class="font-semibold text-gray-700 mx-4 my-2">
				<span>Sign up</span>
				<span class="text-gray-400 mx-1">or</span>
				<span @click="selectMode('signin')" class="text-sky-400 text-sm cursor-pointer select-none">Sign in</span>
			</h3>-->
				<Form v-show="open && !loggedIn" class="space-y-4 mt-2" @submit="signin" v-slot="{ errors }">
					<div v-if="mode === 'signup'" class="px-4">
						<Field
							name="name"
							type="name"
							autocomplete="name"
							autofocus
							v-model="name"
							:disabled="loading"
							:readonly="loading"
							rules="required|min:2"
							placeholder="Name"
							class="w-full px-4 py-1 ring-2 ring-sky-100 text-gray-700 focus:ring-sky-500 focus:outline-none rounded"
						/>
						<ErrorMessage id="name-error" name="name" class="block text-sm text-red-400 mt-1" />
					</div>
					<div class="px-4">
						<Field
							name="email"
							type="email"
							autocomplete="email"
							autofocus
							v-model="email"
							:disabled="loading"
							:readonly="loading"
							rules="required|email"
							placeholder="Email"
							class="w-full px-4 py-1 ring-2 ring-sky-100 text-gray-700 focus:ring-sky-500 focus:outline-none rounded"
						/>
						<ErrorMessage id="email-error" name="email" class="block text-sm text-red-400 mt-1" />
					</div>
					<div class="px-4">
						<Field
							name="password"
							type="password"
							autocomplete="off"
							v-model="password"
							:disabled="loading"
							:readonly="loading"
							rules="required|min:6"
							placeholder="Password"
							class="w-full px-4 py-1 ring-2 ring-sky-100 text-gray-700 focus:ring-sky-500 focus:outline-none rounded"
						/>
						<ErrorMessage id="password-error" name="password" class="block text-sm text-red-400 mt-1" />
					</div>
					<button
						type="submit"
						:class="{
							'bg-sky-100 hover:bg-sky-100 shadows': !(errors && Object.keys(errors).length) && !loading,
							'bg-sky-100 cursor-default': loading || (errors && Object.keys(errors).length),
						}"
						:disabled="loading || (errors && Object.keys(errors).length)"
						class="w-full font-semibold text-sky-700 flex justify-center items-center focus:outline-none border-t border-sky-200 px-4 py-2 space-x-2 rounded-b-md"
					>
						<svg
							v-if="loading"
							class="animate-spin h-4 w-4 text-sky-600"
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
						<span v-if="mode === 'signin'">Sign in</span>
						<span v-if="mode === 'signup'">Sign up</span>
					</button>
				</Form>

				<LatestProducts v-show="open && loggedIn" />

				<footer v-if="open && loggedIn" class="w-full border-t border-pink-100">
					<button
						id="logout-button"
						@click="logout"
						class="px-4 py-3 w-full text-sm font-semibold rounded-b-md bg-pink-50s hover:text-pink-700 text-pink-500"
					>
						Sign out
					</button>
				</footer>

				<!--<div>
			<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
			<div class="mt-1 relative rounded-md shadow-sm">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> $ </span>
				</div>
				<input
					type="text"
					name="price"
					id="price"
					class="focus:ring-sky-500 focus:border-sky-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
					placeholder="0.00"
				/>
				<div class="absolute inset-y-0 right-0 flex items-center">
					<label for="currency" class="sr-only">Currency</label>
					<select
						id="currency"
						name="currency"
						class="focus:ring-sky-500 focus:border-sky-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
					>
						<option>USD</option>
						<option>CAD</option>
						<option>EUR</option>
					</select>
				</div>
			</div>
		</div>-->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import { onClickOutside } from '@vueuse/core';
import { login, register } from '@/services/api/auth';
import { handleErrors } from '@/utils';
import LatestProducts from '@/components/LatestProducts.vue';
// import emitter from '@/plugins/emitter';

export default defineComponent({
	props: {
		// mode: {
		//	type: String,
		//	default: 'signin',
		// },
	},

	components: {
		Form,
		Field,
		ErrorMessage,
		LatestProducts,
	},

	setup() {
		const { getters, commit, dispatch } = useStore();
		const authWrapper = ref(null);
		const open = computed(() => getters['dialog/opened']);
		const mode = ref('signin');
		const expanded = ref(false);
		const loading = ref(false);
		const loggedIn = computed(() => getters['auth/loggedIn']);
		const user = computed(() => getters['auth/user']);
		const name = ref('');
		const email = ref('');
		const password = ref('');

		function selectMode(selectedMode) {
			mode.value = selectedMode;
		}

		function send(payload) {
			return mode.value === 'signin' ? login(payload) : register(payload);
		}

		function signin(values, actions) {
			loading.value = true;
			const payload = {
				name: name.value,
				email: email.value,
				password: password.value,
			};

			send(payload)
				.then(({ data }) => {
					console.log(data);
					dispatch('auth/signIn', data);
					commit('dialog/closeAll');
				})
				.catch(error => {
					handleErrors(error, errors => actions.setErrors(errors));
				})
				.finally(() => {
					loading.value = false;
				});
		}

		function toggleOpen() {
			// opened.value = !opened.value;
			// commit('dialog/toggle');
			dispatch('dialog/toggle');
			expanded.value = false;
		}

		// TODO: finish
		function reset() {
			name.value = '';
			email.value = '';
			password.value = '';
		}

		function logout() {
			// reset();
			dispatch('auth/signOut');
			commit('dialog/closeAll');
		}

		onClickOutside(authWrapper, () => {
			commit('dialog/closeAll');
			expanded.value = false;
		});

		return {
			open,
			mode,
			authWrapper,
			expanded,
			loading,
			loggedIn,
			user,
			name,
			email,
			password,
			toggleOpen,
			signin,
			selectMode,
			logout,
		};
	},
});
</script>
