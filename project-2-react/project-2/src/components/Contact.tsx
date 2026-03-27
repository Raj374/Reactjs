function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-black text-white text-center">

      <h2
        className="text-4xl md:text-5xl mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        START TODAY
      </h2>

      <p className="text-gray-400 mb-10 text-lg">
        Join the elite. Transform your potential into reality.
      </p>

      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">

        <form className="flex flex-col gap-4">

          <div className="grid md:grid-cols-2 gap-4">
            
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-xl bg-black border border-gray-700 text-white outline-none focus:border-red-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-xl bg-black border border-gray-700 text-white outline-none focus:border-red-500"
            />

          </div>
          <button
            type="submit"
            className="bg-red-500  py-3 rounded-xl font-semibold mt-4"
          >
            Get Started
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;