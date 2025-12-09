const input = document.querySelector(`#input`);
const addElement = document.querySelector(`#addBtn`);
const taskContainer = document.querySelector(`#taskContainer`);
const deleteElement = document.querySelector(`.task_delete`);
const task = document.querySelector(`.task`);
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

//Html-d nemeh listiin code
const createTaskElement = (task) => {
  return `<div class="task" data-id="${task.id}">
      <div class="checkAndName">
        <input type="checkbox" name="checkbox" class="task_checkbox" ${
          task.isComplete && "checked"
        }/>
        <p class="task_text">${task.text}</p>
     </div>
        <button class="task_delete">Delete</button>
    </div>`;
};

//All Active Completed  ungu solino
const changeSection = (e) => {
  sectionCategoryBtn.forEach((btn) => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
};

//Check mark darahad  task_text deeree zuraastai bolno.
const toggleTaskComplete = (e) => {
  if (e.target.classList.contains("task_checkbox")) {
    const idToToggle = Number(e.target.parentElement.dataset.id);
    const toggleIndex = tasks.findIndex((task) => task.id === idToToggle);
    if (toggleIndex) {
      const taskText = taskElement.querySelector(".task_text");
      taskText.classList.toggle("decorationLine");
      renderTasks();
    }

    console.log(taskText);
  }
};

//List ustgana.
const deleteTask = (e) => {
  if (e.target.classList.contains("task_delete")) {
    const idToDelete = Number(e.target.parentElement.dataset.id);
    const index = tasks.findIndex((task) => task.id === idToDelete);
    if (index !== -1) {
      tasks.splice(index, 1);
      renderTasks();
      taskCompleted.textContent = `x of ${tasks.length} tasks completed`;
    }
    if (tasks.length === 0) {
      noTasksMessage.style.display = "block";
      completedText.style.display = "none";
    }
  }
};

const clearInput = () => {
  input.value = "";
};

//Button click deer functionaa nemsen.
const addCount = addElement.addEventListener(`click`, add);
sectionCategoryBtn.forEach((btn) => {
  btn.addEventListener(`click`, changeSection);
});
// taskContainer.addEventListener(`click`, toggleTaskComplete);
taskContainer.addEventListener(`click`, deleteTask);
