// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import './MovementData.css'; // Add CSS for the skeleton

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const MovementData: React.FC = () => {
//   const [currentPrice, setCurrentPrice] = useState<number | null>(null);
//   const [historicalData, setHistoricalData] = useState<number[][] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch current price
//         const priceResponse = await axios.get(
//           'https://api.coingecko.com/api/v3/simple/price?ids=movement&vs_currencies=usd'
//         );
//         setCurrentPrice(priceResponse.data.movement.usd);

//         // Fetch historical price data
//         const historicalResponse = await axios.get(
//           'https://api.coingecko.com/api/v3/coins/movement/market_chart?vs_currency=usd&days=7'
//         );
//         setHistoricalData(historicalResponse.data.prices); // Array of [timestamp, price]
//       } catch (err: any) {
//         console.error('Error fetching data:', err.message || err);
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   // Prepare data for the chart
//   const chartData = {
//     labels: historicalData?.map(([timestamp]) => {
//       const date = new Date(timestamp);
//       return `${date.getDate()}/${date.getMonth() + 1}`; // Format: DD/MM
//     }),
//     datasets: [
//       {
//         label: 'Movement Price (USD)',
//         data: historicalData?.map(([_, price]) => price),
//         borderColor: 'rgb(255, 213, 0)',
        
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Movement Token Price (Last 7 Days)',
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Movement Token Data</h2>

//       {/* Display Current Price */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Current Price:</h3>
//         {loading ? (
//           <div className="skeleton skeleton-text"></div> // Skeleton for current price
//         ) : (
//           <p>${currentPrice?.toFixed(2)} USD</p>
//         )}
//       </div>

//       {/* Display Historical Chart */}
//       <div>
//         <h3>Price History (Last 7 Days):</h3>
//         {loading ? (
//           <div className="skeleton skeleton-chart"></div> // Skeleton for chart
//         ) : (
//           <Line data={chartData} options={chartOptions} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovementData;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './MovementData.css'; // Add CSS for the skeleton and scrollable container

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MovementData: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data with retries
  const fetchDataWithRetry = async (retries: number = 3) => {
    let attempt = 0;
    let success = false;
    let errorMessage = '';
    
    while (attempt < retries && !success) {
      try {
        // Fetch current price
        const priceResponse = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=movement&vs_currencies=usd'
        );
        setCurrentPrice(priceResponse.data.movement.usd);

        // Fetch historical price data
        const historicalResponse = await axios.get(
          'https://api.coingecko.com/api/v3/coins/movement/market_chart?vs_currency=usd&days=7'
        );
        setHistoricalData(historicalResponse.data.prices); // Array of [timestamp, price]
        
        success = true; // If both requests succeed, mark success
      } catch (err: any) {
        errorMessage = err.message || 'Error fetching data';
        attempt += 1; // Increment attempt count
        console.error('Attempt', attempt, errorMessage);
        if (attempt >= retries) {
          setError(errorMessage); // After all attempts, set error message
        }
      }
    }
    setLoading(false); // End loading after all attempts
  };

  useEffect(() => {
    fetchDataWithRetry(); // Call fetchDataWithRetry to try fetching data
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Prepare data for the chart
  const chartData = {
    labels: historicalData?.map(([timestamp]) => {
      const date = new Date(timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}`; // Format: DD/MM
    }),
    datasets: [
      {
        label: 'Movement Price (USD)',
        data: historicalData?.map(([_, price]) => price),
        borderColor: 'rgb(255, 213, 0)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart resizing
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Movement Token Price (Last 7 Days)',
      },
    },
  };

  return (
    <div>
      <h2>Movement Token Data</h2>

      {/* Display Current Price */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Price:</h3>
        {loading ? (
          <div className="skeleton skeleton-text"></div> // Skeleton for current price
        ) : (
          <p>${currentPrice?.toFixed(2)} USD</p>
        )}
      </div>

      {/* Display Historical Chart */}
      <div>
        <h3>Price History (Last 7 Days):</h3>
        {loading ? (
          <div className="skeleton skeleton-chart"></div> // Skeleton for chart
        ) : (
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovementData;
