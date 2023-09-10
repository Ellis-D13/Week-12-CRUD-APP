// Function to fetch tasks from the API and display them
function fetchTasks() {
  $.ajax({
    url: "http://localhost:3000/messages", // Replace with your API URL
    method: "GET",
    success: function(data) {
      let taskList = "<ul>";
      data.forEach((task, index) => {
        taskList += `<li>${task.content} <button onclick="deleteTask(${task.id})">Delete</button> <button onclick="editTask(${task.id})">Edit</button></li>`;
      });
      taskList += "</ul>";
      $("#tasks").html(taskList); // Update the UI
    },
  });
}

// Function to add a new task
function addTask(taskContent) {
  $.ajax({
    url: "http://localhost:3000/messages", // Replace with your API URL
    method: "POST",
    data: { content: taskContent },
    success: function(data) {
      fetchTasks(); // Refresh the list after adding
    },
  });
}

// Function to edit an existing task
function editTask(id) {
  const newContent = prompt("Edit your task:");
  if (newContent !== null) {
    $.ajax({
      url: `http://localhost:3000/messages/${id}`, // Replace with your API URL and task ID
      method: "PUT",
      data: { content: newContent },
      success: function(data) {
        fetchTasks(); // Refresh the list after editing
      },
    });
  }
}

// Function to delete a task
function deleteTask(id) {
  $.ajax({
    url: `http://localhost:3000/messages/${id}`, // Replace with your API URL and task ID
    method: "DELETE",
    success: function(data) {
      fetchTasks(); // Refresh the list after deleting
    },
  });
}

$("#taskForm").submit(function(e) {
  e.preventDefault(); // Prevent default form behavior
  const taskContent = $("#taskInput").val().trim(); // Grab the task input and trim any white space
  
  if(taskContent === '') {
    // Inform the user that the task cannot be empty
    alert('Task cannot be empty.');
    return;
  }

  // AJAX POST request to create a new task
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/messages", // API endpoint
    data: JSON.stringify({ content: taskContent }), // Task content
    contentType: "application/json",
    success: function() {
      fetchTasks(); // Fetch tasks again to update the view
    }
  });
});


// Initialize by fetching existing tasks
fetchTasks();
