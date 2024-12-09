import React from 'react';
import { Todo } from '../../types';
import styles from './TodoItem.module.css';
import clsx from 'clsx';

interface Props {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoItemTestIds = {
  input: 'TodoItem_input_test-id',
  text: 'TodoItem_text_test-id',
  deleteButton: 'TodoItem_delete_button_test-id',
};

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => (
  <div className={clsx(styles.todoItem, { [styles.completed]: todo.completed })}>
    <input
      data-testid={TodoItemTestIds.input}
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
    />
    <span data-testid={TodoItemTestIds.text}>{todo.text}</span>
    <button  data-testid={TodoItemTestIds.deleteButton} onClick={() => deleteTodo(todo.id)}>Delete</button>
  </div>
);

export default TodoItem;
