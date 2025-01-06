console.log("To-Do List app script loaded");

const taskTitleInput = document.getElementById("task-title");
const taskDueDateInput = document.getElementById("task-dueDate");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const API_URL = "http://localhost:8080/tasks";

// タスクを追加
addTaskButton.addEventListener("click", async () => {
    const title = taskTitleInput.value.trim();
    const dueDate = taskDueDateInput.value;

    if (!title || !dueDate) {
        alert("Title and due date are required.");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, dueDate }),
    });
    const data = await response.json();

    if (response.ok) {
        addTaskToDOM(data.task);
        taskTitleInput.value = "";
        taskDueDateInput.value = "";
    } else {
        alert(data.message || "Failed to add task.");
    }
});

// タスクをDOMに追加
function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${task.title} (Due: ${task.dueDate})
        <button onclick="deleteTask('${task.id}')">Delete</button>
        <button onclick="toggleTask('${task.id}')">Toggle Complete</button>
    `;
    taskList.appendChild(li);
}

// タスクを削除
async function deleteTask(id) {
    const response = await fetch(`${API_URL}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    const data = await response.json();

    if (response.ok) {
        document.querySelectorAll("li").forEach((li) => {
            if (li.innerHTML.includes(id)) li.remove();
        });
    } else {
        alert(data.message || "Failed to delete task.");
    }
}

// タスクの完了状態を切り替え
async function toggleTask(id) {
    const response = await fetch(`${API_URL}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    const data = await response.json();

    if (response.ok) {
        alert(`Task ${data.task.completed ? "completed" : "not completed"}.`);
    } else {
        alert(data.message || "Failed to toggle task.");
    }
}
