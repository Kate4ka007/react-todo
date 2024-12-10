import { act, fireEvent, render } from "@testing-library/react";

import TodoApp, { TodoAppTestIds } from "../components/TodoApp/TodoApp.tsx";

describe("TodoApp", () => {
  it("renders the TodoApp and adds a new TodoList", async () => {
    const { getByTestId, queryByText } = render(<TodoApp />);

    const input = getByTestId(TodoAppTestIds.input) as HTMLInputElement;
    const addButton = getByTestId(TodoAppTestIds.addButton);

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test List" } });
    });

    expect(input.value).toBe("Test List");

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(queryByText(/Test List/i)).toBeInTheDocument();
  });
});
