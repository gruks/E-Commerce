"use client";

import { useState } from "react";
import { Search, User, LogOut, Mail, Lock } from "lucide-react";
import Searchbar from "./Searchbar";
import StaggeredMenu from "../ui/StaggeredMenu";
import TransitionLink from "../ui/TransitionLink";
import { CartIcon } from "./CartIcon";
import { useAuth } from "../../contexts/AuthContext";
import { STAGGERED_MENU_ITEMS, SOCIAL_ITEMS } from "../../styles/constants";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { user, profile, loading, signIn, signUp, signOut } = useAuth();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      await signIn(email, password);
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setAuthError(error.message || 'Sign in failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      await signUp(email, password);
      setAuthError('Check your email for confirmation link');
      // Don't close modal, let user see the message
    } catch (error: any) {
      setAuthError(error.message || 'Sign up failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setShowUserMenu(false);
    setAuthError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {/* Click away overlay for user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fc6902] focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fc6902] focus:border-transparent"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {authError && (
                  <div className={`text-sm p-3 ${
                    authError.includes('Check your email') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-[#fc6902] text-white py-2 hover:bg-[#e55a02] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {authLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {authMode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    authMode === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-[#fc6902] hover:text-[#e55a02]"
              >
                {authMode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 text-black bg-white/0 backdrop-blur-sm">
        <div className="h-16 px-4 md:px-8 flex items-center justify-end w-full max-w-8xl mx-auto !pl-2">
          
          {/* Center: Logo */}
          <TransitionLink href="/" className="text-lg font-bold tracking-widest absolute left-1/2 transform -translate-x-1/2">
            necter<span className="text-[#fc6902]">.</span>
          </TransitionLink>

          {/* Right: Search, User & Cart */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <button
              onClick={() => setShowSearch(true)}
              className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-2 py-1 flex items-center"
            >
              {/* Search text - hidden on small screens */}
              <span className="hidden sm:inline">Search</span>
              {/* Search icon - shown on small screens */}
              <Search className="w-4 h-4 sm:hidden" />
            </button>

            {/* User Authentication */}
            {loading ? (
              <div className="w-4 h-4 animate-spin rounded-full border-b-2 border-gray-900"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-2 py-1 flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {profile?.full_name || user.email?.split('@')[0] || 'Account'}
                  </span>
                </button>
                
                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {user.email}
                      </div>
                      <div 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setShowUserMenu(false);
                          window.location.href = '/track-orders';
                        }}
                      >
                        Track Orders
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-2 py-1 flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Account</span>
                </button>
                
                {/* Sign In Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => openAuthModal('signin')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => openAuthModal('signup')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <CartIcon className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors" />
          </div>
        </div>
      </header>

      {/* STAGGERED MENU COMPONENT - Fixed width, only blocks when open */}
      <div className="fixed z-60">
        <StaggeredMenu
          position="left"
          items={STAGGERED_MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#000000"
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={false}
          colors={['#f8f9fa', '#ffffff']}
          logoUrl=""
          accentColor="#fc6902"
          isFixed={true}
          closeOnClickAway={true}
          onMenuOpen={() => {}}
          onMenuClose={() => {}}
        />
      </div>

      {/* SEARCHBAR OVERLAY */}
      <Searchbar open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}