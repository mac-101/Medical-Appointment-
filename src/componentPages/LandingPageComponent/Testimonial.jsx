import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "I found the perfect cardiologist through this platform. The search filters helped me find exactly what I needed - someone who accepted my insurance and had evening appointments. Life-changing!",
      name: "Robert Chen",
      role: "Patient",
      location: "New York, NY",
      rating: 5,
      treatment: "Cardiac Care"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "As a new parent, finding a pediatrician was overwhelming. This platform made it so easy to compare doctors' credentials, read reviews, and book appointments. We found the perfect pediatrician for our twins!",
      name: "Sarah Johnson",
      role: "Parent",
      location: "Chicago, IL",
      rating: 5,
      treatment: "Pediatric Care"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "After moving to a new city, I needed to find specialists for my chronic condition. The hospital directory helped me identify centers of excellence for my specific needs. Truly invaluable service.",
      name: "Michael Rodriguez",
      role: "Patient",
      location: "Miami, FL",
      rating: 5,
      treatment: "Chronic Condition Management"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "The telemedicine feature saved me during a business trip. I was able to consult with my regular doctor remotely and get my prescription refilled. Modern healthcare at its best!",
      name: "Emma Wilson",
      role: "Business Professional",
      location: "San Francisco, CA",
      rating: 5,
      treatment: "Telemedicine Consultation"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "Finding mental health support was daunting, but this platform connected me with a therapist who specializes in exactly what I needed. The matching system is incredibly accurate.",
      name: "David Park",
      role: "Patient",
      location: "Seattle, WA",
      rating: 5,
      treatment: "Mental Health Therapy"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "The emergency care directory helped me find the nearest trauma center when I needed urgent care. Quick, reliable information when every minute counted.",
      name: "Jennifer Lee",
      role: "Patient",
      location: "Boston, MA",
      rating: 5,
      treatment: "Emergency Care"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "As a senior citizen, I appreciated how easy it was to find Medicare-accepting doctors with experience in geriatric care. The platform understands our needs.",
      name: "Thomas Brown",
      role: "Senior Patient",
      location: "Phoenix, AZ",
      rating: 5,
      treatment: "Geriatric Care"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      quote: "Finding a specialist for my rare condition was nearly impossible until I used this platform. They connected me with the right expert in just two days.",
      name: "Alexandra Smith",
      role: "Patient",
      location: "Denver, CO",
      rating: 5,
      treatment: "Specialist Care"
    }
  ];

  return (
    <section className="text-gray-800 body-font bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-5 py-24 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Patient Success Stories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Real experiences from people who found the right healthcare through our platform
          </p>
          <div className="flex justify-center items-center">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-3 text-gray-700 font-medium">4.9/5 from 2,500+ reviews</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Scroll Container */}
          <div className="flex overflow-x-auto scrollbar-hide pb-8 -mx-4 px-4  ">
            <div className="flex space-x-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="shrink-0 w-96 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="p-8">
                    {/* Rating Stars */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative mb-8">
                      <svg 
                        className="absolute -top-2 -left-2 w-8 h-8 text-blue-100 opacity-50" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="leading-relaxed text-gray-700 italic pl-4">{testimonial.quote}</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center">
                      <img 
                        alt={testimonial.name} 
                        className="w-16 h-16 object-cover object-center rounded-full border-2 border-blue-100 bg-blue-50 p-1"
                        src={testimonial.image}
                      />
                      <div className="ml-4">
                        <h2 className="text-gray-900 font-medium title-font tracking-wider text-lg">
                          {testimonial.name}
                        </h2>
                        <div className="flex items-center text-gray-600 text-sm mb-1">
                          <span>{testimonial.role}</span>
                          <span className="mx-2">•</span>
                          <span>{testimonial.location}</span>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          {testimonial.treatment}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Line */}
                    <div className="w-16 h-1 bg-linear-to-r from-blue-500 to-teal-400 rounded-full mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Hint (Optional) */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              Scroll to see more testimonials
            </p>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-6 items-center justify-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Share Your Healthcare Journey
              </h3>
              <p className="text-gray-600">
                Your experience can help others find the right care
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Share Your Story
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 border border-blue-600 transition-colors duration-300">
                Find a Doctor
              </button>
            </div>
          </div>
        </div> */}

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">25,000+</div>
            <div className="text-gray-600">Patients Helped</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">5,000+</div>
            <div className="text-gray-600">Doctors Listed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">1,200+</div>
            <div className="text-gray-600">Hospitals & Clinics</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide utility - add to your global CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Testimonials