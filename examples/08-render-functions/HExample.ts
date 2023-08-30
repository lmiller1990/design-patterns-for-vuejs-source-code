import { defineComponent, h } from "vue";

export const Comp = defineComponent({
  setup() {
    const e1 = h("div");
    const e2 = h("span");
    const e3 = h({
      setup() {
        return () => h("p", {}, ["Some Content"]);
      },
    });

    return () => [h(() => e1), h(() => e2), h(() => e3)];
  },
});
