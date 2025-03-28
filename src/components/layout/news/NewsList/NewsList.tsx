import { List, Pagination } from "antd";
import { INewsItem } from "../../../../types/news";
import { useState } from "react";
import cl from "./NewsList.module.scss";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { NewsListItem } from "../NewsListItem/NewsListItem";
import { Filters } from "../../Filters/Filters";

dayjs.extend(localizedFormat);
dayjs.locale("ru");

interface Props {
  newsList: INewsItem[];
  onEdit: (news: INewsItem) => void;
  onDelete: (id: string) => void;
}

export const NewsList = ({ newsList, onEdit, onDelete }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortedNews, setSortedNews] = useState<INewsItem[]>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={cl.container}>
      <Filters newsList={newsList} setSortedNews={setSortedNews} />
      <List
        bordered
        dataSource={paginatedNews}
        renderItem={(item) => (
          <NewsListItem item={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />

      {/* Пагинация */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={sortedNews.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        align="end"
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};
