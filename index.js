const input = document.querySelector(`#input`);
const taskContainer = document.querySelector(`#taskContainer`);
const noTasksMessage = document.querySelector(`.noTasksMessage`);
const sectionCategoryBtn = document.querySelectorAll(`.section`);
const completedText = document.querySelector(`.completed`);
const taskCompleted = document.querySelector(`#taskCompleted`);

let tasks = [];
let taskId = 1;
let sectionCategory = `all`;

// Add button list nemne
const add = () => {
  const inputText = input.value;

  const task = {
    id: taskId,
    text: inputText,
    isComplete: false,
  };
  if (inputText === "") {
    window.alert(`Please enter a task!`);
    return null;
  } else {
    tasks.push(task);
    noTasksMessage.style.display = `none`;
    completedText.style.display = `flex`;
  }
  taskId++;
  clearInput();
  renderTasks();
  updateCompletedCount();
};

//Inner html, hmtl-ruu shide

const renderTasks = () => {
  let taskElementsHtml = ``;

  if (sectionCategory === `active`) {
    tasksActiveComplete = tasks.filter((task) => !task.isComplete);
  }
  if (sectionCategory === `completed`) {
    tasksActiveComplete = tasks.filter((task) => task.isComplete);
  }
  if (sectionCategory === `all`) {
    tasksActiveComplete = tasks;
  }

  tasksActiveComplete.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskElementsHtml += taskElement;
  });
  taskContainer.innerHTML = taskElementsHtml;
};
//List ustgah
const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  if (tasks.length === 0) {
    noTasksMessage.style.display = `block`;
    completedText.style.display = `none`;
  } else {
    updateCompletedCount();
  }
  renderTasks();
};
//Clear completed
const clearCompleted = () => {
  let result = window.confirm(
    `Are sure you want to delete all completed tasks?`
  );
  if (result === true) {
    tasks = tasks.filter((task) => !task.isComplete);
  } else {
    return null;
  }

  updateCompletedCount();
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
};
//*********active completed***********//
//ungu soligdono. Fontnii ungu bolon backgroundnii ungu darhad soligdono..
const updateActiveButton = (index) => {
  sectionCategoryBtn.forEach((btn, id) => {
    if (id === index) {
      btn.classList.add(`active`);
    } else {
      btn.classList.remove(`active`);
    }
  });
};
const section = () => {
  sectionCategory = `all`;
  updateActiveButton(0);
  renderTasks();
};

const sectionActive = () => {
  sectionCategory = `active`;
  updateActiveButton(1);
  renderTasks();
};

const sectionCompleted = () => {
  sectionCategory = `completed`;
  updateActiveButton(2);
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
// Automataar input clear hiigdene.
const clearInput = () => {
  input.value = ``;
};
