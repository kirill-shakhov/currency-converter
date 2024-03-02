<template>
  <div class="currencies-view">
    <div class="currencies-view__navigation">
      <div class="currencies-view__input-wrap">
        <ui-input
            v-model:value="data.inputSearchValue"
            name="inputSearchValue"
            placeholder="Search"
            type="search"
        />
      </div>

      <ui-input-dropdown
          v-if="data.launch_date"
          v-model:value="data.launch_date"
          name="launch_date"
          :options="launchDateOptions"
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


import { UiInput } from "../../../../shared/components/UiInput/index.ts";
import { UiInputDropdown } from "../../../../shared/components/UiInputDropdown/index.ts";
import CurrencyList from "../../components/CurrencyList/CurrencyList.vue";
import { useCurrenciesView } from "./CurrenciesView.composables.ts";

const {
  launchDateOptions,
  loading,
  data,
  filteredCurrencies
} = useCurrenciesView()

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