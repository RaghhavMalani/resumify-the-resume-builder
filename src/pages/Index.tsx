
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 md:py-12 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
        {/* Resume Preview Image with Animation */}
        <div className={`w-full md:w-1/2 max-w-xl transition-all duration-700 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-resumify-brown to-resumify-beige rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
            <img 
              src="public/lovable-uploads/c6552aa9-8ed4-4cac-8580-8d009d8eab1c.png" 
              alt="Resume Preview" 
              className="relative w-full shadow-lg rounded-md transform group-hover:scale-[1.01] transition duration-500"
            />
          </div>
        </div>
        
        {/* Call to Action with Animation */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <div className="text-left">
            <h2 className={`text-5xl md:text-6xl font-bold text-resumify-beige mb-1 transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Looking</h2>
            <h2 className={`text-5xl md:text-6xl font-bold text-resumify-white mb-1 transition-all duration-700 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>for a new</h2>
            <h2 className={`text-6xl md:text-7xl font-bold text-resumify-white mb-8 transition-all duration-700 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>JOB?</h2>
            <p className={`text-xl md:text-2xl text-resumify-white mb-8 transition-all duration-700 delay-900 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              You'll definitely need a standout Resume!
            </p>
            <div className={`transition-all duration-700 delay-1100 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link 
                to="/templates" 
                className="inline-block px-8 py-4 bg-resumify-brown hover:bg-resumify-brown-dark text-white text-lg font-medium rounded-full transition-colors hover:shadow-lg transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-45 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-[150%]"></span>
                Build Your Own Resume!
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Trusted By Section with Animation */}
      <section className="container mx-auto py-16 px-4">
        <h3 className={`text-center text-xl text-resumify-off-white mb-8 transition-all duration-700 delay-200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Our customers have been hired at:</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {['Microsoft', 'Apple', 'Amazon', 'Pinterest', 'YouTube', 'LinkedIn', 'Twitter'].map((company, index) => (
            <div 
              key={company}
              className={`h-8 opacity-70 hover:opacity-100 transition-opacity duration-300 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-70' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <img src={`https://via.placeholder.com/120x40?text=${company}`} alt={company} className="h-8" />
            </div>
          ))}
        </div>
      </section>

      {/* Expert Crafted Section with Animation */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className={`text-3xl font-bold text-resumify-off-white mb-4 transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Crafted by Experts to design your future</h2>
        <div className={`flex justify-center mt-6 mb-8 transition-all duration-700 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex">
            <span className="text-yellow-400 text-2xl animate-pulse">★★★★★</span>
          </div>
        </div>
        <p className={`text-center text-resumify-off-white transition-all duration-700 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Trusted by professionals</p>
      </section>

      {/* Templates Section with Animation */}
      <section className="container mx-auto py-16 px-4">
        <h2 className={`text-3xl font-bold text-resumify-off-white mb-4 transition-all duration-700 delay-200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Try out our ready to use templates</h2>
        <p className={`text-xl text-resumify-off-white max-w-3xl mb-12 transition-all duration-700 delay-400 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Kickstart your career journey with our expertly designed, ready-to-use templates
          that you can fill with your professional resume in minutes.
          These tools showcase your unique skills and experiences, and get you one step closer to
          landing your dream job!
        </p>
        <div className={`flex justify-center transition-all duration-700 delay-600 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link 
            to="/templates" 
            className="inline-block px-8 py-4 bg-resumify-brown hover:bg-resumify-brown-dark text-white text-lg font-medium rounded-full transition-colors hover:shadow-lg transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-45 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-[150%]"></span>
            Select your ready-to-use template
          </Link>
        </div>
      </section>

      {/* Customer Reviews with Animation */}
      <section className="container mx-auto py-16 px-4">
        <h2 className={`text-3xl font-bold text-resumify-off-white mb-12 text-center transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Customer reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Sarah Johnson', text: "The templates are professionally designed and easy to customize. I landed my dream job within weeks of using this resume!" },
            { name: 'Tony Gonzalez', text: "Seeking a resume makeover, I turned to this site. The process was intuitive and the final result exceeded my expectations." },
            { name: 'Emily R', text: "These resumes helped me stand out in a competitive job market. The designs are modern and professional." },
            { name: 'Rahul Sharma', text: "I received more interview calls after using a template from this site. It really helps in showcasing your skills clearly." }
          ].map((review, index) => (
            <div 
              key={review.name}
              className={`bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-15 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={`https://via.placeholder.com/50?text=${review.name.charAt(0)}`}
                  alt={review.name} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-resumify-beige"
                />
                <h4 className="text-lg font-medium text-resumify-white">{review.name}</h4>
              </div>
              <p className="text-resumify-off-white">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
        <div className={`text-center mt-8 transition-all duration-700 delay-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button className="text-resumify-beige hover:underline hover:text-resumify-white transition-colors duration-300">See more reviews...</button>
        </div>
      </section>

      {/* Decorative triangles with floating animation */}
      <div className="triangle triangle-1"></div>
      <div className="triangle triangle-2"></div>
      <div className="triangle triangle-3"></div>
    </div>
  );
};

export default Index;
