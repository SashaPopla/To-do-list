"use strict";

const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

async function fetchTasks() {
  const response = await fetch("/tasks");
  const tasks = await response.json();
  tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.name;

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = () => deleteTask(task.name, li);

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

async function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: task })
    });
    addTaskToDOM({ name: task });
    taskInput.value = "";
  }
}

async function deleteTask(taskName, li) {
  await fetch(`/tasks/${taskName}`, { method: "DELETE" });
  li.remove();
}

addTaskBtn.addEventListener("click", addTask);
fetchTasks();