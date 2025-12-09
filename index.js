const input = document.querySelector(`#input`);
const addElement = document.querySelector(`#addBtn`);
const taskContainer = document.querySelector(`#taskContainer`);
const deleteElement = document.querySelector(`.task_delete`);
const task = document.querySelector(`.task`);
const noTasksMessage = document.querySelector(`.noTasksMessage`);
const sectionCategoryBtn = document.querySelectorAll(`.section`);
const completedText = document.querySelector(`.completed`);
const taskCompleted = document.querySelector(`#taskCompleted`);
const toggleTask = document.querySelector(`.task_text`);

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
  taskCompleted.textContent = `x of ${tasks.length} tasks completed`;
  taskId++;
  clearInput();
  renderTasks();
};

//Inner html, hmtl-iig uurchilnu

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
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  tasks = updatedTasks;
  renderTasks();
};

//checkmark darahad bichgiig zuraastai bolgono.
const toggle = tasks.map((task) => {
  if (task.id === taskId) {
    toggleTask.classList.add(`decorationLine`);
  }
});
//Html-d nemeh listiin code
const createTaskElement = (task) => {
  return `<div class="task" data-id="${task.id}">
      <div class="checkAndName">
        <input type="checkbox" name="checkbox" class="task_checkbox" onclick = "toggle(${
          task.id
        })"${task.isComplete && "checked"}/>
        <p class="task_text">${task.text}</p>
     </div>
        <button class="task_delete" onclick = "deleteTask(${
          task.id
        })">Delete</button>
    </div>`;
};

const clearInput = () => {
  input.value = "";
};

//Button click deer functionaa nemsen.
