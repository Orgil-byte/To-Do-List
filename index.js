const input = document.querySelector(`#input`);
const addElement = document.querySelector(`#addBtn`);
const taskContainer = document.querySelector(`#taskContainer`);
const deleteElement = document.querySelector(`.task_delete`);
const task = document.querySelector(`.task`);

const tasks = [];

let taskId = 1;

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
  }

  taskId++;
  clearInput();
  renderTasks();
};

taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task_delete")) {
    const index = e.target.parentElement.dataset.id;
    tasks.splice(index, taskId);
    renderTasks();
  }
});

const renderTasks = () => {
  let taskElementsHtml = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    taskElementsHtml += taskElement;
  });
  console.log(taskElementsHtml);

  taskContainer.innerHTML = taskElementsHtml;
};

const createTaskElement = (task) => {
  return `<div class = "task">
      <div class = "checkAndName">
        <input type = "checkbox" name = "checkbox" class = "task_checkbox" ${
          task.isComplete && "checked"
        }/>
        <p class = "task_text">${task.text}</p>
     </div>
        <button class = "task_delete"> Delete</button>
    </div>`;
};

const clearInput = () => {
  input.value = "";
};

addElement.addEventListener(`click`, add);
