<template>
  <NavbarComponent />
  <div class="container">
    <form class="d-flex mt-3">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn btn-custom" type="submit">Search</button>
    </form>
    <table class="table my-3">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td><a :href="item.url" target="_blank">Link</a></td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center">
      <button
        class="btn btn-custom"
        :disabled="!previous"
        @click="fetchPrevious"
      >
        Previous
      </button>
      <div class="mx-2"></div>
      <button class="btn btn-custom" @click="fetchNext">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from "../components/NavbarComponent.vue";
import { ref, onMounted } from "vue";
import { get } from "../API/GenericCalls";

interface Pokemon {
  name: string;
  url: string;
}

interface ApiResponse {
  results: Pokemon[];
  next: string | null;
  previous: string | null;
}

const items = ref<Pokemon[]>([]);
const next = ref<string | null>(null);
const previous = ref<string | null>(null);

const setValues = (response: ApiResponse) => {
  items.value = response.results;
  next.value = response.next;
  previous.value = response.previous;
};

const fetchNext = async () => {
  if (next.value) {
    const response = await get<ApiResponse>(next.value, true);
    setValues(response);
  }
};

const fetchPrevious = async () => {
  if (previous.value) {
    const response = await get<ApiResponse>(previous.value, true);
    setValues(response);
  }
};

const fetchData = async () => {
  const response = await get<ApiResponse>("/pokemon?limit=20&offset=0");
  setValues(response);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="scss">
@import "../style.scss";

.btn-custom {
  background-color: #fd1b54;
  color: $white;

  &:hover {
    background-color: #e01a4f;
    color: $white;
  }

  &:disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }
}

th {
  background-color: $purple !important;
  color: $white !important;
}

table {
  border-radius: 5px;
  overflow: hidden;
}
</style>
