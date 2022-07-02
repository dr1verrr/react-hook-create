/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react'

import Store from './Store'

test('store', () => {
  render(<Store />)

  screen.debug()
})
