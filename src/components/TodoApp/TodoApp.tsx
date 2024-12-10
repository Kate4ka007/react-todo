import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { TodoListData } from "../../types";
import { loadFromStorage, saveToStorage } from "../../utils/storage.ts";
import { Button } from "../Button/Button.tsx";
import TodoList from "../TodoList/TodoList.tsx";
import styles from "./TodoApp.module.css";

export const TodoAppTestIds = {
  input: "TodoApp_input_test-id",
  addButton: "TodoApp_add_button_test-id",
};

const TodoApp: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListData[]>([]);
  const { register, handleSubmit, reset } = useForm<{ title: string }>();

  useEffect(() => {
    const savedLists = loadFromStorage<TodoListData[]>("todoLists");
    if (savedLists) {
      setTodoLists(savedLists);
    }
  }, []);

  useEffect(() => {
    saveToStorage("todoLists", todoLists);
  }, [todoLists]);

  const addTodoList = useCallback(
    (data: { title: string }) => {
      const newList: TodoListData = {
        id: uuidv4(),
        title: data.title,
        todos: [],
      };
      setTodoLists((prevLists) => [...prevLists, newList]);
      reset();
    },
    [reset],
  );

  const updateTodoList = useCallback((id: string, updatedList: TodoListData) => {
    setTodoLists((prevLists) => prevLists.map((list) => (list.id === id ? updatedList : list)));
  }, []);

  const deleteTodoList = useCallback((id: string) => {
    setTodoLists((prevLists) => prevLists.filter((list) => list.id !== id));
  }, []);

  return (
    <div className={styles.todoApp}>
      <h1 className={styles.title}>TODOS</h1>

      <form className={styles.form} onSubmit={handleSubmit(addTodoList)}>
        <input
          className={styles.input}
          data-testid={TodoAppTestIds.input}
          placeholder="New list title"
          type="text"
          {...register("title", { required: true })}
        />
        <Button data-testid={TodoAppTestIds.addButton} type="submit">
          Add Todo List
        </Button>
      </form>

      <div className={styles.todoLists}>
        {todoLists.map((list) => (
          <TodoList deleteTodoList={deleteTodoList} key={list.id} list={list} updateTodoList={updateTodoList} />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
