"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  CalculatorIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const screenshots = [
    { src: "/tithe dashboard.png", alt: "Dashboard Screenshot 1" },
    { src: "/income control.png", alt: "Dashboard Screenshot 2" },
    { src: "/income history0.png", alt: "Dashboard Screenshot 3" },
    { src: "/spending records0.png", alt: "Dashboard Screenshot 4" },
  ];

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 3000); // change image slide every 3s

    return () => clearInterval(timer);
  }, [paused, screenshots.length]);

  const features = [
    {
      title: "Track Your Income",
      description:
        "Easily record and monitor all your income sources in one place.",
      icon: (
        <CurrencyDollarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 transition-transform duration-300" />
      ),
    },
    {
      title: "Calculate Tithes",
      description:
        "Automatically calculate 10% or custom tithes from your income.",
      icon: (
        <CalculatorIcon className="h-12 w-12 text-green-600 mx-auto mb-4 transition-transform duration-300" />
      ),
    },
    {
      title: "Stay Organized",
      description: "Keep track of your remaining unspent income efficiently.",
      icon: (
        <ClipboardDocumentCheckIcon className="h-12 w-12 text-purple-600 mx-auto mb-4 transition-transform duration-300" />
      ),
    },
    {
      title: "Secure & Private",
      description: "Your data is stored safely and only accessible to you.",
      icon: (
        <ShieldCheckIcon className="h-12 w-12 text-red-600 mx-auto mb-4 transition-transform duration-300" />
      ),
    },
    {
      title: "Visual Reports",
      description: "View clear graphs and summaries of your income and tithes.",
      icon: (
        <ChartBarIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4 transition-transform duration-300" />
      ),
    },
    {
      title: "Notifications",
      description: "Receive timely reminders for tithes and income tracking.",
      icon: (
        <BellAlertIcon className="h-12 w-12 text-yellow-600 mx-auto mb-4 transition-transform duration-300" />
      ),
    },
  ];

  const faqs = [
    {
      question: "How do I track my income?",
      answer:
        "Simply add your income entries and the app calculates the tithe automatically.",
    },
    {
      question: "Can I set custom tithe percentages?",
      answer:
        "Yes, you can choose the default 10% or set your own custom percentage.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely! All your data is stored privately and only accessible by you.",
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Entrepreneur",
      feedback:
        "This app has completely changed the way I track my income. It's simple, intuitive, and very reliable!",
    },
    {
      name: "Jane Smith",
      role: "Freelancer",
      feedback:
        "I love how easy it is to calculate my tithes and keep everything organized. Highly recommended!",
    },
    {
      name: "Samuel Brown",
      role: "Small Business Owner",
      feedback:
        "The visual reports and notifications are a game-changer. I can manage my finances without stress.",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center leading-tight">
        Welcome to My Asrat Tracking Website
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-12">
        Track your income and tithes easily, securely, and all in one place.
      </p>

      {/* Button */}
      <button
        onClick={() => setShowModal(true)}
        className="group flex items-center px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-blue-700 transition-all duration-300 mb-12"
      >
        Start Tracking
        <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
          ➔
        </span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-xl font-bold mb-4">Welcome!</h3>
            <p className="text-gray-700 mb-6">
              Do you have an account or are you new here?
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/register"
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
          >
            <div>{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Screenshots Section */}
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">
          See Your Dashboard
        </h2>
        <p className="text-gray-700 text-center mb-8 max-w-2xl">
          Monitor your income, track your tithes, and manage your finances
          easily.
        </p>

        {/* Carousel with auto-slide + pause on hover */}
        <div
          className="relative w-full md:w-3/4 overflow-hidden rounded-xl shadow-xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {screenshots.map((shot, idx) => (
              <img
                key={idx}
                src={shot.src}
                alt={shot.alt}
                className="w-full flex-shrink-0"
              />
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                  current === idx ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col items-center mb-20 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <summary className="cursor-pointer font-semibold">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="flex flex-col items-center mb-16 w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
            >
              <p className="text-gray-700 italic mb-4">
                &quot;{t.feedback}&quot;
              </p>
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Small Donate & CTA Section */}
      <div className="flex flex-col items-center py-1 mb-1 w-full max-w-md bg-purple-50 rounded-2xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-2">
          Support My Asrat Tracking
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          If you find this app useful, consider supporting development.
        </p>
        <div className="flex space-x-4 py-4">
          <button className="px-6 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-all duration-300">
            Donate
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
