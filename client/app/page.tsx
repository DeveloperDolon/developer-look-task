"use client";

import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsArticle, Source } from "@/types/news";
import { SelectContent, SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { NewsCard } from "./_components/NewsCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "gb" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "India", value: "in" },
];

const categories = [
  { label: "General", value: "general" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
];

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [sources, setSources] = useState([]);
  const [source, setSource] = useState("techcrunch");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          country,
          category,
          language,
          source,
        };

        if (date?.from) {
          params.from = date.from.toISOString();
        }
        if (date?.to) {
          params.to = date.to.toISOString();
        }

        const query = new URLSearchParams(params).toString();

        const res = await fetch(`http://localhost:5000/api/news?${query}`);
        const data = await res.json();

        setArticles(data.articles || []);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSources = async () => {
      const res = await fetch("http://localhost:5000/api/sources");
      const data = await res.json();

      setSources(data.sources || []);
    };

    fetchSources();
    fetchNews();
  }, [country, category, language, date, source]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2">
            NEWS HUB
          </h1>
          <p className="text-muted-foreground">
            Global headlines powered by Next.js & Express
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center z-40">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Country" />
            </SelectTrigger>

            <SelectContent position="popper" sideOffset={4}>
              {countries?.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              {sources?.map((c: Source) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40 capitalize">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              {categories?.map((c) => (
                <SelectItem
                  key={c.value}
                  value={c.value}
                  className="capitalize"
                >
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

         
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal min-w-[240px]", // Added min-width for the date picker
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={date}
                onSelect={(range) => setDate(range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <NewsCard key={idx} article={article} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
