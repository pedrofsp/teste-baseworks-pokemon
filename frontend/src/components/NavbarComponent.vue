<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container justify-content-beteen">
      <div>
        <img src="../assets/pokemonLogo.svg" alt="Navbar Icon" width="150" />
        <font-awesome-icon class="icon mx-3" :icon="['fas', 'plus']" />
        <img
          class="baseworks p-1"
          src="../assets/baseworks.svg"
          alt="Navbar Icon"
          width="80"
        />
      </div>
      <div class="d-flex">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" to="/fav">Favorites</RouterLink>
      </div>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView,
  },
};
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

.nav-link {
  color: $white;
  padding: 0 15px;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
}
</style>
