import { tasksArray, projectsArray } from './taskProjectManager.js';

export function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

export function saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(projectsArray));
}

export function updateLocalStorage() {
    saveTasksToLocalStorage();
    saveProjectsToLocalStorage();
}