import React from 'react'
import { useState } from 'react'

function ToDoList()
{

    // State to hold the list of tasks
    const [tasks, setTasks] = useState([]);
    // State to hold the input value for a new task
    const [newTask, setNewTask] = useState("");

    // Function to handle changes in the input field
    function handleInputChange(event)
    {
        setNewTask(event.target.value); // Update the state with the current value of the input
    }

    // Function to add a new task to the list
    function addTask()
    {
        // Check if the task is non-empty and within the character limit
        if (newTask.trim().length > 0 && newTask.trim().length <= 50)
        {
            setTasks(t => [...t, newTask]); // Add the valid new task to the task list
            setNewTask(""); // Clear the input field
        } else
        {
            alert("Task must be between 1 and 50 characters long!"); // Alert if the input is invalid
        }
    }

    // Function to delete a task from the list
    function deleteTask(index)
    {
        // Create a new array excluding the task at the specified index
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks); // Update the task list
    }

    // Function to move a task up in the list
    function moveTaskUp(index)
    {
        if (index > 0)
        { // Ensure the task is not the first one
            const updatedTasks = [...tasks]; // Create a copy of the task list
            // Swap the current task with the one above it
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks); // Update the task list
        }
    }

    // Function to move a task down in the list
    function moveTaskDown(index)
    {
        if (index < tasks.length - 1)
        { // Ensure the task is not the last one
            const updatedTasks = [...tasks]; // Create a copy of the task list
            // Swap the current task with the one below it
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks); // Update the task list
        }
    }

    return (
        <>
            {/* Main container with center alignment */}
            <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-800">
                {/* Card container for the To-Do List */}
                <div className="flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-3xl w-140 p-8 rounded-2xl shadow-2xl shadow-black ">
                    <h1 className="text-5xl font-bold mb-6 underline">To-Do-List</h1>
                    {/* Input field and Add button */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Enter a task..."
                            value={newTask} // Bind the input value to newTask state
                            onChange={handleInputChange} // Update state on input change
                            maxLength={30} // Limit input length to 30 characters
                            className="border border-gray-300 rounded-lg p-3 shadow-2xl shadow-black text-lg w-72 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <button
                            className="border rounded-lg py-2 px-8 bg-neutral-600 hover:bg-neutral-700 text-white text-lg transition transform hover:scale-105 shadow-md shadow-black"
                            onClick={addTask} // Add a new task on button click
                        >
                            Add
                        </button>
                    </div>

                    {/* Task list */}
                    <ol className="space-y-3">
                        {tasks.map((task, index) => (
                            <li
                                key={index} // Unique key for each task
                                className="bg-neutral-500 text-white p-4 rounded-lg flex justify-between items-center hover:shadow-lg transition shadow-2xl shadow-black"
                            >
                                {/* Display the task */}
                                <span className="text-lg font-medium">{task}</span>
                                <div className="flex gap-2">
                                    {/* Delete button */}
                                    <button
                                        className="text-red-500 hover:text-red-700 transition"
                                        onClick={() => deleteTask(index)} // Delete task on button click
                                    >
                                        Delete
                                    </button>
                                    {/* Move up button */}
                                    <button
                                        className="border rounded-lg py-1 px-4 bg-green-500 hover:bg-green-600 text-white shadow-lg  transition"
                                        onClick={() => moveTaskUp(index)} // Move task up
                                    >
                                        Up
                                    </button>
                                    {/* Move down button */}
                                    <button
                                        className="border rounded-lg py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white shadow-lg  transition"
                                        onClick={() => moveTaskDown(index)} // Move task down
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

export default ToDoList;
