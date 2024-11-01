import { removeTask } from "./taskProjectManager";

export function addTaskToDOM(task) {
    const taskListContainer = document.getElementById("taskListContainer");
    const taskElement = createTaskElement(task);
    taskListContainer.appendChild(taskElement);
}

function createTaskElement(task) {
    if (!task || !task.title) {   // Check if task and task.title are defined
        console.error("Task object is invalid or missing properties", task);
        return;
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    // Task title
    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;
    taskElement.appendChild(taskTitle);

    // Done button
    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.classList.add("done-button");
    taskElement.appendChild(doneButton);

    // Event listener to remove the task on button click
    doneButton.addEventListener("click", () => {
        removeTask(task.title);
        taskElement.remove(); // Remove from the DOM
    });

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    // Task details
    const taskDetailsContainer = document.createElement("div");
    taskDetailsContainer.classList.add("task-details-container");

    // Task details - priority
    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${task.priority}`;
    taskDetailsContainer.appendChild(taskPriority);

    // Task details - notes
    const taskNotes = document.createElement("p");
    taskNotes.textContent = `Notes: ${task.notes}`;
    taskDetailsContainer.appendChild(taskNotes);

    // Task details - deadline
    const taskDeadline = document.createElement("p");
    taskDeadline.textContent = `Deadline: ${task.deadline}`;
    taskDetailsContainer.appendChild(taskDeadline);

    // Task details - project
    const taskProject = document.createElement("p");
    taskProject.textContent = `Project: ${task.project}`;
    taskDetailsContainer.appendChild(taskProject);

    taskDetails.appendChild(taskDetailsContainer);    
    taskElement.appendChild(taskDetails); 
    
    return taskElement; 
}
