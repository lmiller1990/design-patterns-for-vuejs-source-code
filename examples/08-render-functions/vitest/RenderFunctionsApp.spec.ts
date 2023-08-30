import { render, fireEvent } from "@testing-library/vue";
import RenderFunctionsApp from "../RenderFunctionsApp.vue";
import { mount } from "@vue/test-utils";
import { expect } from "vitest";

describe("<RenderFunctionsApp />", () => {
  it("with testing-library", async () => {
    const { container } = render(RenderFunctionsApp);
    expect(
      container.querySelector('[data-testid="tab-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="tab-2"]')
    ).toBeTruthy();

    expect(container.outerHTML).toContain("Content #1");
    expect(container.outerHTML).not.toContain("Content #2");

    await fireEvent.click(
      container.querySelector('[data-testid="tab-2"]')!
    );

    expect(container.outerHTML).not.toContain("Content #1");
    expect(container.outerHTML).toContain("Content #2");
  });

  it("with test utils", async () => {
    const wrapper = mount(RenderFunctionsApp);
    expect(wrapper.html()).toContain("Content #1");
    expect(wrapper.html()).not.toContain("Content #2");

    await wrapper.find('[data-testid="tab-2"]').trigger("click");

    expect(wrapper.html()).not.toContain("Content #1");
    expect(wrapper.html()).toContain("Content #2");
  });
});
