import React from "react";

import { capitalize } from "../../utils/capitalize.ts";
import { Button } from "../Button/Button.tsx";
import styles from "./TodoFilters.module.css";

interface Props {
  currentFilter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

export const TodoFiltersTestIds = {
  button: "TodoFilters_button_test-id",
};

const TodoFilters: React.FC<Props> = ({ currentFilter, setFilter }) => (
  <div className={styles.todoFilters}>
    {["all", "active", "completed"].map((filter) => (
      <Button
        data-testid={TodoFiltersTestIds.button}
        isActive={currentFilter === filter}
        key={filter}
        onClick={() => setFilter(filter as "all" | "active" | "completed")}
      >
        {capitalize(filter)}
      </Button>
    ))}
  </div>
);

export default TodoFilters;
