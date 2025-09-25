import { Link, useNavigate } from "@tanstack/react-router";
import { Lightbulb, Sparkles, Plus, LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/api/auth";
import { useState } from "react";
import FloatingBrain from "./FloatingBrain";

const Header = () => {
    const navigate = useNavigate()
    const {user, setUser, setAccessToken} = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
      try{
        await logoutUser()
        setAccessToken(null);
        setUser(null);
        navigate({to:'/'})
      }catch(err:any){
        console.log('Logout failed: ', err)
      }
    }

    return ( 
      <header className='glass-effect sticky top-0 z-50 border-b border-white/20'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex justify-between items-center'>
            {/* Logo Section */}
            <Link to='/' className='flex items-center space-x-3 group'>
              <div className="relative">
                <FloatingBrain size="sm" />
              </div>
              <div className="flex items-center space-x-2">
                <h1 className='text-2xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent'>
                  IdeaDrop
                </h1>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-sparkle" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-6'>
              <Link
                to='/ideas'
                className='text-white/90 hover:text-white font-medium transition px-4 py-2 rounded-lg hover-lift hover:bg-white/10 flex items-center space-x-2'
              >
                <Lightbulb className="w-4 h-4" />
                <span>Ideas</span>
              </Link>
              
              {user && (
                <Link
                  to='/ideas/new'
                  className='gradient-warm text-white font-semibold transition px-6 py-3 rounded-full shadow-magical hover-lift hover-glow flex items-center space-x-2'
                >
                  <Plus className="w-4 h-4" />
                  <span>New Idea</span>
                </Link>
              )}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {
                !user ? (
                  <>
                    <Link 
                      to='/login' 
                      className='text-white/90 hover:text-white font-medium transition px-4 py-2 rounded-lg hover-lift hover:bg-white/10'>
                      Login
                    </Link>
                    <Link 
                      to='/register' 
                      className='gradient-secondary text-white font-semibold transition px-6 py-3 rounded-full shadow-magical hover-lift hover-glow'>
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 text-white/90 bg-white/10 px-4 py-2 rounded-full">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:block font-medium">
                        {user.name}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="text-red-300 hover:text-red-200 font-medium transition px-4 py-2 rounded-lg hover-lift hover:bg-red-500/20 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )
              }   
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white/90 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 glass-dark p-4 rounded-2xl animate-slide-up">
              <Link
                to='/ideas'
                className='block text-white/90 hover:text-white font-medium transition px-4 py-3 rounded-lg hover:bg-white/10 flex items-center space-x-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Lightbulb className="w-4 h-4" />
                <span>Browse Ideas</span>
              </Link>
              
              {user && (
                <Link
                  to='/ideas/new'
                  className='block gradient-warm text-white font-semibold transition px-4 py-3 rounded-lg shadow-magical hover-glow flex items-center space-x-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Idea</span>
                </Link>
              )}

              <div className="border-t border-white/20 pt-4">
                {
                  !user ? (
                    <div className="space-y-2">
                      <Link 
                        to='/login' 
                        className='block text-white/90 hover:text-white font-medium transition px-4 py-3 rounded-lg hover:bg-white/10'
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Login
                      </Link>
                      <Link 
                        to='/register' 
                        className='block gradient-secondary text-white font-semibold transition px-4 py-3 rounded-lg shadow-magical text-center'
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-white/90 px-4 py-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Welcome, {user.name}</span>
                      </div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }} 
                        className="w-full text-red-300 hover:text-red-200 font-medium transition px-4 py-3 rounded-lg hover:bg-red-500/20 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          )}
        </div>
      </header> 
    );
}

export default Header;
}

export default Header;