<template>
  <div class="tasks-list" :class="{ 'flex-height': !tasks.length }">
    <template v-if="!loadingTasks">
      <Draggable
        :model-value="tasks"
        :group="group"
        :sort="false"
        item-key="_id"
        :class="{ 'flex-height': !tasks.length }"
        :delay="isTouch ? 100 : 0"
        delay-on-touch-only
        :scroll-sensitivity="200"
        @change="handleListChange"
      >
        <template #item="{ element }">
          <TaskItem :task="element" />
        </template>
      </Draggable>
      <div v-if="!tasks.length" class="no-tasks">No tasks available</div>
    </template>
    <template v-else>
      <TaskItem v-for="i in getRandomNumber()" :key="i" loading />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, toRefs } from 'vue';
import { type Task, TaskStates } from '@/models/task.model';
import TaskItem from '@/components/TasksList/TaskItem/TaskItem.vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks.store';
import Draggable from 'vuedraggable';
import { useToast } from 'vue-toastification';
import { useMobileDetection } from 'vue3-mobile-detection';

interface DraggableChangeEvent<T> {
  added?: {
    newIndex: number;
    element: T;
  };
  removed?: {
    oldIndex: number;
    element: T;
  };
  moved?: {
    newIndex: number;
    oldIndex: number;
    element: T;
  };
}

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  taskState: {
    type: String as PropType<TaskStates>,
    required: true,
  },
});

const { taskState } = toRefs(props);

const { updateTask } = useTasksStore();
const { loadingTasks } = storeToRefs(useTasksStore());
const toast = useToast();
const { isMobile } = useMobileDetection();
const getRandomNumber = () => Math.floor(Math.random() * 3) + 1;

const isTouch = computed(() => isMobile({ tablet: true }));

const group = computed(() => ({
  name: taskState.value,
  pull: true,
  put: true,
}));

const handleListChange = (e: DraggableChangeEvent<Task>) => {
  if (e.added) {
    editTask(e.added.element);
  }
};

const editTask = async (newTask: Task) => {
  try {
    await updateTask({ ...newTask, state: taskState.value });
  } catch (e) {
    toast.error("Something happened, couldn't update task");
    console.log(e);
  }
};
</script>

<style scoped lang="scss">
.tasks-list {
  background-color: #f5f5f5;
}

.no-tasks {
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #999;
}

.flex-height {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>
