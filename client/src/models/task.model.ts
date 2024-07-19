export interface Task {
  _id: string;
  state: TaskStates;
  title: string;
  description?: string;
  projectId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export enum TaskStates {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
