const input = document.querySelector(`#input`);
const addElement = document.querySelector(`#addBtn`);
const taskContainer = document.querySelector(`#taskContainer`);
const deleteElement = document.querySelector(`.task_delete`);
const task = document.querySelector(`.task`);
const noTasksMessage = document.querySelector(`.noTasksMessage`);
const sectionCategoryBtn = document.querySelectorAll(`.section`);
const completedText = document.querySelector(`.completed`);

const tasks = [];

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

//Inner html, hmtl-iig uurchilnu

const renderTasks = () => {
  let taskElementsHtml = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    taskElementsHtml += taskElement;
  });
  console.log(taskElementsHtml);
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
    const taskElement = e.target.parentElement.parentElement;
    const taskText = taskElement.querySelector(".task_text");
    taskText.classList.toggle("decorationLine");
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

//"x of y tasks completed" hiine.

//Button click deer functionaa nemsen.
const addCount = addElement.addEventListener(`click`, add);
taskContainer.addEventListener(`click`, deleteTask);
sectionCategoryBtn.forEach((btn) => {
  btn.addEventListener(`click`, changeSection);
});
taskContainer.addEventListener(`click`, toggleTaskComplete);
