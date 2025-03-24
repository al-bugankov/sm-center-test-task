<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from "@/modules/feedback/store/feedbackStore.ts";

const toast = useToast()
const { toastTrigger } = storeToRefs(useFeedbackStore())
const feedbackStore = useFeedbackStore()

watch(toastTrigger, () => {
  toast.add({
    severity: feedbackStore.toast.severity,
    summary: feedbackStore.toast.summary,
    detail: feedbackStore.toast.detail,
    life: feedbackStore.toast.life,
  })
})
</script>

<template>
  <app-toast />
</template>

<style scoped>
:global(.p-toast:not(:has(.p-toast-message))) {
  display: none !important;
}

:global(.p-toast) {
  position: fixed !important;
  bottom: 10% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  display: flex !important;
  flex-direction: column-reverse !important;
  align-items: center !important;
  gap: 10px !important;
  z-index: 100 !important;
}
</style>
