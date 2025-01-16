import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lesson2 = () => {
  const navigate = useNavigate();

  const handleNextLesson = () => {
    navigate('/Learningprogress');  // Navigate to the next lesson
  };

  return (
    <div className="lesson">
      <h1>Lesson 2: React Router</h1>
      <p>This lesson explains how to use React Router to create navigation in your React app.</p>

      <button onClick={handleNextLesson} style={{ marginTop: '20px' }}>
        Next Lesson
      </button>
    </div>
  );
};

export default Lesson2;
