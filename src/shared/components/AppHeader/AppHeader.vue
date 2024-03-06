<template>
  <header class="app-header">
    <div class="buttons-group">

      <router-link :to="{name: 'currency-list'}">
        <ui-button
            :class="{ 'active': isActiveRoute('currency-list') }"
        >
          Валюты
        </ui-button>
      </router-link>

      <router-link :to="{ name: 'currency-converter' }">
        <ui-button
            :class="{ 'active': isActiveRoute('currency-converter') }"
            theme="secondary"
        >
          Конвертер
        </ui-button>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { UiButton } from "../UiButton";
import { useRoute } from "vue-router";

const route = useRoute();

const isActiveRoute = (routeName: string): boolean => {
  return route.name === routeName;
};

</script>

<style lang="scss">
.app-header {
  padding-top: 20px;
}

.buttons-group {
  display: flex;
  gap: 12px;
}
</style>