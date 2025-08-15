"use client";

import {
  CurrencyDollarIcon,
  CalculatorIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const features = [
    {
      title: "Track Your Income",
      description: "Easily record and monitor all your income sources in one place.",
      icon: <CurrencyDollarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
    },
    {
      title: "Calculate Tithes",
      description: "Automatically calculate 10% or custom tithes from your income.",
      icon: <CalculatorIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />,
    },
    {
      title: "Stay Organized",
      description: "Keep track of your remaining unspent income efficiently.",
      icon: <ClipboardDocumentCheckIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />,
    },
    {
      title: "Secure & Private",
      description: "Your data is stored safely and only accessible to you.",
      icon: <ShieldCheckIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />,
    },
    {
      title: "Visual Reports",
      description: "View clear graphs and summaries of your income and tithes.",
      icon: <ChartBarIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />,
    },
    {
      title: "Notifications",
      description: "Receive timely reminders for tithes and income tracking.",
      icon: <BellAlertIcon className="h-12 w-12 text-yellow-600 mx-auto mb-4" />,
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
      <button className="group flex items-center px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-blue-700 transition-all duration-300 mb-12">
        Start Tracking
        <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
          ➔
        </span>
      </button>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
