import { DateTime } from 'luxon'
import moment from 'moment'

export function serializeMoment(value) {
  const toString = `${value.year}-${value.month.padStart(2, '0')}-${value.day.padStart(2, '0')}`
  const toObject = moment(toString, 'YYYY-MM-DD', true)
  if (toObject.isValid()) {
    return toObject
  }
  return 
}

export function deserializeMoment(value) {
  if (!moment.isMoment(value)) {
    return value
  }

  return {
    year: value.year().toString(),
    month: (value.month() + 1).toString(),
    day: value.date().toString()
  }
}


export function deserialize(value) {
  return {
    year: value.get('year'),
    month: value.get('month'),
    day: value.get('day')
  }
}

export function serialize(value) {
  try {
    const obj = DateTime.fromObject(value)
    if (obj.invalid) {
      return 
    }
  } catch {
    return 
  }

  return DateTime.fromObject(value)
}

