const darkModeToggle = document.getElementById("darkModeToggle");
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all";
const progressBar = document.getElementById("progressBar");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTaskId = null;
// Initial render
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
    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      updateProgress();
    });
    const span = document.createElement("span");
    span.textContent = `${task.title} (${task.duration} min)`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
      updateProgress();
    });
    left.appendChild(checkbox);
    left.appendChild(span);
    li.appendChild(left);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
function updateProgress() {
  if (tasks.length === 0) {
    progressText.textContent = "Progress: 0%";
    progressBar.style.width = "0%";
    return;
  }
  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);
  progressText.textContent = `Progress: ${percent}%`;
  progressBar.style.width = percent + "%";
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks();
  });
});
function renderTasks() {
  taskList.innerHTML = "";
let filteredTasks = tasks;
const today = new Date();
today.setHours(0, 0, 0, 0);

if (currentFilter === "today") {
  const todayStr = today.toISOString().split("T")[0];
  filteredTasks = tasks.filter(t => t.date === todayStr);
}

if (currentFilter === "upcoming") {
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  filteredTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return taskDate >= today && taskDate <= nextWeek;
  });
}
  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      updateProgress();
    });

    const span = document.createElement("span");
    span.textContent = `${task.title} (${task.duration} min)`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
      updateProgress();
    });

    left.appendChild(checkbox);
    left.appendChild(span);

    li.appendChild(left);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
  document.body.classList.add("dark");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});
