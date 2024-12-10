import clsx from "clsx";
import React from "react";

import { Todo } from "../../types";
import { DeleteButton } from "../CloseButton/DeleteButton.tsx";
import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoItemTestIds = {
  input: "TodoItem_input_test-id",
  text: "TodoItem_text_test-id",
  deleteButton: "TodoItem_delete_button_test-id",
};

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => (
  <li className={clsx(styles.todoItem, { [styles.completed]: todo.completed })}>
    <input
      checked={todo.completed}
      className={styles.input}
      data-testid={TodoItemTestIds.input}
      onChange={() => toggleTodo(todo.id)}
      type="checkbox"
    />
    <span className={styles.text} data-testid={TodoItemTestIds.text}>
      {todo.text}
    </span>
    <DeleteButton
      className={styles.itemButton}
      data-testid={TodoItemTestIds.deleteButton}
      onClick={() => deleteTodo(todo.id)}
    />
  </li>
);

export default TodoItem;
