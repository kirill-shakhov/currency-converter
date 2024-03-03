<template>
  <div
      :class="['ui-input-dropdown',{ active:  isOpen}]"
  >
    <ui-input
        :label="label"
        type="text"
        :name="name"
        :value="selectedOption?.value || ''"
        :readonly="readonly"
        :icon-right="true"
        icon="chevron"
        @click="toggleDropdown"
        v-click-outside="hideDropdown"
    />

    <transition name="dropdown">
      <div
          v-if="isOpen"
          class="ui-input-dropdown__dropdown"
      >
        <div
            v-for="(option, index) in options"
            :key="index"
            @click="handleClickOption(option.value)"
            class="ui-input-dropdown__option-wrap"
        >

          <div
              class="ui-input-dropdown__option"
              :class="{ active: selectedOption === option }">

            <div class="ui-input-dropdown__option-text">
              {{ option.text ?? option.value }}
            </div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { UiInput } from "../UiInput/index.ts";
import { Props, UiInputDropdownEmits } from "./UiInputDropdown.types.ts";
import { useUiInputDropdown } from "./UiInputDropdown.composables.ts";


const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  readonly: true
});

const emit = defineEmits<UiInputDropdownEmits>();


const {
  isOpen,
  toggleDropdown,
  hideDropdown,
  selectedOption,
  handleClickOption
} = useUiInputDropdown(props, emit);
</script>

<style src="./UiInputDropdown.styles.scss" lang="scss">
</style>