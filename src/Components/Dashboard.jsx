import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./DashBoard.css";
import Task from './Task'
import axios from 'axios'
import { format } from 'date-fns';


const Dashboard = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate();
  const date = Date.now;

  // Check token expiry
  function isTokenExpired(token) {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      console.log('session expired');
      return true;
    }
    return false;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      var token = localStorage.getItem('token');
      if (isTokenExpired(token) || !token) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.setItem('loggedin', 'false');
        alert("Your session expired. Please login again")
        navigate('/login');
      }
    }, 2000);
    setUsername(localStorage.getItem('username'));
    return () => clearInterval(interval);
  }, [navigate]);

  //fetch todos
  const [allTodos, setAllTodos] = useState([])
  const [pending, setPending] = useState([])
  const [completed, setCompleted] = useState([])
  async function getTodos() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return; // Don't make the request if there's no token

      const response = await axios.get("http://localhost:8080/todo/my-todo", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log(response.data); // Success
      setAllTodos(response.data);

      const pendingTodos = response.data.filter((todo) => !todo.status);
      const completedTodos = response.data.filter((todo) => todo.status);

      setPending(pendingTodos);
      setCompleted(completedTodos);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchTodos = async () => {
      await getTodos();
    };
    fetchTodos();
  }, []);

  //logout
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.setItem('loggedin', 'false');
    navigate('/')
  }

  //input date and time
  const [startDate, setStartDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (date) => {
    setStartDate(date);
  };

  function handleDescription(e) {
    setDescription(e.target.value);
  }
  function handleTask(e) {
    setTask(e.target.value);
  }
  //addtask section
  const [addTaskSec, setaddTaskSec] = useState(false)
  const [btnValue, setBtnValue] = useState('New Task')
  
  function handleAddSection(e) {
    setaddTaskSec(!addTaskSec);
    if(addTaskSec === true){
      setBtnValue('New Task')
    }  
    else{
      setBtnValue('Close')
    }  
  }

  //add task
  async function handleAddTask(e) {
    e.preventDefault();
    const formattedDate = format(startDate, 'dd-MM-yyyy');
    const formattedTime = format(startDate, 'hh:mm:ss a');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8080/todo/add-todo", {
        'task': task,
        'description': description,
        'date': formattedDate,
        'time': formattedTime
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.status === 200) {
        console.log(response.data);
        setDescription('');
        setTask('');
        setStartDate(new Date());
        getTodos();
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <>
      <>
        <div className='h-screen w-full flex justify-between overflow-hidden fixed -z-10'>
          <div className='bg-blue-500/50 h-[90%] w-[65%] blur-3xl redbg'></div>
          <div className='bg-teal-500/40 h-[60%] w-[40%] blur-3xl mt-auto translate-x-[150%] -translate-y-20 absolute'></div>
          <div className='bg-purple-500/40 h-[60%] w-[40%] blur-3xl mt-auto translate-x-7 translate-y-7'></div>
        </div>
        <div className='min-h-screen w-full bg-zinc-500/10 flex items-center justify-center f1'>
          <div className='min-h-screen w-full rounded-xl py-[1vw] px-[3vw] max-w-screen-2xl'>
            <div id='font' className='flex items-center justify-between backdrop-blur-xl drop-shadow-lg shadow-sm bg-white/30 rounded-2xl border border-gray-300/90 px-5 py-2'>
              <h1 className='text-2xl'>Hello, {username} 👋</h1>
              <button onClick={handleLogout} className='text-md bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 ease-in-out hover:shadow-md'>Logout</button>
            </div>
            <div className='bg-sky-200/40 backdrop-blur-2xl min-h-[80vh] mt-4 rounded-xl px-6 py-3 flex flex-col gap-3 border border-white/50 shadow-md '>
              <div className='border-b-[1px] border-white/60 pb-2'>
                <div className='flex justify-between items-center'>
                  <h1 id='font' className='text-xl'>Pending list <span className='text-sm text-white bg-[#0056f5c9] px-2 rounded-full'>{pending.length}</span></h1>
                  <button onClick={handleAddSection} className={`bg-blue-100 text-blue-600 px-4 py-2 mb-1 text-center rounded-xl transition-all duration-300 ease-in-out hover:shadow-md ${addTaskSec ? 'bg-red-100 text-rose-600 hover:bg-white ' : ' hover:bg-white'}`}>{btnValue}</button>
                </div>
                {/* add task */}
                <div className={` bg-blue-300/10 backdrop-blur-2xl  rounded-xl px-5 flex justify-around items-center shadow-md  drop-shadow-md  ${addTaskSec ? 'h-40 opacity-100 border border-white/40' : 'h-0 overflow-hidden opacity-0'} transition-[height,opacity] duration-200 ease-in-out`}>
                  <form className='flex items-center justify-around w-full mt-3 mb-3' onSubmit={handleAddTask} >
                    <div className='flex flex-col gap-3 items-center w-[55%]'>
                      <input value={task} onChange={handleTask} type="text" id="" required placeholder='Task' className=' w-full rounded-lg px-2 text-lg py-1 border focus:outline-none focus:border-blue-500 hover:border-blue-500' />
                      <textarea value={description} onChange={handleDescription} id="description" placeholder='Task description' rows={3} className=' resize-none overflow-x-auto w-full rounded-lg px-2 py-1 focus:outline-none border focus:border-blue-500 hover:border-blue-500'></textarea>
                    </div>
                    <div className='flex flex-col justify-between gap-3 z-10'>
                      {/* <input type="date" id="" className='focus:outline-none border focus:border-blue-400 rounded-lg px-2 py-1' placeholder={currentDate} />
                      <input type="time" id="" className='focus:outline-none border focus:border-blue-400 rounded-lg px-2 py-1' /> */}
                      <DatePicker
                        className='focus:outline-none border rounded-xl  focus:border-blue-400 px-3 py-1 hover:border-blue-500'
                        selected={startDate}
                        onChange={handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                      />
                    </div>
                    <button type='submit' className='bg-blue-600 px-3 py-2 rounded-lg text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-colors duration-300 ease-in-out'>Add task</button>
                  </form>
                </div>
              </div>
              {/* pending list */}
              <div className='flex gap-4 flex-wrap -z-[1] mt-5'>
                {pending.length === 0 ? (
                  <div className='flex justify-center items-center w-full'>
                    <h2 className='text-lg font'>No pending todos</h2>
                  </div>
                ) : (
                  pending.map((todo, index) => (

                    <Task key={todo.id} description={todo.description} title={todo.task} date={todo.date} time={todo.time} taskId={todo.id} status={todo.status} refreshTask={getTodos} />
                  ))
                )}
              </div>
            </div>
            {/* completed list */}
            <div className='bg-emerald-200/50 backdrop-blur-2xl min-h-full mt-4 rounded-xl px-6 py-6 flex flex-col gap-5 -z-10 border border-white/50'>
              <h1 id='font' className='text-xl border-b-[1px] border-gray-400/40 pb-2'>Completed list</h1>
              <div className='flex flex-wrap gap-4'>
                {completed.length === 0 ? (
                  <div className='flex justify-center items-center w-full'>
                    <h2 className='font text-lg'>No completed todos</h2>
                  </div>
                ) : (
                  completed.map((todo, index) => (
                    <Task key={todo.id} description={todo.description} title={todo.task} date={todo.date} time={todo.time} taskId={todo.id} status={todo.status} refreshTask={getTodos} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
};

export default Dashboard;