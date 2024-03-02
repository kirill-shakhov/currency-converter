<template>
  <header class="app-header">
    <div class="buttons-group">

      <router-link :to="{name: 'currency-list'}">
        <ui-button>
          Валюты
        </ui-button>
      </router-link>

      <router-link :to="{ name: 'currency-converter' }">
        <ui-button
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