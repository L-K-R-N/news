import { List, Typography, Dropdown, Button, MenuProps } from "antd";
import dayjs from "dayjs";
import { INewsItem } from "../../../../types/news";
import { useNavigate } from "react-router-dom";
import cl from "./NewsListItem.module.scss";
import {
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import "dayjs/locale/ru";

interface NewsListItemProps {
  item: INewsItem;
  onEdit: (item: INewsItem) => void;
  onDelete: (id: string) => void;
}

export const NewsListItem = ({ item, onDelete, onEdit }: NewsListItemProps) => {
  const navigate = useNavigate();

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

  const onDropdownItemClick = (key: string, item: INewsItem) => {
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
    <List.Item
      className={cl.listItem__container}
      onClick={() => navigate(`/news/item/${item.id}`)}
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
  );
};
