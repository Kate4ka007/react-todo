export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoListData {
  id: string;
  title: string;
  todos: Todo[];
}
