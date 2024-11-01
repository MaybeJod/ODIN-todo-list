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
    taskElement.className = "task";
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p><strong>Notes:</strong> ${task.notes}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Project:</strong> ${task.project}</p>
    `;
    return taskElement;
}
