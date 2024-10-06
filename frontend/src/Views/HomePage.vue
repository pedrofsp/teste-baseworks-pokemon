<template>
  <Loading :isLoading="isLoading" />

  <div class="container">
    <form class="d-flex flex-column mt-3" @submit.prevent="filterPokemon">
      <div class="d-flex">
        <input
          v-model="search"
          class="form-control"
          placeholder="Search by name or id ..."
        />
        <ButtonComponent class="mx-2" text="Search" color="red" />

        <ButtonComponent
          @click="toggleFilter($event)"
          :isFilter="true"
          color="red"
        />
      </div>

      <div v-if="showFilter" class="d-flex mt-3">
        <select v-model="selectedType" class="form-select me-2">
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="psychic">Psychic</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
        </select>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="searchTypeSwitch"
            v-model="searchById"
          />
          <label class="form-check-label" for="searchTypeSwitch">
            Search by ID
          </label>
        </div>
      </div>
    </form>

    <table class="table my-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Art</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pokemon, index) in pokemons" :key="index">
          <td class="align-middle">{{ pokemon.id }}</td>
          <td class="align-middle">
            {{ pokemon.name.toUpperCase() }}
          </td>
          <td class="align-middle">
            <SmallPokemonCard :id="pokemon.id" type="gif" />
          </td>
          <td class="align-middle">
            <ModalComponent :pokemon="pokemon" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center">
      <ButtonComponent
        color="red"
        @click="FetchPrevious"
        :disabled="offset === 0"
        text="Previous"
      />
      <div class="mx-2"></div>
      <ButtonComponent color="red" @click="FetchNext" text="Next" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalComponent from "../components/ModalComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import SmallPokemonCard from "../components/SmallPokemonCard.vue";
import Loading from "../components/Loading.vue";
import { ref, onMounted } from "vue";
import { GetPokemons } from "../API/PokemonFetch";
import { Pokemon, GetPokemonsResponse } from "../types/interfaces";

let pokemons = ref<Pokemon[]>([]);
let limit = 15;
let offset = ref<number>(0);
let search = ref<string>("");
let selectedType = ref<string>("");
let searchById = ref<boolean>(false);
let showFilter = ref<boolean>(false);
let isLoading = ref<boolean>(true);

const SetValues = async (response: GetPokemonsResponse) => {
  pokemons.value = response.all_pokemons;
};

const FetchNext = async () => {
  offset.value += limit;
  await FetchData();
};

const FetchPrevious = async () => {
  if (offset.value > 0) {
    offset.value -= limit;
    await FetchData();
  }
};

const FetchData = async (id?: number) => {
  isLoading.value = true;
  const response = await GetPokemons(
    limit,
    offset.value,
    false,
    search.value,
    id,
    selectedType.value
  );
  isLoading.value = false;
  if (response) SetValues(response);
};

const filterPokemon = async () => {
  offset.value = 0;

  if (search.value) {
    if (searchById.value) {
      const id = parseInt(search.value, 10);
      if (!isNaN(id)) {
        await FetchData(id);
      }
    } else {
      await FetchData();
    }
  } else {
    pokemons.value = [];
    await FetchData();
  }
};

const toggleFilter = (event: Event) => {
  event.preventDefault();
  showFilter.value = !showFilter.value;
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
