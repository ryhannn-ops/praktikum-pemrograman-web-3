import Image from "next/image";
import Footer from '../components/Footer';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGithub,
  SiLinkedin,
  SiInstagram,
} from "react-icons/si";

export default function Home() {
  return (
    <div>
    <main id="vanta-bg" className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">

      {/* FOTO */}
      <Image
        src="/profile.png"
        alt="Profile"
        width={120}
        height={120}
        className="rounded-full mb-6 border-4 border-white shadow-lg"
      />

      {/* HERO */}
      <h1 className="text-4xl font-bold mb-2">Hi, I'm Muplih 👋</h1>
      <p className="text-gray-300 text-center max-w-md mb-12">
        Web Developer & Law Student who builds modern web applications.
      </p>

      {/* ABOUT */}
      <h2 className="text-2xl font-semibold mb-2">About Me</h2>
      <p className="text-gray-400 text-center max-w-md mb-12">
        Passionate in technology, UI/UX, and education. Currently learning Next.js and building LMS platform.
      </p>

      {/* SKILLS */}
      <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <div className="flex gap-6 text-4xl mb-16">
          <SiHtml5 size={40} color="#F97316" className="hover:scale-110 transition-transform cursor-pointer" />
          <SiCss3 size={40} color="#2563EB" className="hover:scale-110 transition-transform cursor-pointer" />
          <SiJavascript size={40} color="#FACC15" className="hover:scale-110 transition-transform cursor-pointer" />
          <SiReact size={40} color="#22D3EE" className="hover:scale-110 transition-transform cursor-pointer" />
          <SiNextdotjs size={40} color="#FFFFFF" className="hover:scale-110 transition-transform cursor-pointer" />
          <SiTailwindcss size={40} color="#38BDF8" className="hover:scale-110 transition-transform cursor-pointer" />
        </div>

      {/* CONTACT */}
      <h2 className="text-2xl font-semibold mb-3">Contact</h2>
      <p className="text-gray-400 mb-4">Let's build something together!</p>
      <a
        href="mailto:muflihrosyiqraihan4321@gmail.com"
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 hover:scale-105 transition-all cursor-pointer mb-8"
      >
        Email Me
      </a>

      {/* SOCIAL MEDIA */}
      <div className="flex gap-6 text-3xl">
        <a href="https://github.com/ryhannn-ops" className="hover:scale-110 transition-transform cursor-pointer">
          <SiGithub color="#FFFFFF" />
        </a>
        <a href="https://www.linkedin.com/in/muflih-rosyiq-raihan-4b5138297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

" className="hover:scale-110 transition-transform cursor-pointer">
          <SiLinkedin color="#0077B5" />
        </a>
        <a href="https://www.instagram.com/muflihrosyiqraihan/#" className="hover:scale-110 transition-transform cursor-pointer">
          <SiInstagram color="#E4405F" />
        </a>
        </div>
    </main>
    <Footer />
    </div>
  );
}
