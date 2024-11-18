import React from 'react'

const GradientBg = () => {
  return (
    <div className='-z-50 h-[100vh] w-screen overflow-hidden flex absolute shrink-0' >
      <div className='bg-purple-300/30 h-[95vw] w-[100vh] rounded-full transform -translate-y-72 blur-3xl'></div>
      <div className='bg-blue-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-32 -translate-y-36  blur-3xl  top-0 right-0 absolute'></div>
      <div className='bg-emerald-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-12 translate-y-72  blur-3xl absolute  right-0 bottom-0'></div>
    </div>
  )
}

export default GradientBg