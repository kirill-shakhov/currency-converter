<template>
  <app-container>
    <app-header/>

    <router-view/>
  </app-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppHeader } from "@/shared/components/AppHeader/index.ts";
import { AppContainer } from "@/shared/components/AppContainer/index.ts";

</script>

<style scoped>

</style>
