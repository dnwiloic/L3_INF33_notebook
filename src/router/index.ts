import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AcceuilHomeVue from '@/views/home/AcceuilHome.vue'
import EvalationConfigVue from '@/views/home/EvalationConfig.vue'
import AllNoteVue from '@/views/home/AllNote.vue'
import PassEvaluationVue from '@/views/evaluation/PassEvaluation.vue'
import CorrectEvaluationVue from '@/views/evaluation/CorrectEvaluation.vue'
import UserTagVue from '@/views/home/UserTag.vue'

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
      path: '/evaluation/correction',
      name: 'evalution_correction',
      component: CorrectEvaluationVue
    },
    {
      path: '/evaluation/:nbrNotes',
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

export default router
