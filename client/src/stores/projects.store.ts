import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NewProject, Project } from '@/models/project.model';
import { projectsService } from '@/services/projects.service';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);

  const fetchProjects = async () => {
    projects.value = await projectsService.getProjects();
  };

  const createProject = async (newProject: NewProject) => {
    const project = await projectsService.createProject(newProject);
    projects.value.push(project);
  };

  const updateProject = async (project: Project) => {
    const updatedProject = await projectsService.updateProject(project);
    const index = projects.value.findIndex((p) => p._id === updatedProject._id);
    projects.value[index] = updatedProject;
  };

  const deleteProject = async (projectId: string) => {
    await projectsService.deleteProject(projectId);
    projects.value = projects.value.filter((project) => project._id !== projectId);
  };

  return { projects, fetchProjects, updateProject, createProject, deleteProject };
});
