import React from 'react'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-200 text-gray-900 pt-40 pb-10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8">Transforming Construction Waste into Sustainable Solutions</h1>
          <h2 className="text-2xl mb-20">AI-powered waste categorization, recycling solutions, and digital marketplace</h2>
          <a href="#abstract" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl transition duration-300">Get Started</a>
        </div>
      </section>

      <section id="abstract" className="bg-amber-50 text-gray-950 font-bold py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Abstract</h2>
          <p className="text-xl mb-4">
            Discover how we are solving the waste management problem in construction. Our platform leverages AI technology to categorize construction waste, provide recycling solutions, and create a digital marketplace for buying and selling recycled materials. By integrating advanced recycling methods and geolocation-based services, we help locate nearby recycling centers for proper waste disposal and management. Join us in our mission to create a sustainable future in the construction industry.
          </p>
          <a href="./Abstract.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-lg hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
            Read Full Abstract
          </a>
          <br />
          <a href="https://docs.google.com/presentation/d/14FspyI3Yj9bcJ8wW9WnFLC0iVQH3nHY-/edit?usp=sharing&ouid=102189004574494008349&rtpof=true&sd=true" 
             target="_blank" rel="noopener noreferrer" 
             className="text-green-600 hover:underline text-lg hover:text-green-800 transform hover:scale-105 transition-all duration-300 mt-4 inline-block">
            See the full PowerPoint presentation
          </a>
        </div>
      </section>

      <section id="features" className="bg-gray-100 text-gray-800 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Key Features</h2>
          <div className="space-y-10">
            <Feature title="Waste Classifier" 
                     description="Our AI-powered waste classifier accurately categorizes various types of construction waste, enabling efficient sorting and recycling." />
            <Feature title="Digital Marketplace" 
                     description="Buy and sell recycled construction materials through our structured digital marketplace, promoting sustainable practices." 
                     reverse />
            <Feature title="Recycling Facility Finder" 
                     description="Locate nearby recycling centers using our geolocation-based service, ensuring proper waste disposal and management." />
            <Feature title="Environmental Impact Tracker" 
                     description="Track the environmental impact of your waste management efforts, including metrics like tons of waste recycled and carbon emissions reduced." 
                     reverse />
          </div>
        </div>
      </section>

      <section id="statistics" className="bg-white text-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
          <Statistic number="123,456" label="Tons of Waste Recycled" />
          <Statistic number="789,000 kg" label="Carbon Emissions Reduced" />
        </div>
      </section>

      <section id="testimonials" className="bg-gray-100 text-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <Testimonial quote="Using this platform, we've significantly improved our waste management practices. It's a game-changer!" author="ABC Constructions" />
          <Testimonial quote="The AI-powered waste categorization has made our recycling process so much more efficient." author="XYZ Industries" />
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <p>Contact us: info@cdwastemanagement.com</p>
          <div className="flex justify-center space-x-4 mt-4">
            <SocialLink href="#" label="Facebook" />
            <SocialLink href="#" label="Twitter" />
            <SocialLink href="#" label="LinkedIn" />
          </div>
        </div>
      </footer>
    </>
  )
}

const Feature = ({ title, description, reverse }) => (
  <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center justify-center text-center md:text-${reverse ? 'right' : 'left'}`}>
    <img src="https://static.vecteezy.com/system/resources/previews/000/354/597/original/waste-vector-icon.jpg" alt={title} className="w-16 h-16 mx-4" />
    <div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  </div>
)

const Statistic = ({ number, label }) => (
  <div className="flex flex-col md:flex-row items-center justify-center mb-6">
    <div className="text-5xl font-bold text-blue-500 mr-4 md:mr-8">{number}</div>
    <div className="text-xl">{label}</div>
  </div>
)

const Testimonial = ({ quote, author }) => (
  <div className="bg-white p-6 rounded shadow-md">
    <p className="text-xl italic">"{quote}"</p>
    <p className="mt-4 text-lg font-bold">- {author}</p>
  </div>
)

const SocialLink = ({ href, label }) => (
  <a href={href} className="hover:underline text-lg transition duration-300">{label}</a>
)

export default Home
