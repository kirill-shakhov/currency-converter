<template>
  <button
      :type="type"
      :class="rootClasses"
      class="ui-button"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
import { UiButtonProps } from "./UiButton.types.ts";
import { useUiButton } from './UiButton.composables.ts';

const props = withDefaults(defineProps<UiButtonProps>(), {
  type: 'button',
  theme: 'primary'
})

const { rootClasses } = useUiButton(props);

</script>

<style lang="scss">
</style>