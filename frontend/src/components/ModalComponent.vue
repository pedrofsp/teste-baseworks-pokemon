<template>
  <ButtonComponent @click="openModal" text="Details" color="purple" />
  <div
    v-if="pokemon && pokemon.id"
    class="modal fade"
    :id="`modal-${pokemon.id}`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered d-flex flex-column flex-md-row justify-content-center"
    >
      <div class="modal-content left custom-shadow rounded">
        <div
          class="custom-shadow d-flex flex-column justify-content-center h-100 px-5 py-4"
        >
          <h3>{{ pokemon.name.toUpperCase() }}</h3>
          <div class="frame d-flex justify-content-center rounded my-3">
            <img
              class="ilustration py-3 rounded"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
              alt="Pokemon illustration"
            />
          </div>
          <div class="d-flex">
            <div v-for="type in pokemon.type" :key="type.type_object.id">
              <img
                class="icon me-2"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${type.type_object.id}.png`"
                alt="Pokemon type icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="middle"></div>
      <div
        class="modal-content right custom-shadow rounded d-flex flex-row flex-md-column justify-content-center justify-content-md-end"
      >
        <div
          class="d-flex flex-column justify-content-center px-md-5 py-md-4 py-3"
        >
          <h4 class="mb-3">Pokemon Stats</h4>
          <div
            class="chart-frame d-flex flex-column justify-content-center w-100 rounded p-3"
          >
            <Bar id="my-chart-id" class="align-self-center" :data="chartData" />
          </div>
          <div class="my-2"></div>
          <h4 class="mb-3">Evolution chain</h4>
          <div class="d-flex flex-row justify-content-between">
            <div
              v-for="evolution in pokemonEvolutions?.all_pokemon_evolutions[0]
                .evolution_chain.species"
              :key="evolution.id"
            >
              <SmallPokemonCard :id="evolution.id" :name="evolution.name" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "./ButtonComponent.vue";
import SmallPokemonCard from "./SmallPokemonCard.vue";
import { ref, computed } from "vue";
import { Pokemon, PokemonEvolutions } from "../types/interfaces";
import { GetPokemonsEvolutions } from "../API/PokemonFetch";
import { Modal } from "bootstrap";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps<{ pokemon: Pokemon }>();

let modal = ref<Modal | null>(null);
let pokemonEvolutions = ref<PokemonEvolutions | null>(null);

const chartData = ref({
  labels: ["HP", "AT", "DF", "SA", "SD", "SP"],
  datasets: [
    {
      label: "Pokemon Stats",
      data: computed(() => {
        return props.pokemon.stats.map((stat) => stat.base_stat);
      }),
      backgroundColor: "rgba(255, 255, 255, 1)",
      barThickness: 10,
    },
  ],
});

const openModal = async () => {
  const modalElement = document.getElementById(`modal-${props.pokemon.id}`);
  if (modalElement) {
    pokemonEvolutions.value = await GetPokemonsEvolutions(props.pokemon.id);
    modal.value = new Modal(modalElement);
    modal.value.show();
  }
};
</script>

<style scoped lang="scss">
@import "../style";

$initial-height: 450px;
$carousel-image-height: 200px;
$carousel-border: 20px;

.frame {
  width: 100%;
  height: $carousel-image-height;
  margin: 0 auto;
  background-color: $light-blue;
  border: $carousel-border solid #f2f4eb;
}

.ilustration {
  height: calc($carousel-image-height - ($carousel-border * 2));
}

.modal-dialog {
  max-width: 800px;
}

.modal-content {
  color: $white;
  background-color: transparent;
  height: $initial-height;
  border: none;
  border-radius: 0;
}

.left {
  background-color: $purple;
}

.icon {
  width: 100px;
}

.middle {
  background: linear-gradient(
    90deg,
    rgba(253, 27, 84, 1) 0%,
    rgba(203, 34, 93, 1) 69%,
    rgba(5, 12, 39, 1) 100%
  );
  width: 50px;
  height: $initial-height;
  z-index: 1;
}

.right {
  background-color: $main-red;
  height: calc(100% - 40px);
}

.custom-shadow {
  box-shadow: 5px 10px 1px 2px rgba(0, 0, 0, 0.7);
}

.chart-frame {
  background-color: $dark-blue;
}

//TABLET
@media only screen and (max-width: 767px) {
  .middle {
    background: linear-gradient(
      180deg,
      rgba(253, 27, 84, 1) 0%,
      rgba(203, 34, 93, 1) 69%,
      rgba(5, 12, 39, 1) 100%
    );
    width: 70%;
    height: 15px;
  }
  .modal-content {
    width: 70%;
    height: unset;
  }
}

//MOBILE
@media only screen and (max-width: 576px) {
  .modal-content {
    width: 90%;
  }
}

.chart-frame {
  margin: auto;
  width: 80%;
  background-color: $dark-blue;
}
</style>
