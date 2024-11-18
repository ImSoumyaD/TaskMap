import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Task.css'

const Task = (props) => {
    const { title, description, date, time, taskId, status, refreshTask } = props;

    const day = date.substring(0, 2);
    var month = date.substring(3, 5);


    month = getMonth(month);
    function getMonth(month) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[month - 1];
    }

    const [isChecked, setisChecked] = useState(status)

    useEffect(() => {
        setisChecked(status);
    }, [status]);

    async function handleCheck() {
        const response = await axios.post("http://localhost:8080/todo/updateStatus", {
            'id': taskId
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        setisChecked(isChecked => !isChecked)
        setTimeout(() => {
            refreshTask();
        }, 500);
    }

    async function handleDelete(e) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:8080/todo/deletetodo", {
                'id': taskId
            }, { headers: { 'Authorization': `Bearer ${token}` } })
            if (response.status === 200) {
                console.log('Todo deleted succesfully : ', taskId);
            }
            refreshTask();
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <>
            <div id="card" className={` transition-transform duration-200 ease-out bg-white rounded-lg pl-3 py-2 flex items-center  justify-between shadow-sm hover:shadow-lg hover:outline hover:outline-[1px] hover:outline-blue-400 max-w-[60%] shrink-0 ${isChecked ? 'opacity-70' : ''}`}>
                <div className="border-r pr-2 max-w-[90%]">
                    <h1 id={taskId} className={`text-lg ${isChecked ? 'line-through' : ''}`}>{props.title}</h1>
                    <p className="text-sm text-wrap text-stone-500 border-b pb-1.5 break-words line-clamp-4 overflow-y-auto ">{description}</p>
                    <p className="mt-1 text-md text-gray-500 min-w-fit">{day} {month}, <span className="text-gray-400 text-sm dateFont">{props.time}</span>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-around h-full cursor-pointer w-full min-w-12 max-w-[10%] ">
                    {/* Checkbox */}
                    <div id="checkbox"
                        className="relative h-[49%] flex items-center justify-center hover:bg-blue-200/30 w-full group"
                    >
                        {/* Tooltip */}
                        <div
                            className={`absolute bottom-[50%] w-[7vw] text-center left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs py-1 px-2 rounded-2xl transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-[120%] pointer-events-none`}
                        >
                            {isChecked ? 'Undone task' : 'Mark as done'}
                        </div>  

                        <input
                            type="checkbox"
                            id="status"
                            checked={isChecked}
                            onClick={refreshTask}
                            onChange={handleCheck}
                            className="transition-all duration-200 appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-600 hover:border-blue-500"
                        />
                    </div>

                    {/* Divider */}
                    <span className="h-[0.5px] border w-full"></span>

                    {/* Cross Icon */}
                    <div id='delete' onClick={handleDelete} className="transition-all duration-200 hover:bg-red-300/30 h-[49%] w-full flex items-center justify-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="20" fill="rgba(251,76,76,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Task