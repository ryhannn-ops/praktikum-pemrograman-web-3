
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import EmptyState from "@/components/EmptyState";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import NoTasksSEO from "@/components/NoTasksSEO";
import { useTodoStore, TaskBucket, Task } from "@/lib/store";
import { useToast } from "@/hooks/useToast";

export default function TodoPage() {
  const { tasks, addTask, toggleTask, editTask, deleteTask, getTasksByBucket } = useTodoStore();
  const { addToast } = useToast();
  const [input, setInput] = useState("");
  const [selectedBucket, setSelectedBucket] = useState<TaskBucket>('today');

  const handleAddTask = async () => {
    if (!input.trim()) return;
    addTask(input, selectedBucket);
    addToast({
      type: 'success',
      message: `Task "${input.trim()}" added to ${selectedBucket}`,
    });
    setInput("");
  };

  const filteredTasks = getTasksByBucket(selectedBucket);

  const completedTasks = filteredTasks.filter(t => t.done).length;
  const totalTasks = filteredTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <>
      <NoTasksSEO hasTasks={tasks.length > 0} />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white flex flex-col items-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <Navbar />
        <h1 className="text-3xl font-bold text-purple-400 mb-6 drop-shadow-lg">To-Do List</h1>

      {totalTasks > 0 && (
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Progress</span>
            <span>{completedTasks}/{totalTasks} completed</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white/10 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
        {/* Bucket selector */}
        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            {(['today', 'tomorrow', 'next7days'] as TaskBucket[]).map((bucket) => (
              <button
                key={bucket}
                onClick={() => setSelectedBucket(bucket)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedBucket === bucket
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {bucket === 'today' ? 'Today' : bucket === 'tomorrow' ? 'Tomorrow' : 'Next 7 Days'}
              </button>
            ))}
          </div>
        </div>

        <TaskInput
          value={input}
          setValue={setInput}
          onSubmit={handleAddTask}
          existingTasks={filteredTasks.map(t => t.title)}
        />

        {filteredTasks.length === 0 ? (
          <EmptyState
            title="🌌 Waktunya meluncurkan misi produktivitasmu hari ini!"
            subtitle="Galaksi tugas menunggu untuk dijelajahi—mulai dari sini!"
            ctaLabel="Tambah Tugas Pertama"
            onCta={() => document.querySelector('input')?.focus()}
          />
        ) : (
          <motion.ul className="space-y-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <AnimatePresence>
              {filteredTasks.map((t) => (
                <TaskItem
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  done={t.done}
                  onToggle={(id) => {
                    toggleTask(id);
                    addToast({
                      type: 'info',
                      message: `Task "${t.title}" ${t.done ? 'marked incomplete' : 'completed'}`,
                    });
                  }}
                  onEdit={(id, newTitle) => {
                    editTask(id, newTitle);
                    addToast({
                      type: 'success',
                      message: `Task updated to "${newTitle}"`,
                    });
                  }}
                  onDelete={(id) => {
                    const taskToDelete = tasks.find(task => task.id === id.toString());
                    deleteTask(id);
                    addToast({
                      type: 'error',
                      message: `Task "${taskToDelete?.title}" deleted`,
                      action: {
                        label: 'Undo',
                        onClick: () => {
                          if (taskToDelete) {
                            addTask(taskToDelete.title, taskToDelete.bucket);
                          }
                        },
                      },
                      duration: 4000,
                    });
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </main>
    </>
  );
}
