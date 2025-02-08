import React from 'react'
import DollarScene from './DollarScene'
import FifthPage from './FifthPage'
import FourthPage from './FourthPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'

const LandingPage = () => {
  return (
    <>
      <div className='w-[100vw] min-h-screen overflow-hidden'>
        <DollarScene/>
        <SecondPage/>
        <ThirdPage/>
        <FifthPage/>
      </div>
    </>
  )
}

export default LandingPage