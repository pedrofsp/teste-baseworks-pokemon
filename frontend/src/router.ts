import { createMemoryHistory, createRouter } from "vue-router";

import HomePage from "./Views/HomePage.vue";
import FavoritesPage from "./Views/FavoritesPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/fav", component: FavoritesPage },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export { router };
