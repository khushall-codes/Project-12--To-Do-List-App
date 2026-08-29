const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const clearBtn = document.getElementById("clearBtn");


// Load tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display Tasks

function displayTasks() {

    taskList.innerHTML = "";


    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task";


        if (task.completed) {
            li.classList.add("completed");
        }


        li.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">
                ${task.text}
            </span>

            <button class="delete-btn">
                ×
            </button>

        `;


        // Complete task

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {

            tasks[index].completed = checkbox.checked;

            saveTasks();

        });


        // Delete task

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

        });


        taskList.appendChild(li);

    });


    updateCount();

}


// Add Task

function addTask() {

    const text = taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task!");

        return;

    }


    tasks.push({

        text: text,

        completed: false

    });


    taskInput.value = "";


    saveTasks();


    taskInput.focus();

}


// Update task count

function updateCount() {

    const remainingTasks =
        tasks.filter(task => !task.completed).length;


    taskCount.textContent = remainingTasks;

}


// Clear completed tasks

function clearCompleted() {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

}


// Save tasks

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();

}


// Add button

addBtn.addEventListener("click", addTask);


// Enter key

taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        addTask();

    }

});


// Clear completed

clearBtn.addEventListener("click", clearCompleted);


// Initial display

displayTasks();