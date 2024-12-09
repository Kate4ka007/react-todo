import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import TodoList from '../TodoList/TodoList.tsx';
import { TodoListData } from '../../types';
import { saveToStorage, loadFromStorage } from '../../utils/storage.ts';
import styles from './TodoApp.module.css';

export const TodoAppTestIds = {
  input: 'TodoApp_input_test-id',
  addButton: 'TodoApp_add_button_test-id'
};

const TodoApp: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListData[]>([]);
  const { register, handleSubmit, reset } = useForm<{ title: string }>();

  useEffect(() => {
    const savedLists = loadFromStorage<TodoListData[]>('todoLists');
    if (savedLists) setTodoLists(savedLists);
  }, []);

  useEffect(() => {
    saveToStorage('todoLists', todoLists);
  }, [todoLists]);

  const addTodoList = (data: { title: string }) => {
    const newList: TodoListData = {
      id: uuidv4(),
      title: data.title,
      todos: [],
    };
    setTodoLists([...todoLists, newList]);
    reset();
  };

  const updateTodoList = (id: string, updatedList: TodoListData) => {
    setTodoLists(todoLists.map(list => (list.id === id ? updatedList : list)));
  };

  const deleteTodoList = (id: string) => {
    setTodoLists(todoLists.filter(list => list.id !== id));
  };

  return (
    <div className={styles.todoApp}>
      <h1 className={styles.title}>TODOS</h1>

      <form onSubmit={handleSubmit(addTodoList)} className={styles.form}>
        <input
          data-testid={TodoAppTestIds.input}
          type="text"
          placeholder="New list title"
          {...register('title', { required: true })}
        />
        <button data-testid={TodoAppTestIds.addButton} type="submit">Add Todo List</button>
      </form>

      <div className={styles.todoLists}>
        {todoLists.map(list => (
          <TodoList
            key={list.id}
            list={list}
            updateTodoList={updateTodoList}
            deleteTodoList={deleteTodoList}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
