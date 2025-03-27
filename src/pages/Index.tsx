
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, Rocket, Star, Zap, Award, CheckCircle, ArrowRight, ExternalLink, Shield, Target } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { getCurrentUser } from '../services/api';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const { toast } = useToast();
  const heroRef = useRef(null);
  const resumeRef = useRef(null);
  const trustRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isResumeInView = useInView(resumeRef, { once: true, amount: 0.3 });
  const isTrustInView = useInView(trustRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isCtaSectionInView = useInView(ctaSectionRef, { once: true, amount: 0.3 });
  const isReviewsSectionInView = useInView(reviewsSectionRef, { once: true, amount: 0.3 });

  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const rotate = useTransform(scrollY, [0, 800], [0, 10]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

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

  const checkBackendStatus = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        toast({
          title: "Connected!",
          description: "Successfully connected to backend services",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Backend connection error:", error);
      toast({
        title: "Connection Issue",
        description: "Unable to connect to backend services",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const companyLogos = [
    { 
      name: 'Apple', 
      logo: '/src/pages/apple.png'
    },
    { 
      name: 'Microsoft', 
      logo: '/src/pages/mircosoft.png'
    },
    { 
      name: 'Amazon', 
      logo: '/src/pages/amazon.png'
    },
    { 
      name: 'Pinterest', 
      logo: '/src/pages/pinterest.png'
    },
    { 
      name: 'Google', 
      logo: '/src/pages/google.png'
    },
    { 
      name: 'LinkedIn', 
      logo: '/src/pages/linkedin.png'
    },
    { 
      name: 'X', 
      logo: '/src/pages/x-twitter.png'
    },
    { 
      name: 'Netflix', 
      logo: '/src/pages/netflix.png'
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-resumify-background via-resumify-dark-blue to-black">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent to-resumify-brown/10"></div>
        
        {/* Dynamic light effects */}
        <motion.div 
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.2, 0.1],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute -top-20 right-1/4 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.2, 0.1],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.2, 0.1],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <Navbar />
      
      {/* Hero Section with Enhanced Futuristic Design */}
      <motion.section 
        ref={heroRef}
        className="relative z-10 container mx-auto py-8 md:py-16 px-4 min-h-[90vh] flex flex-col justify-center"
        style={{ opacity: heroOpacity }}
      >
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Text Content */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 block">Looking for</span>
                <span className="text-resumify-white block">a new <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 inline-block">
                  JOB?
                  <motion.span 
                    className="absolute -top-6 -right-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    <Sparkles className="text-yellow-400" size={24} />
                  </motion.span>
                </span></span>
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-resumify-off-white mb-8 max-w-lg backdrop-blur-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              You'll definitely need a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">standout</span> Resume that makes hiring managers take notice.
            </motion.p>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <Link to="/templates">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 group flex items-center gap-2 px-6 py-6 text-lg shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]">
                  <span>Build Your Resume</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Rocket size={18} />
                  </motion.div>
                </Button>
              </Link>
              
              <Link to="/hiring-templates">
                <Button variant="outline" className="backdrop-blur-md bg-white/5 border-purple-500/60 text-white hover:bg-white/10 transition-all duration-300 px-6 py-6 text-lg">
                  Explore Templates
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm text-white border-white/20 px-3 py-1">
                ATS-Optimized
              </Badge>
              <Badge variant="outline" className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm text-white border-white/20 px-3 py-1">
                Modern Templates
              </Badge>
              <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm text-white border-white/20 px-3 py-1">
                Quick & Easy
              </Badge>
            </motion.div>
          </div>
          
          {/* Enhanced Resume Preview */}
          <motion.div 
            ref={resumeRef}
            className="order-1 md:order-2 w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={isResumeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden"
              style={{ y, rotate, scale }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-lg blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
              <div className="absolute inset-0 border border-white/20 rounded-xl backdrop-blur-sm z-0"></div>
              <img 
                src="/lovable-uploads/3657219f-7c45-408b-9819-751d9b931f2e.png" 
                alt="Resume Preview" 
                className="relative w-full shadow-2xl rounded-lg z-10 border border-white/10"
              />
              
              <motion.div 
                className="absolute -top-6 -right-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg py-2 px-4 z-20"
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
                className="absolute -bottom-4 -left-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-3 z-20"
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
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-3 shadow-lg shadow-purple-500/30 flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300">
                  <span className="font-bold text-sm">Try Now!</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Trusted By Section - Making it bigger and bolder as requested */}
      <section ref={trustRef} className="relative z-10 container mx-auto py-20 px-4 border-t border-white/5">
        <motion.h3 
          className="text-center text-2xl md:text-3xl font-bold text-white mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isTrustInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="flex items-center justify-center gap-3">
            <Award size={30} className="text-pink-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-pink-300 to-purple-300">
              Our customers have been <span className="font-extrabold underline decoration-pink-500/50 underline-offset-4">HIRED</span> at top companies:
            </span>
          </span>
        </motion.h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companyLogos.map((company, index) => (
            <motion.div 
              key={company.name}
              className="h-14 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-2 px-4 hover:bg-white/10 transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={isTrustInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex items-center gap-2">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-8 w-auto object-contain" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextSibling = e.currentTarget.nextSibling;
                      if (nextSibling) {
                        (nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold"
                  style={{ display: company.logo ? 'none' : 'flex' }}
                >
                  {company.name.charAt(0)}
                </div>
                <span className="text-white font-medium">{company.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="relative z-10 container mx-auto py-24 px-4">
        <motion.h2 
          className="text-4xl font-bold text-white mb-12 text-center flex flex-col items-center justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400">Why choose Resumify?</span>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mt-2"></div>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Zap, 
              title: "Fast & Efficient", 
              description: "Create a professional resume in minutes with our intuitive interface",
              color: "text-blue-400",
              gradient: "from-blue-500/20 to-blue-700/20",
              shadowColor: "rgba(59, 130, 246, 0.5)"
            },
            { 
              icon: Star, 
              title: "Premium Templates", 
              description: "Choose from dozens of ATS-optimized templates designed by career experts",
              color: "text-pink-400",
              gradient: "from-pink-500/20 to-pink-700/20",
              shadowColor: "rgba(236, 72, 153, 0.5)"
            },
            { 
              icon: Target, 
              title: "Career Boost", 
              description: "Stand out from the crowd with a resume that highlights your strengths",
              color: "text-purple-400",
              gradient: "from-purple-500/20 to-purple-700/20",
              shadowColor: "rgba(168, 85, 247, 0.5)"
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 h-full"
              initial={{ y: 50, opacity: 0 }}
              animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                boxShadow: `0 20px 40px ${feature.shadowColor}`,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`mb-6 bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                <feature.icon className={feature.color} size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-resumify-off-white text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isFeaturesInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link to="/templates">
            <Button variant="outline" className="backdrop-blur-md bg-white/5 border-purple-500/60 text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-6">
              Explore All Templates
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Enhanced CTA Section */}
      <section 
        ref={ctaSectionRef}
        className="py-32 px-4 relative overflow-hidden"
      >
        <motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute -top-10 -left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-white text-sm font-medium px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">Trusted by professionals</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Star key={index} fill="#FFD700" className="text-yellow-400" size={16} />
                ))}
              </div>
            </div>
            
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-300 to-purple-400 mt-8 mb-4">
              Ready to transform your career?
            </h2>
            
            <p className="text-xl text-resumify-off-white max-w-2xl mx-auto">
              Try our professionally designed templates and stand out from the competition
            </p>
          </motion.div>
          
          <motion.div 
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)" }}
          >
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <p className="text-white text-xl mb-6 relative z-10 text-center md:text-left">
              Kickstart your career journey with ease! Our expertly designed, ready-to-use templates
              help you craft professional resumes in minutes.
            </p>
            <p className="text-white text-xl mb-8 relative z-10 text-center md:text-left">
              Showcase your skills, qualifications, and work experiences, and get one step closer to
              landing your dream job!
            </p>
            
            <div className="flex justify-center md:justify-start relative z-10">
              <Link to="/templates">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl flex items-center gap-3 transition-all duration-500 text-lg shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]">
                  <span>Select your template</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section 
        ref={reviewsSectionRef}
        className="py-24 px-4 relative z-10"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-4xl font-bold text-white mb-8 text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isReviewsSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400">What our users are saying</span>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mt-4"></div>
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
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={isReviewsSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 30px rgba(168, 85, 247, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-pink-500/50 overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                    <motion.span 
                      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {review.name.charAt(0)}
                    </motion.span>
                  </div>
                </div>
                <h4 className="text-center font-bold text-lg text-white mb-3">{review.name}</h4>
                <p className="text-resumify-off-white text-center">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <style>
        {`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(to right, #ec4899, #a855f7);
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
        
        .text-gradient-shimmer {
          background: linear-gradient(to right, #ffffff, #c0a595, #ffffff);
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
        
        .neo-blur {
          background: rgba(31, 43, 50, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .neo-card {
          background: rgba(31, 43, 50, 0.3);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .gradient-border {
          position: relative;
          border-radius: 12px;
          padding: 0.1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .hoverable-card {
          transition: all 0.5s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .hoverable-card:hover {
          transform: translateY(-5px) rotateX(5deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        `}
      </style>
    </div>
  );
};

export default Index;

