import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

async function scrapeTopXPosts() {
  const query = "bitcoin OR crypto OR design OR engineering OR technology OR ui/ux -filter:replies";
  try {
    const posts = await client.v2.search(query, {
      'tweet.fields': ['public_metrics', 'entities'],
      'media.fields': ['url'],
      max_results: 100,
    });

    const topPosts = posts.data
      .filter(post => 
        (post.public_metrics.impressions > 1000 || post.public_metrics.like_count > 50 || post.public_metrics.retweet_count > 20)
      )
      .sort((a, b) => 
        (b.public_metrics.impressions || 0) + (b.public_metrics.like_count || 0) * 10 + (b.public_metrics.retweet_count || 0) * 10 
        - (a.public_metrics.impressions || 0) + (a.public_metrics.like_count || 0) * 10 + (a.public_metrics.retweet_count || 0) * 10
      )
      .slice(0, 10)
      .map(post => ({
        title: post.text,
        link: post.entities?.urls?.[0]?.expanded_url || `https://x.com/status/${post.id}`,
        thumbnail: post.entities?.media?.[0]?.url || "default-thumbnail.jpg",
      }));

    // Ensure 75% Bitcoin focus, adjust if needed
    const bitcoinPosts = topPosts.filter(p => p.title.toLowerCase().includes("bitcoin") || p.title.toLowerCase().includes("crypto"));
    const otherPosts = topPosts.filter(p => !p.title.toLowerCase().includes("bitcoin") && !p.title.toLowerCase().includes("crypto"));
    const finalPosts = [
      ...bitcoinPosts.slice(0, Math.ceil(7.5)), // Approx 75%
      ...otherPosts.slice(0, Math.floor(2.5)), // Approx 25%
    ].slice(0, 10); // Limit to 10

    return finalPosts;
  } catch (error) {
    console.error("Error scraping X posts:", error);
    return [];
  }
}

export default scrapeTopXPosts;