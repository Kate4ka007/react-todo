import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TodoItem from '../TodoItem/TodoItem.tsx';
import TodoFilters from '../TodoFilters/TodoFilters.tsx';
import { Todo, TodoListData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoList.module.css';

export const TodoListTestIds = {
  input: 'TodoList_input_test-id',
  title: 'TodoList_title_test-id',
  deleteButton: 'TodoList_delete_button_test-id',
  addButton: 'TodoList_add_button_test-id'
};


interface Props {
  list: TodoListData;
  updateTodoList: (id: string, updatedList: TodoListData) => void;
  deleteTodoList: (id: string) => void;
}


const TodoList: React.FC<Props> = ({ list, updateTodoList, deleteTodoList }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { register, handleSubmit, reset } = useForm<{ text: string }>();

  const addTodo = (data: { text: string }) => {
    const newTodo: Todo = { id: uuidv4(), text: data.text, completed: false };
    updateTodoList(list.id, { ...list, todos: [...list.todos, newTodo] });
    reset();
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = list.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodoList(list.id, { ...list, todos: updatedTodos });
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = list.todos.filter(todo => todo.id !== id);
    updateTodoList(list.id, { ...list, todos: updatedTodos });
  };

  const filteredTodos = list.todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={styles.todoList}>
      <h2 data-testid={TodoListTestIds.title}>{list.title}</h2>
      <button data-testid={TodoListTestIds.deleteButton} onClick={() => deleteTodoList(list.id)}>Delete List</button>

      <form onSubmit={handleSubmit(addTodo)}>
        <input
          data-testid={TodoListTestIds.input}
          type="text"
          placeholder="Add a new todo"
          {...register('text', { required: true })}
        />
        <button data-testid={TodoListTestIds.addButton} type="submit">Add</button>
      </form>

      <TodoFilters currentFilter={filter} setFilter={setFilter} />

      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
