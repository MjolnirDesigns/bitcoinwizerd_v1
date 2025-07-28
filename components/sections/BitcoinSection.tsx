// app/components/sections/BitcoinSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBitcoin } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import { Chart } from "react-chartjs-2";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial"; // Import candlestick-specific components

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, TimeScale, CandlestickController, CandlestickElement);

interface PriceData {
  x: string; // Date/time
  y: number; // Price for line chart
}

interface CandleData {
  x: string; // Date
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
}

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BitcoinSection: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState({
    name: "Bitcoin",
    symbol: "BTC",
    price: "$0.00",
    marketCap: "$0",
    volume24h: "$0",
    change24h: "0.00%",
  });
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label?: string;
      data: (PriceData | CandleData)[];
      borderColor: string;
      backgroundColor?: string;
      fill?: boolean;
      tension?: number;
      borderWidth?: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "BTC Price",
        data: [],
        borderColor: "#00cc00",
        backgroundColor: "rgba(0, 204, 0, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  });
  const [timeRange, setTimeRange] = useState("1D");
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const btcData = data[0];
        setBitcoinData({
          name: "Bitcoin",
          symbol: "BTC",
          price: `$${btcData.current_price.toLocaleString()}`,
          marketCap: `$${btcData.market_cap.toLocaleString()}T`,
          volume24h: `$${btcData.total_volume.toLocaleString()}B`,
          change24h: `${btcData.price_change_percentage_24h.toFixed(2)}%`,
        });
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error);
        // Fallback to static price if API fails
        setBitcoinData(prev => ({
          ...prev,
          price: "$107,000", // Approximate real-time price as fallback
        }));
      }
    };

    const fetchChartData = async (range: string) => {
      try {
        let days;
        switch (range) {
          case "1H":
            days = 1;
            break;
          case "1D":
            days = 1;
            break;
          case "1W":
            days = 7;
            break;
          case "1M":
            days = 30;
            break;
          case "1Y":
            days = 365;
            break;
          default:
            days = 1;
        }

        if (chartType === "line") {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`
          );
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}, details: ${errorText}`);
            const fallbackData: PriceData[] = [
              { x: "09:00", y: 107000 },
              { x: "10:00", y: 107100 },
              { x: "11:00", y: 106900 },
              { x: "12:00", y: 107200 },
            ];
            setChartData({
              labels: fallbackData.map(d => d.x),
              datasets: [{ label: "BTC Price", data: fallbackData, borderColor: "#00cc00", backgroundColor: "rgba(0, 204, 0, 0.2)", fill: true, tension: 0.1 }],
            });
            return;
          }
          const data = await response.json();
          console.log("API Response:", data);
          const prices = data.prices || [];
          if (prices.length === 0) {
            console.warn("No price data received from API");
            setChartData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: [] }] }));
            return;
          }
          const priceData = prices.map((p: [number, number]) => ({
            x: new Date(p[0]).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }),
            y: p[1], // Close price
          }));
          setChartData({
            labels: priceData.map((d: PriceData) => d.x),
            datasets: [
              {
                label: "BTC Price",
                data: priceData,
                borderColor: "#00cc00",
                backgroundColor: "rgba(0, 204, 0, 0.2)",
                fill: true,
                tension: 0.1,
              },
            ],
          });
        } else {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=${days}`
          );
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}, details: ${errorText}`);
            const fallbackData: CandleData[] = [
              { x: "06/27/25", o: 106800, h: 107200, l: 106500, c: 107000 },
              { x: "06/26/25", o: 106500, h: 106900, l: 106200, c: 106700 },
            ];
            setChartData({
              labels: fallbackData.map(d => d.x),
              datasets: [{ data: fallbackData, borderColor: "#00cc00", backgroundColor: "rgba(0, 204, 0, 0.5)", borderWidth: 1 }],
            });
            return;
          }
          const data = await response.json();
          console.log("Candle API Response:", data);
          const ohlcData = data.map((p: [number, number, number, number, number]) => ({
            x: new Date(p[0]).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }),
            o: p[1], // Open
            h: p[2], // High
            l: p[3], // Low
            c: p[4], // Close
          }));
          setChartData({
            labels: ohlcData.map((d: CandleData) => d.x),
            datasets: [
              {
                data: ohlcData,
                borderColor: "#00cc00",
                backgroundColor: "rgba(0, 204, 0, 0.5)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchBitcoinData();
    fetchChartData(timeRange);
    const interval = setInterval(() => {
      fetchBitcoinData();
      fetchChartData(timeRange);
    }, 60000); // Updated to 1 minute (60,000 ms) for more frequent updates within free tier limits
    return () => clearInterval(interval);
  }, [timeRange, chartType]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 180,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: "category" as const,
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "#ffffff",
          maxRotation: 0,
          padding: 20,
          autoSkip: false,
        },
        position: "bottom" as const,
      },
      y: {
        type: "linear" as const,
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "#ffffff",
          callback: (value: number | string) => `$${Number(value).toLocaleString()}`,
        },
        position: "right" as const,
      },
    },
    backgroundColor: "#1a1a1a",
  };

  const candleOptions = {
    ...chartOptions,
    scales: {
      x: { ...chartOptions.scales.x },
      y: { ...chartOptions.scales.y },
    },
  };

  return (
    <section className="bg-wizerd-darkestgrey py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Animated High-Tech Header Container */}
        <motion.div
          className="relative bg-bitcoin-orange rounded-lg p-2 sm:p-4 mb-8 shadow-lg overflow-hidden custom-projects-shadow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Bezel Effect with Pseudo-elements */}
          <div className="absolute inset-0 border-2 border-bitcoin-orange/50 rounded-lg transform translate-z-0"></div>
          <div className="absolute inset-1 border border-white/10 rounded-lg transform translate-z-1"></div>
          {/* Header */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-ubuntu text-white text-center z-10 relative">
            Bitcoin
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-bitcoin-orange mb-3 flex items-center">
              <FaBitcoin className="mr-2 text-yellow-500" /> Bitcoin (BTC)
            </h2>
            <hr className="border-t border-gray-600 my-3" />
            <p className="text-4xl font-bold text-white mb-2">{bitcoinData.price}</p>
            <p
              className={`${
                bitcoinData.change24h.startsWith("-")
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {bitcoinData.change24h}
            </p>
            <div className="mt-4">
              <p className="text-gray-400">
                Market Cap: <span className="text-white">{bitcoinData.marketCap}</span>
              </p>
              <p className="text-gray-400">
                24h Volume: <span className="text-white">{bitcoinData.volume24h}</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 h-96 relative overflow-hidden">
            <h3 className="text-2xl font-semibold text-bitcoin-orange mb-2">Price Chart</h3>
            <hr className="border-t border-gray-600" />
            <div className="absolute top-2 right-2 flex space-x-2">
              <label htmlFor="bitcoin-time-range" className="sr-only">
                Select time range
              </label>
              <select
                id="bitcoin-time-range"
                aria-label="Select time range"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-700 text-white p-1 rounded border border-gray-600 appearance-none w-20"
              >
                <option value="1H">1H</option>
                <option value="1D">1D</option>
                <option value="1W">1W</option>
                <option value="1M">1M</option>
                <option value="1Y">1Y</option>
              </select>
              <label htmlFor="bitcoin-chart-type" className="sr-only">
                Select chart type
              </label>
              <select
                id="bitcoin-chart-type"
                aria-label="Select chart type"
                value={chartType}
                onChange={(e) => setChartType(e.target.value as "line" | "candlestick")}
                className="bg-gray-700 text-white p-1 rounded border border-gray-600 appearance-none"
              >
                <option value="line">Line</option>
                <option value="candlestick">Candlestick</option>
              </select>
            </div>
            <div className="h-full pt-2">
              <Chart
                type={chartType}
                data={chartData}
                options={chartType === "line" ? chartOptions : candleOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BitcoinSection;

/* Add this CSS to your global stylesheet or a relevant CSS module:
.custom-projects-shadow {
  box-shadow: 0 4px 15px rgba(51, 204, 255, 0.3), 0 2px 5px rgba(0, 0, 0, 0.5);
}

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}
*/
