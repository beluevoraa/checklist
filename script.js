document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { text: taskText, completed: false };
    saveTask(task);
    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(this)">${task.text}</span>
        <div class="task-buttons">
            <button onclick="toggleTask(this.parentElement.previousElementSibling)">✔️</button>
            <button onclick="removeTask(this)">🗑️</button>
        </div>
    `;
    document.getElementById("taskList").appendChild(li);
}

function toggleTask(element) {
    element.classList.toggle("completed");
    updateTasks();
}

function removeTask(button) {
    button.closest("li").remove();
    updateTasks();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));
}

function updateTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let completed = li.querySelector("span").classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
