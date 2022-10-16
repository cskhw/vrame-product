import pinia from "@/plugins/pinia";
import { createApp, watch } from "vue";
import vrame from "@/plugins/vrame";
import App from "@/App.vue";
import router from "./router";

const app = createApp(App);

app.use(router).use(pinia).use(vrame).mount("#app");
