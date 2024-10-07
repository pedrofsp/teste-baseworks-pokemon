import { createApp } from "vue";
import App from "./App.vue";
import "./style.scss";

/* Bootstrap v5 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/* Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilter,
  faPlus,
  faHeart,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { router } from "./router";
library.add(faFilter, faPlus, faHeart, faShieldHeart);

const app = createApp(App).use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
