<template>
  <LoadingComponent :isLoading="isLoading" />
  <div class="container">
    <div class="my-3">
      <TitleComponent text="Favorite Pokemons" />
    </div>
    <TableComponent :pokemons="favPokemons" v-if="!isLoading" />
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "../components/TitleComponent.vue";
import TableComponent from "../components/TableComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { GetPokemons } from "../API/PokemonFetch";
import { Pokemon } from "../types/interfaces";
import { onMounted, ref } from "vue";

let isLoading = ref<boolean>(true);
let favPokemons = ref<Pokemon[]>([]);

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
</style>
