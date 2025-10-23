import { useState, useEffect, useRef } from 'react';
import GradientButton from './GradientButton';

interface TaskInputProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  existingTasks: string[];
}

export default function TaskInput({ value, setValue, onSubmit, existingTasks }: TaskInputProps) {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setError('Task cannot be empty');
      return;
    }
    if (existingTasks.some(task => task.toLowerCase() === trimmedValue.toLowerCase())) {
      setError('Task already exists');
      return;
    }
    setError('');
    await onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="flex gap-2 mb-4">
      <div className="flex-1">
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Tulis tugas..."
          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-describedby={error ? 'task-error' : undefined}
        />
        {error && (
          <p id="task-error" className="text-red-400 text-sm mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
      <GradientButton onClick={handleSubmit}>
        Tambah
      </GradientButton>
    </div>
  );
}
