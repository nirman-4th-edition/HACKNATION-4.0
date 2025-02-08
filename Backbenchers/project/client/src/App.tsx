import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FinancialAssistant from './components/FinancialAssistant';
import Learn from './components/Learn';
import Budget from './components/Budget';
import BudgetOptimizer from './components/BudgetOptimizer';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import SchemeRecommendation from './components/SchemeRecommendation';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home, BookOpen, PieChart, MessageCircle, Menu, UserRound, LibraryBig, BarChart } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

function MainContent({ isAuthenticated, setIsAuthenticated }: { 
  isAuthenticated: boolean; 
  setIsAuthenticated: (value: boolean) => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { t } = useLanguage();

  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:flex flex-col w-64 bg-white border-r z-10`}
      >
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-blue-600">{t('app.name')}</h1>
          <p className="text-sm text-gray-500">{t('app.tagline')}</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <Home size={20} />
                <span>{t('nav.dashboard')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/learn" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <BookOpen size={20} />
                <span>{t('nav.learn')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/budget" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <PieChart size={20} />
                <span>{t('nav.budget')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/BudgetOptimizer" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <BarChart size={20} />
                <span>{t('nav.expenseopt')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/assistant" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <MessageCircle size={20} />
                <span>{t('nav.assistant')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/profile" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <UserRound size={20} />
                <span>{t('nav.profile')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/schemes" 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                onClick={handleNavigation}
              >
                <LibraryBig size={20} />
                <span>{t('nav.schemes')}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {t('button.logout')}
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('button.sync')}
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/BudgetOptimizer" element={<BudgetOptimizer />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/schemes" element={<SchemeRecommendation />} />
            <Route path="/assistant" element={<FinancialAssistant />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <LanguageProvider>
      <Routes>
          {/* If authenticated, go to dashboard. If not, go to login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />

          {/* Protected Routes: Only visible when authenticated */}
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <MainContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App;