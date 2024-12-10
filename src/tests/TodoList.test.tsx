import { fireEvent, render, waitFor } from "@testing-library/react";

import TodoList, { TodoListTestIds } from "../components/TodoList/TodoList.tsx";
import { TodoListData } from "../types";

describe("TodoList", () => {
  it("renders the TodoList and adds a new Todo item", async () => {
    const updateTodoList = jest.fn();
    const deleteTodoList = jest.fn();

    const data: TodoListData = {
      id: "1",
      title: "Test List",
      todos: [],
    };

    const { getByTestId } = render(
      <TodoList deleteTodoList={deleteTodoList} list={data} updateTodoList={updateTodoList} />,
    );

    const title: string | null = getByTestId(TodoListTestIds.title).textContent;
    expect(title).toStrictEqual(data.title);

    const input = getByTestId(TodoListTestIds.input);
    const addButton = getByTestId(TodoListTestIds.addButton);
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(updateTodoList).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          id: "1",
          title: "Test List",
          todos: expect.arrayContaining([expect.objectContaining({ text: "Test Todo" })]),
        }),
      );
    });
  });

  it("deletes the TodoList when delete button is clicked", () => {
    const updateTodoList = jest.fn();
    const deleteTodoList = jest.fn();
    const data: TodoListData = {
      id: "1",
      title: "Test List",
      todos: [],
    };

    const { getByTestId } = render(
      <TodoList deleteTodoList={deleteTodoList} list={data} updateTodoList={updateTodoList} />,
    );

    fireEvent.click(getByTestId(TodoListTestIds.deleteButton));
    expect(deleteTodoList).toHaveBeenCalledWith("1");
  });
});
