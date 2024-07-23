import type { Task } from '@/models/task.model';
import type { Project } from '@/models/project.model';

export interface WebSocketMessage {
  type: WebSocketMessageTypes;
  model: WebSocketModels;
  data: Task | Project;
}

export interface WebSocketTaskMessage extends WebSocketMessage {
  model: WebSocketModels.Task;
  data: Task;
}

export interface WebSocketProjectMessage extends WebSocketMessage {
  model: WebSocketModels.Project;
  data: Project;
}

export interface WebSocketClientIdMessage extends WebSocketMessage {
  type: WebSocketMessageTypes.CLIENT_ID;
  clientId: string;
}

export type UnifiedWebSocketMessage =
  | WebSocketClientIdMessage
  | WebSocketTaskMessage
  | WebSocketProjectMessage;

export enum WebSocketMessageTypes {
  CLIENT_ID = 'CLIENT_ID',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum WebSocketModels {
  Task = 'Task',
  Project = 'Project',
}

// Type predicate for WebSocketClientIdMessage
export function isWebSocketClientIdMessage(
  msg: UnifiedWebSocketMessage
): msg is WebSocketClientIdMessage {
  return msg.type === WebSocketMessageTypes.CLIENT_ID;
}
