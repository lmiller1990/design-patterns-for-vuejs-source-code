import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import RenderlessPasswordApp from "../RenderlessPasswordApp.vue";

describe("component using RenderlessPassword", () => {
  it("meets default requirements", async () => {
    render(RenderlessPasswordApp);

    await fireEvent.update(
      screen.getByLabelText("Password"),
      "this is a long password"
    );
    await fireEvent.update(
      screen.getByLabelText("Confirmation"),
      "this is a long password"
    );

    expect(screen.getByTestId("complexity").textContent).toContain(
      "Complexity: 3"
    );
    expect(
      screen.getByText<HTMLInputElement>("Submit").disabled
    ).toBeFalsy();
  });

  it("does not meet complexity requirements", async () => {
    render(RenderlessPasswordApp);

    await fireEvent.update(
      screen.getByLabelText("Password"),
      "shorty"
    );
    await fireEvent.update(
      screen.getByLabelText("Confirmation"),
      "shorty"
    );

    expect(screen.getByTestId("complexity").textContent).toContain(
      "Complexity: 1"
    );
    expect(
      screen.getByText<HTMLInputElement>("Submit").disabled
    ).toBeTruthy();
  });

  it("password and confirmation does not match", async () => {
    render(RenderlessPasswordApp);

    await fireEvent.update(screen.getByLabelText("Password"), "abc");
    await fireEvent.update(
      screen.getByLabelText("Confirmation"),
      "def"
    );

    expect(
      screen.getByText<HTMLInputElement>("Submit").disabled
    ).toBeTruthy();
  });
});

import { mount } from "@vue/test-utils";

describe("component using RenderlessPassword", () => {
  it("meets default requirements", async () => {
    const wrapper = mount(RenderlessPasswordApp);

    await wrapper
      .find("#password")
      .setValue("this is a long password");
    await wrapper
      .find("#confirmation")
      .setValue("this is a long password");

    expect(wrapper.find(".complexity.low").exists()).not.toBe(true);
    expect(wrapper.find(".complexity.high").exists()).toBe(true);
    expect(wrapper.find("button").element.disabled).toBe(false);
  });

  it("does not meet complexity requirements", async () => {
    const wrapper = mount(RenderlessPasswordApp);

    await wrapper.find("#password").setValue("shorty");
    await wrapper.find("#confirmation").setValue("shorty");

    expect(wrapper.find("button").element.disabled).toBe(true);
    expect(wrapper.find(".complexity.high").exists()).not.toBe(true);
    expect(wrapper.find(".complexity.low").exists()).toBe(true);
  });

  it("password and confirmation does not match", async () => {
    const wrapper = mount(RenderlessPasswordApp);

    await wrapper.find("#password").setValue("abc");
    await wrapper.find("#confirmation").setValue("def");

    expect(wrapper.find("button").element.disabled).toBe(true);
  });
});
