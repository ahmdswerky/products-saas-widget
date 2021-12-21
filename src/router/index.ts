import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { authenitcation } from '@/middlewares/authentication';
import List from '@/views/List.vue';
import NotFound from '@/views/errors/NotFound.vue';
import Show from '@/views/Show.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'List',
		component: List,
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound,
	},
	{
		path: '/:id?',
		name: 'Show',
		component: Show,
	},
];

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(authenitcation);

export default router;
