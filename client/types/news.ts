
export interface NewsArticle {
    source: {name: string; id: string | null;};
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsResponse {
    articles: NewsArticle[];
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}