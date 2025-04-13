let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const sotredTasks = JSON.parse(localStorage.getItem("tasks"));
  if (sotredTasks) {
    sotredTasks.forEach((task) => tasks.push(task));
    updateTask();
  }
});

const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTask();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTask();
};

const editTask = (index) => {
  document.getElementById("task-input").value = tasks[index].task;
  tasks.splice(index, 1);
  updateTask();
};

const updateTask = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const totalTasks = tasks.length;
  let completedTasks = 0;

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <li class="task">
        <div class="task-text ${task.completed ? "completed" : ""}">
          <input type="checkbox" id="checkbox" ${
            task.completed ? "checked" : ""
          }>
          <p class="task-text">${task.task}</p>
        </div>
        <div class="icons">
          <img src="./images/edit.png" onclick="editTask(${index})">
          <img src="./images/bin.png" onclick="deleteTask(${index})">
        </div>
      </li>
      `;

    listItem.addEventListener("change", () => toggleComplete(index));
    taskList.append(listItem);
    if (task.completed) completedTasks++;
  });

  document.getElementById(
    "stat-number"
  ).innerHTML = `${completedTasks}/${totalTasks}`;

  document.getElementById("progress").style.width =
    (completedTasks / totalTasks) * 100 + "%";

  saveTask();
};

const addTasks = () => {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  taskInput.value = "";

  if (taskText) {
    tasks.push({ task: taskText, completed: false });

    updateTask();
  }
};

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  addTasks();
});
