
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 md:py-12 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
        {/* Resume Preview Image */}
        <div className="w-full md:w-1/2 max-w-xl">
          <img 
            src="public/lovable-uploads/c6552aa9-8ed4-4cac-8580-8d009d8eab1c.png" 
            alt="Resume Preview" 
            className="w-full shadow-lg rounded-md"
          />
        </div>
        
        {/* Call to Action */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <div className="text-left">
            <h2 className="text-5xl md:text-6xl font-bold text-resumify-beige mb-1">Looking</h2>
            <h2 className="text-5xl md:text-6xl font-bold text-resumify-white mb-1">for a new</h2>
            <h2 className="text-6xl md:text-7xl font-bold text-resumify-white mb-8">JOB?</h2>
            <p className="text-xl md:text-2xl text-resumify-white mb-8">
              You'll definitely need a standout Resume!
            </p>
            <Link 
              to="/templates" 
              className="inline-block px-8 py-4 bg-resumify-brown hover:bg-resumify-brown-dark text-white text-lg font-medium rounded-full transition-colors"
            >
              Build Your Own Resume!
            </Link>
          </div>
        </div>
      </main>

      {/* Trusted By Section */}
      <section className="container mx-auto py-16 px-4">
        <h3 className="text-center text-xl text-resumify-off-white mb-8">Our customers have been hired at:</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <img src="https://via.placeholder.com/120x40" alt="Microsoft" className="h-8 opacity-70" />
          <img src="https://via.placeholder.com/120x40" alt="Apple" className="h-8 opacity-70" />
          <img src="https://via.placeholder.com/120x40" alt="Amazon" className="h-8 opacity-70" />
          <img src="https://via.placeholder.com/120x40" alt="Pinterest" className="h-8 opacity-70" />
          <img src="https://via.placeholder.com/120x40" alt="YouTube" className="h-8 opacity-70" />
          <img src="https://via.placeholder.com/120x40" alt="LinkedIn" className="h-8 opacity-70" />
          <img src="https://via.placeholder.com/120x40" alt="Twitter" className="h-8 opacity-70" />
        </div>
      </section>

      {/* Expert Crafted Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-resumify-off-white mb-4">Crafted by Experts to design your future</h2>
        <div className="flex justify-center mt-6 mb-8">
          <div className="flex">
            <span className="text-yellow-400 text-2xl">★★★★★</span>
          </div>
        </div>
        <p className="text-center text-resumify-off-white">Trusted by professionals</p>
      </section>

      {/* Templates Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-resumify-off-white mb-4">Try out our ready to use templates</h2>
        <p className="text-xl text-resumify-off-white max-w-3xl mb-12">
          Kickstart your career journey with our expertly designed, ready-to-use templates
          that you can fill with your professional resume in minutes.
          These tools showcase your unique skills and experiences, and get you one step closer to
          landing your dream job!
        </p>
        <div className="flex justify-center">
          <Link 
            to="/templates" 
            className="inline-block px-8 py-4 bg-resumify-brown hover:bg-resumify-brown-dark text-white text-lg font-medium rounded-full transition-colors"
          >
            Select your ready-to-use template
          </Link>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-resumify-off-white mb-12 text-center">Customer reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Review Card 1 */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/50" 
                alt="Sarah Johnson" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <h4 className="text-lg font-medium text-resumify-white">Sarah Johnson</h4>
            </div>
            <p className="text-resumify-off-white">
              "The templates are professionally designed and easy to customize. I landed my dream job within weeks of using this resume!"
            </p>
          </div>
          
          {/* Review Card 2 */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/50" 
                alt="Tony Gonzalez" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <h4 className="text-lg font-medium text-resumify-white">Tony Gonzalez</h4>
            </div>
            <p className="text-resumify-off-white">
              "Seeking a resume makeover, I turned to this site. The process was intuitive and the final result exceeded my expectations."
            </p>
          </div>
          
          {/* Review Card 3 */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/50" 
                alt="Emily R" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <h4 className="text-lg font-medium text-resumify-white">Emily R</h4>
            </div>
            <p className="text-resumify-off-white">
              "These resumes helped me stand out in a competitive job market. The designs are modern and professional."
            </p>
          </div>
          
          {/* Review Card 4 */}
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/50" 
                alt="Rahul Sharma" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <h4 className="text-lg font-medium text-resumify-white">Rahul Sharma</h4>
            </div>
            <p className="text-resumify-off-white">
              "I received more interview calls after using a template from this site. It really helps in showcasing your skills clearly."
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="text-resumify-beige hover:underline">See more reviews...</button>
        </div>
      </section>

      {/* Decorative triangles */}
      <div className="triangle triangle-1"></div>
      <div className="triangle triangle-2"></div>
      <div className="triangle triangle-3"></div>
    </div>
  );
};

export default Index;
