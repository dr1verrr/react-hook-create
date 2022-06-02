import { FC, lazy } from 'react'

const Hero = lazy(() => import('components/Hero/Hero'))
const Features = lazy(() => import('components/Features/Features'))

const Home: FC = () => {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}

export default Home
