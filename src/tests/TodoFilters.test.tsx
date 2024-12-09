import { render, fireEvent } from '@testing-library/react';
import TodoFilters, { TodoFiltersTestIds } from '../components/TodoFilters/TodoFilters.tsx';

const setFilter = jest.fn();

describe('TodoFilters', () => {
  it('renders filter buttons and triggers filter changes', () => {
    const { getAllByTestId } = render(
      <TodoFilters currentFilter="all" setFilter={setFilter} />
    );

    const buttons = getAllByTestId(TodoFiltersTestIds.button);

    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('All');
    expect(buttons[1]).toHaveTextContent('Active');
    expect(buttons[2]).toHaveTextContent('Completed');

    fireEvent.click(buttons[1]);
    expect(setFilter).toHaveBeenCalledWith('active');
  });
});
