<template>
  <LoadingComponent :isLoading="isLoading" />

  <div class="container mt-3">
    <TitleComponent text="Home Page" />

    <form class="d-flex flex-column mt-3" @submit.prevent="filterPokemon">
      <div class="d-flex">
        <input
          v-model="search"
          class="form-control"
          :placeholder="`Search by ${searchById ? 'id' : 'name'}`"
        />

        <ButtonComponent class="ms-2" text="Search" color="red" />

        <ButtonComponent
          @click="Reset($event)"
          class="mx-2"
          text="Reset"
          color="purple"
        />

        <ButtonComponent
          @click="toggleFilter($event)"
          :isFilter="true"
          text="Filter"
          :color="showFilter ? 'red' : 'dark-blue'"
        />
      </div>

      <div v-if="showFilter" class="d-flex mt-3">
        <div class="w-100 align-items-center">
          <p class="mb-1">Pokemons per page</p>
          <select v-model="selectedType" class="form-select me-2">
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="normal">Normal</option>
            <option value="electric">Electric</option>
            <option value="ice">Ice</option>
            <option value="rock">Rock</option>
            <option value="ground">Ground</option>
            <option value="psychic">Psychic</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div class="w-100 align-items-center mx-1">
          <p class="mb-1">Pokemons per page</p>
          <input
            id="pokemonLimit"
            type="number"
            v-model.number="limit"
            @change="FetchData()"
            class="form-control"
            min="1"
          />
        </div>

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

    <TableComponent class="my-3" :pokemons="pokemons" />

    <div class="d-flex justify-content-center">
      <font-awesome-icon
        :class="`arrow align-self-center ${offset == 0 ? 'disabled' : ''}`"
        @click="FetchPrevious"
        style="transform: rotate(180deg)"
        :icon="['fas', 'play']"
      />
      <p class="page-counter mx-3 align-self-center">
        {{ pageCounter }}
      </p>
      <font-awesome-icon
        class="arrow align-self-center"
        @click="FetchNext"
        :icon="['fas', 'play']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "../components/TitleComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import TableComponent from "../components/TableComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { ref, onMounted } from "vue";
import { GetPokemons } from "../API/PokemonFetch";
import { Pokemon } from "../types/interfaces";

let pokemons = ref<Pokemon[]>([]);
let limit = ref<number>(20);
let offset = ref<number>(0);
let search = ref<string>("");
let selectedType = ref<string>("");
let searchById = ref<boolean>(false);
let showFilter = ref<boolean>(false);
let isLoading = ref<boolean>(true);
let pageCounter = ref<number>(1);

onMounted(() => {
  FetchData();
});

// Fetch dos pokemons, passando filtros, limite e entre outros que estejam aplicados
async function FetchData(id?: number) {
  isLoading.value = true;
  const ids = id ? [id] : undefined;
  const response = await GetPokemons(
    limit.value,
    offset.value,
    false,
    search.value,
    ids,
    selectedType.value
  );
  isLoading.value = false;
  if (response) pokemons.value = response.all_pokemons;
}

function FetchNext() {
  pageCounter.value++;
  offset.value += limit.value;
  FetchData();
}

function FetchPrevious() {
  if (offset.value == 0) return;
  pageCounter.value--;
  offset.value -= limit.value;
  FetchData();
}

// Função chamada ao submeter uma pesquisa por nome ou id
async function filterPokemon() {
  offset.value = 0;
  const id = searchById.value ? parseInt(search.value, 10) : undefined;
  if (search.value && (!searchById.value || (id !== undefined && !isNaN(id))))
    await FetchData(id);
  else {
    pokemons.value = [];
    await FetchData();
  }
}

function toggleFilter(event: Event) {
  event.preventDefault();
  showFilter.value = !showFilter.value;
}

function Reset(event: Event) {
  event.preventDefault();
  location.reload();
}
</script>

<style scoped lang="scss">
@import "../style";

.arrow {
  font-size: $lg;
  color: $purple;
  cursor: pointer;
}

.disabled {
  color: $light-gray;
  cursor: not-allowed;
}

.page-counter {
  color: $dark-blue;
  font-weight: bold;
  margin: unset;
  font-size: $lg;
}
</style>
