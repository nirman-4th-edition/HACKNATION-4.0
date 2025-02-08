import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  ChevronDown, CheckCircle, LogIn, ArrowRight,
  Microscope, Dna, Scan, Globe, Hospital, User,
  Lock, Mail, Phone, MapPin, Building,
  Calendar, Shield, X
} from 'lucide-react';

// Modal Component with enhanced styling
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-md border border-purple-500/20 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

// InputField Component with improved styling
const InputField = ({ icon: Icon, type, placeholder, value, onChange, required, name }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-purple-500" />
    </div>
    <input
      type={type}
      name={name}
      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

// AuthSelector Component
const AuthSelector = ({ onSelect }) => (
  <div className="text-white text-center">
    <h2 className="text-2xl font-bold mb-6">Choose Account Type</h2>
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onSelect('patient')}
        className="p-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all group"
      >
        <User className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:text-purple-300" />
        <span className="font-medium">Patient</span>
      </button>
      <button
        onClick={() => onSelect('clinic')}
        className="p-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all group"
      >
        <Hospital className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:text-purple-300" />
        <span className="font-medium">Clinic</span>
      </button>
    </div>
  </div>
);

// Preloader Component
const Preloader = ({ progress }) => {
  const circleRef = useRef(null);
  const checkRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.to(circleRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 2,
      ease: 'none',
    });

    gsap.from(progressRef.current, {
      duration: 0.5,
      y: 10,
      opacity: 0,
      stagger: 0.1,
    });
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline();
      tl.to(circleRef.current, {
        opacity: 0,
        duration: 0.5,
      }).from(checkRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      }, 0);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            stroke="url(#gradient)"
          />
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          {progress === 100 && (
            <CheckCircle
              ref={checkRef}
              className="text-purple-500"
              style={{ transform: 'translate(25px, 25px)', width: '50px', height: '50px' }}
            />
          )}
        </svg>
        <div
          ref={progressRef}
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white"
        >
          {progress}%
        </div>
      </div>
      <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Feature Button Component
const FeatureButton = ({ icon: Icon, text, primary }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(iconRef.current, {
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(iconRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300 ${
        primary
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30'
          : 'border border-purple-500/30 hover:bg-purple-500/10'
      }`}
    >
      <div className="relative z-10 flex items-center justify-center">
        <div ref={iconRef} className="mr-3">
          <Icon className={`w-5 h-5 ${primary ? 'text-white' : 'text-purple-500'}`} />
        </div>
        <span className={primary ? 'text-white font-medium' : 'text-white'}>{text}</span>
      </div>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
};

// Action Buttons Component
const ActionButtons = () => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <FeatureButton icon={Dna} text="Start DNA Analysis" primary />
      <FeatureButton icon={Globe} text="Global Health Network" />
    </div>
  );
};

// LoginForm Component with enhanced styling
const LoginForm = ({ userType, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${userType} Login:`, formData);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">
        {userType === 'clinic' ? 'Clinic Login' : 'Patient Login'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          icon={Lock}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-purple-500 rounded border-gray-600 bg-gray-700"
            />
            <span className="ml-2">Remember me</span>
          </label>
          <button type="button" className="text-purple-400 hover:text-purple-300">
            Forgot Password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// SignupForm Component with enhanced validation
const SignupForm = ({ userType, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    ...(userType === 'clinic' && {
      clinicName: '',
      license: '',
      specialization: '',
      openingHours: ''
    })
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log(`${userType} Signup:`, formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">
        {userType === 'clinic' ? 'Register Your Clinic' : 'Patient Registration'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {userType === 'clinic' && (
          <>
            <InputField
              icon={Building}
              type="text"
              name="clinicName"
              placeholder="Clinic Name"
              value={formData.clinicName}
              onChange={handleChange}
              required
            />
            <InputField
              icon={Shield}
              type="text"
              name="license"
              placeholder="License Number"
              value={formData.license}
              onChange={handleChange}
              required
            />
            <InputField
              icon={Microscope}
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </>
        )}
        <InputField
          icon={User}
          type="text"
          name="name"
          placeholder={userType === 'clinic' ? "Admin Name" : "Full Name"}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputField
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          icon={Lock}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
        <InputField
          icon={Lock}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
        <InputField
          icon={Phone}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <InputField
          icon={MapPin}
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        {userType === 'clinic' && (
          <InputField
            icon={Calendar}
            type="text"
            name="openingHours"
            placeholder="Opening Hours"
            value={formData.openingHours}
            onChange={handleChange}
            required
          />
        )}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

// AuthModal Component
const AuthModal = ({ isOpen, onClose, mode }) => {
  const [userType, setUserType] = useState(null);
  const [step, setStep] = useState('select');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setUserType(null);
        setStep('select');
      }, 300);
    }
  }, [isOpen]);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep('form');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === 'select' ? (
        <AuthSelector onSelect={handleUserTypeSelect} />
      ) : (
        mode === 'login' ? (
          <LoginForm userType={userType} onClose={onClose} />
        ) : (
          <SignupForm userType={userType} onClose={onClose} />
        )
      )}
    </Modal>
  );
};

// Main LandingPage Component
const LandingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('research');

  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);

  const simulateLoading = useCallback(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            if (videoRef.current) {
              videoRef.current.play();
            }
          }, 1000);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 15);
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    simulateLoading();
  }, [simulateLoading]);

  useEffect(() => {
    if (isLoaded) {
      const tl = gsap.timeline();
      tl.from(titleRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
      })
        .from(
          subtitleRef.current,
          {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .from(
          buttonRef.current,
          {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .from(
          statsRef.current,
          {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    }
  }, [isLoaded]);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const stats = [
    { label: 'Active Users', value: '2M+' },
    { label: 'Countries', value: '32+' },
    { label: 'Medical Partners', value: '150+' },
  ];

  if (!isLoaded) {
    return <Preloader progress={Math.round(loadingProgress)} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        autoPlay
        muted
        playsInline
      >
        <source src="/assets/videos/1.mp4" type="video/mp4" />
      </video>

      {/* Auth Buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-4">
        <button
          onClick={() => openAuth('login')}
          className="px-6 py-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Login
        </button>
        <button
          onClick={() => openAuth('signup')}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:opacity-90 transition-all flex items-center gap-2"
        >
          Sign Up
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col h-full justify-center max-w-3xl lg:pl-16">
            <div className="space-y-8" ref={contentRef}>
              <div ref={titleRef}>
                <h2 className="text-gray-400 text-xl mb-4">PURPOSE OF MYDNA</h2>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
                  Detailed diagnostic
                  <br />
                  of your body
                </h1>
              </div>

              <p ref={subtitleRef} className="text-gray-400 text-xl max-w-xl">
                Health is the most important thing. So don't put it off for later. Think about your future today.
              </p>

              <div ref={buttonRef}>
                <ActionButtons />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="hidden md:block absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-white/5 border-t border-white/10"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
              <div className="grid grid-cols-2 sm:flex sm:gap-16 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-white text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                    <div className="text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Bottom Tabs */}
              <div className="flex gap-4 sm:gap-8">
                {['Research', 'Treatment', 'Prevention'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`text-base sm:text-lg transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
};

export default LandingPage;