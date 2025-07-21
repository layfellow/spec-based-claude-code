export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;
export type UpdateTodoInput = Partial<Pick<Todo, 'text' | 'completed'>>;