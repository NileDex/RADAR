import React, { useEffect, useState } from 'react';
import './TrendingCoins.css'; // External CSS file for styling
import axios from 'axios';

// Define types for the coin and the API response
interface Coin {
  item: {
    id: string;
    name: string;
    symbol: string;
    small: string;
  };
  price: number;
  change: number;
}

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        const coins = response.data.coins;

        const coinIds = coins.map((coin: any) => coin.item.id).join(',');  // Avoid using `any` if you have better type info

        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
        );

        const coinsWithPrices = coins.map((coin: any) => ({
          ...coin,
          price: priceResponse.data[coin.item.id]?.usd || 0,
          change: priceResponse.data[coin.item.id]?.usd_24h_change || 0,
        }));

        setTrendingCoins(coinsWithPrices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div className="trending-coins-container">
      {loading ? (
        <p>Loading trending coins...</p>
      ) : (
        <div className="marquee">
          <div className="marquee-content">
            {trendingCoins.map((coin) => (
              <div className="coin-item" key={coin.item.id}>
                <img
                  src={coin.item.small}
                  alt={coin.item.name}
                  className="coin-icon"
                />
                <span className="coin-name">{coin.item.name}</span>
                <span className="coin-symbol">({coin.item.symbol.toUpperCase()})</span>
                <span className="coin-price">${coin.price.toFixed(2)}</span>
                <span
                  className={`coin-change ${coin.change > 0 ? 'pumping' : 'dipping'}`}
                >
                  {coin.change > 0 ? `+${coin.change.toFixed(2)}%` : `${coin.change.toFixed(2)}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingCoins;
