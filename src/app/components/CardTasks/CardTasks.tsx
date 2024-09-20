import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import styles from "./CardTasks.module.scss";

interface CardTasksProps {
  task: string;
  isCompleted?: boolean;
  onDelete?: () => void;
  onComplete?: () => void;
}

const CardTasks: React.FC<CardTasksProps> = ({
  task,
  isCompleted,
  onDelete,
  onComplete,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={`${styles["card-container"]} ${
        isHovered ? styles.hovered : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles["task-content"]}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isCompleted}
          onChange={onComplete}
        />
        <span
          className={`${styles["task-text"]} ${
            isHovered ? styles.hovered : ""
          } ${isCompleted ? styles.completed : ""}`}
        >
          {task}
        </span>
      </div>
      <FiTrash
        className={`${styles["trash-icon"]} ${
          isHovered ? styles["trash-hovered"] : ""
        }`}
        size={24}
        onClick={onDelete}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default CardTasks;
