import { render, fireEvent } from '@testing-library/react';
import { Todo } from '../types';
import TodoItem, {TodoItemTestIds} from '../components/TodoItem/TodoItem.tsx';



describe('TodoItem', () => {
  it('renders a TodoItem and toggles completion', () => {
    const data: Todo = {
      id: '1',
      text: 'Test Todo',
      completed: false,
    };

    const toggleTodo = jest.fn();
    const deleteTodo = jest.fn();

    const { getByTestId } =render(
      <TodoItem
        todo={data}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );

    const text: string | null = getByTestId(TodoItemTestIds.text).textContent;
    expect(text).toStrictEqual(data.text)

    const input = getByTestId(TodoItemTestIds.input);

    fireEvent.click(input);
    expect(toggleTodo).toHaveBeenCalledWith('1');
  });

  it('deletes the TodoItem when delete button is clicked', () => {
    const mockTodo: Todo = {
      id: '1',
      text: 'Test Todo',
      completed: false,
    };

    const toggleTodo = jest.fn();
    const deleteTodo = jest.fn();
    const { getByTestId } =render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );

    const deleteButton = getByTestId(TodoItemTestIds.deleteButton);

    fireEvent.click(deleteButton);
    expect(deleteTodo).toHaveBeenCalledWith('1');
  });
});
