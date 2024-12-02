import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/Home.vue'
import SurveyDetails from './views/SurveyDetails.vue'
import NotFound from './views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/enquetes/:id',
    name: 'SurveyDetails',
    component: SurveyDetails,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
