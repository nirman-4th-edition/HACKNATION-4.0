const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Array of quiz questions
const questions = [
  {
    id: 1,
    question: " Which famous dance form originated in Odisha and is known for its graceful movements?",
    options: ["Kathak", "Bharatanatyam", "Odissi", "Kuchipudi"],
    answer: "Odissi",
  },
  {
    id: 2,
    question: "What is the famous sweet dish of Odisha, especially known from Pahala near Bhubaneswar?",
    options: ["Sandesh", "Chhena Poda", "Mysore Pak", "Rasmalai"],
    answer: "Chhena Poda",
  },
  {
    id: 3,
    question: "Which ancient temple in Odisha is dedicated to Lord Jagannath and hosts the famous Rath Yatra?",
    options: ["Konark Sun Temple", "Lingaraj Temple", "Jagannath Temple", "Mukteshwar Temple"],
    answer: "Jagannath Temple",
  },
  {
    id: 4,
    question: "Which UNESCO World Heritage Site in Odisha is famous for its intricate carvings and chariot-like structure?",
    options: ["Sun Temple, Konark", "Jagannath Temple, Puri", "Udayagiri Caves", "Hirakud Dam"],
    answer: "Sun Temple, Konark",
  },
  {
    id: 5,
    question: "What is the name of Odisha’s traditional handwoven fabric, famous for its intricate tie-dye patterns?",
    options: ["Chikankari", "Pashmina", "Sambalpuri Ikat", "Banarasi"],
    answer: "Sambalpuri Ikat",
  },
  {
    id: 6,
    question: "Chilika Lake in Odisha is famous for which unique natural phenomenon?",
    options: ["Largest coral reef in India", "Migratory birds from Siberia", "Floating markets", "Underground caves"],
    answer: "Migratory birds from Siberia",
  },
  {
    id: 7,
    question: "Who was the first Chief Minister of Odisha after it became a separate province in 1936?",
    options: ["Biju Patnaik", "Nabakrushna Choudhuri", "Harekrushna Mahatab", "Nilamani Routray"],
    answer: "Harekrushna Mahatab",
  },
  {
    id: 8,
    question: "The famous Bali Yatra festival in Odisha celebrates which historical event?",
    options: ["The victory of Kalinga in the Mahabharata", "The maritime trade between Odisha and Southeast Asia", "The coronation of Odisha’s first king", "The construction of Jagannath Temple"],
    answer: "The maritime trade between Odisha and Southeast Asia",
  },
  {
    id: 9,
    question: "The Hirakud Dam, one of the longest dams in the world, is built on which river?",
    options: ["Mahanadi", "Brahmani", "Baitarani", "Subarnarekha"],
    answer: "Mahanadi",
  },
  {
    id: 10,
    question: "What is the famous tribal festival of Odisha, celebrated with dance and music by the local tribes?",
    options: ["Nuakhai", "Raja Parba", "Chhau Festival", "Dhanuyatra"],
    answer: "Nuakhai",
  }
];

// API endpoint to get questions
app.get("/questions", (req, res) => {
  res.json(questions);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
