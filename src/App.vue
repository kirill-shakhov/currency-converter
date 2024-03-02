<template>
  <app-container>
    <app-header/>

    <router-view/>
  </app-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "./shared/components/AppHeader/AppHeader.vue";
import AppContainer from "./shared/components/AppContainer/AppContainer.vue";

</script>

<style scoped>

</style>
