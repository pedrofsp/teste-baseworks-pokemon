<template>
  <div v-if="props.isLoading" class="all-loading d-flex justify-content-center">
    <div class="align-self-center">
      <img
        width="120"
        height="120"
        :src="PokeballSpinning"
        alt="pokeball spinning gif"
      />
      <p class="text-center"><b>Loading ...</b></p>
    </div>
  </div>
</template>

<script setup>
import PokeballSpinning from "../assets/pokeballSpinning.gif";
const props = defineProps({
  isLoading: Boolean,
});
</script>

<style lang="scss" scoped>
@import "../style";

.all-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.253);
}

p {
  color: $white;
}
</style>
