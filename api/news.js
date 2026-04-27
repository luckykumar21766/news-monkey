module.exports = async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Missing NEWS_API_KEY environment variable.',
    });
  }

  try {
    const country = typeof req.query.country === 'string' ? req.query.country : 'us';
    const url = `https://newsapi.org/v2/top-headlines?country=${encodeURIComponent(country)}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      return res.status(response.ok ? 502 : response.status).json({
        error: data.message || 'Failed to fetch news.',
      });
    }

    return res.status(200).json({
      articles: Array.isArray(data.articles) ? data.articles : [],
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected error while fetching news.',
    });
  }
};
