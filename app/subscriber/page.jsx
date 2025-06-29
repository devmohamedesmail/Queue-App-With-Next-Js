import Link from 'next/link'
import React from 'react'
import { FaRegSmileBeam, FaRegClock, FaRegListAlt } from 'react-icons/fa';

function Home_Subscriber() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-main/5 to-yellow-50 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl flex flex-col items-center border border-main/10">
        <FaRegSmileBeam className="text-main text-5xl mb-4 animate-bounce" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-main mb-2 text-center drop-shadow">Welcome, Subscriber!</h1>
        <p className="text-gray-600 text-center mb-6 max-w-lg">
          Manage your queues, view your waiting times, and enjoy a seamless experience with our smart queue system.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Link href="/user/queues" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-main text-white font-bold text-lg shadow hover:bg-main/90 transition">
            <FaRegListAlt className="text-2xl" />
            My Queues
          </Link>
          <Link href="/user/waiting" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-yellow-400 text-main font-bold text-lg shadow hover:bg-yellow-300 transition">
            <FaRegClock className="text-2xl" />
            Waiting Room
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home_Subscriber