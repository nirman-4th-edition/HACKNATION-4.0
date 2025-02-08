import Layout from '../../components/ContestCompo/Layout';
import ContestCard from '../../components/ContestCompo/ContestCard';
import { useContest } from '../../contexts/contest.context';
import { useEffect } from 'react';

const Home = () => {
  const { contests, getContests } = useContest();
  useEffect(() => {
    getContests();
  }, []);
  console.log("contests: ", contests);
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          Choose Your Challenge
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Select your preferred challenge format and start your coding journey today. 
          Whether you prefer quick MCQs or in-depth problem solving, we've got you covered.
        </p>
        <div className="grid md:grid-cols-2 gap-8 px-4 sm:px-6">
          {contests.map((contest, index) => (
            <ContestCard key={index} contest={contest} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;