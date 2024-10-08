<template>
  <h3 v-if="!isSubtitle" :class="props.color">{{ props.text }}</h3>
  <h4 v-if="isSubtitle" :class="props.color">{{ props.text }}</h4>
</template>

<script setup>
const props = defineProps({
  text: String,
  color: String,
  isSubtitle: Boolean,
});
</script>

<style lang="scss" scoped>
@import "../style";

h3 {
  color: $purple;
  text-shadow: 2px 2px 0 $white;
  font-family: mountserrat-bold;
  font-size: $xl;
}

h4 {
  font-size: $lg;
}

.white {
  color: $white;
  text-shadow: 2px 2px 0 $dark-blue;
}
</style>
