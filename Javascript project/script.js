// Load tasks from local storage on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Add task on button click
document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `${taskText} <span class="delete">❌</span>`;
  document.getElementById("taskList").appendChild(li);

  // Save to local storage
  saveToLocalStorage(taskText);

  // Clear input field
  taskInput.value = "";

  // Attach delete event
  li.querySelector(".delete").addEventListener("click", () => removeTask(li, taskText));
}

function removeTask(element, taskText) {
  element.remove();
  deleteFromLocalStorage(taskText);
}

// Save task to local storage
function saveToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from local storage
function deleteFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load and display tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <span class="delete">❌</span>`;
    document.getElementById("taskList").appendChild(li);

    // Add delete event
    li.querySelector(".delete").addEventListener("click", () => removeTask(li, task));
  });
}
