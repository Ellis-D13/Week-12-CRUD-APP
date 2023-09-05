let tasks = []; // Global array to hold tasks

// Function to fetch and display tasks
function fetchTasks() {
  let taskList = "<ul>";
  tasks.forEach((task, index) => {
    taskList += `<li>${task} <button onclick="deleteTask(${index})">Delete</button> <button onclick="editTask(${index})">Edit</button></li>`;
  });
  taskList += "</ul>";
  document.getElementById("tasks").innerHTML = taskList;
}

// Initialize by fetching existing tasks
fetchTasks();

document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent default form submit action
  const taskContent = document.getElementById("taskInput").value;
  tasks.push(taskContent);
  fetchTasks();
  document.getElementById("taskInput").value = '';
});


// Function to edit a task
function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index]);
  if (newTask !== null) {
    tasks[index] = newTask;
    fetchTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task at the given index
  fetchTasks(); // Refresh the task list
}
