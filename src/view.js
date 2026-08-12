import pencilSVG from "./img/pencil.svg"
import trashCanSVG from "./img/trash-can.svg"

class View {
    /**
     * Renders projects from an array to the site
     * @param {Array.<ToDoProject>} projects The array of projects to be rendered
     */
    renderProjects(projects) {
        const projectList = document.getElementById("project-list")
        projectList.innerHTML = "";

        for (const project of projects) {
            const listElement = document.createElement("li");
            projectList.appendChild(listElement);

            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.dataset.id = project.id;
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

    /**
     * Renders tasks from an array to the site
     * @param {Array.<ToDoTask>} tasks The array of tasks to be rendered
     */
    renderTasks(tasks) {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        for (const task of tasks) {
            const listElement = document.createElement("li");
            taskList.appendChild(listElement);

            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.dataset.id = task.id;
            listElement.appendChild(taskCard);

            const taskCheckbox = document.createElement("button");
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

    /**
     * Applies the event listeners for all current task cards
     * @param {function} checkboxFunction Handles Checkbox functionality
     * @param {function} editFunction Handles Edit functionality
     * @param {function} deleteFunction Handles Delete functionality
     */
    applyTaskEventListeners(checkboxFunction, editFunction, deleteFunction) {
        const checkboxButtons = document.querySelectorAll(".task-checkbox");
        const editButtons = document.querySelectorAll(".task-edit-button");
        const deleteButtons = document.querySelectorAll(".task-delete-button");

        checkboxButtons.forEach((button) => button.removeEventListener("click", checkboxFunction));
        editButtons.forEach((button) => button.removeEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.removeEventListener("click", deleteFunction));

        checkboxButtons.forEach((button) => button.addEventListener("click", checkboxFunction));
        editButtons.forEach((button) => button.addEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.addEventListener("click", deleteFunction));
    }

    /**
     * Applies the event listeners for all current project cards
     * @param {function} editFunction Handles Edit functionality
     * @param {function} deleteFunction Handles Delete functionality
     */
    applyProjectEventListeners(editFunction, deleteFunction) {
        const editButtons = document.querySelectorAll(".project-edit-button");
        const deleteButtons = document.querySelectorAll(".project-delete-button");

        editButtons.forEach((button) => button.removeEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.removeEventListener("click", deleteFunction));

        editButtons.forEach((button) => button.addEventListener("click", editFunction));
        deleteButtons.forEach((button) => button.addEventListener("click", deleteFunction));
    }

    /**
     * Applies all the initial event listeners on startup
     * @param {function} handleNewProject Handles functionality for creating a new Project
     */
    applyInitialEventListeners(handleNewProject) {
        const addProjectButton = document.getElementById("add-project-button");

        const newProjectWindow = document.getElementById("new-project-window");
        const newProjectWindowCloseButton = document.getElementById("new-project-window-close-button");
        const newProjectForm = document.getElementById("new-project-form");
        const projectNameInput = document.getElementById("project-name-input");

        const addTaskButton = document.getElementById("add-task-button");

        const newTaskWindow = document.getElementById("new-task-window");
        const newTaskWindowCloseButton = document.getElementById("new-task-window-close-button");
        const newTaskForm = document.getElementById("new-task-form");
        const taskNameInput = document.getElementById("task-name-input");
        const taskDescriptionInput = document.getElementById("task-description-input");
        const taskDueDateInput = document.getElementById("task-due-date-input");
        const taskPriorityInput = document.getElementById("task-priority-input");

        addProjectButton.addEventListener("click", () => {
            newProjectWindow.showModal();
        });

        newProjectWindowCloseButton.addEventListener("click", () => {
            projectNameInput.value = "";
            newProjectWindow.close();
        })

        newProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            handleNewProject(projectNameInput.value);

            projectNameInput.value = "";
            newProjectWindow.close();
        })

        addTaskButton.addEventListener("click", () => {
            newTaskWindow.showModal();
        })

        newTaskWindowCloseButton.addEventListener("click", () => {
            taskNameInput.value = "";
            taskDescriptionInput.value = "";
            taskDueDateInput.value = "";
            taskPriorityInput.value = "";
            newTaskWindow.close();
        })
    }
}

export default new View();