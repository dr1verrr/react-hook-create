/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'

import Tags from './Tags'

test('store', () => {
  const tagsRef = createRef()
  render(<Tags tagsRef={tagsRef} />)

  screen.debug()
})
