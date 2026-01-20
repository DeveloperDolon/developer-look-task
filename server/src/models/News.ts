import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: { type: String, unique: true },
  urlToImage: String,
  category: String,
  language: String,
  country: String,
  publishedAt: Date,
  content: String,
  author: String
});

export const News = mongoose.model('News', NewsSchema);