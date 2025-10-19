import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'To-Do List - Manage Your Tasks',
  description: 'Organize your daily tasks with our beautiful and intuitive to-do list app. Track progress, categorize tasks, and boost your productivity.',
  openGraph: {
    title: 'To-Do List - Manage Your Tasks',
    description: 'Organize your daily tasks with our beautiful and intuitive to-do list app. Track progress, categorize tasks, and boost your productivity.',
    type: 'website',
  },
  themeColor: '#9333ea',
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
