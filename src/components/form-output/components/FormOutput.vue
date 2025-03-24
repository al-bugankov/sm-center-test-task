<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFormStore } from "@/components/form-generator/stores/useFormStore.ts";
import { useFeedbackStore } from "@/modules/feedback/store/feedbackStore.ts";

import { ERouteNames } from '@/router/ERouteNames.ts'

import HomeButton from "@/components/home-button/HomeButton.vue";
import FormGenerator from "@/components/form-generator/components/FormGenerator.vue";

const formStore = useFormStore();
const feedbackStore = useFeedbackStore();
const router = useRouter();

onMounted(() => {
  // Проверка наличия данных в сторе
  if (!formStore.formSettings.inputs?.length && !formStore.formSettings.buttons?.length) {
    router.push({ name: ERouteNames.HOME });
    feedbackStore.showToast({
      type: 'error',
      title: 'Упс',
      message: 'В сторе нет данных для рендеринга!',
    })
  }
});

</script>

<template>
  <div class="form-output">
    <form-generator
      :fields="formStore.formSettings"
      :customFormBgColor="formStore.customFormBgColor"
      :formType="formStore.formType"
      :is-page-form-generator="formStore.isPageFormGenerator"
    />
    <div class="form-output__action_button">
      <home-button class="goBack-button"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

.form-output__action_button {
  display: flex;
  justify-content: center;
}
</style>
