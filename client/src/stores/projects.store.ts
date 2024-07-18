import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '@/models/project.model';
import { projectsService } from '@/services/projects.service';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])

  const fetchProjects = async () => {
    projects.value = await projectsService.getProjects()
  }

  return { projects, fetchProjects }
})
