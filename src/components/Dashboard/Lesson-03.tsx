import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lesson3 = () => {
  const navigate = useNavigate();

  const handleNextLesson = () => {
    navigate('/Learningprogress');
  };

  return (
    <div className="lesson">
      <h1>Lesson 3: State Management</h1>
      <p>This lesson covers the concepts of state management in React.</p>

      <button onClick={handleNextLesson} style={{ marginTop: '20px' }}>
        Next Lesson
      </button>
    </div>
  );
};

export default Lesson3;
