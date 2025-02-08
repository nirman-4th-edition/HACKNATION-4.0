const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 w-full">
        <div className="container mx-auto text-center">
          <p className="text-gray-300">&copy; 2025 Your Website. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="/about" className="hover:text-gray-400 transition">About Us</a>
            <span className="text-gray-500">|</span>
            <a href="/terms" className="hover:text-gray-400 transition">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  