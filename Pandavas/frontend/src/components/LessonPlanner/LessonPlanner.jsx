import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function LessonPlanner() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('');
  const [learningObjectives, setLearningObjectives] = useState('');
  const [customization, setCustomization] = useState('');
  const [lessonPlan, setLessonPlan] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check required fields
    if (!subject || !topic || !grade || !duration || !learningObjectives) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setLessonPlan('');

    const payload = {
      subject,
      topic,
      grade,
      duration,
      learning_objectives: learningObjectives,
      customization
    };

    try {
      const response = await fetch('http://localhost:5001/lessonplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        setError(errText || 'An error occurred while generating the lesson plan.');
        return;
      }

      // Read the stream from the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          // Update the lesson plan display as new chunks arrive
          setLessonPlan(accumulatedText);
        }
      }
    } catch (err) {
      setError('An error occurred while generating the lesson plan.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Studybuddy Lesson Planner</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label>Grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Learning Objectives:</label>
          <textarea
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
          />
        </div>
        <div>
          <label>Customization:</label>
          <textarea
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
          />
        </div>
        <button type="submit">Generate Lesson Plan</button>
      </form>
      {lessonPlan && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Generated Lesson Plan</h2>
          <ReactMarkdown>{lessonPlan}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default LessonPlanner;
