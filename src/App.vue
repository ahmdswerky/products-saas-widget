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
import { initializeIntegrations } from '@/plugins/integrations/index';
import { Display } from '@/types/widget';
import { getIntegrations } from '@/services/api/integrations';

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

    // initializeIntegrations('freshchat', 'helpscout', 'segment', 'logrocket', 'hotjar');
    // initializeIntegrations('crisp', 'helpscout', 'segment', 'logrocket', 'hotjar');
    // initializeIntegrations('intercom', 'helpscout', 'segment', 'logrocket', 'hotjar', 'segment');
    // initializeIntegrations('helpscout', 'helpscout', 'segment', 'logrocket', 'hotjar', 'segment');
    console.log('running app ...');

    // initializeIntegrations('freshchat', 'google-analytics', 'helpscout', 'segment', 'logrocket', 'hotjar', 'segment');
    getIntegrations().then(({ data }) => {
      const integrations = {};

      // Object.keys(data.data).map(key => data.data[key]).flat().forEach(({ slug, key }) => {
      Object.keys(data.data).map(key => data.data[key]).flat().forEach(({ slug, key }) => {
        if (key) {
          integrations[slug] = key

        }
      })

      // console.log(data, Object.keys(data.data).map(key => data.data[key]).flat(), integrations)
      initializeIntegrations(integrations);
      // initializeIntegrations({
      //   'freshchat': '2265779/2921218',
      //   'google-analytics': 'G-JXN66EXCBT',
      //   'helpscout': 'bd079439-86aa-4025-a9ac-cf29b48374e4',
      //   'segment': 'Cg8oWGL6FzytvIYIq9Jh6RfiF1l2JKp0',
      //   'logrocket': 'products/products-dev',
      //   'hotjar': '2862504',
      // });
    })

    // identifyForIntegrations('crisp', 'logrocket');
  },
});
</script>
