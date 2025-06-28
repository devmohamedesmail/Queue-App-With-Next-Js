import Image from 'next/image'
import React from 'react'

export default function Banner() {
  return (
    <div className="relative w-full h-60 md:h-96 flex items-center justify-center overflow-hidden rounded-xl shadow-lg my-6">
      <Image
        src="/images/banner.jpg"
        alt="Queue App Banner"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          {`Welcome to QueueApp`}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-6 max-w-2xl mx-auto">
          {`Manage your queues efficiently, reduce wait times, and enhance customer satisfaction.`}
        </p>
        <a
          href="#get-started"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}
