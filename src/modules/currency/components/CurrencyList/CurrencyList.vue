<template>
  <ul class="currency-list">
    <li
        v-for="(currency, index) in currencies"
        :key="index"
        class="currency-list__item"
    >
      <div class="currency-list__item-name">
        {{ currency.currency }}
      </div>

      <div class="currency-list__item-value">
        {{ (1 / currency.value).toFixed(2) }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CurrencyListProps } from "./CurrencyList.types.ts";

const props = defineProps<CurrencyListProps>();

</script>

<style lang="scss">
.currency-list {

}

.currency-list__item {
  padding: 24px 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #46464640
}

.currency-list__item-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
}

.currency-list__item-value {
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
}
</style>