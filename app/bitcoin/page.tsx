"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import SubscriberWizerd from "@/components/ui/SubscriberWizerd";
import { cn } from '@/lib/utils';

// Utility function to format numbers with commas and specified decimal places
const formatNumber = (num: number, decimals: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

// Utility function to format percentage with 2 decimal places
const formatPercentage = (percent: string | number) => {
  const num = parseFloat(percent.toString());
  return num >= 0 ? `+${num.toFixed(2)}%` : `${num.toFixed(2)}%`;
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BitcoinPage() {
  // State for Bitcoin data and converter values
  const [bitcoinData, setBitcoinData] = useState({
    price: '$104,279.00',
    change: '-0.1%',
    range24h: '$104,004.00 - $106,450.00',
    marketCap: '$2,073,210,023,608.00',
    fullyDilutedValuation: '$2,073,210,023,608.00',
    tradingVolume24h: '$25,386,382,276.00',
    circulatingSupply: '19,881,428 BTC',
    totalSupply: '19,881,428 BTC',
    maxSupply: '21,000,000 BTC',
  });
  const [btcValue, setBtcValue] = useState('1.00000000');
  const [usdValue, setUsdValue] = useState('$104,279.00');

  // Handle BTC input change and convert to USD
  const handleBtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '0';
    const cleanedValue = parseFloat(value) || 0;
    setBtcValue(cleanedValue.toFixed(8)); // Limit to 8 decimal places
    const price = parseFloat(bitcoinData.price.replace('$', '').replace(',', '')) || 0;
    const usd = cleanedValue * price;
    setUsdValue(`$${formatNumber(usd, 2)}`);
  };

  // Handle USD input change and convert to BTC
  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace('$', '').replace(',', '') || '0';
    const cleanedValue = parseFloat(value) || 0;
    setUsdValue(`$${formatNumber(cleanedValue, 2)}`); // Limit to 2 decimal places
    const price = parseFloat(bitcoinData.price.replace('$', '').replace(',', '')) || 1; // Avoid division by zero
    const btc = cleanedValue / price;
    setBtcValue(btc.toFixed(8));
  };

  useEffect(() => {
    const fetchBitcoinData = async () => {
      console.log('API Key:', process.env.COINGECKO_API_KEY);
      let response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true', {
        headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }
      });

      if (!response.ok && response.status === 401) {
        console.log('401 Unauthorized with key, trying without key...');
        response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true');
      }

      if (!response.ok) {
        console.error('HTTP Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      if (!data.market_data) {
        throw new Error('Market data is missing from the API response');
      }
      const newPrice = parseFloat(data.market_data.current_price.usd.toFixed(2));
      setBitcoinData({
        price: `$${formatNumber(newPrice, 2)}`,
        change: formatPercentage(data.market_data.price_change_percentage_24h),
        range24h: `$${formatNumber(data.market_data.low_24h.usd, 2)} - $${formatNumber(data.market_data.high_24h.usd, 2)}`,
        marketCap: `$${formatNumber(parseFloat(data.market_data.market_cap.usd.toFixed(2)), 2)}`,
        fullyDilutedValuation: `$${formatNumber(parseFloat(data.market_data.fully_diluted_valuation.usd.toFixed(2)) || parseFloat(data.market_data.market_cap.usd.toFixed(2)), 2)}`,
        tradingVolume24h: `$${formatNumber(parseFloat(data.market_data.total_volume.usd.toFixed(2)), 2)}`,
        circulatingSupply: `${formatNumber(parseInt(data.market_data.circulating_supply.toString()), 0)} BTC`,
        totalSupply: `${formatNumber(parseInt(data.market_data.total_supply?.toString() || data.market_data.circulating_supply.toString()), 0)} BTC`,
        maxSupply: `${formatNumber(parseInt(data.market_data.max_supply?.toString() || '21000000'), 0)} BTC`,
      });
      // Update USD value based on new price and current BTC value
      const price = newPrice;
      const btc = parseFloat(btcValue) || 0;
      setUsdValue(`$${formatNumber(btc * price, 2)}`);
    };

    fetchBitcoinData().catch((error) => {
      console.error('Error fetching Bitcoin data:', error);
    });

    const intervalId = setInterval(() => fetchBitcoinData().catch((error) => {
      console.error('Error in interval fetch:', error);
    }), 60000);

    return () => clearInterval(intervalId);
  }, [btcValue]); // Re-run effect if btcValue changes to update USD on price change

  return (
    <div className={cn('min-h-screen bg-wizerd-darkestgrey')}>
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* Bitcoin Header */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div
            className="bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-lg p-6 mb-6"
            style={{
              border: '1px solid #ff33cc',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='rgb(40,40,40)' fill-opacity='0.2' viewBox='0 0 100 169.5'%3E%3Cpolygon points='50,34.75 93.5,59.75 93.5,109.75 50,134.75 6.5,109.75 6.5,59.75'/%3E%3Cpolygon points='0,-50 43.5,-25 43.5,25 0,50 -43.5,25 -43.5,-25'/%3E%3Cpolygon points='100,-50 143.5,-25 143.5,25 100,50 56.5,25 56.5,-25'/%3E%3Cpolygon points='0,119.5 43.5,144.5 43.5,194.5 0,219.5 -43.5,194.5 -43.5,144.5'/%3E%3Cpolygon points='100,119.5 143.5,144.5 143.5,194.5 100,219.5 56.5,194.5 56.5,144.5'/%3E%3C/svg%3E")`,
              backgroundSize: '32px',
            }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-ubuntu text-bitcoin-orange text-center">
              ₿itcoin
            </h1>
          </div>
        </motion.div>

        {/* Bitcoin Data and Chart Container */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 tw-mt-12 tw-justify-center flex flex-col sm:flex-row gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          {/* Data Column (Left) */}
          <div className="w-full sm:w-1/3 bg-gray-800 rounded-lg p-4 sm:p-6 text-white">
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-bitcoin-orange">Bitcoin BTC Price #1</h2>
              <p className="text-2xl sm:text-3xl font-bold mt-2 text-bitcoin-orange">
                {bitcoinData.price}
              </p>
              <p className="text-xl mt-1">
                <span className={parseFloat(bitcoinData.change) >= 0 ? 'text-alien-green' : 'text-red-500'}>
                  {bitcoinData.change}
                </span>
                <span className="text-gray-400 ml-2">1.0000 BTC <span className="text-cyber-yellow">+0.0%</span></span>
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-400">24h Range</p>
                <p className="text-lg">{bitcoinData.range24h}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Market Cap <span className="text-gray-400">ⓘ</span></p>
                <p className="text-lg">{bitcoinData.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Fully Diluted Valuation <span className="text-gray-400">ⓘ</span></p>
                <p className="text-lg">{bitcoinData.fullyDilutedValuation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">24 Hour Trading Vol <span className="text-gray-400">ⓘ</span></p>
                <p className="text-lg">{bitcoinData.tradingVolume24h}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Circulating Supply <span className="text-gray-400">ⓘ</span></p>
                <p className="text-lg">{bitcoinData.circulatingSupply}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Supply <span className="text-gray-400">ⓘ</span></p>
                <p className="text-lg">{bitcoinData.totalSupply}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Max Supply <span className="text-gray-400">ⓘ</span></p>
                <p className="text-lg">{bitcoinData.maxSupply}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>★ Add to Portfolio · 2,062,913 added</p>
            </div>
          </div>

          {/* Chart Column (Right) */}
          <div className="w-full sm:w-2/3 bg-gray-800 rounded-lg p-4 sm:p-6 text-white">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-bitcoin-orange">Price Chart</h2>
              <div className="text-sm text-gray-400 space-x-2">
                <span>24h</span>
                <span>7d</span>
                <span>1m</span>
                <span>3m</span>
                <span>1y</span>
                <span>Max</span>
                <span>LOG</span>
              </div>
            </div>
            <div className="h-64 sm:h-96 bg-gray-700 rounded mt-2">
              {/* Placeholder for TradingView Chart */}
              <div className="text-center text-gray-400 h-full flex items-center justify-center">
                <p>Integrate TradingView Widget here for live 24h and long-term Bitcoin chart.</p>
                <p className="text-sm">Example: Use sparkline data from CoinGecko API.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 tw-mt-12 tw-justify-center bg-gray-800 rounded-lg p-6 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-bitcoin-orange mb-4">About Bitcoin (BTC)</h2>
          <p className="text-gray-300 mb-4">
            Bitcoin (BTC) is the first cryptocurrency built on blockchain technology, also known as a decentralized digital currency that is based on cryptography. Unlike government-issued or fiat currencies such as US Dollars or Euro which are controlled by central banks, Bitcoin can operate without the need of a central authority like a central bank or a company. The decentralized nature allows it to operate on a peer-to-peer network whereby users are able to send funds to each other without going through intermediaries.
          </p>
          <h3 className="text-xl font-semibold text-bitcoin-orange mb-2">Who created Bitcoin?</h3>
          <p className="text-gray-300 mb-4">
            The creator is an unknown individual or group that goes by the name Satoshi Nakamoto with the idea of an electronic peer-to-peer cash system as it is written in a whitepaper. Until today, the true identity of Satoshi Nakamoto has not been verified though there has been speculation and rumor as to who Satoshi might be. What we do know is that officially, the first genesis block of BTC was mined on 9th January 2009, defining the start of cryptocurrencies.
          </p>
          <div className="space-y-2">
            <p className="text-gray-400">Website: Placeholder</p>
            <p className="text-gray-400">Explorers: Placeholder</p>
            <p className="text-gray-400">Wallets: Placeholder</p>
          </div>
        </motion.div>

        {/* BTC Converter Widget */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 tw-mt-12 tw-justify-center bg-gray-800 rounded-lg p-6 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-bitcoin-orange mb-4">BTC Converter</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={btcValue}
                onChange={handleBtcChange}
                className="w-1/3 p-2 bg-gray-700 text-bitcoin-orange border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-bitcoin-orange"
                placeholder="Enter BTC Amount"
                inputMode="decimal"
              />
              <span className="text-lg text-bitcoin-orange">BTC</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={usdValue.startsWith('$') ? usdValue : `$${usdValue}`}
                onChange={handleUsdChange}
                className="w-1/3 p-2 bg-gray-700 text-alien-green border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-alien-green"
                placeholder="Enter USD Amount"
                inputMode="decimal"
              />
              <span className="text-lg text-alien-green">USD</span>
            </div>
          </div>
        </motion.div>

        {/* Subscribe Component */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <SubscriberWizerd
            title="₿itcoinWizerd Newsletter"
            description="Stay updated with the latest Bitcoin and crypto insights. Subscribe now!"
            buttonText="Join Now"
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}