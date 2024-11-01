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
        this.projectName = location;
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

    // Also add task to the specified project's tasks array if applicable
    if (location !== "Tasks") {
        let projectLocation = projectsArray.find(project => project.name === location);
        if (projectLocation) {
            projectLocation.tasks.push(task);
            countTasksInProject(location);
            saveProjectsToLocalStorage(projectsArray);
        }
    }

    //update local storage and counts
    updateLocalStorage();
    updateCounts();
}

// Add project
export function addProject(projectName) {
    let project = new Project(projectName);
    projectsArray.push(project);
    saveProjectsToLocalStorage(projectsArray);

    //update local storage and counts
    updateLocalStorage();    
    updateCounts();
}

// Save tasks array to local storage
export function saveTasksToLocalStorage(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// Save projects array to local storage
export function saveProjectsToLocalStorage(projectsArray) {
    localStorage.setItem("projects", JSON.stringify(projectsArray));
}

export function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    localStorage.setItem("projects", JSON.stringify(projectsArray));
}


// Count all tasks
export function countAllTasks() {
    return tasksArray.length;
}

// Count tasks in a specific project
export function countTasksInProject(projectName) {
    // Check if the project exists in projectsArray
    let project = projectsArray.find(project => project.name === projectName);
    if (!project) {
        console.warn(`Project "${projectName}" not found in projectsArray.`);
        return 0; // Return 0 if project doesn't exist
    }
    return project.tasks.length;
}

export function updateCounts() {
    // Count all tasks
    const totalTasks = tasksArray.length;
    console.log(`Total Tasks: ${totalTasks}`);
    
    // Log each project's task count
    projectsArray.forEach(project => {
        const projectTaskCount = project.tasks.length;
        console.log(`Tasks in project "${project.name}": ${projectTaskCount}`);
    });
}



sampleContent(); 
console.log(tasksArray);
console.log(projectsArray);