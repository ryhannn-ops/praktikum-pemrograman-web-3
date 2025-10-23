"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface TaskItemProps {
  id: string | number;
  title: string;
  done: boolean;
  onToggle: (id: string | number) => void;
  onEdit: (id: string | number, newTitle: string) => void;
  onDelete: (id: string | number) => void;
}

export default function TaskItem({
  id,
  title,
  done,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const [isToggled, setIsToggled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(title);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue !== title) {
      onEdit(id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleToggle = () => {
    setIsToggled(true);
    onToggle(id);
    setTimeout(() => setIsToggled(false), 300);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      onDelete(id);
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isToggled ? 1.05 : 1,
        boxShadow: isToggled ? "0 0 20px rgba(168, 85, 247, 0.6)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.95 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={`flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
        done ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={handleToggle}
          className="accent-purple-500 w-5 h-5 cursor-pointer"
          aria-label={`Mark "${title}" as ${done ? "incomplete" : "complete"}`}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 bg-gray-600 text-white px-2 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Edit task title"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={`transition-all duration-300 text-lg cursor-pointer ${
              done ? "line-through text-gray-400" : "text-white"
            }`}
            title="Double-click to edit"
          >
            {title}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onDelete(id)}
          className="text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-125 p-1 rounded"
          aria-label={`Delete task "${title}"`}
        >
          🗑️
        </button>
      </div>
    </motion.li>
  );
}
