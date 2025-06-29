'use client';
import Navbar from "./components/user_components/navbar";
import Map from "./components/user_components/map";
import Footer from "./components/user_components/footer";
import Mobile_Dock from "./components/user_components/mobile_dock";
import Place_Section from "./sections/place_section";

export default function Home() {
  return (
    <>
      <Navbar />
      <Map />
      <Place_Section />
      {/* Banner Section */}
      <section className="relative bg-gradient-to-br from-main/10 to-white py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-main mb-4 drop-shadow-lg">Queue App</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Effortlessly manage queues, services, and customers with a modern, user-friendly platform.
        </p>
        <a href="#features" className="btn bg-main text-white px-8 py-3 rounded-lg shadow hover:bg-main/90 transition-all font-semibold text-lg">Get Started</a>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-main mb-10">Why Choose Queue App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-all">
            <svg className="w-12 h-12 text-main mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
            <h3 className="font-bold text-lg mb-2">Real-Time Queue Management</h3>
            <p className="text-gray-600">Track, update, and manage queues instantly for a seamless customer experience.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-all">
            <svg className="w-12 h-12 text-main mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" /></svg>
            <h3 className="font-bold text-lg mb-2">Multi-Role Access</h3>
            <p className="text-gray-600">Admins, subscribers, and users each get tailored dashboards and controls.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-all">
            <svg className="w-12 h-12 text-main mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            <h3 className="font-bold text-lg mb-2">Analytics & Insights</h3>
            <p className="text-gray-600">Visualize queue statistics and employee performance with beautiful charts.</p>
          </div>
        </div>
      </section>

      {/* Map and Places Section */}
      <section className="container mx-auto py-10 px-4">

      </section>

      {/* Call to Action Section */}
      <section className="bg-main py-12 flex flex-col items-center justify-center text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to streamline your queues?</h2>
        <p className="mb-6 text-lg">Sign up now and experience the future of queue management.</p>
        <a href="/auth/login" className="btn bg-white text-main px-8 py-3 rounded-lg shadow font-semibold text-lg hover:bg-gray-100 transition-all">Get Started</a>
      </section>

      <Footer />
      <Mobile_Dock />
    </>
  );
}
