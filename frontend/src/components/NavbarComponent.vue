<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <RouterLink
          class="nav-link py-2 py-md-1 m-2 text-center"
          :class="{ active: $route.fullPath === '/' }"
          to="/"
        >
          Home
        </RouterLink>
        <RouterLink
          class="nav-link py-2 py-md-1 m-2 text-center"
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
  font-family: mountserrat-semi-bold;
  color: $light-gray;
  font-size: $md;
  text-decoration: none;
  &:hover,
  &:visited,
  &:focus,
  &:active {
    color: $light-gray;
  }
}

.active {
  border-bottom: 3px solid $white;
}

//MOBILE
@media only screen and (max-width: 576px) {
  .active {
    background-color: $blue;
    border: none;
  }

  .icon {
    font-size: calc($plus-size - 10px);
  }

  .pokemon {
    width: calc($pokemon-size - $mobile-reduction);
  }

  .baseworks {
    width: calc($baseworks-size - $mobile-reduction);
  }
}
</style>
