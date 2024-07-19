export interface Project {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type NewProject = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;
