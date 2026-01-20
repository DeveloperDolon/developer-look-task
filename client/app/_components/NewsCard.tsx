import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NewsArticle } from "@/types/news";
import { Calendar1Icon, ExternalLink } from "lucide-react";

interface Props {
  article: NewsArticle;
  category: string;
}

export const NewsCard = ({ article, category }: Props) => {
  const isTrustedHost = article.urlToImage?.startsWith("https://");

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg border-muted">
      <div className="relative aspect-video">
        {isTrustedHost ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src={"/placeholder.avif"}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        )}

        <Badge className="absolute top-2 right-2 capitalize shadow-sm">
          {category}
        </Badge>
      </div>

      <CardHeader className="p-4 space-y-1">
        <div className="flex flex-col justify-between items-center text-[10px] uppercase font-bold text-muted-foreground">
          <div className="flex justify-between w-full pb-3">
            <span className="text-primary">{article.source.name}</span>
            <div className="flex gap-2 items-center">
              <Calendar1Icon className="w-3 h-3" />
              {new Date(article.publishedAt).toLocaleDateString()}
            </div>
          </div>

          <CardContent className="p-4 pt-0 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {article.description || "No description available."}
            </p>
          </CardContent>

          <CardFooter className="p-4 pt-0 border-t bg-muted/20">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold 
                text-blue-600 hover:text-blue-800 transition-colors mt-3"
            >
              Read Original Post <ExternalLink className="w-4 h-4" />
            </a>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  );
};
