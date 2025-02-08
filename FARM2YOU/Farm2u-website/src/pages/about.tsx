import React from "react";
import NavMenuBar from "@/components/NavMenuBar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import teamImg from "../assets/Team.jpg";
import member1 from "../assets/chhayakanta.jpg";
import member2 from "../assets/baibhab.jpg";
import member3 from "../assets/pranjal.jpg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer_1 from "@/components/footer";

const AboutUs: React.FC = () => {
  return (
    <>
      <NavMenuBar />
      <div className="p-6 bg-gray-50 min-h-screen text-gray-800 font-sans animate-fade-in">
        
        {/* Section 1: Who We Are */}
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Card className="md:w-1/2 bg-white shadow-lg p-6 rounded-lg border-l-4 border-green-700">
            <CardContent>
              <p className="text-green-700 font-semibold uppercase text-sm">Who We Are</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-2">
                Discover <span className="text-green-800">Our Identity</span> and
                <span className="bg-gradient-to-r from-green-700 to-green-500 text-transparent bg-clip-text">
                  What We Stand For
                </span>
              </h1>
              <p className="text-gray-600 mt-4 text-lg">
                We are a dedicated team committed to bridging the gap between farmers and technology, 
                delivering seamless and innovative solutions.
              </p>
            
            <Link to="/feedback">
              <Button size="lg" className="bg-white text-forest hover:bg-forest-light hover:text-white">
              Let's Talk <ArrowRight className="ml-2" />
              </Button>
            </Link>
            </CardContent>
          </Card>

          <Card className="md:w-1/2 bg-white shadow-lg p-6 rounded-lg flex justify-center relative">
            <div className="absolute bg-green-200/50 w-72 h-72 md:w-[450px] md:h-[300px] rounded-full -z-10"></div>
            <img 
              src={teamImg} 
              alt="Team" 
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg border-2 border-green-700" 
            />
          </Card>
        </motion.div>

        {/* Section 2: Our Mission */}
        <motion.div 
          className="bg-green-100 p-8 rounded-lg shadow-md text-center"
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-900">Our Mission</h2>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Our goal is to empower farmers with AI-driven insights, optimize productivity, 
            and foster a sustainable future through technology.
          </p>
        </motion.div>

        {/* Section 3: Our Team */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <Card className="p-4 bg-white shadow-lg rounded-lg">
              <CardContent className="flex flex-col items-center">
                <img src={member1} alt="Member 1" className="w-32 h-32 rounded-full shadow-md" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">CHHAYAKANTA DASH</h3>
                <p className="text-sm text-gray-600">Founder & CEO</p>
              </CardContent>
            </Card>
            
            {/* Team Member 2 */}
            <Card className="p-4 bg-white shadow-lg rounded-lg">
              <CardContent className="flex flex-col items-center">
                <img src={member2} alt="Member 2" className="w-32 h-32 rounded-full shadow-md" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">BAIBHAB SAHU</h3>
                <p className="text-sm text-gray-600">AI Engineer</p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="p-4 bg-white shadow-lg rounded-lg">
              <CardContent className="flex flex-col items-center">
                <img src={member3} alt="Member 3" className="w-32 h-32 rounded-full shadow-md" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">PRANJAL PANDA</h3>
                <p className="text-sm text-gray-600">UI/UX Designer</p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="p-4 bg-white shadow-lg rounded-lg">
              <CardContent className="flex flex-col items-center">
                <img src="/assets/team3.jpg" alt="Member 3" className="w-32 h-32 rounded-full shadow-md" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">SOUMYA SUNDAR</h3>
                <p className="text-sm text-gray-600">SOFTWARE DEVELOPER</p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="p-4 bg-white shadow-lg rounded-lg">
              <CardContent className="flex flex-col items-center">
                <img src="/assets/team3.jpg" alt="Member 3" className="w-32 h-32 rounded-full shadow-md" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">BANSIKRISHNA </h3>
                <p className="text-sm text-gray-600">FULL-STACK DEVELOPER</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Section 4: Our Journey */}
        <motion.div 
          className="mt-12 p-8 bg-green-100 rounded-lg shadow-md text-center"
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-900">Our Journey</h2>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            From a simple idea to a full-fledged AI-powered platform, our journey has been driven by 
            innovation and a deep commitment to revolutionizing the agricultural sector.
          </p>
        </motion.div>

      </div>
      <Footer_1 />
    </>
  );
};

export default AboutUs;
