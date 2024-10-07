<template>
  <div class="container">
    <h3 class="my-3">Favorite Pokemons</h3>
    <TableComponent :pokemons="favPokemons" v-if="!isLoading" />
    <Loading v-else />
  </div>
</template>

<script setup lang="ts">
import TableComponent from "../components/TableComponent.vue";
import Loading from "../components/Loading.vue";
import { GetPokemons } from "../API/PokemonFetch";
import { Pokemon } from "../types/interfaces";
import { onMounted, ref } from "vue";

let isLoading = ref<boolean>(true);
let favPokemons = ref<Pokemon[] | null>(null);

const FetchData = async () => {
  isLoading.value = true;
  let ids = localStorage.getItem("favPokemons");

  if (ids) {
    let idsArray = JSON.parse(ids);
    if (idsArray.length > 0) {
      const response = await GetPokemons(1300, 0, false, null, idsArray, null);
      if (response) favPokemons.value = response.all_pokemons;
    }
  }
  isLoading.value = false;
};

onMounted(() => {
  FetchData();
});
</script>

<style lang="scss" scoped>
@import "../style";

h3 {
  color: $dark-blue;
}
</style>
