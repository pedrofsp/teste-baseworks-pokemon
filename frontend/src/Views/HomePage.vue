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
    <TableComponent :pokemons="pokemons" />
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
import ButtonComponent from "../components/ButtonComponent.vue";
import TableComponent from "../components/TableComponent.vue";
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

<style scoped lang="scss"></style>
