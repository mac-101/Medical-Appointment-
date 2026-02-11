import React from 'react';

const Community = () => {
  return (
    <section className="py-24 bg-white overflow-hidden mb-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold bg-blue-50 px-4 py-1 rounded-full text-sm">
            Community & Careers
          </span>
          <h2 className="text-4xl font-bold mt-4">Creating Wellness Together</h2>
        </div>

        {/* Alternating Sections */}
        <div className="space-y-25">

          {/* Section 1: Collaborations */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                className="rounded-3xl h-96 w-full object-cover shadow-xs"
                alt="Collab"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold mb-6">Discover Our Collaborations</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Together, we work to enhance health services, promote wellness initiatives,
                and improve the overall well-being of our community. Explore how our
                partnerships drive innovation in care.
              </p>
              <button className="text-blue-600 font-bold border-2 border-blue-100 hover:bg-blue-50 px-8 py-3 rounded-full transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Section 2: Join as a Doctor (THE MIDDLE SECTION) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80"
                className="rounded-3xl h-96 w-full object-cover shadow-xs"
                alt="Doctor Joining"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold mb-6">Are You a Medical Professional?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Join our elite network of doctors and healthcare providers. Help us
                bring high-quality health rights and expert consultations to patients
                worldwide through our advanced digital platform.
              </p>
              <a href="/signUp">
                <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md">
                  Join Us as a Doctor
                </button>
              </a>
            </div>
          </div>

          {/* Section 3: Community Initiatives */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80"
                className="rounded-3xl h-96 w-full object-cover shadow-xs"
                alt="Initiatives"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold mb-6">Explore Our Initiatives</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                From fitness and nutrition programs to mental health and chronic
                disease management, we offer a variety of services to help you
                lead a healthier, happier life.
              </p>
              <button className="text-blue-600 font-bold border-2 border-blue-100 hover:bg-blue-50 px-8 py-3 rounded-full transition-all">
                View Initiatives
              </button>
            </div>
          </div>

        </div>

        {/* Testimonial */}
        {/* <div className="mt-40 bg-gray-50 rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-12">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
            className="w-64 h-80 object-cover rounded-3xl shadow-xl"
            alt="User"
          />
          <div className="flex-1">
            <span className="text-blue-600 font-bold mb-4 block">Our Testimonials</span>
            <blockquote className="text-2xl font-medium text-gray-800 leading-relaxed mb-8 italic">
              "HealTrust has been a lifesaver for me. The ability to consult with a doctor anytime, anywhere has made managing my health so much easier."
            </blockquote>
            <h4 className="text-xl font-bold">John Dayne</h4>
            <p className="text-gray-500">Contractor</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Community;