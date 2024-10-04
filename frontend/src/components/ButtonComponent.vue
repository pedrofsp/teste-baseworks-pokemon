<template>
  <button :class="`btn ${props.color} ${disabled ? 'disabled' : ''}`">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({ text: String, disabled: Boolean, color: String });
</script>

<style lang="scss" scoped>
@import "../style";

.red {
  background-color: $main-red;
  color: $white;
  &:hover {
    background-color: $main-red;
    color: $white;
    opacity: 0.75;
  }
}

.disabled {
  background-color: #ccc;
  color: #999;
  cursor: not-allowed;
}
</style>
