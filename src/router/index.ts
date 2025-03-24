import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/views/LandingPage.vue";
import FormGenerator from "@/components/form-generator/components/FormGenerator.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/form/:formName',
      name: 'FormGeneratorPage',
      component: FormGenerator,
      props: route => ({ formName: route.params.formName }),  // Передаем имя формы в компонент
    },
  ],
})

export default router
