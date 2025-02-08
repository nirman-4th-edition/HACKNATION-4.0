import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUIContext } from '../../contexts/ui.context';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarVisible } = useUIContext();
  const showBackButton = location.pathname !== '/contest-main';

  return (
    <div
      className={`flex-1 p-6 md:p-8  transition-all duration-300 ${isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
        }`}
    >
      {showBackButton && (
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/contest-main')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Main Menu</span>
          </button>
        </div>
      )}
      <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;