<template>
  <ButtonComponent
    @click="OpenModal(pokemon.details.id)"
    :text="pokemon.name"
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
      <div class="modal-content left p-3">
        <div class="d-flex flex-column justify-content-center h-100">
          <div
            :id="`carousel-${pokemon.details.id}`"
            class="carousel slide bg-light"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                :data-bs-target="`#carousel-${pokemon.details.id}`"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                :data-bs-target="`#carousel-${pokemon.details.id}`"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  :src="pokemon.details.sprites.front_default"
                  class="d-block w-100"
                  alt="Slide 1"
                />
              </div>
              <div class="carousel-item">
                <img
                  :src="pokemon.details.sprites.back_default"
                  class="d-block w-100"
                  alt="Slide 2"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              :data-bs-target="`#carousel-${pokemon.details.id}`"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              :data-bs-target="`#carousel-${pokemon.details.id}`"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <h3 class="mt-3 mb-2">{{ pokemon.name }}</h3>
          <div class="d-flex">
            <div v-for="type in pokemon.details.types" :key="type.type.name">
              <img
                class="icon me-2"
                :src="GetTypeIcon(type.type.url)"
                alt="Type Icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-content right">
        <div>Right Content</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import { Pokemon } from "../types/interfaces";
import { Modal, Carousel } from "bootstrap";

export default defineComponent({
  name: "ModalComponent",
  components: { ButtonComponent },
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
  },
  data() {
    return {
      modal: null as { show: () => void; hide: () => void } | null,
      carousel: null as Carousel | null,
    };
  },
  methods: {
    OpenModal(id: number) {
      const modalElement = document.getElementById(`modal-${id}`);
      if (modalElement) {
        this.modal = new Modal(modalElement);
        this.modal.show();
      }
      const carouselElement = document.getElementById(`carousel-${id}`);
      if (carouselElement) this.carousel = new Carousel(carouselElement);
    },
    GetTypeIcon(url: string) {
      const id = url.split("/").slice(-2, -1)[0];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${id}.png`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../style";

.carousel {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.modal-dialog {
  max-width: 800px;
}

.modal-content {
  color: $white;
  height: 500px;
  border-radius: 0;
}

.left {
  background-color: $purple;
}

.right {
  background-color: $main-red;
}

.icon {
  width: 100px;
}
</style>
