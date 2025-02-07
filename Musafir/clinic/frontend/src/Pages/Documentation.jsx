import React, { useState } from 'react';
import { Search, HelpCircle, Mail, BookOpen, Headphones, Menu, X } from 'lucide-react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('faqs');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const faqData = [
    { 
      question: 'How do I reset my password?', 
      answer: 'Go to the login page and click "Forgot Password". Follow the email instructions to reset.'
    },
    { 
      question: 'Can I change my account email?', 
      answer: 'Yes, navigate to Account Settings > Email Preferences to update your email address.'
    },
    { 
      question: 'What payment methods do you accept?', 
      answer: 'We accept major credit cards, PayPal, and bank transfers.'
    },
    { 
      question: 'How long does shipping take?', 
      answer: 'Shipping typically takes 3-5 business days for domestic orders.'
    },
    { 
      question: 'Do you offer international shipping?', 
      answer: 'Yes, we ship to most countries. Shipping times and rates vary by location.'
    }
  ];

  const contactOptions = [
    { 
      icon: <Mail size={24} />, 
      title: 'Email Support', 
      description: 'support@company.com',
      details: 'Response within 24 hours'
    },
    { 
      icon: <Headphones size={24} />, 
      title: 'Live Chat', 
      description: 'Available 9am-5pm EST',
      details: 'Instant support during business hours'
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const SectionNavigation = ({ mobile = false }) => (
    <div className={`${mobile ? 'flex flex-col' : 'hidden sm:flex border-b'}`}>
      {['faqs', 'contact', 'docs'].map(section => (
        <button
          key={section}
          onClick={() => {
            setActiveSection(section);
            mobile && setIsMobileMenuOpen(false);
          }}
          className={`px-4 py-3 sm:py-4 text-sm font-medium transition-colors
            ${activeSection === section 
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50'} 
            ${mobile ? 'w-full text-left' : 'flex-1 text-center'}`}
        >
          {section === 'faqs' ? 'FAQs' : 
           section === 'contact' ? 'Contact' : 'Documentation'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 sm:p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-2xl font-bold">Support Center</h1>
          </div>
          
          <button 
            onClick={toggleMobileMenu} 
            className="sm:hidden text-white p-1 rounded-lg hover:bg-blue-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="sm:hidden fixed inset-0 bg-white z-50">
            <div className="p-4 border-b">
              <SectionNavigation mobile={true} />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {/* Desktop Navigation */}
        <SectionNavigation />

        {/* Content Sections */}
        <div className="p-4 sm:p-6">
          {activeSection === 'faqs' && (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search FAQs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-3">
                {filteredFAQs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1.5">{faq.question}</h3>
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                ))}

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No results found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeSection === 'contact' && (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {contactOptions.map((option, index) => (
                <div 
                  key={index} 
                  className="p-4 sm:p-6 border rounded-xl hover:border-blue-200 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 text-blue-600">{option.icon}</div>
                    <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                    <p className="text-gray-700 mb-2">{option.description}</p>
                    <p className="text-sm text-gray-500">{option.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'docs' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Documentation</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Getting Started', 'User Guide', 'API Docs', 'Tutorials', 'Troubleshooting', 'Release Notes'].map((doc, index) => (
                  <div 
                    key={index} 
                    className="p-4 border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{doc}</h3>
                    <p className="text-sm text-gray-600">Learn about {doc.toLowerCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Documentation;