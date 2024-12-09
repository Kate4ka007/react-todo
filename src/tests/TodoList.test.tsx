import {render, fireEvent, waitFor} from '@testing-library/react';
import {TodoListData} from '../types';
import TodoList, {TodoListTestIds} from '../components/TodoList/TodoList.tsx';


const updateTodoList = jest.fn();
const deleteTodoList = jest.fn();

describe('TodoList', () => {
  it('renders the TodoList and adds a new Todo item', async () => {
    const updateTodoList = jest.fn();
    const deleteTodoList = jest.fn();

    const data: TodoListData = {
      id: '1',
      title: 'Test List',
      todos: [],
    };

    const { getByTestId } = render(
      <TodoList
        list={data}
        updateTodoList={updateTodoList}
        deleteTodoList={deleteTodoList}
      />
    );

    const title: string | null = getByTestId(TodoListTestIds.title).textContent;
    expect(title).toStrictEqual(data.title)

    const input = getByTestId(TodoListTestIds.input);
    const addButton = getByTestId(TodoListTestIds.addButton);
    fireEvent.change(input, {target: {value: 'Test Todo'}});
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(updateTodoList).toHaveBeenCalledWith('1', expect.objectContaining({
        id: '1',
        title: 'Test List',
        todos: expect.arrayContaining([expect.objectContaining({text: 'Test Todo'})]),
      }));
    });
  });

  it('deletes the TodoList when delete button is clicked', () => {

    const data: TodoListData = {
      id: '1',
      title: 'Test List',
      todos: [],
    };

    const {getByTestId} = render(
      <TodoList
        list={data}
        updateTodoList={updateTodoList}
        deleteTodoList={deleteTodoList}
      />
    );

    fireEvent.click(getByTestId(TodoListTestIds.deleteButton));
    expect(deleteTodoList).toHaveBeenCalledWith('1');
  });
});
