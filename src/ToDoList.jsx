import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronUp, ChevronDown, CheckCircle2, 
  Circle, LayoutGrid, List, Search, Calendar, 
  User, Github, Atom, Settings
} from 'lucide-react';

const ToDoList = () => {
  // State for Tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks-2026');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for Profile Name
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('user-name-2026') || "Guest User";
  });

  const [newTask, setNewTask] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem('tasks-2026', JSON.stringify(tasks));
    localStorage.setItem('user-name-2026', userName);
  }, [tasks, userName]);

  const addTask = () => {
    if (newTask.trim() !== "") {
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

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const moveTask = (index, direction) => {
    const updatedTasks = [...tasks];
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex >= 0 && nextIndex < tasks.length) {
      [updatedTasks[index], updatedTasks[nextIndex]] = [updatedTasks[nextIndex], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  const filteredTasks = tasks.filter(t => 
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 md:p-8 font-sans pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP BAR / PROFILE SECTION */}
        <div className="flex justify-between items-center mb-12 bg-zinc-900/30 p-4 rounded-3xl border border-zinc-800/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Workspace</p>
              <input 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent border-none focus:ring-0 p-0 text-lg font-semibold text-zinc-200 w-32 cursor-pointer hover:text-white transition-colors"
                title="Click to edit name"
              />
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            <div className="text-center">
              <p className="text-xl font-bold">{tasks.length}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Tasks</p>
            </div>
            <div className="text-center border-l border-zinc-800 pl-8">
              <p className="text-xl font-bold text-indigo-400">{completedCount}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Done</p>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Focus.
            </h1>
            <p className="text-zinc-500 mt-2 font-medium italic">"Simplicity is the ultimate sophistication."</p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800 shadow-2xl">
            <button 
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-xl transition-all ${!isGridView ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-xl transition-all ${isGridView ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </header>

        {/* INPUT AREA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="md:col-span-2 relative group">
            <input
              type="text"
              placeholder="What's the next big thing?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-5 px-6 pl-14 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-lg shadow-inner"
            />
            <Plus className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={22} />
            <button 
              onClick={addTask}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-xl font-bold transition-all active:scale-95 shadow-lg"
            >
              Add
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Filter tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-5 px-6 pl-12 outline-none focus:border-zinc-600 transition-all shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          </div>
        </div>

        {/* GRID/LIST VIEW */}
        <div className={isGridView 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" 
          : "flex flex-col gap-4"
        }>
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`group relative bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-3xl hover:border-indigo-500/30 hover:bg-zinc-900/40 transition-all duration-500 ${task.completed ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <button 
                  onClick={() => toggleComplete(task.id)}
                  className="mt-1 transition-transform active:scale-125"
                >
                  {task.completed ? 
                    <CheckCircle2 className="text-indigo-500" size={24} /> : 
                    <Circle className="text-zinc-700 group-hover:text-zinc-500" size={24} />
                  }
                </button>
                
                <div className="flex-1">
                  <p className={`text-lg font-medium leading-snug tracking-tight ${task.completed ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    <Calendar size={12} />
                    {task.createdAt}
                  </div>
                </div>

                <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveTask(index, 'up')} className="p-1 hover:text-white text-zinc-700"><ChevronUp size={20}/></button>
                  <button onClick={() => moveTask(index, 'down')} className="p-1 hover:text-white text-zinc-700"><ChevronDown size={20}/></button>
                </div>
              </div>

              <div className="mt-6 flex justify-end border-t border-zinc-800/50 pt-4">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://github.com/ABDUL-RAHMAN-9"
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-2 pl-5 rounded-2xl shadow-2xl hover:border-indigo-500/50 transition-all"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] leading-none">Developed by</span>
            <span className="text-sm font-extrabold text-zinc-200 group-hover:text-indigo-400 transition-colors">Abdul Rahman</span>
          </div>
          <div className="relative">
             <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
             <div className="relative bg-zinc-800 p-2 rounded-xl group-hover:bg-indigo-600 transition-colors">
                <Atom size={20} className="text-white animate-[spin_4s_linear_infinite]" />
             </div>
          </div>
        </a>
      </footer>
    </div>
  );
};

export default ToDoList;