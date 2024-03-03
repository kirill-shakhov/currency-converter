<template>
  <div class="currencies-view">
    <div class="currencies-view__navigation">
      <div class="currencies-view__input-wrap">
        <ui-input
            v-model:value="inputSearchValue"
            name="inputSearchValue"
            placeholder="Search"
            type="search"
        />
      </div>

      <ui-input-dropdown
          v-model:value="currentCurrency"
          name="launch_date"
          :options="currenciesOptions"
          label="Currency"
      />
    </div>

    <currency-list
        v-if="!loading"
        :currencies="filteredCurrencies"
    />

    <div
        v-if="loading"
        style="display: flex; justify-content: center"
    >
      loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrenciesView } from "./CurrenciesView.composables.ts";
import { UiInput } from '@/shared/components/UiInput';
import { UiInputDropdown } from '@/shared/components/UiInputDropdown';
import { CurrencyList } from '@/modules/currency/components/CurrencyList';
import { onMounted } from 'vue';

const {
  currenciesOptions,
  loading,
  inputSearchValue,
  currentCurrency,
  filteredCurrencies,
  fetchData,
} = useCurrenciesView()

onMounted(fetchData);
</script>

<style lang="scss">
.currencies-view__navigation {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.currencies-view__input-wrap {
  max-width: 180px;
}
</style>
