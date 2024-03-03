<template>
  <div class="ui-field">
    <label v-if="label" class="ui-field__label">{{ label }}</label>

    <div class="ui-field__content">
      <slot/>
    </div>
  </div>

</template>

<script lang="ts" setup>
interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: '',
});
</script>

<style src="./UiField.styles.scss" lang="scss"></style>
