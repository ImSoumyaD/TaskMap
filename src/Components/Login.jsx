import React, { useState } from 'react'
import Logo from './Logo'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    //handle input
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    //handle login
    const [errMassage, setErrMassage] = useState('')

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/signin", {
                'email': email,
                'password': password
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
            console.log(response.data);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.name)
                localStorage.setItem('loggedin', 'true')
                navigate('/dashboard')
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            setErrMassage(error.message);
        }
    }


    return (
        <>
            <div className='h-screen w-full p-4 flex flex-col justify-center items-center overflow-hidden relative'>
                <div className='-z-50 h-[100vh] w-screen overflow-hidden flex absolute shrink-0' >
                    <div className='bg-purple-300/30 h-[95vw] w-[100vh] rounded-full transform -translate-y-72 blur-3xl'></div>
                    <div className='bg-blue-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-32 -translate-y-36  blur-3xl  top-0 right-0 absolute'></div>
                    <div className='bg-emerald-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-12 translate-y-72  blur-3xl absolute  right-0 bottom-0'></div>
                </div>
                <Logo />

                <div className='bg-blue-400/20 h-fit w-[30vw] text-center absolute flex flex-col items-center gap-10 py-10 rounded-xl backdrop-blur-xl shadow-xl border border-white/60 z-10 f1'>
                    <h1 id='font' className='text-3xl'>Welcome back</h1>
                    <form onSubmit={handleLogin} className='flex flex-col gap-5 w-full items-center h-fit'>
                        <input type="email"
                            value={email}
                            onChange={handleEmail}
                            placeholder='email@gmail.com' required className={`w-4/5 text-lg p-3 rounded-xl border border-green-300/30 focus:border-blue-400 focus:outline-none ${errMassage ? 'border-[1px] border-red-400' : ''}`} />
                        <input type="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder='password' required className={`w-4/5 text-lg p-3 rounded-xl border border-green-300/30 focus:border-blue-400 focus:outline-none ${errMassage ? 'border-[1px] border-red-400' : ''}`} />
                        <div className='flex gap-4'>
                            <Link to='/' className='text-xl w-fir bg-gray-100 text-gray-600 rounded-xl drop-shadow-sm px-5 py-2 border border-zinc-400/20  hover:bg-white hover:text-black  hover:border-zinc-700/60 transition-all duration-300 ease-in-out hover:drop-shadow-lg'>Back</Link>
                            <button type="submit" className='text-xl w-fir bg-blue-300 rounded-xl drop-shadow-sm px-5 py-2 border border-zinc-400/20  hover:bg-blue-400  hover:border-zinc-700/60 transition-all duration-300 ease-in-out hover:drop-shadow-lg'>Log in</button>
                        </div>
                        {errMassage && <p className='bg-red-100 w-[80%] py-1 rounded-xl text-rose-600'>{errMassage}</p>}
                        <div className='flex gap-1 items-center'>
                            <p className='text-sm text-gray-500'>Don't have an account? </p><Link to='/register' className='text-blue-600 underline'> Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login