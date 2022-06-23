import { lazy } from 'react'

const Hero = lazy(() => import('components/home/Hero'))
const Features = lazy(() => import('components/home/Features'))

function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}

export default Home
