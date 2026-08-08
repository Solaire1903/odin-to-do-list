import pencilSVG from "./img/pencil.svg"
import trashCanSVG from "./img/trash-can.svg"

class View {
    renderProjects(projects) {
        const projectList = document.getElementById("project-list")
        projectList.innerHTML = "";

        for (const project of projects) {
            const listElement = document.createElement("li");
            projectList.appendChild(listElement);

            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            listElement.appendChild(projectCard);

            const projectTitle = document.createElement("p");
            projectTitle.textContent = project.title;
            projectCard.appendChild(projectTitle);

            const buttonContainer = document.createElement("div");
            projectCard.appendChild(buttonContainer);

            const editButton = document.createElement("button");
            editButton.classList.add("project-edit-button");
            buttonContainer.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("project-delete-button");
            buttonContainer.appendChild(deleteButton);

            const deleteButtonImage = document.createElement("img");
            deleteButtonImage.src = trashCanSVG;
            deleteButtonImage.alt = "Delete";
            deleteButton.appendChild(deleteButtonImage);

            const editButtonImage = document.createElement("img");
            editButtonImage.src = pencilSVG;
            editButtonImage.alt = "Edit";
            editButton.appendChild(editButtonImage);
        }
    }

    renderTasks(tasks) {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        for (const task of tasks) {
            const listElement = document.createElement("li");
            taskList.appendChild(listElement);

            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            listElement.appendChild(taskCard);

            const taskCheckbox = document.createElement("div");
            taskCheckbox.classList.add("task-checkbox");
            taskCard.appendChild(taskCheckbox);

            const taskTitle = document.createElement("p");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = task.title;
            taskCard.appendChild(taskTitle);

            const taskDueDate = document.createElement("p");
            taskDueDate.classList.add("task-due-date");
            taskDueDate.textContent = task.dueDate;
            taskCard.appendChild(taskDueDate);

            const taskIconArea = document.createElement("div");
            taskIconArea.classList.add("task-icon-area");
            taskCard.appendChild(taskIconArea);

            const editButton = document.createElement("button");
            editButton.classList.add("task-edit-button");
            taskIconArea.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("task-delete-button");
            taskIconArea.appendChild(deleteButton);

            const deleteButtonImage = document.createElement("img");
            deleteButtonImage.src = trashCanSVG;
            deleteButtonImage.alt = "Delete";
            deleteButton.appendChild(deleteButtonImage);

            const editButtonImage = document.createElement("img");
            editButtonImage.src = pencilSVG;
            editButtonImage.alt = "Edit";
            editButton.appendChild(editButtonImage);
        }
    }

    applyTaskEventListeners(editFunction, deleteFunction) {
        const editButtons = document.querySelectorAll(".task-edit-button");
        const deleteButtons = document.querySelectorAll(".task-delete-button");

        editButtons.forEach((button) => button.removeEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.removeEventListener("click", deleteFunction));

        editButtons.forEach((button) => button.addEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.addEventListener("click", deleteFunction));
    }

    applyProjectEventListeners(editFunction, deleteFunction) {
        const editButtons = document.querySelectorAll(".project-edit-button");
        const deleteButtons = document.querySelectorAll(".project-delete-button");

        editButtons.forEach((button) => button.removeEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.removeEventListener("click", deleteFunction));

        editButtons.forEach((button) => button.addEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.addEventListener("click", deleteFunction));
    }

    applyInitialEventListeners(addProjectFunction, addTaskFunction) {
        const addProjectButton = document.getElementById("add-project-button");
        const addTaskButton = document.getElementById("add-task-button");

        addProjectButton.addEventListener("click", addProjectFunction);
        addTaskButton.addEventListener("click", addTaskFunction);
    }
}

export default new View();