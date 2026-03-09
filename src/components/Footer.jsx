import { useState } from "react";

function Footer() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) =>
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${contactForm.name}, your message has been received!`);
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
   <footer className="bg-gray-900/90 border-t border-gray-700 mt-12 animate-fadeIn text-white">
  <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">

    {/* About + Links */}
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white">Vaibhav's Job Portal</h3>
      <p className="text-gray-300">All rights reserved © Vaibhav</p>
      <div className="flex gap-4">
        <a href="#about" className="text-gray-300 hover:text-purple-400 transition">About</a>
        <a href="#help" className="text-gray-300 hover:text-purple-400 transition">Help</a>
        <a href="#contact" className="text-gray-300 hover:text-purple-400 transition">Contact</a>
      </div>
    </div>

    {/* Contact Form */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Contact Me</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={contactForm.name}
          onChange={handleChange}
          className="border border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-gray-800 text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={contactForm.email}
          onChange={handleChange}
          className="border border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-gray-800 text-white"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={contactForm.message}
          onChange={handleChange}
          className="border border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-gray-800 text-white"
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition transform"
        >
          Send
        </button>
      </form>
    </div>

  </div>
</footer>
  );
}

export default Footer;