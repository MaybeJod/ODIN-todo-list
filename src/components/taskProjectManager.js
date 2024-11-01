import { Task, Project } from './models.js';
import { saveTasksToLocalStorage, saveProjectsToLocalStorage, updateLocalStorage } from './storageManager.js';
import { updateCounts } from './counter.js';

// Task and project arrays
export let tasksArray = [];
export let projectsArray = [];

// Add task to main array and (if applicable) to a project
export function addTask(taskTitle, taskNotes, deadline, priority, location) {
    const task = new Task(taskTitle, taskNotes, deadline, priority, location);
    tasksArray.push(task);
    saveTasksToLocalStorage(); // Save immediately after adding

    if (location !== "Tasks") {
        const projectLocation = projectsArray.find(project => project.name === location);
        if (projectLocation) {
            projectLocation.tasks.push(task);
        }
        saveProjectsToLocalStorage(); // Save projects if a task was added to one
    }

    updateCounts();
}

// Add project to main array
export function addProject(projectName) {
    const project = new Project(projectName);
    projectsArray.push(project);
    saveProjectsToLocalStorage(); // Save immediately after adding

    updateCounts();
}