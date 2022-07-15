/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react'

import CreateHookForm from './CreateHookForm'

test('store', () => {
  render(<CreateHookForm />)

  screen.debug()
})
