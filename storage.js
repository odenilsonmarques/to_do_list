// Função para salvar tarefas no Local Storage
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach((taskItem) => {
        const text = taskItem.querySelector(".task-text").textContent;
        const isCompleted = taskItem.querySelector(".status-tarefa").classList.contains("completed");
        tasks.push({ text, isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar tarefas do Local Storage
function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    // Certifica-se de não duplicar as tarefas ao carregar
    taskList.innerHTML = "";

    savedTasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskTextSpan = document.createElement("span");
        taskTextSpan.classList.add("task-text");
        taskTextSpan.textContent = task.text;

        const statusTarefa = document.createElement("button");
        statusTarefa.textContent = task.isCompleted ? "Feito" : "Pendente";
        statusTarefa.classList.add("status-tarefa");
        if (task.isCompleted) {
            statusTarefa.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("delete-button");

        // Eventos para os botões
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
            saveTasksToLocalStorage();
        });

        statusTarefa.addEventListener("click", function () {
            const isCompleted = statusTarefa.classList.toggle("completed");
            statusTarefa.textContent = isCompleted ? "Feito" : "Pendente";
            saveTasksToLocalStorage();
        });

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(statusTarefa);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Observa o DOM e salva alterações no Local Storage
document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();

    const addTaskButton = document.getElementById("addTaskButton");
    const taskInput = document.getElementById("taskInput");

    addTaskButton.addEventListener("click", saveTasksToLocalStorage);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            saveTasksToLocalStorage();
        }
    });

    // Garante que exclusões ou alterações sejam salvas
    const taskList = document.getElementById("taskList");
    taskList.addEventListener("DOMSubtreeModified", saveTasksToLocalStorage);
});
