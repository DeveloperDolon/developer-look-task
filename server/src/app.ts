import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';
import { News } from './models/News';
import { connectDB } from './config/db';

require('dotenv').config();
connectDB();
const app = express();

app.use(cors());

app.get('/api/news', async (req: Request, res: Response) => {
  try {
    const { country, category, language, source, from, to } = req.query;

    const params: any = {
      apiKey: process.env.API_KEY,
      language: language || 'en',
    };

    if (source) params.sources = source;
    else {
      params.country = country || 'us';
      params.category = category || 'general';
    }

    if (from) params.from = from;
    if (to) params.to = to;

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params,
    });
    const articles = response.data.articles;

    const savedArticles = await Promise.all(
      articles.map(async (art: any) => {
        return await News.findOneAndUpdate(
          { url: art.url },
          { ...art, category, country, language },
          { upsert: true, new: true },
        );
      }),
    );

    res.json({ status: 'ok', articles: savedArticles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

app.get('/api/sources', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      'https://newsapi.org/v2/top-headlines/sources',
      {
        params: {
          apiKey: process.env.API_KEY,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sources!' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
