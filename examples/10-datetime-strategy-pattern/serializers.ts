import { DateTime } from "luxon";
import moment, { Moment } from "moment";

export interface InternalDateTime {
  year: number;
  month: number;
  day: number;
}

export function serializeMoment(value: InternalDateTime) {
  const toString = `${value.year}-${value.month
    .toString()
    .padStart(2, "0")}-${value.day.toString().padStart(2, "0")}`;
  const toObject = moment(toString, "YYYY-MM-DD", true);
  if (toObject.isValid()) {
    return toObject;
  }
  return;
}

export function deserializeMoment(value: Moment): InternalDateTime {
  if (!moment.isMoment(value)) {
    return value;
  }

  return {
    year: value.year(),
    month: value.month() + 1,
    day: value.date(),
  };
}

export function deserialize(value: DateTime): InternalDateTime {
  return {
    year: value.get("year"),
    month: value.get("month"),
    day: value.get("day"),
  };
}

export function serialize(value: InternalDateTime) {
  try {
    const obj = DateTime.fromObject(value);
    if (!obj.isValid) {
      return;
    }
  } catch {
    return;
  }

  return DateTime.fromObject(value);
}
