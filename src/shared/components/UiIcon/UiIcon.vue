<template>
  <div v-if="icon === 'chevron'"
       class="ui-icon"
       :style="{ width: `${props.width}px`, height: `${props.height}px` }"
  >
    <img
        src="../../../assets/icons/CaretDown.svg"
        alt="CaretDown"
        class="ui-icon__icon"
    >
  </div>
</template>


<script setup lang="ts">
type Side = string | number;
type Icon = 'chevron';

interface Props {
  icon: Icon;
  width?: Side;
  height?: Side;
}

const props = withDefaults(defineProps<Props>(), {
  width: 16,
  height: 16,
});

</script>

<style lang="scss">

.ui-icon__icon {
  width: 100%;
  height: 100%;
}
</style>