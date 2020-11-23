import { render, screen, fireEvent } from '@testing-library/vue'
import moment from 'moment'
import { DateTime } from 'luxon'
import dateTime from './date-time.vue'
import { 
  serialize,
  deserialize,
  serializeMoment,
} from './date-time-serializers.js'

describe('serializeMoment', () => {
  it('serializes valid moment', () => {
    const actual = serializeMoment({ year: '2020', month: '1', day: '1' })
    // compare as strings. moment is pain.
    expect(actual.toString()).toEqual(moment('2020-01-01').toString())
  })

  it('returns undefined for invalid moment', () => {
    const actual = serializeMoment({ year: '200000020', month: '1xxxxx', day: 'bbbb' })
    expect(actual).toEqual(undefined)
  })
})

describe('deserialize', () => {
  it('deserializes to Luxon DateTime', () => {
    const actual = deserialize(DateTime.fromObject({ year: '2020', month: '1', day: '1' }))
    expect(actual).toEqual({ year: 2020, month: 1, day: 1 })
  })
})


describe('serialize', () => {
  it('serializes valid Luxon DateTime', () => {
    const actual = serialize({ year: '2020', month: '1', day: '1' })
    expect(actual).toEqual(DateTime.fromObject({ year: 2020, month: 1, day: 1 }))
  })

  it('returns undefined for invalid Luxon DateTime', () => {
    const actual = serialize({ year: '200000020', month: '1xxxxx', day: '1' })
    expect(actual).toEqual(undefined)
  })
})

describe('deserialize', () => {
  it('deserializes to Luxon DateTime', () => {
    const actual = deserialize(DateTime.fromObject({ year: '2020', month: '1', day: '1' }))
    expect(actual).toEqual({ year: 2020, month: 1, day: 1 })
  })
})

test('DateTime', async () => {
  const { emitted } = render(dateTime, {
    props: {
      modelValue: DateTime.fromObject({ year: '2020', month: '1', day: '1' }),
      serialize,
      deserialize
    }
  })

  await fireEvent.update(screen.getByRole('year') ,'2019')
  await fireEvent.update(screen.getByRole('month'), '2')
  await fireEvent.update(screen.getByRole('day'), '3')

  // 3 successful updates, 3 emits.
  expect(emitted()['update:modelValue']).toHaveLength(3)

  expect(emitted()['update:modelValue'][0][0]).toEqual(
    DateTime.fromObject({ year: '2019', month: '1', day: '1' })
  )
  expect(emitted()['update:modelValue'][1][0]).toEqual(
    DateTime.fromObject({ year: '2020', month: '2', day: '1' })
  )
  expect(emitted()['update:modelValue'][2][0]).toEqual(
    DateTime.fromObject({ year: '2020', month: '1', day: '3' })
  )
})

import { mount } from '@vue/test-utils'

test('DateTime', async () => {
  const wrapper = mount(dateTime, {
    props: {
      modelValue: DateTime.fromObject({ year: '2020', month: '1', day: '1' }),
      serialize,
      deserialize
    }
  })

  await wrapper.find('[role="year"]').setValue('2019')
  await wrapper.find('[role="month"]').setValue('2')
  await wrapper.find('[role="day"]').setValue('3')

  // 3 successful updates, 3 emits.
  expect(wrapper.emitted('update:modelValue')).toHaveLength(3)

  // update:modelValue will not update the modelValue prop
  // in Vue Test Utils, though.
  // we could wrap this in another component and do something
  // fancy but it's not really worth it. I think this is fine,
  // since we know the limitations and understand why we are doing
  // what we are doing here.
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(
    DateTime.fromObject({ year: '2019', month: '1', day: '1' })
  )
  expect(wrapper.emitted('update:modelValue')[1][0]).toEqual(
    DateTime.fromObject({ year: '2020', month: '2', day: '1' })
  )
  expect(wrapper.emitted('update:modelValue')[2][0]).toEqual(
    DateTime.fromObject({ year: '2020', month: '1', day: '3' })
  )
})