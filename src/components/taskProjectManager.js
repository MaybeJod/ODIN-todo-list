import { Task, Project } from './models.js';
import { saveTasksToLocalStorage, saveProjectsToLocalStorage, updateLocalStorage } from './storageManager.js';
import { updateCounts } from './counter.js';

// Task and project arrays
export let tasksArray = [];
export let projectsArray = [];

// Function to add task
export function addTask(title, notes, deadline, priority, project) {
    // Ensure all properties have values, even if default ones
    if (!title || !notes || !deadline || !priority || !project) {
        console.error("Missing task properties:", { title, notes, deadline, priority, project });
        return null; // Return null if any required property is missing
    }

    // Create a new task object with the provided data
    const task = { title, notes, deadline, priority, project };
    
    // Add the task to the array and save it
    tasksArray.push(task);
    saveTasksToLocalStorage(); // Save to local storage after adding
    
    return task; // Return the created task object
}

// Function to add project
export function addProject(projectName) {
    const project = new Project(projectName);
    projectsArray.push(project);
    saveProjectsToLocalStorage();
    updateLocalStorage
    updateCounts();
}

// Function to remove a specific task by title
export function removeTask(taskTitle) {
    // Remove from tasksArray
    tasksArray = tasksArray.filter(task => task.title !== taskTitle);
    
    // Remove task from associated project, if any
    projectsArray.forEach(project => {
        project.tasks = project.tasks.filter(task => task.title !== taskTitle);
    });

    // Save updated arrays to local storage
    saveTasksToLocalStorage();
    saveProjectsToLocalStorage();
    updateLocalStorage();
    updateCounts();
}

// Function to remove a project and its tasks
export function removeProject(projectName) {
    // Remove project from projectsArray
    projectsArray = projectsArray.filter(project => project.name !== projectName);

    // Remove tasks associated with this project from tasksArray
    tasksArray = tasksArray.filter(task => task.projectName !== projectName);

    // Save updated arrays to local storage
    saveTasksToLocalStorage();
    saveProjectsToLocalStorage();
    updateLocalStorage();
    updateCounts();
}

// Load tasks from local storage when the app initializes
export function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasksArray.push(...JSON.parse(storedTasks)); // Populate tasksArray from stored data
    }
}

export function loadProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
        projectsArray.push(...JSON.parse(storedProjects)); // Populate projectsArray from stored data
    }
}   

// Load data from local storage and update the UI
export function loadDataFromLocalStorage() {
    loadTasksFromLocalStorage();
    loadProjectsFromLocalStorage();
    updateLocalStorage();
    updateCounts();
}   