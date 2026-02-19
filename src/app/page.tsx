"use client";

import { motion } from "framer-motion";
import MessageForm from "@/components/MessageForm";
import { Logo } from "@/components/Logo";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";
import { useState } from "react";

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  const [ lightMode, setLightMode ] = useState<boolean>(false);

  return (
    <main className={`min-h-screen ${lightMode ? "bg-neutral-50 text-gray-800" : "bg-neutral-950 text-neutral-100"} flex items-center justify-center px-6 py-12`}>
      {/* Light/Dark mode toggle */}
      <button
        onClick={() => setLightMode(!lightMode)}
        aria-label="Toggle light/dark mode"
        className="absolute top-6 right-6 p-2 rounded-full bg-neutral-200/50 hover:bg-neutral-300/70 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {lightMode ? (
          <FaMoon className="text-gray-700" size={20} />
        ) : (
          <IoIosSunny className="text-yellow-400" size={20} />
        )}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <div
          className="flex items-center gap-4 mb-8"
          aria-label="Logo and app name"
        >
          <Logo />
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-indigo-600">
            Write a Letter
            <span className="block text-gray-500 mt-2 text-2xl font-light">
              to your future self
            </span>
          </h1>
        </div>

        {/* Form */}
        <div className={`mt-12 border ${lightMode ? "border-gray-200 bg-white shadow-lg" : "border-neutral-800 bg-neutral-900/60"} rounded-2xl p-6 md:p-8 backdrop-blur hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-shadow duration-300`}>
          <MessageForm lightMode={lightMode} />
        </div>

        {/* Landing copy */}
        <section className="mt-24 max-w-2xl mx-auto text-center space-y-6">
  <h2 className="text-2xl font-semibold text-gray-400">
    Why write to your future self?
  </h2>

  <p className="text-gray-600 leading-relaxed">
    Because some thoughts matter more with time.  
    This is a quiet place to say what you hope you’ll remember,
    when you’re ready to hear it.
  </p>

  <p className="text-gray-600 leading-relaxed">
    No ads. No algorithms. Just a message, sealed until the day you choose.
  </p>
</section>

        {/* FAQ section */}
        <section className="mt-20 max-w-2xl mx-auto space-y-10">
  <h3 className="text-xl font-semibold text-gray-400 text-center">
    Questions you might have
  </h3>

  <div className="space-y-6 text-gray-600">
    <div>
      <h4 className="font-medium text-gray-400">
        Will anyone read my message?
      </h4>
      <p>
        No. Your message stays private and is only delivered to the email
        you provide.
      </p>
    </div>

    <div>
      <h4 className="font-medium text-gray-400">
        Can I edit or delete it later?
      </h4>
      <p>
        Not yet — once it’s sent, it’s sealed.  
        Editing and accounts are coming soon.
      </p>
    </div>

    <div>
      <h4 className="font-medium text-gray-400">
        Is this free?
      </h4>
      <p>
        Yes. Completely free. No hidden costs.
      </p>
    </div>

    <div>
      <h4 className="font-medium text-gray-400">
        What happens if I forget?
      </h4>
      <p>
        That’s okay. We won’t forget for you.
      </p>
    </div>
  </div>
</section>

        {/* Footer whisper */}
        <p className="mt-8 text-sm text-neutral-900">
          Delivered exactly when you choose.
        </p>
      <motion.section
          variants={{item}}
          className="mt-16 max-w-xl mx-auto text-center text-gray-600 italic text-sm space-y-2"
          aria-label="User testimonials"
        >
          <p>“Writing to my future self was a beautiful experience.” – Alex P.</p>
          <p>“I love how simple and thoughtful this app is.” – Jamie L.</p>
        </motion.section>
      </motion.div>
    </main>
  );
}
