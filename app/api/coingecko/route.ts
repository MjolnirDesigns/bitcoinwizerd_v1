import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;
  const url = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true';

  try {
    const response = await fetch(url, {
      headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {},
    });
    if (!response.ok) throw new Error('Failed to fetch Bitcoin data');
    const data = await response.json();
    return NextResponse.json({
      price: `$${data.market_data.current_price.usd}`,
      change: `${data.market_data.price_change_percentage_24h}%`,
      range24h: `$${data.market_data.low_24h.usd} - $${data.market_data.high_24h.usd}`,
      marketCap: `$${data.market_data.market_cap.usd}`,
      fullyDilutedValuation: `$${data.market_data.fully_diluted_valuation.usd || data.market_data.market_cap.usd}`,
      tradingVolume24h: `$${data.market_data.total_volume.usd}`,
      circulatingSupply: `${data.market_data.circulating_supply} BTC`,
      totalSupply: `${data.market_data.total_supply || data.market_data.circulating_supply} BTC`,
      maxSupply: `${data.market_data.max_supply} BTC`,
      sparkline: data.market_data.sparkline_7d.price, // For chart data
    });
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}