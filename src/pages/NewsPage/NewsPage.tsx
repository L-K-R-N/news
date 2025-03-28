import { useParams } from "react-router-dom";
import { Typography, Button } from "antd";
import { useAppSelector } from "../../hooks/redux";
import cl from "./NewsPage.module.scss";
import { LeftOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
const { Title } = Typography;

export const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const news = useAppSelector((state) => state.news.find((n) => n.id === id));

  if (!news) return <Title level={4}>Новость не найдена</Title>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <div className={cl.header}>
        <Button icon={<LeftOutlined />}>
          {/* <Link to="/">Назад к списку</Link> */}
        </Button>{" "}
        <Title level={2}>{news.title}</Title>
      </div>
      <Paragraph className={cl.text}>{news.content}</Paragraph>
    </div>
  );
};
