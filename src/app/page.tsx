"use client";

import { useEffect, useState } from "react";
import styles from "./tarefas.module.scss";
import Header from "./components/Header/Header";
import "../styles/globals.scss";
import CustomButton from "./components/CustomButton/CustomButton";
import CardTasks from "./components/CardTasks/CardTasks";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Modal from "./components/CustomModal/CustomModal";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar as tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenDeleteModal = (id: string) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleOpenNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsNewTaskModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSubmit = async (data: string) => {
    if (!data) {
      setError("O título da tarefa não pode estar vazio");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      setError((error as Error).message || "Erro ao adicionar a tarefa");
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const deleteTask = async (id: string) => {
    if (!id) {
      setError("Tarefa not found");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError((error as Error).message || "Erro ao deletar a tarefa");
    }
  };

  const completeTask = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (!taskToUpdate) return;

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: !taskToUpdate.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <>
      <Header />

      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className={styles.container}>
            <h1>Suas tarefas de hoje</h1>

            {tasks
              .filter((task) => !task.isCompleted)
              .map((task) => (
                <CardTasks
                  task={task.title}
                  isCompleted={task.isCompleted}
                  key={task.id}
                  onComplete={() => completeTask(task.id)}
                  onDelete={() => handleOpenDeleteModal(task.id)}
                />
              ))}

            <h1>Tarefas finalizadas</h1>

            {tasks
              .filter((task) => task.isCompleted)
              .map((task) => (
                <CardTasks
                  task={task.title}
                  isCompleted={task.isCompleted}
                  key={task.id}
                  onComplete={() => completeTask(task.id)}
                  onDelete={() => handleOpenDeleteModal(task.id)}
                />
              ))}

            {isDeleteModalOpen && (
              <Modal
                title="Deletar Tarefa"
                onClose={handleCloseModal}
                onSubmit={() => {
                  if (taskToDelete) {
                    deleteTask(taskToDelete);
                  }
                }}
                cancelButtonText="Cancelar"
                submitButtonText="Deletar"
                cancelButtonColor="#E7EEFB"
                submitButtonColor="linear-gradient(90deg, #D30707 0%, #F05353 68.65%)"
                hasInput={false}
              />
            )}

            {isNewTaskModalOpen && (
              <Modal
                title="Nova Tarefa"
                onClose={handleCloseModal}
                onSubmit={(data: string) => handleSubmit(data)}
                cancelButtonText="Cancelar"
                submitButtonText="Adicionar"
                cancelButtonColor="#E7EEFB"
                submitButtonColor="linear-gradient(90deg, #0796D3 0%, #53C0F0 68.65%)"
                inputLabel="Título"
                hasInput={true}
              />
            )}
          </div>
          <div className={styles.containerButton}>
            <CustomButton
              text="Adicionar nova tarefa"
              onClick={handleOpenNewTaskModal}
            />
          </div>
        </>
      )}
    </>
  );
}
