import { createApp } from "vue";
import App from "./App.vue";
import "./style.scss";

/* Bootstrap v5 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/* Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faFilter);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
