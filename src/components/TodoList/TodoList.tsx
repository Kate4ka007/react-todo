import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Todo, TodoListData } from "../../types";
import { Button } from "../Button/Button.tsx";
import { DeleteButton } from "../CloseButton/DeleteButton.tsx";
import TodoFilters from "../TodoFilters/TodoFilters.tsx";
import TodoItem from "../TodoItem/TodoItem.tsx";
import styles from "./TodoList.module.css";

export const TodoListTestIds = {
  input: "TodoList_input_test-id",
  title: "TodoList_title_test-id",
  deleteButton: "TodoList_delete_button_test-id",
  addButton: "TodoList_add_button_test-id",
};

interface Props {
  list: TodoListData;
  updateTodoList: (id: string, updatedList: TodoListData) => void;
  deleteTodoList: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ list, updateTodoList, deleteTodoList }) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { register, handleSubmit, reset } = useForm<{ text: string }>();

  const addTodo = (data: { text: string }) => {
    const newTodo: Todo = { id: uuidv4(), text: data.text, completed: false };
    updateTodoList(list.id, { ...list, todos: [...list.todos, newTodo] });
    reset();
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = list.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    updateTodoList(list.id, { ...list, todos: updatedTodos });
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = list.todos.filter((todo) => todo.id !== id);
    updateTodoList(list.id, { ...list, todos: updatedTodos });
  };

  const filteredTodos = list.todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className={styles.todoList}>
      <div className={styles.listHeader}>
        <h2 className={styles.title} data-testid={TodoListTestIds.title}>
          {list.title}
        </h2>
        <DeleteButton data-testid={TodoListTestIds.deleteButton} onClick={() => deleteTodoList(list.id)} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit(addTodo)}>
        <input
          className={styles.input}
          data-testid={TodoListTestIds.input}
          placeholder="Add a new todo"
          type="text"
          {...register("text", { required: true })}
        />
        <Button data-testid={TodoListTestIds.addButton} type="submit">
          Add
        </Button>
      </form>

      {list.todos.length > 0 && <TodoFilters currentFilter={filter} setFilter={setFilter} />}

      <ul className={styles.list}>
        {filteredTodos.map((todo) => (
          <TodoItem deleteTodo={deleteTodo} key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(
  TodoList,
  (prevProps, nextProps) =>
    prevProps.list === nextProps.list &&
    prevProps.updateTodoList === nextProps.updateTodoList &&
    prevProps.deleteTodoList === nextProps.deleteTodoList,
);
