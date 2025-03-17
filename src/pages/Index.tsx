
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, Rocket, Star, Zap, Award, CheckCircle } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const resumeRef = useRef(null);
  const trustRef = useRef(null);
  const featuresRef = useRef(null);
  const isResumeInView = useInView(resumeRef, { once: true, amount: 0.3 });
  const isTrustInView = useInView(trustRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  
  // Parallax effect
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const rotate = useTransform(scrollY, [0, 800], [0, 10]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Add particle effect to background
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Random size
      const size = Math.random() * 5 + 1;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Apply styles
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = `${opacity}`;
      
      // Add to body
      document.body.appendChild(particle);
      
      // Remove after animation
      setTimeout(() => {
        particle.remove();
      }, 10000);
    };
    
    // Create particles periodically
    const interval = setInterval(() => {
      createParticle();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <main className="container mx-auto py-6 px-4 md:py-12 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
        {/* Resume Preview with Enhanced Animation */}
        <motion.div 
          ref={resumeRef}
          className="w-full md:w-1/2 max-w-xl"
          initial={{ opacity: 0, x: -100 }}
          animate={isResumeInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div 
            className="gradient-border hoverable-card relative"
            style={{ y, rotate, scale }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-resumify-brown to-resumify-beige rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
            <img 
              src="public/lovable-uploads/3657219f-7c45-408b-9819-751d9b931f2e.png" 
              alt="Resume Preview" 
              className="relative w-full shadow-lg rounded-md z-10"
            />
            
            {/* Floating details */}
            <motion.div 
              className="absolute -top-6 -right-6 glassmorphism py-2 px-4 z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-400" size={16} />
                <span className="text-white text-sm font-medium">AI-Powered</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 glassmorphism p-3 z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-white text-sm font-medium">ATS-Friendly</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 w-20 h-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              <div className="bg-resumify-brown text-white rounded-full p-3 shadow-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300">
                <span className="font-bold text-sm">Try Now!</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Call to Action with Enhanced Animation */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-bold gradient-text mb-1"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Looking
              </motion.h2>
              <motion.h2 
                className="text-5xl md:text-6xl font-bold text-resumify-white mb-1"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                for a new
              </motion.h2>
              <motion.h2 
                className="text-6xl md:text-7xl font-bold text-resumify-white mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <span className="relative">
                  JOB?
                  <motion.span 
                    className="absolute -top-6 -right-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    <Sparkles className="text-yellow-400" size={24} />
                  </motion.span>
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-resumify-white mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              You'll definitely need a <span className="font-bold text-resumify-beige">standout</span> Resume!
            </motion.p>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <Link to="/templates">
                <Button className="modern-button group flex items-center gap-2">
                  <span>Build Your Own Resume!</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Rocket size={18} />
                  </motion.div>
                </Button>
              </Link>
              
              <motion.div 
                className="mt-6 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  ATS-Optimized
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  Modern Templates
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  Quick & Easy
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Trusted By Section with Enhanced Animation */}
      <section ref={trustRef} className="container mx-auto py-16 px-4">
        <motion.h3 
          className="text-center text-xl text-resumify-off-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isTrustInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Award size={20} className="text-resumify-beige" />
            Our customers have been hired at:
          </span>
        </motion.h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {['Microsoft', 'Apple', 'Amazon', 'Pinterest', 'YouTube', 'LinkedIn', 'Twitter'].map((company, index) => (
            <motion.div 
              key={company}
              className="h-12 glassmorphism p-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={isTrustInView ? { y: 0, opacity: 0.7 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="flex items-center gap-2">
                <img src={`https://via.placeholder.com/24x24?text=${company.charAt(0)}`} alt={company} className="h-8" />
                <span className="text-white">{company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="container mx-auto py-16 px-4">
        <motion.h2 
          className="text-3xl font-bold text-resumify-off-white mb-12 text-center flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Star className="text-yellow-400" />
          Why choose Resumify?
          <Star className="text-yellow-400" />
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Zap, 
              title: "Fast & Efficient", 
              description: "Create a professional resume in minutes with our intuitive interface",
              color: "text-blue-400"
            },
            { 
              icon: Star, 
              title: "Premium Templates", 
              description: "Choose from dozens of ATS-optimized templates designed by career experts",
              color: "text-yellow-400"
            },
            { 
              icon: Rocket, 
              title: "Career Boost", 
              description: "Stand out from the crowd with a resume that highlights your strengths",
              color: "text-green-400"
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="glassmorphism p-6 h-full"
              initial={{ y: 50, opacity: 0 }}
              animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-4 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center">
                <feature.icon className={feature.color} size={24} />
              </div>
              <h3 className="text-xl font-bold text-resumify-white mb-2">{feature.title}</h3>
              <p className="text-resumify-off-white">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isFeaturesInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link to="/templates">
            <Button variant="outline" className="border-resumify-beige text-resumify-beige hover:bg-resumify-beige hover:text-resumify-background transition-all duration-300">
              Explore Templates
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Customer Reviews with Enhanced Animation */}
      <section className="container mx-auto py-16 px-4">
        <motion.h2 
          className="text-3xl font-bold text-resumify-off-white mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What our customers say
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Sarah Johnson', text: "The templates are professionally designed and easy to customize. I landed my dream job within weeks of using this resume!" },
            { name: 'Tony Gonzalez', text: "Seeking a resume makeover, I turned to this site. The process was intuitive and the final result exceeded my expectations." },
            { name: 'Emily R', text: "These resumes helped me stand out in a competitive job market. The designs are modern and professional." },
            { name: 'Rahul Sharma', text: "I received more interview calls after using a template from this site. It really helps in showcasing your skills clearly." }
          ].map((review, index) => (
            <motion.div 
              key={review.name}
              className="glassmorphism p-6 h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img 
                    src={`https://via.placeholder.com/50?text=${review.name.charAt(0)}`}
                    alt={review.name} 
                    className="w-12 h-12 rounded-full border-2 border-resumify-beige"
                  />
                  <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-resumify-white">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-resumify-off-white">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Animated decorative triangles */}
      <motion.div 
        className="triangle triangle-1"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.8, rotate: 30 }}
        transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
      ></motion.div>
      <motion.div 
        className="triangle triangle-2"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.8, rotate: -20 }}
        transition={{ delay: 0.7, duration: 1.5, type: "spring" }}
      ></motion.div>
      <motion.div 
        className="triangle triangle-3"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.8, rotate: 15 }}
        transition={{ delay: 0.9, duration: 1.5, type: "spring" }}
      ></motion.div>
      
      {/* Floating particles CSS */}
      <style jsx="true">{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(to right, #c0a595, #a67360);
          pointer-events: none;
          z-index: -10;
          animation: float 10s linear infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
