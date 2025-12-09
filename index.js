const input = document.querySelector(`#input`);
const addElement = document.querySelector(`#addBtn`);
const taskContainer = document.querySelector(`#taskContainer`);
const noTasksMessage = document.querySelector(`.noTasksMessage`);
const sectionCategoryBtn = document.querySelectorAll(`.section`);
const completedText = document.querySelector(`.completed`);
const taskCompleted = document.querySelector(`#taskCompleted`);

let tasks = [];
let taskId = 1;

// Add button list nemne
const add = () => {
  const inputText = input.value;

  const task = {
    id: taskId,
    text: inputText,
    isComplete: false,
  };
  if (inputText === "") {
    return null;
  } else {
    tasks.push(task);
    noTasksMessage.style.display = "none";
    completedText.style.display = "flex";
  }
  taskId++;
  clearInput();
  renderTasks();
};

//Inner html, hmtl-ruu shide

const renderTasks = () => {
  let taskElementsHtml = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    taskElementsHtml += taskElement;
  });
  taskContainer.innerHTML = taskElementsHtml;
};
//List ustgah
const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  if (tasks.length === 0) {
    noTasksMessage.style.display = "block";
    completedText.style.display = "none";
  } else {
    updateCompletedCount();
  }
  renderTasks();
};
//checkmark darahad bichgiig zuraastai bolgono.
const toggle = (taskId) => {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isComplete: !task.isComplete };
    }
    return task;
  });
  renderTasks();
  updateCompletedCount();
};
//x of y tasks completed text
const updateCompletedCount = () => {
  const completedCount = tasks.filter((task) => task.isComplete).length;
  taskCompleted.textContent = `${completedCount} of ${tasks.length} tasks completed`;
  console.log(tasks.filter((task) => task.isComplete));
};
//active completed
const sectionCompleted = () => {
  const completedTasks = tasks.filter((task) => task.isComplete);
  renderTasks();
};
const sectionActive = () => {
  const activeTasks = tasks.filter((task) => !task.isComplete);
  console.log(activeTasks);
  renderTasks();
};

//Html-d nemeh listiin code
const createTaskElement = (task) => {
  return `<div class="task" data-id="${task.id}">
      <div class="checkAndName">
        <input type="checkbox" name="checkbox" class="task_checkbox" onclick="toggle(${
          task.id
        })" ${task.isComplete ? "checked" : ""}/>
        <p class="task_text ${task.isComplete ? "decorationLine" : ""}">${
    task.text
  }</p>
     </div>
        <button class="task_delete" onclick="deleteTask(${
          task.id
        })">Delete</button>
    </div>`;
};

const clearInput = () => {
  input.value = "";
};
