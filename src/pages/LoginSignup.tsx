
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Key, Mail, User, LogIn, Linkedin } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-resumify-background text-resumify-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto relative">
          {/* Animated background elements - triangular shapes like in the provided image */}
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="triangle triangle-3"></div>
          
          <Card className="glassmorphism border-0">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md p-1 bg-gray-800 bg-opacity-50">
                  <Button
                    variant={isLogin ? "default" : "ghost"}
                    className={`rounded-md px-8 transition-all duration-300 ${isLogin ? 'bg-resumify-brown hover:bg-resumify-brown-dark' : 'text-gray-400'}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    variant={!isLogin ? "default" : "ghost"}
                    className={`rounded-md px-8 transition-all duration-300 ${!isLogin ? 'bg-resumify-brown hover:bg-resumify-brown-dark' : 'text-gray-400'}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Signup
                  </Button>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                <span className="gradient-text">
                  {isLogin ? 'Welcome Back!' : 'Create an Account'}
                </span>
              </CardTitle>
              <CardDescription className="text-center text-resumify-beige">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Fill out the form below to get started'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isLogin ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-resumify-beige">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4" />
                              <Input 
                                placeholder="your.email@example.com" 
                                className="pl-10 modern-input"
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
                          <FormLabel className="text-resumify-beige">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4" />
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-10 modern-input"
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
                                className="data-[state=checked]:bg-resumify-brown border-resumify-beige"
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer text-resumify-beige">Remember me</FormLabel>
                          </FormItem>
                        )}
                      />
                      <Link to="#" className="text-sm text-resumify-brown hover:text-resumify-beige hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6 modern-button">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
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
                          <FormLabel className="text-resumify-beige">Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4" />
                              <Input 
                                placeholder="John Doe" 
                                className="pl-10 modern-input"
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
                          <FormLabel className="text-resumify-beige">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4" />
                              <Input 
                                placeholder="your.email@example.com" 
                                className="pl-10 modern-input"
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
                          <FormLabel className="text-resumify-beige">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4" />
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-10 modern-input"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-resumify-beige">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-resumify-beige h-4 w-4" />
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-10 modern-input"
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
                              className="data-[state=checked]:bg-resumify-brown border-resumify-beige mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal cursor-pointer text-resumify-beige">
                              I agree to the{" "}
                              <Link to="#" className="text-resumify-brown hover:text-resumify-beige hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link to="#" className="text-resumify-brown hover:text-resumify-beige hover:underline">
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage className="text-rose-300" />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full mt-6 modern-button">
                      Create Account
                    </Button>
                  </form>
                </Form>
              )}
              
              <div className="relative flex py-5 items-center mt-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-resumify-beige text-sm">OR</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <Button 
                  variant="outline" 
                  className="social-login w-full border-resumify-beige hover:border-resumify-brown flex items-center justify-center gap-2"
                  onClick={() => handleSocialLogin('LinkedIn')}
                >
                  <Linkedin className="h-5 w-5 text-resumify-beige" />
                  <span className="text-resumify-beige">Sign in with LinkedIn</span>
                </Button>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className="social-login border-resumify-beige hover:border-resumify-brown text-resumify-white"
                    onClick={() => handleSocialLogin('Github')}
                  >
                    <svg className="h-5 w-5 text-resumify-beige" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="social-login border-resumify-beige hover:border-resumify-brown text-resumify-white"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <svg className="h-5 w-5 text-resumify-beige" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                    </svg>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="social-login border-resumify-beige hover:border-resumify-brown text-resumify-white"
                    onClick={() => handleSocialLogin('Apple')}
                  >
                    <svg className="h-5 w-5 text-resumify-beige" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.38 4.38 0 0 0-3 1.56 4.13 4.13 0 0 0-1 3.05 3.9 3.9 0 0 0 2.94-1.92zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.58 12.76 4 17.8 5.6 20.5c.75 1.25 1.73 2.45 3 2.41s1.67-.82 3.12-.82 1.87.82 3.16.79 2.12-1.07 2.91-2.29a10.09 10.09 0 0 0 1.35-2.78 4.33 4.33 0 0 1-1.68-3.18z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pb-8">
              <p className="text-sm text-resumify-beige">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-resumify-brown hover:text-resumify-beige hover:underline" 
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
                      className="p-0 h-auto text-resumify-brown hover:text-resumify-beige hover:underline" 
                      onClick={() => setIsLogin(true)}
                    >
                      Sign in
                    </Button>
                  </>
                )}
              </p>
            </CardFooter>
          </Card>
          
          {/* Features badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2 glass-effect px-4 py-2 text-sm"
            >
              <Check className="h-4 w-4 text-resumify-brown" />
              <span className="text-resumify-beige">Secure Authentication</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2 glass-effect px-4 py-2 text-sm"
            >
              <Check className="h-4 w-4 text-resumify-brown" />
              <span className="text-resumify-beige">Free Resume Templates</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-2 glass-effect px-4 py-2 text-sm"
            >
              <Check className="h-4 w-4 text-resumify-brown" />
              <span className="text-resumify-beige">Cloud Sync</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
