import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lesson1 = () => {
  const navigate = useNavigate();

  const handleNextLesson = () => {
    navigate('/Learningprogress');  // Navigate to the next lesson
  };

  return (
    <div className="lesson">
      <h1>Lesson 1: Basics of React</h1>
      <p>This lesson covers the fundamentals of React, including components, JSX, and state management.</p>

      <button onClick={handleNextLesson} style={{ marginTop: '20px' }}>
        Next Lesson
      </button>
    </div>
  );
};

export default Lesson1;
