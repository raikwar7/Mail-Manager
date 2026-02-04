function Hero() {
  return (
    <section className="h-[80vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6">
      <h1 className="text-5xl font-extrabold mb-4">
        Build Stunning Landing Pages
      </h1>

      <p className="text-lg max-w-xl mb-6 text-blue-100">
        Simple, fast, and responsive landing pages built using React and Tailwind CSS.
      </p>

      <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition">
        Get Started
      </button>
    </section>
  );
}

export default Hero;
