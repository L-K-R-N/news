import { Input, Select } from "antd";
import cl from "./Filters.module.scss";
import "dayjs/locale/ru";
import { useNewsFilterSort } from "../../../hooks/news";
import { INewsItem } from "../../../types/news";
import { useEffect } from "react";

interface FiltersProps {
  newsList: INewsItem[];
  setSortedNews: (news: INewsItem[]) => void;
}

export const Filters = ({ newsList, setSortedNews }: FiltersProps) => {
  const { sortedNews, searchQuery, handleSearchChange, handleSortChange } =
    useNewsFilterSort({ newsList });

  useEffect(() => {
    setSortedNews(sortedNews);
  }, [sortedNews, setSortedNews]);
  return (
    <div className={cl.control}>
      <div className={cl.control__search}>
        <Input
          placeholder="Поиск по заголовку"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div>
        <Select
          defaultValue="date"
          onChange={(value) =>
            handleSortChange(value as "ascend" | "descend" | null)
          }
          className={cl.control__sort}
        >
          <Select.Option value={null}>По дате</Select.Option>
          <Select.Option value="ascend">По алфавиту (A-Z)</Select.Option>
          <Select.Option value="descend">По алфавиту (Z-A)</Select.Option>
        </Select>
      </div>
    </div>
  );
};
