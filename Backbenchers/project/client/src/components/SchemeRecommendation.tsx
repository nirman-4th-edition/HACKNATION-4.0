import { useEffect, useState } from "react";
import axios from "axios";

interface Scheme {
  name: string;
  description: string;
  link?: string;
}

const SchemeRecommendations = () => {
  const [userData, setUserData] = useState<any>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const profileId = localStorage.getItem("profileId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${profileId}`);
        setUserData(response.data);
        recommendSchemes(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [profileId]);

  const recommendSchemes = (userData: any) => {
    const recommended: Scheme[] = [];

    // 🧓 Senior Citizens Schemes
    if (userData.age >= 60) {
      recommended.push({
        name: "Varishtha Pension Bima Yojana",
        description: "A pension scheme for senior citizens by LIC.",
        link: "https://licindia.in",
      });
      recommended.push({
        name: "Indira Gandhi National Old Age Pension Scheme",
        description: "Financial assistance for senior citizens from economically weaker sections.",
        link: "https://nsap.nic.in",
      });
    }

    // 🏡 Residence-Based Schemes
    if (userData.residenceType === "Urban") {
      recommended.push({
        name: "Pradhan Mantri Awas Yojana (Urban)",
        description: "Affordable housing for urban residents.",
        link: "https://pmaymis.gov.in",
      });
    } else if (userData.residenceType === "Rural") {
      recommended.push({
        name: "Pradhan Mantri Awas Yojana (Gramin)",
        description: "Affordable housing for rural residents.",
        link: "https://pmayg.nic.in",
      });
      recommended.push({
        name: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
        description: "Guaranteed 100 days of wage employment for rural households.",
        link: "https://nrega.nic.in",
      });
    }

    // 💰 Income-Based Schemes
    if (userData.annualIncome < 200000) {
      recommended.push({
        name: "Rashtriya Swasthya Bima Yojana (RSBY)",
        description: "Health insurance for Below Poverty Line (BPL) families.",
        link: "https://www.rsby.gov.in",
      });
      recommended.push({
        name: "Odisha KALIA Yojana",
        description: "Financial aid to small farmers in Odisha.",
        link: "https://kalia.odisha.gov.in",
      });
    }

    if (userData.annualIncome > 500000) {
      recommended.push({
        name: "Atal Pension Yojana",
        description: "Retirement savings scheme for individuals with regular income.",
        link: "https://npscra.nsdl.co.in",
      });
    }

    // 👨‍👩‍👧‍👦 Schemes for Families & Dependents
    if (userData.numberOfDependants > 2) {
      recommended.push({
        name: "Pradhan Mantri Matru Vandana Yojana",
        description: "Maternity benefits for pregnant and lactating women.",
        link: "https://wcd.nic.in",
      });
      recommended.push({
        name: "Odisha Mamata Scheme",
        description: "Financial assistance to pregnant women in Odisha.",
        link: "https://wcd.odisha.gov.in",
      });
    }

    setSchemes(recommended);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Recommended Government Schemes
        </h1>
        {userData ? (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Age:</strong> {userData.age}
            </p>
            <p>
              <strong>Residence Type:</strong> {userData.residenceType}
            </p>
            <p>
              <strong>Annual Income:</strong> ₹{userData.annualIncome}
            </p>
            <p>
              <strong>Dependants:</strong> {userData.numberOfDependants}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user data...</p>
        )}

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Schemes for You</h2>
          {schemes.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.map((scheme, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
                  <h3 className="font-bold text-lg text-blue-600">{scheme.name}</h3>
                  <p className="text-gray-700">{scheme.description}</p>
                  {scheme.link && (
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No schemes available for your profile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeRecommendations;
