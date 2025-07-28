import React, { useEffect } from "react";
import { motion } from "framer-motion";

const CryptoSection = () => {
  // Top 10 cryptocurrencies data (as of June 16, 2025)
  const cryptoData = [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: "$107,077",
      change1h: "N/A",
      change24h: "+1.52%",
      change7d: "N/A",
      marketCap: "$1.92T",
      volume24h: "N/A",
    },
    {
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: "$2,628",
      change1h: "N/A",
      change24h: "+3.88%",
      change7d: "N/A",
      marketCap: "$327.4B",
      volume24h: "N/A",
    },
    {
      rank: 3,
      name: "Tether",
      symbol: "USDT",
      price: "$0.99",
      change1h: "N/A",
      change24h: "-0.03%",
      change7d: "N/A",
      marketCap: "$149.41B",
      volume24h: "$131.45B",
    },
    {
      rank: 4,
      name: "XRP",
      symbol: "XRP",
      price: "$2.20",
      change1h: "N/A",
      change24h: "+2.26%",
      change7d: "N/A",
      marketCap: "$136.1B",
      volume24h: "N/A",
    },
    {
      rank: 5,
      name: "BNB",
      symbol: "BNB",
      price: "$655",
      change1h: "N/A",
      change24h: "+0.99%",
      change7d: "N/A",
      marketCap: "$81.9B",
      volume24h: "N/A",
    },
    {
      rank: 6,
      name: "Solana",
      symbol: "SOL",
      price: "$157",
      change1h: "N/A",
      change24h: "+7.61%",
      change7d: "N/A",
      marketCap: "$99.5B",
      volume24h: "N/A",
    },
    {
      rank: 7,
      name: "USD Coin",
      symbol: "USDC",
      price: "$1.00",
      change1h: "N/A",
      change24h: "+0.01%",
      change7d: "N/A",
      marketCap: "$55.9B",
      volume24h: "N/A",
    },
    {
      rank: 8,
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.17",
      change1h: "N/A",
      change24h: "+1.39%",
      change7d: "N/A",
      marketCap: "$37.3B",
      volume24h: "N/A",
    },
    {
      rank: 9,
      name: "TRON",
      symbol: "TRX",
      price: "$0.27",
      change1h: "N/A",
      change24h: "+0.40%",
      change7d: "N/A",
      marketCap: "$19.2B",
      volume24h: "N/A",
    },
    {
      rank: 10,
      name: "Cardano",
      symbol: "ADA",
      price: "$0.64",
      change1h: "N/A",
      change24h: "+3.29%",
      change7d: "N/A",
      marketCap: "$22.9B",
      volume24h: "N/A",
    },
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // TradingView widget integration
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "BINANCE:USDTUSD", title: "Tether" },
        { proName: "BITSTAMP:XRPUSD", title: "XRP" },
        { proName: "BINANCE:BNBUSD", title: "BNB" },
        { proName: "BINANCE:SOLUSD", title: "Solana" },
        { proName: "BITSTAMP:USDCUSD", title: "USD Coin" },
        { proName: "BINANCE:DOGEUSD", title: "Dogecoin" },
        { proName: "BINANCE:TRXUSD", title: "TRON" },
        { proName: "BINANCE:ADAUSD", title: "Cardano" },
      ],
      colorTheme: "dark",
      isTransparent: false,
      showSymbolLogo: true,
      locale: "en",
    });
    const container = document.querySelector(".tradingview-widget-container");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      const container = document.querySelector(".tradingview-widget-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="bg-wizerd-darkestgrey py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Animated High-Tech Header Container */}
        <motion.div
          className="relative bg-cyber-yellow text-black rounded-lg p-2 sm:p-4 mb-8 shadow-lg overflow-hidden custom-projects-shadow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="absolute inset-0 border-2 border-cyber-yellow/50 rounded-lg transform translate-z-0"></div>
          <div className="absolute inset-1 border border-white/10 rounded-lg transform translate-z-1"></div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-ubuntu text-center z-10 relative">
            Crypto
          </h1>
        </motion.div>

        {/* TradingView Marquee Widget */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="tradingview-widget-container"></div>
        </div>

        {/* Scrollable Crypto List Container */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-cyber-yellow mb-4">Top Tokens</h2>
          <hr className="border-t border-gray-600 my-4" />
          <div className="overflow-x-auto scrollbar-hidden snap-x">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Coin</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">24h %</th>
                  <th className="px-4 py-2">Market Cap</th>
                  <th className="px-4 py-2 hidden lg:table-cell">1h %</th>
                  <th className="px-4 py-2 hidden lg:table-cell">7d %</th>
                  <th className="px-4 py-2 hidden lg:table-cell">24h Volume</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((coin) => (
                  <tr key={coin.rank} className="border-t border-gray-700 snap-start">
                    <td className="px-4 py-3 text-white">{coin.rank}</td>
                    <td className="px-4 py-3 text-white">
                      <div className="flex items-center">
                        <span>{coin.name} ({coin.symbol})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white">{coin.price}</td>
                    <td
                      className={
                        coin.change24h.includes("+")
                          ? "px-4 py-3 text-green-400"
                          : "px-4 py-3 text-red-400"
                      }
                    >
                      {coin.change24h}
                    </td>
                    <td className="px-4 py-3 text-white">{coin.marketCap}</td>
                    <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{coin.change1h}</td>
                    <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{coin.change7d}</td>
                    <td className="px-4 py-3 text-white hidden lg:table-cell">{coin.volume24h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .snap-x {
          scroll-snap-type: start mandatory;
        }
      `}</style>
      <style jsx>{`
        .crypto-section-bg {
          background: transparent;
        }
      `}</style>
    </section>
  );
};

export default CryptoSection;

/* Add this CSS to your global stylesheet or a relevant CSS module:
.custom-projects-shadow {
  box-shadow: 0 4px 15px rgba(51, 204, 255, 0.3), 0 2px 5px rgba(0, 0, 0, 0.5);
}
*/