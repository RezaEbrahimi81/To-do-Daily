// DOM Nodes
document.addEventListener("DOMContentLoaded", loadTasks);

const root = document.getElementById("root");
const taskInput = document.getElementById("taskInput");
const descriptionInput = document.getElementById("descriptionInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelBtn = document.getElementById("cancelBtn");
const taskList = document.getElementById("taskList");
const taskStatus = document.getElementById("taskStatus");
const taskBar = document.getElementById("taskBar");
const startBtn = document.getElementById("startBtn");
let tasks = [];

// functions
// function renderMainPage() {
//   const mainTemplate = `<!--Start Hero-->
//     <div class="mx-auto w-4/5 md:w-1/3 text-center">
//       <h2 class="text-lg md:text-3xl font-secondary text-black md:font-normal text-center">
//         Organizing your day activity<br />
//         with Todo Daily
//       </h2>
//       <button id="startBtn" class="w-28 md:w-60 p-1  mt-7 md:p-3 bg-primary md:text-xl text-white rounded-xl">
//         Get started
//       </button>
//     </div>
//     <img
//       src="../src/images/4005526 1.png"
//       width="1363px"
//       height="909px"
//       alt="hero-thumbnail"
//       class="mx-auto"
//     />
//     <!--End Hero-->
//     <!--Step Section-->
//     <div class="w-8/12 mx-auto mt-10">
//       <h2 class="text-lg md:text-3xl font-secondary text-black md:font-normal text-center">
//         Don’t let your day doing nothing
//       </h2>
//       <div class="flex justify-evenly gap-1 md:gap-4 w-full mt-5 items-center md:mt-10">
//         <a href="#">
//           <img class="object-contain" src="../src/images/fluent_tasks-app-28-filled.png" />
//           <p
//             class="mt-8 text-base md:text-xl font-secondary text-black md:font-normal text-center"
//           >
//              task
//           </p>
//         </a>
//         <a href="#">
//           <img class="object-contain" src="../src/images/clarity_note-edit-solid.png" />
//           <p
//             class="mt-8 text-base md:text-xl font-secondary text-black md:font-normal text-center"
//           >
//             Write it
//           </p>
//         </a>
//         <a href="#">
//           <img  class="object-contain" src="../src/images/ic_round-work-history.png" />
//           <p
//             class="mt-8 text-base md:text-xl font-secondary text-black md:font-normal text-center"
//           >
//             Do it
//           </p>
//         </a>
//         <a href="#">
//           <img  class="object-contain" src="../src/images/ic_round-event-repeat.png" />
//           <p
//             class="mt-8 text-base md:text-xl font-secondary text-black md:font-normal text-center"
//           >
//             Repeat
//           </p>
//         </a>
//       </div>
//     </div>
//     <!--End Step Section-->
//     <!--Get Start Section-->
//     <div class="md:w-8/12 mx-auto mt-44 flex flex-col items-center justify-center md:flex-row  md:justify-around md:gap-4 ">
//       <img width="60%" src="../src/images/image 1.png" />
//       <div class="text-center">
//         <h3 class="text-lg md:text-3xl font-secondary text-black md:font-normal text-center">
//           Achieve your target<br />
//           and won your life
//         </h3>
//         <button class="w-28 md:w-60 p-1 mt-4 md:mt-7 md:p-3 bg-primary md:text-xl text-white rounded-xl">
//           Get started
//         </button>
//       </div>
//     </div>
//   <!--End Get Start Section-->`;
//    root.innerHTML = mainTemplate;
// }

// function renderTodoDaily() {
// const todoTemplate = `
//      <!--start DailyPage-->
//     <!--start todo input-->
//     <div id="todoContainer" class="w-4/5 mx-auto mt-4">
//       <div id="taskStatus" class="text-secondary mb-4 "></div>

//       <!--start task list-->
//       <ul id="taskList" class="w-full mx-auto"></ul>
//       <!--End task list-->
//       <div onclick="openTaskBar()" class="w-80 flex justify-start items-center gap-2 text-primary ">
//         <img width="25px" height="25px" src="./images/fluent_add-circle-32-filled.png" > <span>Add Task</span>
//       </div>
//       <div id="taskBar" class="w-full hidden my-10 mx-auto" >
//         <input type="text" name="task" id="taskInput" placeholder="Task title" maxlength="30" class="bg-[#F4F4F4] text-[#8BCBCBC] w-full rounded-t-xl border-b-2 border-solid border-[#E7E7E7] h-auto outline-none p-5 placeholder:text-lg">
//         <input type="text" id="descriptionInput" name="description" placeholder="description" maxlength="" class="bg-[#F4F4F4] text-[#8BCBCBC] w-full rounded-b-xl h-auto outline-none p-5 placeholder:text-lg"></input>
//         <div>
//            <button id="addTaskBtn" class="w-1/5 p-1 text-base mt-4   md:p-2 bg-primary md:text-xl text-white rounded-xl">Add</button>
//            <button id="cancelBtn" onclick="openTaskBar()" class="w-2/12 ml-2 p-1 text-xs sm:text-sm mt-4   md:p-2 border-solid border border-primary text-primary md:text-xl bg-white rounded-xl">Cancel</button>
//         </div>
//       </div>

//     </div>
//     <!--End todo input-->
//     <!--End DailyPage-->
// `
// root.innerHTML = todoTemplate;

// }

function openTaskBar() {
  taskBar.classList.toggle("hidden");
}

function loadTasks() {
  renderTasks();
  updateTaskStatus();
}

function addTask() {
  const taskText = taskInput.value.trim();
  const descriptionText = descriptionInput.value.trim();

  if (taskText === "" || descriptionText === "") {
    alert("Please enter both a task title and a description!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    description: descriptionText,
    completed: false,
  };

  saveTask(task);
  taskInput.value = "";
  descriptionInput.value = "";

  openTaskBar();
}

function saveTask(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function getTasks() {
  const tasks = window.localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function renderTasks() {
  let tasks = getTasks();
  console.log(tasks);
  const liTemplate = tasks
    .map((task, index) => {
      return `<li class="w-full flex justify-center items-center gap-4">
      <div class="inline-flex items-center">
         <label class="relative">
          <input type="checkbox" class="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-[#EAEAEA] checked:border-[#EAEAEA]" id="check-custom-style"
           onchange="toggleTaskCompletion(${task.id})" ${
        task.completed ? "checked" : ""
      } />
           <span class="absolute text-primary opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[65%]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </span>
         </label>
        
      </div>
      <div class=" w-full flex justify-between mb-2 p-2  border border-[#E3E3E3] rounded-md">
       <div class="w-3/4 task-content" id="task-content-${task.id}">
          <h3 class="text-lg font-secondary font-semibold">${task.text}</h3>
          <p class="text-[#787878] w-3/4 max-w-full overflow-ellipsis text-sm mt-1">${
            task.description
          }</p>
       </div>
       <div class="w-1/10 relative flex flex-col items-center justify-center gap-0.5">
          <button onclick="toggleEdit(${task.id})" id="edit-btn-${
        task.id
      }" class="edit-btn w-1/4 mx-auto text-center"> 
             <img class="w-full object-contain" src="./images/bi_pencil-square.png">
          </button>
          <button onclick="deleteTask(${
            task.id
          })" class="w-full flex gap-0.5 md:gap-1 justify-normal items-center bg-white text-primary -mb-4 pr-3 md:px-3 -pl-1 py-2 rounded-md shadow-[02px_2px_12px_2px_#00000019]">
              <img class="w-2/4 object-contain" src="./images/bi_trash-fill.png">
              Delete 
          </button>
       </div>
      </div> 
    </li>`;
    })
    .join("");

  taskList.innerHTML = liTemplate;
  updateTaskStatus();
}

function toggleEdit(taskId) {
  const taskContent = document.getElementById(`task-content-${taskId}`);
  const editBtn = document.getElementById(`edit-btn-${taskId}`);

  // Check if win edit mode
  const input = taskContent.querySelector('input[type="text"]');

  if (!input) {
    // Switch to edit mode
    editBtn.innerHTML =
      '<img class="w-full object-contain" src="./images/icons8-save-50.png">'; // Replace with Save icon
    const taskText = taskContent.querySelector("h3").textContent;
    const taskDescription = taskContent.querySelector("p").textContent;

    const textInput = `<input type="text" id="input-text-${taskId}" value="${taskText}" class="border-2 border-gray-300 p-1">`;
    const descriptionInput = `<input type="text" id="input-description-${taskId}" value="${taskDescription}" class="border-2 border-gray-300 p-1">`;
    taskContent.innerHTML = textInput + "<br/>" + descriptionInput;
  } else {
    // Save changes
    const newText = document.getElementById(`input-text-${taskId}`).value;
    const newDescription = document.getElementById(
      `input-description-${taskId}`
    ).value;

    // Update the task
    updateTask(taskId, newText, newDescription);
    editBtn.innerHTML =
      '<img class="w-full object-contain" src="./images/bi_pencil-square.png">'; // Replace with  Edit icon
  }
}

function updateTask(taskId, newText, newDescription) {
  let tasks = getTasks();
  const task = tasks.find((item) => item.id === taskId);
  task.text = newText;
  task.description = newDescription;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleTaskCompletion(taskId) {
  let tasks = getTasks();
  const task = tasks.find((item) => item.id === taskId);
  task.completed = !task.completed;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskStatus();
}

function updateTaskStatus() {
  const tasks = getTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  taskStatus.textContent =
    totalTasks === 0
      ? "No tasks available"
      : `${completedTasks}/${totalTasks} completed`;
}
function deleteTask(taskId) {
  let tasks = getTasks();
  tasks = tasks.filter((item) => item.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  updateTaskStatus();
}

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
// startBtn.addEventListener("click", renderTodoDaily)
// renderMainPage();
loadTasks();
