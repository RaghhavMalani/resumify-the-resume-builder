
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Search, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 md:px-8 lg:px-12">
      <div className="flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/templates" className="text-resumify-white hover:text-resumify-beige transition-colors">
            Templates
          </Link>
          <Link to="/faq" className="text-resumify-white hover:text-resumify-beige transition-colors">
            FAQ
          </Link>
          <Link to="/pre-made" className="text-resumify-white hover:text-resumify-beige transition-colors">
            Pre-made templates
          </Link>
          <Link to="/login" className="text-resumify-white hover:text-resumify-beige transition-colors">
            Login/SignUp
          </Link>
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
            to="/templates" 
            className="text-resumify-white hover:text-resumify-beige transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Templates
          </Link>
          <Link 
            to="/faq" 
            className="text-resumify-white hover:text-resumify-beige transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/pre-made" 
            className="text-resumify-white hover:text-resumify-beige transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pre-made templates
          </Link>
          <Link 
            to="/login" 
            className="text-resumify-white hover:text-resumify-beige transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login/SignUp
          </Link>
          <button className="text-resumify-white hover:text-resumify-beige transition-colors text-left">
            <Search size={20} />
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
