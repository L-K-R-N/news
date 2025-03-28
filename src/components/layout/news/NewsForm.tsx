import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { NewsItem } from "../../../types/news";
import cl from "./NewsForm.module.scss";
interface NewsFormProps {
  onSave: (news: NewsItem) => void;
  editNews?: NewsItem;
  onCancel: () => void;
  setIsFormChanged: (isChanged: boolean) => void; // Новая пропса для отслеживания изменений
}

export const NewsForm: React.FC<NewsFormProps> = ({
  onSave,
  editNews,

  setIsFormChanged,
}) => {
  const [title, setTitle] = useState<string>(editNews?.title || "");
  const [content, setContent] = useState<string>(editNews?.content || "");

  useEffect(() => {
    if (editNews) {
      setIsFormChanged(
        title !== editNews?.title || content !== editNews?.content
      ); // Отслеживаем изменения
    } else {
      setIsFormChanged(title !== "" || content !== "");
    }
  }, [title, content, editNews, setIsFormChanged]);

  const handleSubmit = () => {
    onSave({
      id: editNews?.id || Date.now().toString(),
      title,
      content,
      date: editNews?.date || new Date().toISOString(),
    });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} className={cl.form}>
      <div className={cl.form__content}>
        <Form.Item label="Заголовок" className={cl.formItem}>
          <Input
            required
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок новости"
          />
        </Form.Item>
        <Form.Item label="Контент" className={cl.formItem}>
          <Input.TextArea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введите содержание новости"
          />
        </Form.Item>
      </div>
      <Button type="primary" htmlType="submit" block>
        Сохранить
      </Button>
    </Form>
  );
};
