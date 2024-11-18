import React, { useState } from 'react'
import Logo from './Logo'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const navigate = useNavigate()

    //handle inputs------------
    function handleFname(e) {
        setfname(e.target.value)
    }
    function handleLname(e) {
        setlname(e.target.value)
    }
    function handleEmail(e) {
        setemail(e.target.value)
    }
    function handlePassword(e) {
        setpassword(e.target.value)
    }
    //inputs end--------

    //signup-------
    const [errmassage, setErrmassage] = useState('')
    const [successmsg, setSuccessmsg] = useState('')
    async function handleSignup(e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/signup", {
                'firstname': fname,
                'lastname': lname,
                'email': email,
                'password': password
            }, { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                setErrmassage('');
                setSuccessmsg('Registration successful! redirecting to login..')
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            setSuccessmsg('');
            if (err.status === 500) {
                setErrmassage('email already exist in our database..');
                setemail('')
            }
            console.error("Error:", err.response ? err.response.data : err.message);
        }
    }



    return (
        <div className='h-screen w-full p-4 flex flex-col justify-center items-center overflow-hidden relative'>
            <div className='-z-50 h-[100vh] w-screen overflow-hidden flex absolute shrink-0' >
                <div className='bg-purple-300/30 h-[95vw] w-[100vh] rounded-full transform -translate-y-72 blur-3xl'></div>
                <div className='bg-blue-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-32 -translate-y-36  blur-3xl  top-0 right-0 absolute'></div>
                <div className='bg-emerald-300/30 h-[40vw] w-[60vw] rounded-full transform translate-x-12 translate-y-72  blur-3xl absolute  right-0 bottom-0'></div>
            </div>
            <Logo />

            {/* registration form */}
            <div className='bg-blue-400/20 h-fit w-[35vw] text-center absolute flex flex-col items-center justify-evenly gap-4 py-5 rounded-xl backdrop-blur-xl shadow-xl border border-white/60 z-10 f1'>
                <h1 id='font' className='text-2xl'>Welcome {fname}</h1>
                <form onSubmit={handleSignup} className='flex flex-col gap-4 w-full items-center h-fit'>
                    <input type="text"
                        value={fname}
                        onChange={handleFname}
                        placeholder='First name' required className={`w-4/5 placeholder:opacity-55 text-lg p-2 rounded-xl border border-green-300/30 focus:border-blue-400 focus:outline-none`} />
                    <input type="text"
                        value={lname}
                        onChange={handleLname}
                        placeholder='Last name' required className={`w-4/5 placeholder:opacity-55 text-lg p-2 rounded-xl border border-green-300/30 focus:border-blue-400 focus:outline-none`} />
                    <input type="email"
                        value={email}
                        onChange={handleEmail}
                        placeholder='email@gmail.com' required className={`placeholder:opacity-55 w-4/5 text-lg p-2 rounded-xl border border-green-300/30 focus:border-blue-400 focus:outline-none`} />
                    <input type="text"
                        value={password}
                        onChange={handlePassword}
                        placeholder='password' required className={`w-4/5 placeholder:opacity-55 text-lg p-2 rounded-xl border border-green-300/30 focus:border-blue-400 focus:outline-none`} />
                    <div className='flex gap-4'>
                        <Link to='/' className='text-xl w-fir bg-white/70 text-gray-600 rounded-xl drop-shadow-sm px-5 py-2 border border-zinc-400/20  hover:bg-gray-100 hover:text-black  hover:border-zinc-700/60 transition-all duration-300 ease-in-out hover:drop-shadow-lg'>Back</Link>
                        <button type="submit" className='text-xl w-fir bg-blue-300 rounded-xl drop-shadow-sm px-5 py-2 border border-zinc-400/20  focus:outline-none hover:bg-blue-400  hover:border-zinc-700/60 transition-all duration-300 ease-in-out hover:drop-shadow-lg'>Register</button>
                    </div>
                    {(errmassage || successmsg) && (<p className={`w-4/5 py-1 rounded-xl ${errmassage ? 'bg-red-100 text-rose-500' : 'bg-emerald-100 text-green-500'}`}>{errmassage || successmsg}</p>)}
                    <div className='flex gap-1 items-center'>
                        <p className='text-sm text-gray-500'>Already have an account? </p><Link to='/login' className='text-blue-600 underline'> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register