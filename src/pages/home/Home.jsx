import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'
import Popular from './Popular'


const Home = () => {
  return (
    <div className='bg-[#04152d] text-white'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
    </div>
  )
}

export default Home
