<template>
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
      <tr v-for="(pokemon, index) in props.pokemons" :key="index">
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
</template>

<script setup lang="ts">
import SmallPokemonCard from "./SmallPokemonCard.vue";
import ModalComponent from "./ModalComponent.vue";
import { Pokemon } from "../types/interfaces";
const props = defineProps<{
  pokemons: Pokemon[];
}>();
</script>

<style lang="scss" scoped>
@import "../style";

th {
  background-color: $purple !important;
  color: $white !important;
}

table {
  border-radius: 5px;
  overflow: hidden;
}
</style>
