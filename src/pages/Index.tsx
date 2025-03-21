
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, Rocket, Star, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const resumeRef = useRef(null);
  const trustRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  const isResumeInView = useInView(resumeRef, { once: true, amount: 0.3 });
  const isTrustInView = useInView(trustRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isCtaSectionInView = useInView(ctaSectionRef, { once: true, amount: 0.3 });
  const isReviewsSectionInView = useInView(reviewsSectionRef, { once: true, amount: 0.3 });

  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const rotate = useTransform(scrollY, [0, 800], [0, 10]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  useEffect(() => {
    setIsLoaded(true);
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 5 + 1;
      const opacity = Math.random() * 0.5 + 0.1;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = `${opacity}`;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 10000);
    };
    
    const interval = setInterval(() => {
      createParticle();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 md:py-12 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
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
          {[
            { 
              name: 'Apple', 
              logo: 'public/lovable-uploads/5853ed99-b2f4-4eab-98ab-137f929790d4.png' 
            },
            { name: 'Microsoft' },
            { name: 'Amazon' },
            { name: 'Pinterest' },
            { name: 'YouTube' },
            { name: 'LinkedIn' },
            { name: 'Twitter' }
          ].map((company, index) => (
            <motion.div 
              key={company.name}
              className="h-12 glassmorphism p-2 px-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={isTrustInView ? { y: 0, opacity: 0.7 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="flex items-center gap-2">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-8 w-auto object-contain" 
                    onError={(e) => {
                      // Fallback to initial if image fails to load
                      e.currentTarget.style.display = 'none';
                      // Type assertion to HTMLElement to fix the TypeScript error
                      if (e.currentTarget.nextSibling) {
                        (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="bg-white/10 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold"
                  style={{ display: company.logo ? 'none' : 'flex' }}
                >
                  {company.name.charAt(0)}
                </div>
                <span className="text-white">{company.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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

      <section 
        ref={ctaSectionRef}
        className="py-20 px-4 bg-resumify-background relative overflow-hidden"
      >
        <motion.div 
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-resumify-brown-dark/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute -top-10 -left-10 w-40 h-40 bg-resumify-beige/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-white text-sm">Trusted by professionals</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Star key={index} fill="#FFD700" className="text-yellow-400" size={16} />
                ))}
              </div>
            </div>
            
            <p className="text-white text-sm">To get started with...</p>
            
            <h2 className="text-4xl font-bold text-resumify-beige mt-4">
              Try out our ready to use templates
            </h2>
          </motion.div>
          
          <motion.div 
            className="glassmorphism p-8 rounded-xl mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)" }}
          >
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 bg-resumify-brown/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <p className="text-white text-lg mb-6 relative z-10">
              Kickstart your career journey with ease! Our expertly designed, ready-to-use templates
              help you craft professional resumes in minutes.
            </p>
            <p className="text-white text-lg mb-8 relative z-10">
              Showcase your skills, qualifications, and work experiences, and get one step closer to
              landing your dream job!
            </p>
            
            <div className="flex justify-center relative z-10">
              <Link to="/templates">
                <Button className="bg-resumify-brown hover:bg-resumify-beige text-white px-6 py-6 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(166,115,96,0.5)]">
                  <span>Select your ready-to-use template</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 right-20 transform -translate-y-1/2"
            initial={{ opacity: 0, rotate: 0 }}
            animate={isCtaSectionInView ? { opacity: 0.7, rotate: 15 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div 
              className="w-24 h-24 bg-resumify-brown"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            ></div>
          </motion.div>
        </div>
      </section>

      <section 
        ref={reviewsSectionRef}
        className="py-20 px-4 bg-resumify-background"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isReviewsSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Customer reviews
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { 
                name: 'Jane Jill', 
                image: 'public/lovable-uploads/27dfb48f-326a-46b1-a85f-67c50df23e26.png',
                text: 'Incredible resume builder! The templates are modern and professional. I received three interview calls within a week of submitting my resume.' 
              },
              { 
                name: 'Tom Doodle', 
                image: 'public/lovable-uploads/27dfb48f-326a-46b1-a85f-67c50df23e26.png',
                text: 'Seeking a career change, I was unsure where to start. This tool guided me step by step, allowing me to showcase my transferable skills effectively.' 
              },
              { 
                name: 'Sophia K.', 
                image: 'public/lovable-uploads/27dfb48f-326a-46b1-a85f-67c50df23e26.png',
                text: 'As a recent graduate with no experience, I found it hard to create a good resume. This platform helped me highlight my education and skills in a professional way.' 
              },
              { 
                name: 'Rahul Sharma', 
                image: 'public/lovable-uploads/27dfb48f-326a-46b1-a85f-67c50df23e26.png',
                text: 'The ATS optimization feature is a game-changer! My resume now gets past screening systems, and I\'ve had more interview opportunities than ever before.' 
              }
            ].map((review, index) => (
              <motion.div 
                key={review.name}
                className="bg-white rounded-3xl p-6 shadow-xl h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={isReviewsSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-resumify-brown-dark overflow-hidden bg-resumify-beige/20 flex items-center justify-center">
                    <motion.span 
                      className="text-2xl font-bold text-resumify-brown-dark"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {review.name.charAt(0)}
                    </motion.span>
                  </div>
                </div>
                <h4 className="text-center font-bold text-lg text-gray-800 mb-2">{review.name}</h4>
                <p className="text-gray-600 text-center text-sm">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
      
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Index;
