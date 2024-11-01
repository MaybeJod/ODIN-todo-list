import { tasksArray, projectsArray } from './taskProjectManager.js';

// Count all tasks
export function countAllTasks() {
    return tasksArray.length;
}

// Count tasks in a specific project
export function countTasksInProject(projectName) {
    const project = projectsArray.find(project => project.name === projectName);
    return project ? project.tasks.length : 0;
}

// Update counts for all tasks and each project
export function updateCounts() {
    console.log(`Total Tasks: ${countAllTasks()}`);
    
    projectsArray.forEach(project => {
        console.log(`Tasks in project "${project.name}": ${project.tasks.length}`);
    });

    //no more tasks
    const allClearSection = document.querySelector(".no-more-tasks")
    allClearSection.style.display = tasksArray.length ? "none" : "block";
}

