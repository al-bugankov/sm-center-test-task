<script setup lang="ts">
import router from "@/router";
import {ERouteNames} from "@/router/ERouteNames.ts";

const goHome = () => {
  router.push({ name: ERouteNames.HOME });
}
</script>

<template>
  <app-button class="goBack-button" severity="danger" label="Вернуться на главную" @click="goHome"/>
</template>

<style scoped lang="scss">
@import "@/assets/main.scss";

.goBack-button {
  background-color: $secondary-red;
}
</style>
