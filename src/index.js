import "./styles/reset.css"; // Reset CSS
import "./styles/style.css"; // Application styles


import { addTask, addProject, tasksArray, projectsArray, removeTask, removeProject, loadDataFromLocalStorage } from './components/taskProjectManager.js';
import { updateCounts } from './components/counter.js';
import { sampleProjects, sampleTasks } from './components/sampleData.js';
import { displayTaskForm } from './components/taskForm.js';
import { addTaskToDOM } from './components/domManager.js';
import { resetData } from "./components/reset-data.js";

document.getElementById("addTaskButton").addEventListener("click", () => {
    displayTaskForm(projectsArray);
});

export function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks); // Parse the saved tasks
        tasksArray.forEach(task => addTaskToDOM(task)); // Add each task to the DOM
    }
}

// Load sample content if local storage is empty or if the sample data flag is not set
function loadSampleContent() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    const sampleLoaded = localStorage.getItem("sampleLoaded");

    // Load sample data only if it hasn't been loaded before or storage is empty
    if ((!savedTasks || savedTasks.length === 0) && (!savedProjects || savedProjects.length === 0) && !sampleLoaded) {
        sampleProjects.forEach(project => addProject(project));
        sampleTasks.forEach(task => 
            addTask(task.title, task.notes, task.deadline, task.priority, task.project)
        );

        // Save sample data to local storage
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
        localStorage.setItem("projects", JSON.stringify(projectsArray));
        localStorage.setItem("sampleLoaded", "true");  // Set flag to avoid reloading
    } else {
        // Populate arrays with existing data from local storage
        tasksArray.push(...(savedTasks || []));
        projectsArray.push(...(savedProjects || []));
    }
}

//reset data and goes back to sample data
let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetData);

// Initialize application
loadSampleContent();
updateCounts();

document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
});



// Logging for debugging
console.log("Tasks Array:", tasksArray);
console.log("Projects Array:", projectsArray);

