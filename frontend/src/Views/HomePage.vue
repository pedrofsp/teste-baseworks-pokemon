<template>
  <NavbarComponent />

  <div class="container">
    <form class="d-flex mt-3" @submit.prevent="filterPokemon">
      <input
        v-model="search"
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <ButtonComponent color="red" text="Search" />
    </form>

    <table class="table my-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pokemon, index) in pokemons" :key="index">
          <td>{{ pokemon.details?.id }}</td>
          <td>{{ pokemon.name }}</td>
          <td>
            <img
              v-if="
                pokemon.details?.sprites.other['official-artwork'].front_default
              "
              :src="
                pokemon.details.sprites.other['official-artwork'].front_default
              "
              alt="pokemon image"
              width="50"
              height="50"
            />
          </td>
          <td>
            <ModalComponent :pokemon="pokemon" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center">
      <ButtonComponent
        color="red"
        @click="FetchPrevious"
        :disabled="!previous"
        text="Previous"
      />
      <div class="mx-2"></div>
      <ButtonComponent
        color="red"
        @click="FetchNext"
        text="Next"
        :disabled="!next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from "../components/NavbarComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import { ref, onMounted } from "vue";
import { get } from "../API/GenericCalls";
import { ApiResponse, Pokemon, PokemonDetails } from "../types/interfaces";

const pokemons = ref<Pokemon[]>([]);
const next = ref<string | null>(null);
const previous = ref<string | null>(null);
const search = ref<string>(""); // Binding search with v-model

const SetValues = async (response: ApiResponse) => {
  pokemons.value = response.results;

  await Promise.all(
    pokemons.value.map(async (pokemon) => {
      const details = await get<PokemonDetails>(pokemon.url, true);
      pokemon.details = details;
    })
  );

  next.value = response.next;
  previous.value = response.previous;
};

const FetchNext = async () => {
  if (next.value) {
    const response = await get<ApiResponse>(next.value, true);
    SetValues(response);
  }
};

const FetchPrevious = async () => {
  if (previous.value) {
    const response = await get<ApiResponse>(previous.value, true);
    SetValues(response);
  }
};

const FetchData = async () => {
  const response = await get<ApiResponse>("/pokemon?limit=20&offset=0");
  SetValues(response);
};

const filterPokemon = async () => {
  if (search.value) {
    try {
      const res = await get<PokemonDetails>(`/pokemon/${search.value}`);
      pokemons.value = [{ name: search.value, url: "", details: res }];
    } catch (error) {
      console.error("Error fetching pokemon: ", error);
      alert("Pokemon not found!");
      FetchData();
    }
  }
  search.value = "";
};

onMounted(() => {
  FetchData();
});
</script>

<style scoped lang="scss">
@import "../style.scss";

th {
  background-color: $purple !important;
  color: $white !important;
}

table {
  border-radius: 5px;
  overflow: hidden;
}
</style>
