// // import React, { useState } from 'react';
// // import './learningRoadmap.css';

// // const LearningRoadmap = () => {
// //   const [completedSteps, setCompletedSteps] = useState<number>(0);

// //   const handleStepClick = (step: number) => {
// //     // Only allow the user to complete the next step if the previous one is completed
// //     if (completedSteps === step - 1) {
// //       setCompletedSteps(step);
// //     }
// //   };

// //   const progressPercentage = (completedSteps / 6) * 100;

// //   return (
// //     <div className="roadmap">
// //       <h1>Learning Roadmap</h1>
// //       <div className="progress-bar-container">
// //         <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
// //       </div>
// //       <ul>
// //         {['Basics of React', 'React Router', 'State Management', 'Styling in React', 'API Integration', 'Advanced Topics'].map((step, index) => (
// //           <li
// //             key={index}
// //             className={`step ${completedSteps > index ? 'completed' : ''}`}
// //             onClick={() => handleStepClick(index + 1)}
// //             style={{
// //               cursor: completedSteps >= index ? 'pointer' : 'not-allowed', // Disable click on future steps
// //               opacity: completedSteps >= index ? 1 : 0.6, // Make uncompleted steps look faded
// //             }}
// //           >
// //             <h2>{index + 1}. {step}</h2>
// //             <p>{`Learn the concepts and skills in this step.`}</p>
// //             {completedSteps < index && (
// //               <small style={{ color: 'red', fontStyle: 'italic' }}>
// //                 Please complete previous steps first.
// //               </small>
// //             )}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default LearningRoadmap;
// import React, { useState, useEffect } from 'react';
// import './learningRoadmap.css';

// const LearningRoadmap = () => {
//   // Get the completed steps from localStorage or default to 0 if not available
//   const [completedSteps, setCompletedSteps] = useState<number>(Number(localStorage.getItem('completedSteps')) || 0);

//   // Save the completed steps to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('completedSteps', completedSteps.toString());
//   }, [completedSteps]);

//   const handleStepClick = (step: number) => {
//     // Only allow progression to the next step if the previous step is completed
//     if (completedSteps === step - 1) {
//       setCompletedSteps(step);
//     }
//   };

//   const handleGoBack = () => {
//     // Reset the completed steps to 0 when the "Go Back" button is clicked
//     setCompletedSteps(0);
//     localStorage.setItem('completedSteps', '0');  // Update localStorage as well
//   };

//   const progressPercentage = (completedSteps / 6) * 100;

//   return (
//     <div className="roadmap">
//       <h1>Learning Roadmap</h1>
//       <div className="progress-bar-container">
//         <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
//       </div>
//       <ul>
//         {['Basics of React', 'React Router', 'State Management', 'Styling in React', 'API Integration', 'Advanced Topics'].map((step, index) => (
//           <li
//             key={index}
//             className={`step ${completedSteps > index ? 'completed' : ''}`}
//             onClick={() => handleStepClick(index + 1)}
//             style={{
//               cursor: completedSteps >= index ? 'pointer' : 'not-allowed',
//               opacity: completedSteps >= index ? 1 : 0.6,
//             }}
//           >
//             <h2>{index + 1}. {step}</h2>
//             <p>{`Learn the concepts and skills in this step.`}</p>
//             {completedSteps < index && (
//               <small style={{ color: 'red', fontStyle: 'italic' }}>
//                 Please complete previous steps first.
//               </small>
//             )}
//           </li>
//         ))}
//       </ul>

//       {completedSteps === 6 && (
//         <button onClick={handleGoBack} style={{ marginTop: '20px' }}>
//           Go Back
//         </button>
//       )}
//     </div>
//   );
// };

// export default LearningRoadmap;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './learningRoadmap.css';

const LearningRoadmap = () => {
  const [completedSteps, setCompletedSteps] = useState<number>(Number(localStorage.getItem('completedSteps')) || 0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('completedSteps', completedSteps.toString());
  }, [completedSteps]);

  const handleGoBack = () => {
    setCompletedSteps(0);
    localStorage.setItem('completedSteps', '0');
  };

  const progressPercentage = (completedSteps / 6) * 100;

  const handleNextLesson = () => {
    if (completedSteps < 6) {
      setCompletedSteps(completedSteps + 1);
      navigate(`/lesson-${completedSteps + 1}`);
    }
  };

  return (
    <div className="roadmap">
      <h1>Learning Roadmap</h1>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="card-container">
        {['Basics of React', 'React Router', 'State Management', 'Styling in React', 'API Integration', 'Advanced Topics'].map((step, index) => (
          <div
            key={index}
            className={`card ${completedSteps > index ? 'completed' : ''}`}
            style={{
              opacity: completedSteps >= index ? 1 : 0.6,
            }}
          >
            <h2>{index + 1}. {step}</h2>
            <p>{`Learn the concepts and skills in this step.`}</p>

            {completedSteps < index && (
              <small style={{ color: 'red', fontStyle: 'italic' }}>
                Please complete previous steps first.
              </small>
            )}

            <div>
              {completedSteps === index && (
                <button onClick={handleNextLesson} style={{ marginTop: '10px' }}>
                  Next Lesson
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {completedSteps === 6 && (
        <button onClick={handleGoBack} style={{ marginTop: '20px' }}>
          Go Back
        </button>
      )}
    </div>
  );
};

export default LearningRoadmap;
