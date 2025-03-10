import React from 'react'
import { useState } from 'react'

function ToDoList()
{

    const [tasks, setTasks] = useState(["task1", "task2", "task3"]);
    const [newTasks, setNewTask] = useState("");

    function handleInputChange(event)
    {
        setNewTask(event.target.value);
    }

   
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-3xl w-140 p-8 rounded-2xl shadow-2xl shadow-black ">
                    <h1 className="text-5xl font-bold mb-6 underline">To-Do-List</h1>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Enter a task..."
                            value={newTasks}
                            onClick={handleInputChange}
                            className="border border-gray-300 rounded-lg p-3 shadow-2xl shadow-black text-lg w-72 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <button
                            className="border rounded-lg py-2 px-8 bg-neutral-600 hover:bg-neutral-700 text-white text-lg transition transform hover:scale-105 shadow-md shadow-black"
                            onClick={{ addTask }}
                        >
                            Add
                        </button>
                    </div>

                    <ol className="space-y-3">
                        {tasks.map((task, index) => (
                            <li
                                key={index}
                                className="bg-neutral-500 text-white p-4 rounded-lg flex justify-between items-center hover:shadow-lg transition shadow-2xl shadow-black"
                            >
                                <span className="text-lg font-medium">{task}</span>
                                <div className="flex gap-2">
                                    <button
                                        className="text-red-500 hover:text-red-700 transition"
                                        onClick={() => deleteTask(index)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="border rounded-lg py-1 px-4 bg-green-500 hover:bg-green-600 text-white shadow-lg  transition"
                                        onClick={() => moveTaskUp(index)}
                                    >
                                        Up
                                    </button>
                                    <button
                                        className="border rounded-lg py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white shadow-lg  transition"
                                        onClick={() => moveTaskDown(index)}
                                    >
                                        Down
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );

}

export default ToDoList
