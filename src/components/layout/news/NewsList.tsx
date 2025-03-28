import {
  List,
  Button,
  Typography,
  Pagination,
  Input,
  Select,
  MenuProps,
  Dropdown,
} from "antd";
import { useNavigate } from "react-router-dom";
import { NewsItem } from "../../../types/news";
import { useState } from "react";
import { useNewsFilterSort } from "../../../hooks/news";
import {
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import cl from "./NewsList.module.scss";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("ru");

interface Props {
  newsList: NewsItem[];
  onEdit: (news: NewsItem) => void;
  onDelete: (id: string) => void;
}

export const NewsList = ({ newsList, onEdit, onDelete }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Количество новостей на странице
  const navigate = useNavigate();
  //   const screens = useBreakpoint();
  // Используем хук для фильтрации и сортировки
  const { sortedNews, searchQuery, handleSearchChange, handleSortChange } =
    useNewsFilterSort({ newsList });

  // Функция для обработки смены страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Разбиваем новости на страницы
  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const items: MenuProps["items"] = [
    {
      label: "Delete",
      key: "delete",
      danger: true,
      icon: <DeleteOutlined />,
    },
    {
      label: "Edit",
      key: "edit",
      icon: <EditOutlined />,
    },
  ];

  const onDropdownItemClick = (key: string, item: NewsItem) => {
    // e.stopPropagation();
    switch (key) {
      case "edit":
        onEdit(item);
        break;
      case "delete":
        onDelete(item.id);
        break;
    }
  };

  return (
    <div className={cl.container}>
      {/* Поиск */}

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

      {/* Сортировка */}
      {/* <Space style={{ marginBottom: 16 }}></Space> */}

      {/* Список новостей */}
      <List
        bordered
        dataSource={paginatedNews}
        renderItem={(item) => (
          //   <Link to={`/news/${item.id}`} style={{ width: "100%" }}>
          <List.Item
            className={cl.listItem__container}
            onClick={() => navigate(`/news/${item.id}`)}
            // actions={[
            //   <Button
            //     onClick={(e) => {
            //       e.stopPropagation(); // Останавливаем событие клика, чтобы не переходить на страницу
            //       onEdit(item);
            //     }}
            //     icon={<EditOutlined />}
            //   ></Button>,
            //   <Button
            //     danger
            //     onClick={(e) => {
            //       e.stopPropagation(); // Останавливаем событие клика, чтобы не переходить на страницу
            //       onDelete(item.id);
            //     }}
            //     icon={<DeleteOutlined />}
            //   ></Button>,
            // ]}
          >
            <div className={cl.listItem__content}>
              <div className={cl.listItem__info}>
                <Typography.Title level={5} className={cl.listItem__title}>
                  {item.title}
                </Typography.Title>
                <Typography.Text className={cl.listItem__desc}>
                  {item.content}
                </Typography.Text>
              </div>
              <div className={cl.listItem__actions}>
                <div onClick={(e) => e.stopPropagation()}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (info) => onDropdownItemClick(info.key, item),
                    }}
                    className={cl.listItem__dropdown}
                    trigger={["click"]}
                  >
                    {/* <a onClick={(e) => e.preventDefault()}>
                    
                  </a> */}
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </div>

                <div></div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем событие клика, чтобы не переходить на страницу
                    onEdit(item);
                  }}
                  icon={<EditOutlined />}
                  className={cl.listItem__btn}
                ></Button>
                <Button
                  danger
                  onClick={(e) => {
                    e.stopPropagation(); // Останавливаем событие клика, чтобы не переходить на страницу
                    onDelete(item.id);
                  }}
                  className={cl.listItem__btn}
                  icon={<DeleteOutlined />}
                ></Button>
              </div>
            </div>

            <div className={cl.listItem__footer}>
              <div className={cl.listItem__feedback}>
                <div className={cl.listItem__textIcon}>
                  <LikeOutlined /> 3
                </div>
                <div className={cl.listItem__textIcon}>
                  <MessageOutlined /> 3
                </div>
              </div>
              <Typography.Text type="secondary">
                {dayjs(item.date).format("D MMMM, HH:mm")}
              </Typography.Text>
            </div>
          </List.Item>
          //   </Link>
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
