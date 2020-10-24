import { mount } from '@vue/test-utils'
import Emitter from './Emitter.vue'

test('app', async () => {
  const wrapper = mount(Emitter) 
  await wrapper.find('input').setValue('Lachlan')
  console.log(wrapper.html())
  console.log(wrapper.emitted())
})
