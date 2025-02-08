// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Gem, Trophy, Gift } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // const Rewards = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="space-y-8 animate-fade-in">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-3xl font-bold">Rewards</h2>
// //         <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
// //           <Gem className="text-primary" />
// //           <span className="font-semibold">1,234 gems</span>
// //         </div>
// //       </div>

// //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         <Card className="hover:shadow-lg transition-shadow">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <Trophy className="w-5 h-5 text-yellow-500" />
// //               Daily Streak
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <p className="text-2xl font-bold mb-2">7 days</p>
// //             <p className="text-gray-600">Keep learning to earn more gems!</p>
// //           </CardContent>
// //         </Card>

// //         <Card className="hover:shadow-lg transition-shadow">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <Gift className="w-5 h-5 text-primary" />
// //               Available Rewards
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <p className="text-gray-600">Unlock exclusive rewards in the shop!</p>
// //             <Button onClick={() => navigate("/shop")}>Visit Shop</Button>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       <div className="hidden md:block">
// //         <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
// //           <polygon
// //             points="100,20 120,80 185,80 130,120 150,180 100,140 50,180 70,120 15,80 80,80"
// //             fill="#FFD700"
// //             className="animate-spin"
// //             style={{ transformOrigin: "center", animationDuration: "3s" }}
// //           />
// //           {[0, 1, 2].map((i) => (
// //             <circle
// //               key={i}
// //               cx={70 + i * 30}
// //               cy="100"
// //               r="10"
// //               fill="#6A0DAD"
// //               className="animate-pulse"
// //               style={{ animationDelay: `${i * 0.2}s` }}
// //             />
// //           ))}
// //         </svg>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Rewards;


// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Gem, Trophy, Gift, Star, BarChart2, Zap } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import { useNavigate } from "react-router-dom";

// const Rewards = () => {
//   const navigate = useNavigate();

//   // Mock data for rewards and progress
//   const totalGems = 1234;
//   const nextRewardThreshold = 2000;
//   const progressPercentage = Math.min((totalGems / nextRewardThreshold) * 100, 100);

//   const achievements = [
//     { id: 1, name: "First Lesson", completed: true },
//     { id: 2, name: "Daily Streak: 7 Days", completed: true },
//     { id: 3, name: "Earn 1000 Gems", completed: false },
//   ];

//   const dailyChallenges = [
//     { id: 1, task: "Complete 3 lessons", reward: "50 gems" },
//     { id: 2, task: "Log in for 5 consecutive days", reward: "100 gems" },
//     { id: 3, task: "Refer a friend", reward: "200 gems" },
//   ];

//   return (
//     <div className="space-y-8 animate-fade-in">
//       {/* Header Section */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold">Rewards</h2>
//         <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
//           <Gem className="text-primary" />
//           <span className="font-semibold">{totalGems} gems</span>
//         </div>
//       </div>

//       {/* Reward Progress Section */}
//       <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Star className="w-5 h-5 text-yellow-500" />
//             Next Reward Progress
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Progress value={progressPercentage} className="mb-4" />
//           <p className="text-gray-600">
//             Earn {nextRewardThreshold - totalGems} more gems to unlock your next reward!
//           </p>
//         </CardContent>
//       </Card>

//       {/* Achievements Section */}
//       <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Trophy className="w-5 h-5 text-yellow-500" />
//             Achievements
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {achievements.map((achievement) => (
//             <div key={achievement.id} className="flex items-center gap-2">
//               {achievement.completed ? (
//                 <Star className="w-4 h-4 text-green-500" />
//               ) : (
//                 <Star className="w-4 h-4 text-gray-400" />
//               )}
//               <p className={achievement.completed ? "line-through text-gray-500" : ""}>
//                 {achievement.name}
//               </p>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Daily Challenges Section */}
//       <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Zap className="w-5 h-5 text-primary" />
//             Daily Challenges
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {dailyChallenges.map((challenge) => (
//             <div key={challenge.id} className="flex items-center justify-between">
//               <p>{challenge.task}</p>
//               <span className="text-sm text-primary">{challenge.reward}</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Available Rewards Section */}
//       <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Gift className="w-5 h-5 text-primary" />
//             Available Rewards
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <p className="text-gray-600">Unlock exclusive rewards in the shop!</p>
//           <Button onClick={() => navigate("/shop")}>Visit Shop</Button>
//         </CardContent>
//       </Card>

//       {/* Leaderboard Section */}
//       <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <BarChart2 className="w-5 h-5 text-primary" />
//             Leaderboard
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-600">Coming soon! Compete with others to earn more gems.</p>
//         </CardContent>
//       </Card>

//       {/* Decorative SVG */}
//       <div className="hidden md:block">
//         <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
//           <polygon
//             points="100,20 120,80 185,80 130,120 150,180 100,140 50,180 70,120 15,80 80,80"
//             fill="#FFD700"
//             className="animate-spin"
//             style={{ transformOrigin: "center", animationDuration: "3s" }}
//           />
//           {[0, 1, 2].map((i) => (
//             <circle
//               key={i}
//               cx={70 + i * 30}
//               cy="100"
//               r="10"
//               fill="#6A0DAD"
//               className="animate-pulse"
//               style={{ animationDelay: `${i * 0.2}s` }}
//             />
//           ))}
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default Rewards;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gem, Trophy, Gift, Star, BarChart2, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const Rewards = () => {
  const navigate = useNavigate();

  // Mock data for rewards and progress
  const totalGems = 1234;
  const nextRewardThreshold = 2000;
  const progressPercentage = Math.min((totalGems / nextRewardThreshold) * 100, 100);

  const achievements = [
    { id: 1, name: "First Lesson", completed: true },
    { id: 2, name: "Daily Streak: 7 Days", completed: true },
    { id: 3, name: "Earn 1000 Gems", completed: false },
  ];

  const dailyChallenges = [
    { id: 1, task: "Complete 3 lessons", reward: "50 gems" },
    { id: 2, task: "Log in for 5 consecutive days", reward: "100 gems" },
    { id: 3, task: "Refer a friend", reward: "200 gems" },
  ];

  // Dummy leaderboard data
  const leaderboard = [
    { rank: 1, name: "Nikita", gems: 5000 },
    { rank: 2, name: "Suhana", gems: 4500 },
    { rank: 3, name: "Rudra", gems: 4000 },
    { rank: 4, name: "Aranya", gems: 3800 },
    { rank: 5, name: "Sai ayushman", gems: 3500 },
    { rank: 6, name: "Isha", gems: 3200 },
    { rank: 7, name: "Arjun", gems: 3000 },
    { rank: 8, name: "Meera", gems: 2800 },
    { rank: 9, name: "Kabir", gems: 2500 },
    { rank: 10, name: "Pooja", gems: 2200 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Rewards</h2>
        <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
          <Gem className="text-primary" />
          <span className="font-semibold">{totalGems} gems</span>
        </div>
      </div>

      {/* Reward Progress Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Next Reward Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-4" />
          <p className="text-gray-600">
            Earn {nextRewardThreshold - totalGems} more gems to unlock your next reward!
          </p>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-2">
              {achievement.completed ? (
                <Star className="w-4 h-4 text-green-500" />
              ) : (
                <Star className="w-4 h-4 text-gray-400" />
              )}
              <p className={achievement.completed ? "line-through text-gray-500" : ""}>
                {achievement.name}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Daily Challenges Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Daily Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {dailyChallenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center justify-between">
              <p>{challenge.task}</p>
              <span className="text-sm text-primary">{challenge.reward}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Rewards Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Available Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Unlock exclusive rewards in the shop!</p>
          <Button onClick={() => navigate("/shop")}>Visit Shop</Button>
        </CardContent>
      </Card>

      {/* Leaderboard Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between px-4 py-2 rounded-md"
                style={{
                  backgroundColor: user.rank === 1 ? "#FFD70020" : user.rank === 2 ? "#C0C0C020" : user.rank === 3 ? "#CD7F3220" : "#ffffff10",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{user.rank}</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-primary" />
                  <span>{user.gems} gems</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Decorative SVG */}
      <div className="hidden md:block">
        <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
          <polygon
            points="100,20 120,80 185,80 130,120 150,180 100,140 50,180 70,120 15,80 80,80"
            fill="#FFD700"
            className="animate-spin"
            style={{ transformOrigin: "center", animationDuration: "3s" }}
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={70 + i * 30}
              cy="100"
              r="10"
              fill="#6A0DAD"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Rewards;