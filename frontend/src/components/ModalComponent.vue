<template>
  <ButtonComponent
    @click="pokemon.details ? OpenModal(pokemon.details.id) : null"
    text="Details"
    color="red"
  />

  <div
    v-if="pokemon && pokemon.details"
    class="modal fade"
    :id="`modal-${pokemon.details.id}`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered d-flex">
      <div class="modal-content left custom-shadow rounded">
        <div class="d-flex flex-column justify-content-center h-100 px-5">
          <div class="d-flex">
            <h3>{{ pokemon.name.toUpperCase() }}</h3>
          </div>
          <div class="frame d-flex justify-content-center rounded my-3">
            <img
              class="ilustration py-3 rounded"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.details.id}.svg`"
              alt="Pokemon ilustration"
            />
          </div>
          <div class="d-flex">
            <div v-for="type in pokemon.details.types" :key="type.type.name">
              <img class="icon me-2" :src="GetTypeIcon(type.type.url)" />
            </div>
          </div>
        </div>
      </div>
      <div class="middle"></div>
      <div class="modal-content d-flex justify-content-end">
        <div
          class="right custom-shadow rounded d-flex flex-column justify-content-center"
        >
          <div class="chart-frame rounded p-3 mb-2">
            <Bar
              id="my-chart-id"
              class="align-self-center"
              :options="chartOptions"
              :data="chartData"
            />
          </div>
          <div class="bg-primary" v-if="chain">
            <p>{{ chain.chain.species.name }}</p>
            <p>
              {{ chain.chain.evolves_to[0]?.species.name || "" }}
            </p>
            <p>
              {{ chain.chain.evolves_to[0]?.evolves_to[0]?.species.name || "" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import { Pokemon, PokemonChain, PokemonSpecie } from "../types/interfaces";
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
import { get } from "../API/GenericCalls";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "ModalComponent",
  components: { ButtonComponent, Bar },
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
  },
  data() {
    return {
      modal: null as { show: () => void; hide: () => void } | null,
      chain: null as PokemonChain | null,
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["HP", "AT", "DF", "SA", "SD", "SP"],
        datasets: [
          {
            label: "Pokemon Stats",
            data:
              this.pokemon.details?.stats.map((stat) => stat.base_stat) || [],
            backgroundColor: "rgba(255, 255, 255, 1)",
            barThickness: 10,
          },
        ],
      };
    },
  },
  methods: {
    OpenModal(id: number) {
      const modalElement = document.getElementById(`modal-${id}`);
      if (modalElement) {
        this.modal = new Modal(modalElement);
        if (this.modal) this.modal.show();
      }
      this.GetPokemonChain();
    },
    GetTypeIcon(url: string) {
      const id = url.split("/").slice(-2, -1)[0];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${id}.png`;
    },
    async GetPokemonChain() {
      const specieRes = await get<PokemonSpecie>(
        `/pokemon-species/${this.pokemon.details?.id}/`
      );
      const chainRes = await get<PokemonChain>(
        specieRes.evolution_chain.url,
        true
      );
      console.log("CHAIN ------------------->", chainRes);
      this.chain = chainRes;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../style";

$initial-height: 500px;
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
  height: 500px;
  border: none;
  border-radius: 0;
}

.left {
  background-color: $purple;
}

.middle {
  background: rgb(253, 27, 84);
  background: linear-gradient(
    90deg,
    rgba(253, 27, 84, 1) 0%,
    rgba(203, 34, 93, 1) 69%,
    rgba(5, 12, 39, 1) 100%
  );
  width: 50px;
  height: 500px;
  z-index: 1;
}

.right {
  background-color: $main-red;
  height: calc(100% - 40px); // Define a altura como 100% menos 20 pixels
}

.custom-shadow {
  -webkit-box-shadow: 5px 10px 1px 2px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 5px 10px 1px 2px rgba(0, 0, 0, 0.7);
  box-shadow: 5px 10px 1px 2px rgba(0, 0, 0, 0.7);
}

.icon {
  width: 100px;
}

.chart-frame {
  margin: 0 auto;
  width: 80%;
  background-color: $dark-blue;
}
</style>
