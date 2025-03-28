import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Divider } from "antd";
import { useAppSelector } from "../../hooks/redux";
import cl from "./NewsPage.module.scss";
import { LeftOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
const { Title } = Typography;

export const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const news = useAppSelector((state) => state.news.find((n) => n.id === id));
  const navigate = useNavigate();

  if (!news) return <Title level={4}>Новость не найдена</Title>;

  return (
    <div
      style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}
      className={cl.container}
    >
      {/* <div className={cl.header}> */}
      <Button icon={<LeftOutlined />} onClick={() => navigate("/news")} />
      {/* </div> */}
      <div className={cl.content}>
        <Title level={2} className={cl.title}>
          {news.title}
        </Title>
        <Typography.Text type="secondary">
          {dayjs(news.date).format("D MMMM, HH:mm")}
        </Typography.Text>
        <Divider />
        <Paragraph className={cl.text}>{news.content}</Paragraph>
      </div>
    </div>
  );
};
