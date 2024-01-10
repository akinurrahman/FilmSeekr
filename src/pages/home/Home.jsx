import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'

const Home = () => {
  return (
    <div className='bg-[#04152d] text-white'>
      <HeroBanner/>
      <Trending/>
    </div>
  )
}

export default Home
