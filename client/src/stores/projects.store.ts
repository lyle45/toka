import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { NewProject, Project } from '@/models/project.model';
import { projectsService } from '@/services/projects.service';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);
  const loadingProjects = ref(false);
  const currentProjectId = ref('');

  const filterText = ref('');

  const filteredProjects = computed(() =>
    !filterText.value
      ? projects.value
      : projects.value.filter((project) => project.name.includes(filterText.value))
  );

  const setCurrentProjectId = (projectId: string) => {
    currentProjectId.value = projectId;
  };

  const fetchProjects = async () => {
    try {
      loadingProjects.value = true;
      projects.value = await projectsService.getProjects();
    } finally {
      loadingProjects.value = false;
    }
  };

  const addProjectToStore = (project: Project) => {
    projects.value.push(project);
  };

  const createProject = async (newProject: NewProject) => {
    const project = await projectsService.createProject(newProject);
    addProjectToStore(project);
    return project;
  };

  const updateProjectInStore = (project: Project) => {
    const index = projects.value.findIndex((p) => p._id === project._id);
    projects.value[index] = project;
  };

  const updateProject = async (project: Project) => {
    const updatedProject = await projectsService.updateProject(project);
    updateProjectInStore(updatedProject);
  };

  const deleteProjectFromStore = (projectId: string) => {
    const index = projects.value.findIndex((project) => project._id === projectId);
    index > -1 && projects.value.splice(index, 1);
  };

  const deleteProject = async (projectId: string) => {
    await projectsService.deleteProject(projectId);
    deleteProjectFromStore(projectId);
  };

  return {
    projects,
    loadingProjects,
    currentProjectId,
    filterText,
    filteredProjects,
    setCurrentProjectId,
    fetchProjects,
    addProjectToStore,
    updateProject,
    updateProjectInStore,
    createProject,
    deleteProjectFromStore,
    deleteProject,
  };
});
