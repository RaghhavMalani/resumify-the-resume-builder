
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';
import { Button } from './button';
import {
  FileText,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

const ResumifyNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/hiring-templates"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/hiring-templates'
                  ? 'bg-resumify-brown text-white'
                  : 'text-resumify-off-white hover:bg-gray-700 hover:text-white'
              }`}
            >
              Templates
            </Link>
            
            {user && (
              <>
                <Link
                  to="/my-resumes"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/my-resumes'
                      ? 'bg-resumify-brown text-white'
                      : 'text-resumify-off-white hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  My Resumes
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard'
                      ? 'bg-resumify-brown text-white'
                      : 'text-resumify-off-white hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-resumify-off-white hover:bg-gray-700 hover:text-white"
                  >
                    <User size={18} className="mr-2" />
                    {user.name.split(' ')[0]}
                    <ChevronDown size={16} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-700 border-gray-600">
                  <DropdownMenuLabel className="text-resumify-beige">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-600" />
                  <DropdownMenuItem
                    className="text-resumify-off-white hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/my-resumes')}
                  >
                    <FileText size={16} className="mr-2" />
                    My Resumes
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-resumify-off-white hover:bg-gray-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-resumify-brown hover:bg-resumify-brown-dark text-white"
              >
                Login / Register
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-resumify-off-white hover:bg-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2 px-4">
          <div className="flex flex-col gap-2">
            <Link
              to="/hiring-templates"
              className={`px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/hiring-templates'
                  ? 'bg-resumify-brown text-white'
                  : 'text-resumify-off-white hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              Templates
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/my-resumes"
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/my-resumes'
                      ? 'bg-resumify-brown text-white'
                      : 'text-resumify-off-white hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={closeMobileMenu}
                >
                  My Resumes
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/dashboard'
                      ? 'bg-resumify-brown text-white'
                      : 'text-resumify-off-white hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start px-3 py-2 text-base font-medium text-resumify-off-white hover:bg-gray-700 hover:text-white"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  navigate('/login');
                  closeMobileMenu();
                }}
                className="bg-resumify-brown hover:bg-resumify-brown-dark text-white w-full mt-2"
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default ResumifyNavbar;
