<template>
  <ButtonComponent @click="openModal" text="Details" color="purple" />
  <div
    v-if="pokemon?.id"
    class="modal fade"
    :id="`modal-${pokemon.id}`"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered d-flex flex-column flex-lg-row justify-content-center"
    >
      <div class="modal-content custom-shadow left rounded">
        <div
          class="content d-flex flex-column justify-content-center px-5 py-4"
        >
          <div class="d-flex justify-content-between">
            <TitleComponent
              :text="capitalizeFirstLetter(pokemon.name)"
              color="white"
            />
            <font-awesome-icon
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              :icon="['fas', 'xmark']"
            />
          </div>

          <div class="frame d-flex justify-content-center rounded my-3">
            <img
              class="ilustration align-self-center py-3 rounded"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
              alt="Pokemon illustration"
            />
          </div>

          <div class="d-flex justify-content-center justify-content-lg-start">
            <div v-for="type in pokemon.type" :key="type.type_object.id">
              <img
                class="type-icon me-2"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${type.type_object.id}.png`"
                alt="Pokemon type icon"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="middle"></div>

      <div class="modal-content custom-shadow right rounded">
        <div
          class="content d-flex flex-column justify-content-center h-100 px-5 py-4"
        >
          <TitleComponent
            :isSubtitle="true"
            text="Pokemon Stats"
            color="white"
          />
          <div class="chart-frame rounded mb-3">
            <Bar id="my-chart-id" class="align-self-center" :data="chartData" />
          </div>
          <TitleComponent
            :isSubtitle="true"
            text="Evolution Chain"
            color="white"
          />
          <div class="evolution-cards d-flex justify-content-between">
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
import TitleComponent from "./TitleComponent.vue";
import { ref } from "vue";
import { Pokemon, PokemonEvolutions } from "../types/interfaces";
import { GetPokemonsEvolutions } from "../API/PokemonFetch";
import { capitalizeFirstLetter } from "../functions/functions";
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

const modal = ref<typeof Modal | null>(null);
const pokemonEvolutions = ref<PokemonEvolutions | null>(null);

const chartData = ref({
  labels: ["HP", "AT", "DF", "SA", "SD", "SP"],
  datasets: [
    {
      label: "Pokemon Stats",
      data: props.pokemon.stats.map((stat) => stat.base_stat),
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
  height: $initial-height;
  border: 1px solid $dark-blue;
  border-radius: 0;
  background-color: transparent;
}

.left {
  background-color: $purple;
}

.right {
  background-color: $main-red;
}

.custom-shadow {
  box-shadow: 5px 10px 1px 2px rgba(0, 0, 0, 0.7);
}

.content {
  height: 100%;
  color: $white;
}

.close-modal {
  cursor: pointer;
  font-size: $xl;
}

.type-icon {
  width: 100px;
}

.middle {
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(253, 27, 84, 1) 0%,
    rgba(203, 34, 93, 1) 69%,
    rgba(5, 12, 39, 1) 100%
  );
  width: 50px;
  height: $initial-height;
}

.chart-frame {
  background-color: $dark-blue;
  width: inherit;
}

.evolution-cards {
  overflow-x: auto;
}

@media (max-width: 993px) {
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
    height: inherit;
  }
}

@media (max-width: 576px) {
  .modal-content {
    width: 80%;
  }

  .content {
    height: calc($initial-height - 180px);
  }

  .type-icon {
    width: 80px;
  }

  .ilustration {
    height: calc($carousel-image-height - ($carousel-border * 2) - 50px);
  }

  h4 {
    font-size: $md;
  }
}
</style>
