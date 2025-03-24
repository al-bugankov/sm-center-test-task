<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ERouteNames } from '@/router/ERouteNames.ts'

const router = useRouter();

// Переход на страницу с формой
const goToForm = (formName: string) => {
  router.push({ name: ERouteNames.FORM_GENERATOR, params: { formName } });
};
</script>

<template>
  <div>
    <div class="landing content">
    <h1 class="landing__header">Выберите форму:</h1>
    <div class="landing__buttons">
      <app-button class="form-button" label="Форма регистрации" @click="goToForm('registration')" />
      <app-button class="form-button" label="Форма обратной связи" @click="goToForm('feedback')" />
    </div>
  </div>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/main.scss";

.landing {
  background-color: $black-brown;
  height: 100vh;

  .landing__header {
    text-align: center;
    font-family: Roboto-Medium, sans-serif;
    font-size: 26px;
    line-height: 16px;
    letter-spacing: 1.5px;
  }
  .landing__buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    gap: 16px;
  }
  .form-button {
    background-color: $silver-grey;
    width: 200px;
    font-family: Roboto, sans-serif;
  }
}

</style>
