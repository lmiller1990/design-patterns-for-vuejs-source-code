import { mount } from '@vue/test-utils'
import App from './app.vue'

test('tabs', async () => {
  const wrapper = mount(App)
  expect(wrapper.html()).not.toContain('Content #2')

  await wrapper.find('[data-test="2"]').trigger('click')

  expect(wrapper.html()).toContain('Content #2')
})
