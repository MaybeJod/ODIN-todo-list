import { sampleContent } from "./stored-data";

// Task and project arrays
export let tasksArray = [];
export let projectsArray = [];

// Task constructor
class Task {
    constructor(taskTitle, taskNotes, deadline, priority, location) {
        this.title = taskTitle;
        this.notes = taskNotes;
        this.deadline = deadline;
        this.priority = priority;
        this.projectName = location;  // Link task to project by name
    }
}

// Project constructor
class Project {
    constructor(projectName) {
        this.name = projectName;
        this.tasks = [];
    }
}

// Add task
export function addTask(taskTitle, taskNotes, deadline, priority, location) {
    let task = new Task(taskTitle, taskNotes, deadline, priority, location);

    // Add task to the main tasks array
    tasksArray.push(task);
    saveTasksToLocalStorage(tasksArray);

    // Also add task to the specified project's tasks array if applicable
    if (location !== "Tasks") {
        let projectLocation = projectsArray.find(project => project.name === location);
        if (projectLocation) {
            projectLocation.tasks.push(task);
            saveProjectsToLocalStorage(projectsArray);
        }
    }
}

// Add project
export function addProject(projectName) {
    let project = new Project(projectName);
    projectsArray.push(project);
    saveProjectsToLocalStorage(projectsArray);
}

// Save tasks array to local storage
export function saveTasksToLocalStorage(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// Save projects array to local storage
export function saveProjectsToLocalStorage(projectsArray) {
    localStorage.setItem("projects", JSON.stringify(projectsArray));
}

// Count all tasks
export function countAllTasks() {
    return tasksArray.length;
}

// Count tasks in a specific project
export function countTasksInProject(projectName) {
    let project = projectsArray.find(project => project.name === projectName);
    return project ? project.tasks.length : 0;
}

sampleContent();
