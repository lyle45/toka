export interface Task {
  _id: string;
  state: TaskStates;
  projectId: string;
  dueDate: string;
  notes: string;
}

export enum TaskStates {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
