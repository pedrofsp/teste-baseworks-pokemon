<template>
  <button
    :class="`btn ${props.color} ${disabled ? 'disabled' : ''}`"
    :type="type"
  >
    {{ text }}
    <font-awesome-icon v-if="isFilter" class="icon" :icon="['fas', 'filter']" />
  </button>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  text: String,
  disabled: Boolean,
  color: String,
  isFilter: Boolean,
  type: String,
});
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
