const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value;
  const date = document.getElementById("taskDate").value;
  const duration = document.getElementById("taskDuration").value;

  if (!title || !date || !duration) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    date,
    duration,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  updateProgress();

  // clear inputs
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskDuration").value = "";
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      updateProgress();
    });

    li.appendChild(span);
    li.appendChild(checkbox);
    taskList.appendChild(li);
  });
}

function updateProgress() {
  if (tasks.length === 0) {
    progressText.textContent = "Progress: 0%";
    return;
  }

  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);
  progressText.textContent = `Progress: ${percent}%`;
}
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// INITIAL RENDER
renderTasks();
updateProgress();

addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value;
  const date = document.getElementById("taskDate").value;
  const duration = document.getElementById("taskDuration").value;

  if (!title || !date || !duration) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    date,
    duration,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  updateProgress();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskDuration").value = "";
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${task.title} (${task.duration} min)`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      updateProgress();
    });

    li.appendChild(span);
    li.appendChild(checkbox);
    taskList.appendChild(li);
  });
}

function updateProgress() {
  if (tasks.length === 0) {
    progressText.textContent = "Progress: 0%";
    return;
  }

  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);
  progressText.textContent = `Progress: ${percent}%`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

