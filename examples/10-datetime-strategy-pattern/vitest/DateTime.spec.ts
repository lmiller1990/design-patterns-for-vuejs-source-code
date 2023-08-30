import { render, fireEvent } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import moment from "moment";
import * as Luxon from "luxon";
import DateTime from "../DateTime.vue";
import {
  serialize,
  deserialize,
  serializeMoment,
} from "../serializers.js";

describe("serializeMoment", () => {
  it("serializes valid moment", () => {
    const actual = serializeMoment({ year: 2020, month: 1, day: 1 });
    // compare as strings. moment is pain.
    expect(actual?.toString()).toEqual(
      moment("2020-01-01").toString()
    );
  });

  it("returns undefined for invalid moment", () => {
    const actual = serializeMoment({
      // @ts-expect-error
      year: "200000020",
      // @ts-expect-error
      month: "1xxxxx",
      // @ts-expect-error
      day: "bbbb",
    });
    expect(actual).toEqual(undefined);
  });
});

describe("deserialize", () => {
  it("deserializes to Luxon DateTime", () => {
    const actual = deserialize(
      Luxon.DateTime.fromObject({ year: 2020, month: 1, day: 1 })
    );
    expect(actual).toEqual({ year: 2020, month: 1, day: 1 });
  });
});

describe("serialize", () => {
  it("serializes valid Luxon DateTime", () => {
    const actual = serialize({ year: 2020, month: 1, day: 1 });
    expect(actual).toEqual(
      Luxon.DateTime.fromObject({ year: 2020, month: 1, day: 1 })
    );
  });

  it("returns undefined for invalid Luxon DateTime", () => {
    const actual = serialize({
      // @ts-expect-error
      year: "200000020",
      // @ts-expect-error
      month: "1xxxxx",
      // @ts-expect-error
      day: "1",
    });
    expect(actual).toEqual(undefined);
  });
});

describe("deserialize", () => {
  it("deserializes to Luxon DateTime", () => {
    const actual = deserialize(
      Luxon.DateTime.fromObject({ year: 2020, month: 1, day: 1 })
    );
    expect(actual).toEqual({ year: 2020, month: 1, day: 1 });
  });
});

test("DateTime", async () => {
  const { emitted, container } = render(DateTime, {
    props: {
      modelValue: Luxon.DateTime.fromObject({
        year: 2020,
        month: 1,
        day: 1,
      }),
      serialize,
      deserialize,
    },
  });

  await fireEvent.update(
    container.querySelector("[name='year']")!,
    "2019"
  );
  await fireEvent.update(
    container.querySelector("[name='month']")!,
    "2"
  );
  await fireEvent.update(
    container.querySelector("[name='day']")!,
    "3"
  );

  // 3 successful updates, 3 emits.
  expect(emitted()["update:modelValue"]).toHaveLength(3);

  expect((emitted()["update:modelValue"] as any)[0][0]).toEqual(
    Luxon.DateTime.fromObject({ year: 2019, month: 1, day: 1 })
  );
  expect((emitted()["update:modelValue"] as any)[1][0]).toEqual(
    Luxon.DateTime.fromObject({ year: 2020, month: 2, day: 1 })
  );
  expect((emitted()["update:modelValue"] as any)[2][0]).toEqual(
    Luxon.DateTime.fromObject({ year: 2020, month: 1, day: 3 })
  );
});

import { mount } from "@vue/test-utils";

test("DateTime", async () => {
  const wrapper = mount(DateTime, {
    props: {
      modelValue: Luxon.DateTime.fromObject({
        year: 2020,
        month: 1,
        day: 1,
      }),
      serialize,
      deserialize,
    },
  });

  await wrapper.find('[name="year"]').setValue("2019");
  await wrapper.find('[name="month"]').setValue("2");
  await wrapper.find('[name="day"]').setValue("3");

  // 3 successful updates, 3 emits.
  expect(wrapper.emitted("update:modelValue")).toHaveLength(3);

  // update:modelValue will not update the modelValue prop
  // in Vue Test Utils, though.
  // we could wrap this in another component and do something
  // fancy but it's not really worth it. I think this is fine,
  // since we know the limitations and understand why we are doing
  // what we are doing here.
  expect((wrapper.emitted("update:modelValue") as any)[0][0]).toEqual(
    Luxon.DateTime.fromObject({ year: 2019, month: 1, day: 1 })
  );
  expect((wrapper.emitted("update:modelValue") as any)[1][0]).toEqual(
    Luxon.DateTime.fromObject({ year: 2020, month: 2, day: 1 })
  );
  expect((wrapper.emitted("update:modelValue") as any)[2][0]).toEqual(
    Luxon.DateTime.fromObject({ year: 2020, month: 1, day: 3 })
  );
});
