import { createApp } from "vue";

// Chapter 3 - Props
import Sum from "./03-props/Sum.vue"
import SumApp from "./03-props/SumApp.vue"

// Chapter 4 - Forms
import PatientForm from "./04-forms/PatientForm.vue"

// Chapter 7 - Rendless Components
import RenderlessPasswordApp from "./07-renderless-components/RenderlessPasswordApp.vue"


const app = createApp(RenderlessPasswordApp);
app.mount("#app");
