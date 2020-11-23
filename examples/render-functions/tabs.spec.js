import { render, screen, fireEvent } from '@testing-library/vue'
import App from './app.vue'

test('tabs', async () => {
  render(App)
  expect(screen.queryByText('Content #2')).toBeFalsy()

  fireEvent.click(screen.getByText('Tab #2'))
  await screen.findByText('Content #2')
})

import { mount } from '@vue/test-utils'

test('tabs', async () => {
  const wrapper = mount(App)
  expect(wrapper.html()).not.toContain('Content #2')

  await wrapper.find('[data-test="2"]').trigger('click')

  expect(wrapper.html()).toContain('Content #2')
})