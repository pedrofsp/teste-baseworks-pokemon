<script setup lang="ts">
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div class="all-app d-flex flex-column">
    <NavbarComponent />
    <div class="footer mt-3 d-flex flex-column justify-content-end">
      <FooterComponent />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./style";

.all-app {
  background-color: $sand;
  min-height: 100vh;
}

.footer {
  flex: 1;
}
</style>
