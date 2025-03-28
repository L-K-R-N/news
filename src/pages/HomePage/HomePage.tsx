import { useState } from "react";
import { Button, Modal, message, Typography, Space } from "antd";
import { NewsForm } from "../../components/layout/news/NewsForm/NewsForm";
import { NewsList } from "../../components/layout/news/NewsList/NewsList";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { updateNews, addNews, deleteNews } from "../../store/news/newsSlice";
import { INewsItem } from "../../types/news";
import cl from "./HomePage.module.scss";
const { Title } = Typography;

export const HomePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const newsList = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const [editingNews, setEditingNews] = useState<INewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, contextHolderModal] = Modal.useModal();
  const [isFormChanged, setIsFormChanged] = useState(false); // Новый стейт для отслеживания изменений
  // const screens = useBreakpoint();

  const openAddModal = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const openEditModal = (news: INewsItem) => {
    setEditingNews(news);
    setIsModalOpen(true);
  };

  const handleSave = (news: INewsItem) => {
    if (editingNews) {
      dispatch(updateNews(news));
      messageApi.open({
        type: "success",
        content: "Новость успешно обновлена",
      });
    } else {
      dispatch(addNews(news));
      messageApi.open({
        type: "success",
        content: "Новость успешно добавлена",
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Вы уверены, что хотите удалить эту новость?",
      content: "Это действие нельзя отменить.",
      okText: "Удалить",
      cancelText: "Отмена",
      onOk: () => {
        dispatch(deleteNews(id)); // Удаляем новость из хранилища
        messageApi.open({
          type: "success",
          content: "Новость успешно удалена",
        }); // Появляется сообщение об успешном удалении
      },
      onCancel: () => {
        messageApi.open({ type: "info", content: "Удаление отменено" }); // Появляется сообщение, если удаление отменено
      },
    });
  };

  // Обработчик закрытия модального окна с подтверждением изменений
  const handleModalCancel = () => {
    if (isFormChanged) {
      modal.confirm({
        cancelText: "Отмена",
        okText: "Да",
        title: "Вы уверены?",
        content:
          "Вы внесли изменения. Если выйдете, изменения не будут сохранены.",
        onOk: () => {
          setIsModalOpen(false);
        },
        onCancel: () => {},
      });
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      {contextHolder}
      {contextHolderModal}
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Новости</Title>
        <div className={cl.createBtnContainer}>
          <Button
            type="primary"
            onClick={openAddModal}
            className={cl.createBtn}
            size="middle"
          >
            Добавить новость
          </Button>
        </div>
      </Space>

      <NewsList
        newsList={newsList}
        onEdit={openEditModal}
        onDelete={handleDelete} // Передаем функцию удаления
      />

      <Modal
        title={editingNews ? "Редактировать новость" : "Добавить новость"}
        open={isModalOpen}
        onCancel={handleModalCancel} // Используем новую функцию для отмены
        footer={null}
        destroyOnClose
      >
        <NewsForm
          onSave={handleSave}
          editNews={editingNews || undefined}
          onCancel={() => setIsModalOpen(false)}
          setIsFormChanged={setIsFormChanged} // Передаем флаг изменений в форму
        />
      </Modal>
    </div>
  );
};
