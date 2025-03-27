
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Testimonial = ({ text, author, role }: { text: string, author: string, role: string }) => (
  <motion.div 
    className="bg-resumify-background/50 border border-resumify-brown/30 p-6 rounded-lg max-w-md mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-resumify-white mb-4 italic">{text}</p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-resumify-brown flex items-center justify-center text-white font-bold">
        {author[0]}
      </div>
      <div className="ml-3">
        <p className="text-resumify-beige font-semibold">{author}</p>
        <p className="text-resumify-brown text-sm">{role}</p>
      </div>
    </div>
  </motion.div>
);

const CompanyLogo = ({ src, alt }: { src: string, alt: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className="h-10 w-auto object-contain filter brightness-90 opacity-80 hover:opacity-100 transition-opacity"
  />
);

const HeroSection = () => (
  <motion.section 
    className="relative py-16 md:py-24 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="triangle-1"></div>
    <div className="triangle-2"></div>
    <div className="triangle-3"></div>
    
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left side with header text */}
        <div className="md:w-1/2 text-left">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-resumify-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Looking for a <span className="text-resumify-beige">new JOB?</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-resumify-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            You'll definitely need a standout <span className="font-bold text-resumify-beige">Resume!</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/editor/professional">
              <Button size="lg" className="bg-resumify-accent hover:bg-resumify-brown text-resumify-background rounded-lg px-8 py-6 text-lg font-medium">
                Build Your Own Resume! <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Right side with resume preview */}
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            <img 
              src="public/lovable-uploads/72a2996d-976d-4b26-87fe-c6a5eaaeed0c.png" 
              alt="Resume Template Preview" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-resumify-brown/30"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

const CompaniesSection = () => (
  <motion.section 
    className="py-16 bg-resumify-background/90"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-resumify-beige">
        Our customers have been hired at:
      </h2>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 justify-items-center items-center max-w-4xl mx-auto">
        <CompanyLogo src="src/pages/microsoft.png" alt="Microsoft" />
        <CompanyLogo src="src/pages/apple.png" alt="Apple" />
        <CompanyLogo src="src/pages/amazon.png" alt="Amazon" />
        <CompanyLogo src="src/pages/pinterest.png" alt="Pinterest" />
        <CompanyLogo src="src/pages/youtube.png" alt="YouTube" />
        <CompanyLogo src="src/pages/linkedin.png" alt="LinkedIn" />
        <CompanyLogo src="src/pages/meta.png" alt="Meta" />
        <CompanyLogo src="src/pages/google.png" alt="Google" />
        <CompanyLogo src="src/pages/netflix.png" alt="Netflix" />
        <CompanyLogo src="src/pages/x-twitter.png" alt="Twitter" />
      </div>
    </div>
  </motion.section>
);

const FeaturesSection = () => (
  <section className="py-16 relative overflow-hidden">
    <motion.div 
      className="container mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-resumify-beige">
        Crafted by Experts to design your future
      </h2>
      
      <div className="flex justify-center mb-6">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-center text-resumify-white mb-12">Trusted by professionals</p>
      
      <div className="max-w-5xl mx-auto bg-resumify-background/50 p-8 rounded-xl border border-resumify-brown/30 backdrop-blur-sm shadow-xl">
        <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-resumify-beige">
          Try out our ready to use templates
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-resumify-accent w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1">
              <span className="text-resumify-background font-bold">1</span>
            </div>
            <p className="text-resumify-white">
              <span className="font-semibold text-resumify-beige">Kickstart your career journey with ease!</span> Our expertly designed, ready-to-use templates help you craft professional resumes in minutes.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-resumify-accent w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1">
              <span className="text-resumify-background font-bold">2</span>
            </div>
            <p className="text-resumify-white">
              <span className="font-semibold text-resumify-beige">Tailor them to showcase your unique skills and experiences,</span> and get one step closer to landing your dream job!
            </p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/hiring-templates">
            <Button variant="outline" className="bg-resumify-accent hover:bg-resumify-brown text-resumify-background border-resumify-brown-dark px-6 py-5 rounded-lg">
              Select your ready-to-use template
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-resumify-background/95">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-resumify-beige">What our users say</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Testimonial 
          text="This resume builder transformed my job search. I received interview calls from 3 top companies within a week of updating my resume!"
          author="Emily Chen"
          role="Software Engineer"
        />
        
        <Testimonial 
          text="The templates look professional and were easy to customize. The ATS optimization feature gave me confidence that my resume would get past automated screens."
          author="Michael Johnson"
          role="Marketing Specialist"
        />
        
        <Testimonial 
          text="After struggling with my resume for months, this tool helped me create a standout document that truly showcased my skills. Landed my dream job!"
          author="Sarah Williams"
          role="UX Designer"
        />
      </div>
    </div>
  </section>
);

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-resumify-background text-resumify-white">
      <Navbar />
      <main>
        <HeroSection />
        <CompaniesSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default Index;
