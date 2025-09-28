import React from 'react';
import { LogOut, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import config from '../config';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <Users className="w-10 h-10 text-white mr-4 drop-shadow-lg" />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-md">
                  {config.APP_NAME}
                </h1>
                <p className="text-blue-100 text-sm font-medium">AI-Powered Recruitment v{config.APP_VERSION}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="text-sm">Welcome, </span>
              <span className="font-semibold text-white">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
