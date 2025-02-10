import React from "react";

const About = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
      padding: "20px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    card: {
      background: "white",
      padding: "20px",
      maxWidth: "800px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    text: {
      fontSize: "1.1rem",
      color: "#555",
      marginBottom: "15px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About StudyBuddy</h1>
      <div style={styles.card}>
        <p style={styles.text}>
          Welcome to StudyBuddy – Your AI-powered personal learning assistant! Our mission
          is to help students achieve their academic goals with smart time management,
          interactive learning tools, and personalized study plans.
        </p>
        <p style={styles.text}>
          <strong>Time Management & Productivity:</strong> StudyBuddy ensures students make the best use of their
          time with AI-driven scheduling, goal tracking, and task prioritization. Our platform
          helps learners stay organized and focused on their studies.
        </p>
        <p style={styles.text}>
          <strong>Smart AI Summarizers:</strong> Our advanced AI can summarize PDFs, web pages, and YouTube videos,
          allowing students to grasp key insights quickly without having to go through lengthy materials.
        </p>
        <p style={styles.text}>
          <strong>Interactive Q&A Forum:</strong> Engage with peers and educators through our discussion forum.
          Ask questions, share knowledge, and get answers instantly from a community of learners.
        </p>
        <p style={styles.text}>
          <strong>Mock Tests & Performance Analysis:</strong> Prepare effectively with custom mock tests and detailed
          performance analytics. Identify strengths and areas for improvement with AI-generated insights.
        </p>
        <p style={styles.text}>
          <strong>Smart Lesson Planning:</strong> Get AI-powered personalized study plans that adapt to your learning
          pace, helping you efficiently cover topics and stay ahead of deadlines.
        </p>
        <p style={styles.text}>
          <strong>Pomodoro Focus Mode:</strong> Improve concentration with StudyBuddy's Pomodoro mode, which enhances
          productivity by incorporating structured study and break intervals.
        </p>
      </div>
    </div>
  );
};

export default About;
