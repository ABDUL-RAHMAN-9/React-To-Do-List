import React, { useState, useEffect } from 'react';
import
{
    Plus,
    Trash2,
    ChevronUp,
    ChevronDown,
    CheckCircle2,
    Circle,
    LayoutGrid,
    List,
    Search,
    Calendar
} from 'lucide-react';

const ToDoList = () =>
{
    // Load tasks from localStorage on initial render
    const [tasks, setTasks] = useState(() =>
    {
        const saved = localStorage.getItem('tasks-2026');
        return saved ? JSON.parse(saved) : [];
    });

    const [newTask, setNewTask] = useState("");
    const [isGridView, setIsGridView] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Save to localStorage whenever tasks change
    useEffect(() =>
    {
        localStorage.setItem('tasks-2026', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () =>
    {
        if (newTask.trim() !== "")
        {
            const taskObj = {
                id: Date.now(),
                text: newTask,
                completed: false,
                createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            };
            setTasks([taskObj, ...tasks]);
            setNewTask("");
        }
    };

    const deleteTask = (id) =>
    {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id) =>
    {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const moveTask = (index, direction) =>
    {
        const updatedTasks = [...tasks];
        const nextIndex = direction === 'up' ? index - 1 : index + 1;
        if (nextIndex >= 0 && nextIndex < tasks.length)
        {
            [updatedTasks[index], updatedTasks[nextIndex]] = [updatedTasks[nextIndex], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const filteredTasks = tasks.filter(t =>
        t.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 md:p-8 font-sans">
            {/* Container */}
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                            Tasks. <span className="text-indigo-500">2026</span>
                        </h1>
                        <p className="text-zinc-500 mt-2 font-medium">Manage your workflow with precision.</p>
                    </div>

                    <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800">
                        <button
                            onClick={() => setIsGridView(false)}
                            className={`p-2 rounded-xl transition-all ${!isGridView ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <List size={20} />
                        </button>
                        <button
                            onClick={() => setIsGridView(true)}
                            className={`p-2 rounded-xl transition-all ${isGridView ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                    </div>
                </header>

                {/* Input & Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="md:col-span-2 relative group">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                            className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-4 px-6 pl-14 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-lg"
                        />
                        <Plus className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={22} />
                        <button
                            onClick={addTask}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold transition-all active:scale-95"
                        >
                            Add
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-4 px-6 pl-12 outline-none focus:border-zinc-600 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                    </div>
                </div>

                {/* Tasks Grid/List */}
                <div className={isGridView
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "flex flex-col gap-3"
                }>
                    {filteredTasks.map((task, index) => (
                        <div
                            key={task.id}
                            className={`group relative bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-600 transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <button
                                    onClick={() => toggleComplete(task.id)}
                                    className="mt-1 transition-colors"
                                >
                                    {task.completed ?
                                        <CheckCircle2 className="text-indigo-500" size={22} /> :
                                        <Circle className="text-zinc-600 group-hover:text-zinc-400" size={22} />
                                    }
                                </button>

                                <div className="flex-1">
                                    <p className={`text-lg font-medium leading-tight ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
                                        {task.text}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3 text-xs text-zinc-500 font-mono">
                                        <Calendar size={12} />
                                        {task.createdAt}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => moveTask(index, 'up')} className="p-1 hover:text-indigo-400 text-zinc-600"><ChevronUp size={18} /></button>
                                    <button onClick={() => moveTask(index, 'down')} className="p-1 hover:text-indigo-400 text-zinc-600"><ChevronDown size={18} /></button>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end border-t border-zinc-800/50 pt-4">
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-zinc-900/50 rounded-full mb-4">
                            <Plus className="text-zinc-700" size={40} />
                        </div>
                        <p className="text-zinc-500 text-lg">No tasks found. Start by adding one above.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToDoList;