<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container justify-content-start">
      <img src="../assets/pokemonLogo.svg" alt="Navbar Icon" width="150" />
      <font-awesome-icon class="icon mx-3" :icon="['fas', 'plus']" />
      <img
        class="baseworks p-1"
        src="../assets/baseworks.svg"
        alt="Navbar Icon"
        width="80"
      />
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../style";
.navbar {
  background-color: $dark-blue;
}

.icon {
  color: $light-gray;
  font-size: 40px;
}

.baseworks {
  border-radius: 100%;
  background-color: $light-gray;
}
</style>
