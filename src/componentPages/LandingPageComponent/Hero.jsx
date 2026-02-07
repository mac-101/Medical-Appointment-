import React, { useState } from 'react';
import FourImage from '../assets/Four.png'; 

function Hero() {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearch = () => {
        if (searchQuery.trim()) {
            // In a real app, this would trigger a search
            console.log('Searching for doctors near:', searchQuery);
            // You would typically make an API call here
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='flex flex-col md:flex-row items-center justify-center w-full min-h-[90vh] p-4 '>
            {/* Left Content Section */}
            <div className='w-full md:w-[50%] h-full  rounded-lg p-6 md:p-8 flex flex-col  '>
                <p className='text-white font-semibold bg-blue-500 w-fit px-2 py-1 rounded-md mb-5'>Trusted & Reliable</p>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>
                    Find Nearest Doctor
                </h1>
                <p className='mt-5 text-gray-600 text-lg'>
                    Easily locate healthcare professionals in your vicinity with our intuitive search feature.
                </p>
                
                {/* Search Input */}
                <div className='mt-7 w-full max-w-md'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input
                            type="text"
                            placeholder="Enter your location or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        <button 
                            onClick={handleSearch}
                            className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium whitespace-nowrap'
                        >
                            Find Doctors
                        </button>
                    </div>
                    <p className='mt-3 text-sm text-gray-500'>
                        Search by location, specialty, or doctor's name
                    </p>
                </div>

                {/* Features/Stats Section */}
                <div className='flex flex-wrap gap-4 w-full mt-6'>
                    <div className='text-center p-3'>
                        <div className='text-2xl font-bold text-blue-600'>500+</div>
                        <div className='text-gray-600 text-sm'>Verified Doctors</div>
                    </div>
                    <div className='text-center p-3'>
                        <div className='text-2xl font-bold text-blue-600'>24/7</div>
                        <div className='text-gray-600 text-sm'>Available</div>
                    </div>
                    <div className='text-center p-3 col-span-2 md:col-span-1'>
                        <div className='text-2xl font-bold text-blue-600'>50+</div>
                        <div className='text-gray-600 text-sm'>Specialties</div>
                    </div>
                </div>
            </div>
            
            {/* Right Image/Illustration Section */}
            <div className='w-full md:w-[50%] h-full  rounded-lg p-5 mt-6 md:mt-0 md:ml-4 flex items-center justify-center '>
                <div className='relative w-full h-full md:h-full'>
                   <img src={FourImage} alt="Hero Illustration" className="w-full h-full object-cover rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default Hero;