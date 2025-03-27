
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-4 md:px-8 lg:px-12">
      <div className="flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/hiring-templates" className="text-resumify-white hover:text-resumify-beige transition-colors">
            Hiring Templates
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-resumify-brown-dark text-resumify-white">
                  <span className="sr-only">Open user menu</span>
                  <User size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-resumify-background border-resumify-brown-dark text-resumify-white" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium text-resumify-beige">{user.name}</p>
                  <p className="text-xs text-resumify-off-white truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-resumify-brown-dark" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-resumify-brown-darkest"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-resumify-brown-dark" />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-400 hover:bg-resumify-brown-darkest"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="text-resumify-white hover:text-resumify-beige transition-colors">
              Login/SignUp
            </Link>
          )}
          
          <button className="text-resumify-white hover:text-resumify-beige transition-colors">
            <Search size={20} />
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-resumify-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
          <Link 
            to="/hiring-templates" 
            className="text-resumify-white hover:text-resumify-beige transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Hiring Templates
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-resumify-white hover:text-resumify-beige transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="text-red-400 hover:text-red-300 transition-colors text-left flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-resumify-white hover:text-resumify-beige transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login/SignUp
            </Link>
          )}
          
          <button className="text-resumify-white hover:text-resumify-beige transition-colors text-left">
            <Search size={20} />
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
