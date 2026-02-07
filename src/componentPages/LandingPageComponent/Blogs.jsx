import React from 'react'
import OneImage from '../assets/One.png'
import TwoImage from '../assets/Two.png'
import ThreeImage from '../assets/Three.png'
import FourImage from '../assets/Four.png'
import FiveImage from '../assets/Five.png'
import SixImage from '../assets/Six.png'
import { useState } from "react";

const slides = [
  "Slide 1",
  "Slide 2",
  "Slide 3",
];

const blogPosts = [
  {
    id: 1,
    image: OneImage,
    category: "Doctor Selection",
    title: "How to Choose the Right Doctor",
    description: "Find the perfect healthcare provider based on specialty, experience, and patient reviews.",
    readTime: "5 min read"
  },
  {
    id: 2,
    image: TwoImage,
    category: "Hospital Guide",
    title: "Selecting the Best Hospital",
    description: "Key factors to consider when choosing a hospital for your treatment.",
    readTime: "7 min read"
  },
  {
    id: 3,
    image: ThreeImage,
    category: "Telemedicine",
    title: "Virtual Healthcare Guide",
    description: "How to find and evaluate online doctors and telemedicine services.",
    readTime: "6 min read"
  },
  {
    id: 4,
    image: FourImage,
    category: "Pediatrics",
    title: "Finding Pediatric Specialists",
    description: "Tips for selecting the best pediatrician for your child's needs.",
    readTime: "8 min read"
  },
  {
    id: 5,
    image: FiveImage,
    category: "Specialists",
    title: "When to See a Specialist",
    description: "Guide to finding top specialists in various medical fields.",
    readTime: "9 min read"
  },
  {
    id: 6,
    image: SixImage,
    category: "Mental Health",
    title: "Mental Health Professionals",
    description: "Finding the right therapist or counselor for mental wellness.",
    readTime: "7 min read"
  },
  // {
  //   id: 7,
  //   image: "https://images.unsplash.com/photo-1576671413321-eb4104f79a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  //   category: "Insurance",
  //   title: "Insurance Network Guide",
  //   description: "How to find in-network doctors and understand your coverage.",
  //   readTime: "10 min read"
  // },
  // {
  //   id: 8,
  //   image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  //   category: "Emergency Care",
  //   title: "ER vs Urgent Care Guide",
  //   description: "Understanding when to visit different healthcare facilities.",
  //   readTime: "6 min read"
  // }
];

const Blogs = () => {
   const [index, setIndex] = useState(0);

const next = () => {
  setIndex((prev) =>
    prev < blogPosts.length - 1 ? prev + 1 : prev
  );
};

const prev = () => {
  setIndex((prev) => (prev > 0 ? prev - 1 : prev));
};

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Healthcare Guides & Resources
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert advice on finding doctors, hospitals, and healthcare services
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Scroll Container */}
          <div className="flex overflow-x-auto scrollbar-hide pb-8 -mx-4 px-4">
            <div className="flex space-x-6">
              {blogPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                          <path d="M13 7h-2v6h6v-2h-4z"/>
                        </svg>
                        {post.readTime}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center group">
                        Read Guide
                        <svg 
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators (Optional) */}
          <div className="hidden md:block">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
              <button  onClick={next} className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
              <button onClick={prev} className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        {/* <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4].map((dot) => (
            <div 
              key={dot} 
              className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div> */}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Need Help Finding a Doctor?
              </h3>
              <p className="text-gray-600">
                Use our advanced search tool to find healthcare providers near you
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Find Doctors
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 border border-blue-600 transition-colors duration-300">
                Browse Hospitals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide utility - add to your global CSS if needed */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Blogs