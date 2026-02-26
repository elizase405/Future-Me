"use client";

import { useEffect, useState } from "react";

export default function MessageForm( {lightMode}: {lightMode: boolean} ) {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);

    const form = e.currentTarget
    const formData = new FormData(form);

    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
      email: formData.get("email"),
      message: formData.get("message"),
      deliverAt: formData.get("deliverAt"),
      theme: formData.get("theme") || "gentle",
    }),

      headers: { "Content-type": "application/json" }
    });

    if (res.ok) {
      setSuccess(true);
      form.reset()
      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  }
 useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
      {success ? (
  <div
    role="status"
    className="text-center mt-12 text-indigo-400"
    aria-live="polite"
  >
    <h2 className="text-2xl font-semibold mb-4">
      The future’s unclear — but your message is sent. 🌫️
    </h2>
    <p className="text-neutral-300 max-w-md mx-auto">
      Sometimes, that’s enough for now.
    </p>
  </div>
) : (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-4 md:mt-8 space-y-5 md:space-y-6">
      <textarea
  name="message"
  required
  placeholder="Hi dear future me, I hope you're doing well..."
  className={`text-sm md:text-base lg:text-lg w-full h-56 md:h-70 bg-transparent border border-neutral-700 rounded-xl p-3 md:p-4 ${lightMode ? "text-neutral-900" : "text-neutral-100"} placeholder-gray-500 focus:outline-none focus:border-neutral-500 transition-all duration-300 hover:scale-[1.01]`}
 />


      <p className="text-xs md:text-base lg:text-lg text-[#8a857d]">
        Say anything. Only your future self will read this.
      </p>
<input
  type="email"
  name="email"
  placeholder="Email"
  className={`text-sm md:text-base lg:text-lg w-full bg-transparent border border-neutral-700 rounded-xl p-3 ${lightMode ? "text-neutral-900" : "text-neutral-100"} focus:outline-none focus:border-neutral-500 transition-all duration-300 hover:scale-[1.01]`}
  required
/>

<input
  type="date"
  name="deliverAt"
  className={`text-sm md:text-base lg:text-lg w-full bg-transparent border border-neutral-700 rounded-xl p-3 ${lightMode ? "text-neutral-900 scheme-light" : "text-neutral-100 scheme-dark"} outline-none focus:border-neutral-500 transition-all duration-300 hover:scale-[1.01]`}
  required
/>

<div className="flex items-center justify-center gap-2 text-xs md:text-sm text-neutral-400">
  {["gentle", "celebratory", "reflective"].map((t) => (
    <label
      key={t}
      className={`w-4/5 text-center py-1 px-2 rounded-full border border-neutral-700 cursor-pointer transition hover:border-neutral-500 ${ lightMode ? "has-[:checked]:border-blue-800 has-[:checked]:text-black" : "has-[:checked]:border-blue-500 has-[:checked]:text-white"}`}
    >
      <input
        type="radio"
        name="theme"
        value={t}
        defaultChecked={t === "gentle"}
        className="hidden"
      />
      {t}
    </label>
  ))}
</div>

<button
  type="submit"
  disabled={loading}
  className={`
    text-sm md:text-base w-full mt-2 rounded-xl font-medium py-3
    bg-gradient-to-r from-slate-600 via-indigo-700 to-slate-800
    text-white
    transition
    cursor-pointer
    ${loading ? "animate-pulse opacity-70 cursor-wait" : "hover:brightness-110"}
  `}
>
  {loading ? "Sending..." : "Send it forward"}
</button>

      {success && (
        <p className="text-green-600 text-center">Check your email to verify ❤️</p>
      )}
  </form>
      )}
    </>
  );
}