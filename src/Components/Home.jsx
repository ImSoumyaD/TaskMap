import React from 'react'
import { Link } from "react-router-dom";
import img1 from '../Images/homeimg1.png'
const Home = () => {
  return (
    <>
     {/* //background */}
     <div className='-z-50 h-[100vh] w-screen overflow-hidden flex absolute shrink-0' >
        <div className='bg-purple-300/30 h-[95vw] w-[100vh] rounded-full transform -translate-y-72 blur-3xl'></div>
        <div className='bg-blue-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-32 -translate-y-36  blur-3xl  top-0 right-0 absolute'></div>
        <div className='bg-emerald-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-12 translate-y-72  blur-3xl absolute  right-0 bottom-0'></div>
      </div>
      <div className='max-w-[1920px] px-[7vw] min-h-screen h-full w-screen'>
        {/*navbar */}
        <nav className='flex justify-between py-5 items-center f1'>
          <div className='f3 flex items-center gap-2 font-semibold'>
            <div className='bg-white/60 px-2 py-1 rounded-3xl shadow-md border border-gray-400/30'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="30" fill="rgba(60,147,229,1)"><path d="M4 1V4H1V6H4V9H6V6H9V4H6V1H4ZM11 5C11 8.31371 8.31371 11 5 11C4.29873 11 3.62556 10.8797 3 10.6586V20.0066C3 20.5551 3.44694 21 3.99826 21H14V15C14 14.45 14.45 14 15 14H21V3.9985C21 3.44749 20.5552 3 20.0066 3H10.6586C10.8797 3.62556 11 4.29873 11 5ZM21 16L16 20.997V16H21Z"></path></svg></div>
            <h1 className='text-3xl text-blue-500'>TaskMap</h1>
          </div>
          <div className='flex justify-evenly py-2 rounded-2xl bg-white/50 drop-shadow-md border border-gray-300 backdrop-blur-xl w-[30%]'>
            <Link to='/about' >About</Link>
            <Link to='/features'>Features</Link>
            <Link to='/contact'>Contact</Link>
          </div>
          <div className='flex gap-1 drop-shadow-2xl rounded-2xl overflow-hidden'>
            <Link to='/register' className='bg-white/50 backdrop-blur-2xl px-3 py-2 border border-gray-300 rounded-s-2xl rounded-e-lg hover:bg-purple-300/50 hover:border-black/40 transition-all duration-300 ease-in-out'>Register</Link>
            <Link to='/login' className='bg-white/50 backdrop-blur-2xl px-4 py-2 border  border-gray-300 rounded-s-lg rounded-e-2xl hover:bg-blue-300/50  hover:border-black/40 transition-all duration-300 ease-in-out'>Login</Link>
          </div>
        </nav>
        {/* Hero Section */}
        <div className='flex items-center w-full h-[80vh] justify-between f1'>
          <div className='description h-full w-[50%] flex flex-col gap-3 justify-center'>
            <h3 className='bg-purple-200/70 w-fit px-3 py-2 rounded-full backdrop-blur-2xl shadow-lg border border-white/30'>TaskMap 1.0 - Plan, Prioritize, and Succeed.</h3>
            <h1 className='text-7xl leading-[80px] f4'>Don't forget about big things anymore</h1>
            <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime rem eveniet recusandae magni cum exercitationem odio aliquam iusto nobis optio?</p>
            <div className='mt-3'>
              <Link to='/register' className='bg-blue-400/70 hover:bg-purple-300/50 transition-all hover:border-black duration-300 ease-in-out backdrop-blur-2xl border border-gray-200 px-4 py-2 rounded-2xl text-lg hover:shadow-lg'>Get Started</Link>
              <span className='text-sm text-gray-500'> by registering</span>
            </div>
          </div>
          {/* hero image section */}
          <div className='h-fit w-[40%] relative'>
            <img src={img1} alt="" className='object-cover' />
            <div className='absolute w-fit px-4 py-2 bg-white/40 border border-black/10 top-[50%] rounded-xl backdrop-blur-sm shadow-md '>
              <h1>Gym</h1>
              <p className='text-xs text-gray-500'>Today, 5:00pm</p>
            </div>
            <div className='absolute w-[150px] px-4 py-2 bg-white/70 border border-black/10 top-[30%] right-16 rounded-xl backdrop-blur-sm shadow-md '>
              <h1>Office meeting</h1>
              <p className='text-xs text-gray-500'>Tomorrow, 11:00am</p>
            </div>
            <div className='absolute w-[150px] px-4 py-2 bg-white/50 border border-black/10 top-[10%] backdrop-blur-sm left-3 rounded-xl shadow-md '>
              <h1>Read Book</h1>
              <p className='text-xs text-gray-500'>Daily, 7:30pm</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home