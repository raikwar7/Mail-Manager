function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
        Smart Mail Manager
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl max-w-2xl mb-6 text-blue-100">
        Organize, filter, summarize, and manage your emails efficiently with
        AI-powered automation. Connect Gmail securely and take control of your
        inbox like never before.
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
        <span className="bg-white/20 px-4 py-2 rounded-full">
          📩 Fetch Sent & Received Mails
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full">
          🔍 Filter by Sender & Date
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full">
          🤖 AI Email Summaries
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full">
          📊 Mail Dashboard Analytics
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition">
          Get Started
        </button>

        <button className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition">
          View Dashboard
        </button>
      </div>

      {/* Bottom Stats */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h2 className="text-3xl font-bold">20+</h2>
          <p className="text-blue-200 text-sm">Emails Per Fetch</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">100%</h2>
          <p className="text-blue-200 text-sm">Secure OAuth Login</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">AI</h2>
          <p className="text-blue-200 text-sm">Smart Summaries</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">24/7</h2>
          <p className="text-blue-200 text-sm">Mail Access</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;