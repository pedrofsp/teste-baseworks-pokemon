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

onMounted(() => {
  FetchData();
});

// Função para buscar dados dos Pokemons favoritos
async function FetchData() {
  isLoading.value = true;

  // Obtém os IDs dos Pokemons favoritos do localStorage
  let ids = localStorage.getItem("favPokemons");

  if (ids) {
    let idsArray = JSON.parse(ids);

    // Se houver IDs de Pokemons favoritos, busca os dados correspondentes
    if (idsArray.length > 0) {
      try {
        const response = await GetPokemons(
          1300,
          0,
          false,
          null,
          idsArray,
          null
        );
        if (response) favPokemons.value = response.all_pokemons;
      } catch (error) {
        console.error("Error fetching favorite Pokemons:", error);
      }
    }
  }

  isLoading.value = false;
}
</script>

<style lang="scss" scoped></style>
