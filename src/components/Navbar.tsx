"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modal: string) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <nav className="w-full fixed top-0 right-0 flex justify-end bg-transparent px-8 py-4 text-white z-50">
        <div className="flex gap-6 text-lg font-medium">
          <button
            onClick={() => openModal('about')}
            className="hover:underline cursor-pointer"
          >
            About Me
          </button>
          <button
            onClick={() => openModal('projects')}
            className="hover:underline cursor-pointer"
          >
            Projects
          </button>
        </div>
      </nav>

      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>

            {activeModal === 'about' && (
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-4 text-purple-400">About Me</h2>
                <p className="text-gray-300 mb-4">
                  Hi, I'm Muplih 👋 Web Developer & Law Student who builds modern web applications.
                </p>
                <p className="text-gray-400 mb-4">
                  Passionate in technology, UI/UX, and education. Currently learning Next.js and building LMS platform.
                </p>
                <h3 className="text-xl font-semibold mb-2">Skills</h3>
                <div className="flex gap-4 text-3xl mb-4">
                  <span>💻</span>
                  <span>🎨</span>
                  <span>⚡</span>
                  <span>🔧</span>
                  <span>📱</span>
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/ryhannn-ops" className="text-white hover:text-gray-300">GitHub</a>
                  <a href="https://www.linkedin.com/in/muflih-rosyiq-raihan-4b5138297" className="text-white hover:text-gray-300">LinkedIn</a>
                  <a href="https://www.instagram.com/muflihrosyiqraihan" className="text-white hover:text-gray-300">Instagram</a>
                </div>
              </div>
            )}

            {activeModal === 'projects' && (
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-4 text-purple-400">Projects</h2>
                <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-2">To-Do List App</h3>
                  <p className="text-gray-300 mb-4">
                    A simple SPA built using Next.js and TypeScript to manage your daily tasks.
                  </p>
                  <Link
                    href="/todo"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    Open Project
                  </Link>
                </div>
                <p className="text-gray-400 text-sm">More projects coming soon...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
