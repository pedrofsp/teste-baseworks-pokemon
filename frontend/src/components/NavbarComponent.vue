<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex align-items-center">
        <img
          class="pokemon"
          src="../assets/pokemonLogo.svg"
          alt="pokemon logo"
        />
        <div class="d-flex flex-column justify-content-center mx-2">
          <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
        </div>
        <img
          class="baseworks p-1"
          src="../assets/baseworks.svg"
          alt="Navbar Icon"
        />
      </div>

      <button
        class="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <RouterLink
          class="nav-link text-center"
          :class="{ active: $route.fullPath === '/' }"
          to="/"
        >
          Home
        </RouterLink>
        <RouterLink
          class="nav-link text-center"
          :class="{ active: $route.fullPath === '/fav' }"
          to="/fav"
        >
          Favorites
        </RouterLink>
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

$plus-size: 40px;
$pokemon-size: 150px;
$baseworks-size: 90px;
$mobile-reduction: 50px;

.navbar {
  background-color: $dark-blue;
}

.icon {
  color: $light-gray;
  font-size: $plus-size;
}

.pokemon {
  width: $pokemon-size;
}

.baseworks {
  width: $baseworks-size;
  border-radius: 100%;
  background-color: $light-gray;
}

.nav-link {
  color: $light-gray;
  padding: 0 15px;
  text-decoration: none;
  &:hover,
  &:visited,
  &:focus,
  &:active {
    color: $light-gray;
  }
}

.active {
  color: $white;
  text-decoration: underline;
  &:hover,
  &:visited,
  &:focus,
  &:active {
    color: $white;
  }
}

//MOBILE
@media only screen and (max-width: 576px) {
  .icon {
    font-size: calc($plus-size - $mobile-reduction);
  }

  .pokemon {
    width: calc($pokemon-size - $mobile-reduction);
  }

  .baseworks {
    width: calc($baseworks-size - $mobile-reduction);
  }
}
</style>
