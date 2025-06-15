let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const buttons = document.createElement("div");

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn btn-sm btn-success me-1";
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-warning me-1";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newText = prompt("Update your task:", task.text);
      if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    buttons.appendChild(toggleBtn);
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttons);

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  } else {
    alert("Please enter a task!");
  }
}

// Initial render
renderTasks();
