import { addTask } from './taskProjectManager.js';
import { addTaskToDOM } from './domManager.js';

export function displayTaskForm(projectsArray) {
    const taskFormContainer = document.getElementById("taskFormContainer");
    
    // Check if container is found
    if (!taskFormContainer) {
        console.error("taskFormContainer element not found");
        return;
    }

    taskFormContainer.innerHTML = createTaskFormHTML(projectsArray);
    taskFormContainer.style.display = "block"; // Make sure this container is visible
    
    // Add event listener to the form
    const taskForm = document.getElementById("taskForm");
    const cancelButton = document.getElementById("cancelTaskButton");
    if (taskForm) {
        taskForm.addEventListener("submit", handleTaskFormSubmit);
        cancelButton.addEventListener("click", handleCancelButton);
    } else {
        console.error("taskForm element not found after inserting form HTML");
    }
}
function createTaskFormHTML(projectsArray) {
    const projectOptions = projectsArray
        .map(project => `<option value="${project.name}">${project.name}</option>`)
        .join('');

    const formHTML = `
        <form id="taskForm">
            <label>Title: <input type="text" id="taskTitle" required></label><br>
            <label>Notes: <textarea id="taskNotes"></textarea></label><br>
            <label>Deadline: <input type="date" id="taskDeadline"></label><br>
            <label>Priority:
                <select id="taskPriority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label><br>
            <label>Project:
                <select id="taskProject">
                    <option value="Tasks">Tasks</option>
                    ${projectOptions}
                </select>
            </label><br>
            <button type="submit">Add Task</button>
            <button type="button" id="cancelTaskButton">Cancel</button>
        </form>
    `;
    
    return formHTML;
}

function getTaskFormData() {
    return {
        title: document.getElementById("taskTitle").value || null,
        notes: document.getElementById("taskNotes").value || null,
        deadline: document.getElementById("taskDeadline").value || null,
        priority: document.getElementById("taskPriority").value || null,
        project: document.getElementById("taskProject").value || null
    };
}


function handleTaskFormSubmit(event) {
    event.preventDefault();
    const formData = getTaskFormData();

    // Call addTask and check if it returns a valid task object
    const task = addTask(formData.title, formData.notes, formData.deadline, formData.priority, formData.project);
    
    if (task) {
        addTaskToDOM(task);  // Pass task to addTaskToDOM if task is valid
        document.getElementById("taskFormContainer").style.display = "none";
    } else {
        console.error("Task object is undefined or invalid");
    }    
}


function handleCancelButton(event) {
    event.preventDefault();
    document.getElementById("taskFormContainer").style.display = "none";
}       
