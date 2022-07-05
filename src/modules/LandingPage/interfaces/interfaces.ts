export interface IListArticlesSource {
  id: string | null;
  name: string;
}
export interface IArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: IListArticlesSource;
}

export interface IArticles {
  status: string;
  totalResults: number;
  articles: IArticle[];
}
