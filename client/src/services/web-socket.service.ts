import {
  isWebSocketClientIdMessage,
  WebSocketMessageTypes,
  WebSocketModels,
  type UnifiedWebSocketMessage,
  type WebSocketClientIdMessage,
  type WebSocketProjectMessage,
  type WebSocketTaskMessage,
} from '@/models/web-socket.model';
import { httpService } from '@/services/http.service';
import { useProjectsStore } from '@/stores/projects.store';
import { useTasksStore } from '@/stores/tasks.store';

class WebSocketService {
  private socket!: WebSocket;
  private slug = 'ws';

  public connect() {
    return new Promise<void>((resolve, reject) => {
      this.socket = new WebSocket(`${window.location.origin}/${this.slug}`);

      this.socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (isWebSocketClientIdMessage(data)) {
          console.log('Client ID received');
          resolve();
        }
        this.handleMessage(data);
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };
    });
  }

  private handleMessage(msg: UnifiedWebSocketMessage) {
    if (isWebSocketClientIdMessage(msg)) {
      return this.handleClientMessage(msg);
    }

    switch (msg.model) {
      case WebSocketModels.Task:
        this.handleTaskMessage(msg);
        break;
      case WebSocketModels.Project:
        this.handleProjectMessage(msg);
        break;
      default:
        console.warn('Unhandled WebSocket message type:', msg);
    }
  }

  private handleClientMessage(msg: WebSocketClientIdMessage) {
    httpService.addClientId(msg.clientId);
  }

  private handleTaskMessage(msg: WebSocketTaskMessage) {
    const { updateTaskInStore, deleteTaskFromStore, addTaskToStore } = useTasksStore();

    switch (msg.type) {
      case WebSocketMessageTypes.INSERT:
        addTaskToStore(msg.data);
        break;
      case WebSocketMessageTypes.UPDATE:
        updateTaskInStore(msg.data);
        break;
      case WebSocketMessageTypes.DELETE:
        deleteTaskFromStore(msg.data._id);
        break;
      default:
        console.warn('Unhandled websocket task action:', msg);
    }
  }

  private handleProjectMessage(msg: WebSocketProjectMessage) {
    const { updateProjectInStore, deleteProjectFromStore, addProjectToStore } = useProjectsStore();

    switch (msg.type) {
      case WebSocketMessageTypes.INSERT:
        addProjectToStore(msg.data);
        break;
      case WebSocketMessageTypes.UPDATE:
        updateProjectInStore(msg.data);
        break;
      case WebSocketMessageTypes.DELETE:
        deleteProjectFromStore(msg.data._id);
        break;
      default:
        console.warn('Unhandled websocket project action:', msg);
    }
  }
}

export const webSocketService = new WebSocketService();
