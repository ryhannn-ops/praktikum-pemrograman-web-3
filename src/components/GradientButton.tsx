"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
}

export default function GradientButton({ children, onClick, disabled = false, className = '' }: GradientButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
      whileTap={{ scale: 0.97 }}
      className={`px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
