import { render, screen, fireEvent } from '@testing-library/vue'
import App from './app.vue'

test('tabs', async () => {
  render(App)
  expect(screen.queryByText('Content #2')).toBeFalsy()

  fireEvent.click(screen.getByText('Tab #2'))
  await screen.findByText('Content #2')
})
