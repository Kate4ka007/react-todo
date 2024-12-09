import React from 'react';
import styles from './TodoFilters.module.css';
import clsx from 'clsx';
import {capitalize} from '../../utils/capitalize.ts';

interface Props {
  currentFilter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoFiltersTestIds = {
  button: 'TodoFilters_button_test-id',
};

const TodoFilters: React.FC<Props> = ({ currentFilter, setFilter }) => (
  <div className={styles.todoFilters}>
    {['all', 'active', 'completed'].map(filter => (
      <button
        data-testid={TodoFiltersTestIds.button}
        key={filter}
        className={clsx(styles.button, { [styles.active]: currentFilter === filter}) }
        onClick={() => setFilter(filter as 'all' | 'active' | 'completed')}
      >
        {capitalize(filter)}
      </button>
    ))}
  </div>
);

export default TodoFilters;
