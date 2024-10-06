<script setup lang="ts">
import NavbarComponent from "./components/NavbarComponent.vue";
</script>

<template>
  <div class="all-app">
    <NavbarComponent />
  </div>
</template>

<style scoped lang="scss">
@import "./style";

.all-app {
  background-color: $sand;
  min-height: 100vh;
}
</style>
