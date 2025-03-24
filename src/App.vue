<script setup lang="ts">
import { RouterView } from 'vue-router'
import ProjectHeader from "@/components/project-header/ProjectHeader.vue";
import ToastMessage from "@/modules/feedback/components/ToastMessage.vue";

</script>

<template>
  <toast-message />
  <header>
    <project-header />
  </header>

  <RouterView />
</template>

<style scoped>

</style>
