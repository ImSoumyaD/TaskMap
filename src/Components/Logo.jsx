import React from 'react'
import {Link} from 'react-router-dom'

const Logo = () => {
    return (
        <div className='flex items-center gap-2 absolute top-5 left-28 h-fit w-fit f3 font-semibold cursor-pointer'>
            <div className='bg-white/60 px-2 py-1 rounded-3xl shadow-md border border-gray-400/30'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="30" fill="rgba(60,147,229,1)"><path d="M4 1V4H1V6H4V9H6V6H9V4H6V1H4ZM11 5C11 8.31371 8.31371 11 5 11C4.29873 11 3.62556 10.8797 3 10.6586V20.0066C3 20.5551 3.44694 21 3.99826 21H14V15C14 14.45 14.45 14 15 14H21V3.9985C21 3.44749 20.5552 3 20.0066 3H10.6586C10.8797 3.62556 11 4.29873 11 5ZM21 16L16 20.997V16H21Z"></path></svg></div>
            <Link to='/' className='text-3xl text-blue-500'>TaskMap</Link>
        </div>
    )
}

export default Logo