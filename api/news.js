module.exports = async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = '7b998f9290964aa9a2485253d106db96';

  try {
    const country = typeof req.query.country === 'string' ? req.query.country : 'us';
    const category = typeof req.query.category === 'string' ? req.query.category : 'general';
    const page = typeof req.query.page === 'string' ? req.query.page : '1';
    const pageSize = typeof req.query.pageSize === 'string' ? req.query.pageSize : '5';

    const params = new URLSearchParams({
      country,
      category,
      page,
      pageSize,
      apiKey,
    });

    const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      return res.status(response.ok ? 502 : response.status).json({
        error: data.message || 'Failed to fetch news.',
      });
    }

    return res.status(200).json({
      articles: Array.isArray(data.articles) ? data.articles : [],
      totalResults: Number.isFinite(data.totalResults) ? data.totalResults : 0,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected error while fetching news.',
    });
  }
};
