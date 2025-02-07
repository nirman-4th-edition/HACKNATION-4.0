const Footer = () => {
  return (
    <footer className="bg-green-600 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Contact Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Krushak Bandhu</h2>
            <p className="mb-4 text-white">
              Revolonise the modern farming with AI
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+326668880000"
                  className="hover:text-gray-300 transition-colors"
                >
                  -32 666 888 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:needhelp@company.com"
                  className="hover:text-gray-300 transition-colors"
                >
                  needhelp@company.com
                </a>
              </li>
              <li className="text-white">666 road, broklyn street new york</li>
            </ul>
          </div>

          {/* News Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">News</h3>
            <div className="space-y-4">
              <div>
                <span className="text-white text-sm">31 Oct, 21</span>
                <p className="hover:text-gray-300 transition-colors cursor-pointer">
                  Agriculture Matters to the Future of next
                </p>
              </div>
              <div>
                <span className="text-white text-sm">31 Oct, 21</span>
                <p className="hover:text-gray-300 transition-colors cursor-pointer">
                  Override the digital divide with additional
                </p>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Explore</h3>
            <ul className="space-y-2">
              {[
                "New Projects",
                "Our Services",
                "About Us",
                "Get In Touch",
                "Farmers",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-white mb-4">
              Sign up now to get daily latest news & updates from us
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-gray-800 text-white px-4 py-2 rounded flex-1"
              />
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-white">© Copyright 2022 by Layerdrops.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
