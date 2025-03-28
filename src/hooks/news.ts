import { useState } from "react";
import { NewsItem } from "../types/news";

type SortOrder = "ascend" | "descend" | null;

interface UseNewsFilterSortProps {
  newsList: NewsItem[];
}

export const useNewsFilterSort = ({ newsList }: UseNewsFilterSortProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Фильтруем новости по поисковому запросу
  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Сортируем новости
  const sortedNews = filteredNews.sort((a, b) => {
    if (sortOrder === "ascend") {
      return a.title.localeCompare(b.title); // Сортировка по алфавиту (по возрастанию)
    } else if (sortOrder === "descend") {
      return b.title.localeCompare(a.title); // Сортировка по алфавиту (по убыванию)
    } else if (sortOrder === null) {
      // Если сортировка по дате
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  return {
    sortedNews,
    searchQuery,
    handleSearchChange,
    handleSortChange,
  };
};
