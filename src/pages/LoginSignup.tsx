
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Key, Mail, User, LogIn, Linkedin, Github, Sparkles, Globe, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [typingEffect, setTypingEffect] = useState('');
  const welcomeText = "Welcome to Resumify";
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  // Typing effect
  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypingEffect(welcomeText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Show password strength when the password field gets focus
  useEffect(() => {
    const subscription = signupForm.watch((value, { name }) => {
      if (name === 'password') {
        setShowPasswordStrength(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [signupForm]);

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25;
    
    // Contains numbers or special chars
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const onLoginSubmit = (data: LoginFormValues) => {
    toast({
      title: "Login Attempted",
      description: `Trying to log in with: ${data.email}`,
    });
    console.log('Login data:', data);
    // Implement actual login logic here
  };

  const onSignupSubmit = (data: SignupFormValues) => {
    toast({
      title: "Signup Attempted",
      description: `Trying to sign up with: ${data.email}`,
    });
    console.log('Signup data:', data);
    // Implement actual signup logic here
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login Attempted`,
      description: `Trying to log in with ${provider}`,
    });
    console.log(`${provider} login initiated`);
    // Implement actual social login logic here
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-resumify-background text-resumify-white overflow-hidden">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto relative">
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="triangle triangle-3"></div>
          
          {/* Typing effect at the top */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold text-resumify-white">
              <span className="gradient-text">{typingEffect}</span>
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-resumify-beige mt-2">Your professional journey starts here</p>
          </motion.div>
          
          <Card className="glassmorphism border-0">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md p-1 bg-resumify-dark-blue bg-opacity-80">
                  <Button
                    variant={isLogin ? "default" : "ghost"}
                    className={`rounded-md px-8 transition-all duration-300 ${isLogin ? 'bg-resumify-brown-dark hover:bg-resumify-brown-darker' : 'text-gray-400'}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    variant={!isLogin ? "default" : "ghost"}
                    className={`rounded-md px-8 transition-all duration-300 ${!isLogin ? 'bg-resumify-brown-dark hover:bg-resumify-brown-darker' : 'text-gray-400'}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Signup
                  </Button>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                <span className="gradient-text-dark">
                  {isLogin ? 'Welcome Back!' : 'Create an Account'}
                </span>
              </CardTitle>
              <CardDescription className="text-center text-resumify-off-white">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Fill out the form below to get started'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                >
                  {isLogin ? (
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-resumify-brown-darkest font-medium">Email</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4 transition-all group-hover:text-resumify-brown-darker" />
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    className="pl-10 modern-input transition-all duration-300 focus:scale-105"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-rose-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-resumify-brown-darkest font-medium">Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4 transition-all group-hover:text-resumify-brown-darker" />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="pl-10 modern-input transition-all duration-300 focus:scale-105"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-rose-300" />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center justify-between">
                          <FormField
                            control={loginForm.control}
                            name="rememberMe"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-resumify-brown-darker border-resumify-beige"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer text-resumify-off-white">Remember me</FormLabel>
                              </FormItem>
                            )}
                          />
                          <Link to="#" className="text-sm text-resumify-brown-darkest hover:text-resumify-beige hover:underline font-medium">
                            Forgot password?
                          </Link>
                        </div>
                        
                        <Button type="submit" className="w-full mt-6 modern-button group">
                          <LogIn className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" />
                          <span className="relative">
                            Sign In
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                        <FormField
                          control={signupForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-resumify-brown-darkest font-medium">Full Name</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4 transition-all group-hover:text-resumify-brown-darker" />
                                  <Input 
                                    placeholder="John Doe" 
                                    className="pl-10 modern-input transition-all duration-300 focus:scale-105"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-rose-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-resumify-brown-darkest font-medium">Email</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4 transition-all group-hover:text-resumify-brown-darker" />
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    className="pl-10 modern-input transition-all duration-300 focus:scale-105"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-rose-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-resumify-brown-darkest font-medium">Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4 transition-all group-hover:text-resumify-brown-darker" />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="pl-10 modern-input transition-all duration-300 focus:scale-105"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              {showPasswordStrength && field.value && (
                                <div className="mt-2">
                                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div 
                                      className={`h-full ${getStrengthColor(calculatePasswordStrength(field.value))}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${calculatePasswordStrength(field.value)}%` }}
                                      transition={{ duration: 0.5 }}
                                    />
                                  </div>
                                  <p className="text-xs text-resumify-beige mt-1">
                                    {calculatePasswordStrength(field.value) < 30 && "Weak password"}
                                    {calculatePasswordStrength(field.value) >= 30 && calculatePasswordStrength(field.value) < 70 && "Medium strength"}
                                    {calculatePasswordStrength(field.value) >= 70 && "Strong password"}
                                  </p>
                                </div>
                              )}
                              <FormMessage className="text-rose-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-resumify-brown-darkest font-medium">Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4 transition-all group-hover:text-resumify-brown-darker" />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="pl-10 modern-input transition-all duration-300 focus:scale-105"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-rose-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="terms"
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                  className="data-[state=checked]:bg-resumify-brown-darker border-resumify-beige mt-1"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal cursor-pointer text-resumify-off-white">
                                  I agree to the{" "}
                                  <Link to="#" className="text-resumify-brown-darkest font-medium hover:text-resumify-beige hover:underline">
                                    Terms of Service
                                  </Link>{" "}
                                  and{" "}
                                  <Link to="#" className="text-resumify-brown-darkest font-medium hover:text-resumify-beige hover:underline">
                                    Privacy Policy
                                  </Link>
                                </FormLabel>
                                <FormMessage className="text-rose-300" />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full mt-6 modern-button group">
                          <Sparkles className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" />
                          <span className="relative">
                            Create Account
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Button>
                      </form>
                    </Form>
                  )}
                </motion.div>
              </AnimatePresence>
              
              <div className="relative flex py-5 items-center mt-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-resumify-white text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <Button 
                  variant="outline" 
                  className="social-login w-full border-resumify-brown-darker hover:border-resumify-brown flex items-center justify-center gap-2 hover:bg-resumify-brown-darker/30"
                  onClick={() => handleSocialLogin('LinkedIn')}
                >
                  <Linkedin className="h-5 w-5 text-resumify-white" />
                  <span className="text-resumify-white font-medium">Sign in with LinkedIn</span>
                </Button>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className="social-login border-resumify-brown-darker hover:border-resumify-brown text-resumify-white hover:bg-resumify-brown-darker/30"
                    onClick={() => handleSocialLogin('Github')}
                  >
                    <Github className="h-5 w-5 text-resumify-white" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="social-login border-resumify-brown-darker hover:border-resumify-brown text-resumify-white hover:bg-resumify-brown-darker/30"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <Globe className="h-5 w-5 text-resumify-white" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="social-login border-resumify-brown-darker hover:border-resumify-brown text-resumify-white hover:bg-resumify-brown-darker/30"
                    onClick={() => handleSocialLogin('Microsoft')}
                  >
                    <svg className="h-5 w-5 text-resumify-white" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pb-8">
              <p className="text-sm text-resumify-off-white">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-resumify-brown-darkest font-medium hover:text-resumify-beige hover:underline" 
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-resumify-brown-darkest font-medium hover:text-resumify-beige hover:underline" 
                      onClick={() => setIsLogin(true)}
                    >
                      Sign in
                    </Button>
                  </>
                )}
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2 glass-effect px-4 py-2 text-sm"
            >
              <Lock className="h-4 w-4 text-resumify-white" />
              <span className="text-resumify-white">Secure Authentication</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2 glass-effect px-4 py-2 text-sm"
            >
              <Sparkles className="h-4 w-4 text-resumify-white" />
              <span className="text-resumify-white">Premium Templates</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-2 glass-effect px-4 py-2 text-sm"
            >
              <Check className="h-4 w-4 text-resumify-white" />
              <span className="text-resumify-white">Cloud Sync</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
