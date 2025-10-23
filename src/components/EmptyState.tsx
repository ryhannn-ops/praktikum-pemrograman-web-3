import { motion } from 'framer-motion';
import QuoteRotator from './QuoteRotator';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCta: () => void;
}

export default function EmptyState({ title, subtitle, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-8 border border-purple-500/50 shadow-2xl max-w-md mx-auto"
      role="status"
      aria-live="polite"
    >
      <div
        className="absolute inset-0 rounded-xl opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="relative text-center">
        <div className="text-8xl mb-6 animate-pulse">🌌</div>
        <h2 className="text-2xl font-bold text-purple-400 dark:text-purple-300 mb-3">{title}</h2>
        <p className="text-gray-300 dark:text-gray-400 mb-6 text-lg">{subtitle}</p>
        <button
          onClick={onCta}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {ctaLabel}
        </button>
        <QuoteRotator />
      </div>
    </motion.div>
  );
}
