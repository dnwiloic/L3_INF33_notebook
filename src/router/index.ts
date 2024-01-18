import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AcceuilHomeVue from '@/views/home/AcceuilHome.vue'
import EvalationConfigVue from '@/views/home/EvalationConfig.vue'
import AllNoteVue from '@/views/home/AllNote.vue'
import PassEvaluationVue from '@/views/evaluation/PassEvaluation.vue'
import UserTagVue from '@/views/home/UserTag.vue'
import { useUserStore } from '@/stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path:'',
          component: AcceuilHomeVue,
          name:'accueil'
        },
        {
          path:'config_evaluation',
          component: EvalationConfigVue,
          name:'eval_config'
        },
        {
          path:'all_notes',
          component: AllNoteVue,
          name:'all_notes'
        },
        {
          path:'categories',
          component: UserTagVue,
          name:'categories'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    {
      path: '/evaluation/:nbrNotes/:tags*',
      name: 'evaluation',
      component: PassEvaluationVue,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
   if (
    // make sure the user is authenticated
    (!userStore.isAuthentificate) && 
    // ❗️ Avoid an infinite redirect
    (to.name !== 'login' && to.name !== 'register') 
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
