<template>
  <div class="converter-view">
    <div v-if="!isFetchDataLoading" class="converter-view__container">
      <div class="currencies-view__group">
        <ui-input
            v-model:value="data.firstCurrencyValue"
            label="From"
            name="inputSearchValue"
            placeholder="Value"
            class="converter-view__input"
            type="text"
            :validator="isValidNumberInput"
            @input="handleFirstInputChange"
        />

        <ui-input-dropdown
            v-model:value="data.firstDropdownValue"
            name="first_launch_date"
            :options="firstValueDateOptions"
            @change="handleFirstInputChange"
        />
      </div>

      <div class="currencies-view__group">
        <ui-button @click="swap">
          swap
        </ui-button>
      </div>

      <div class="currencies-view__group">
        <ui-input
            v-model:value="data.secondCurrencyValue"
            label="To"
            name="inputSearchValue"
            placeholder="Value"
            class="converter-view__input"
            type="text"
            :validator="isValidNumberInput"
            @input="handleSecondInputChange"
        />

        <ui-input-dropdown
            v-model:value="data.secondDropdownValue"
            name="second_launch_date"
            :options="secondValueDateOptions"
            @change="handleSecondDropdownChange"
        />
      </div>
    </div>

    <div
        v-if="isFetchDataLoading"
        style="display: flex; justify-content: center"
    >
      loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConverterView } from "./ConverterView.composables.ts";
import { UiInput } from '@/shared/components/UiInput';
import { UiInputDropdown } from '@/shared/components/UiInputDropdown';
import { onMounted } from 'vue';
import { isValidNumberInput } from "@/helpers";
import { UiButton } from "@/shared/components/UiButton";
import { UiIcon } from "@/shared/components/UiIcon";

const {
  firstValueDateOptions,
  secondValueDateOptions,
  data,
  isFetchDataLoading,

  handleFirstInputChange,
  handleSecondInputChange,
  fetchData,
  handleSecondDropdownChange,
  swap
} = useConverterView();

onMounted(fetchData);
</script>
