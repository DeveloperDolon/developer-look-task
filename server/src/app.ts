import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';

require('dotenv').config();

const app = express();

app.use(cors());

app.get('/api/news', async (req: Request, res: Response) => {
    try {
        const {country, category} = req.query;
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: country || 'us',
                category: category || 'general',
                apiKey: process.env.API_KEY,
            },
        });

        res.json(response.data);
    }catch(error){
        res.status(500).json({error: 'Failed to fetch news articles'});
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});