import { format } from "date-fns";
import textBoxSVG from "./img/text-box.svg";
import pencilSVG from "./img/pencil.svg";
import trashCanSVG from "./img/trash-can.svg";

class View {
    #currentProjectId
    #currentTaskId
    #currentRadioButtonChoice
    #currentRadioButtonChoiceEdit

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
     * Renders a given title above the task list
     * @param {string} title The title to render
     */
    renderActiveProjectTitle(title) {
        const activeProjectTitle = document.getElementById("active-project-title");

        activeProjectTitle.textContent = title;
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
            if (task.isCompleted) {
                taskCard.classList.add("task-card-completed");
            }
            else {
                switch (task.priority) {
                    case "low":
                        taskCard.style.backgroundColor = "green";
                        break;
                    case "medium":
                        taskCard.style.backgroundColor = "yellow";
                        break;
                    case "high":
                        taskCard.style.backgroundColor = "red";
                        break;
                }
            }
            listElement.appendChild(taskCard);

            const taskCheckbox = document.createElement("button");
            taskCheckbox.classList.add("task-checkbox");
            if (task.isCompleted) taskCheckbox.style.backgroundColor = "green";
            taskCard.appendChild(taskCheckbox);

            const taskTitle = document.createElement("p");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = task.title;
            taskCard.appendChild(taskTitle);

            const taskDueDate = document.createElement("p");
            taskDueDate.classList.add("task-due-date");

            const dateValues = task.dueDate.split('-');
            taskDueDate.textContent = `Due: ${format(new Date(
                dateValues[0], dateValues[1] - 1, dateValues[2]), "MMMM do yyyy")}`;
            taskCard.appendChild(taskDueDate);

            const taskIconArea = document.createElement("div");
            taskIconArea.classList.add("task-icon-area");
            taskCard.appendChild(taskIconArea);

            const descriptionButton = document.createElement("button");
            descriptionButton.classList.add("description-button");
            taskIconArea.appendChild(descriptionButton);

            const editButton = document.createElement("button");
            editButton.classList.add("task-edit-button");
            taskIconArea.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("task-delete-button");
            taskIconArea.appendChild(deleteButton);

            const descriptionButtonImage = document.createElement("img");
            descriptionButtonImage.src = textBoxSVG;
            descriptionButtonImage.alt = "Description";
            descriptionButton.appendChild(descriptionButtonImage);

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
     * Renders the "Add Task" button to the page
     */
    showTaskButton() {
        document.getElementById("add-task-button").removeAttribute("hidden");
    }

    /**
     * Hides the "Add Task" button from the page
     */
    hideTaskButton() {
        document.getElementById("add-task-button").setAttribute("hidden", true);
    }

    /**
     * Applies the event listeners for all current project cards
     * @param {function} handleActiveProject Handles active project functionality
     */
    applyProjectEventListeners(handleActiveProject) {
        const projectCards = document.querySelectorAll(".project-card");
        const editButtons = document.querySelectorAll(".project-edit-button");
        const deleteButtons = document.querySelectorAll(".project-delete-button");

        projectCards.forEach((button) => button.addEventListener("click", (event) => {
            let clickedElement = event.target;

            if (clickedElement.nodeName === "P") {
                clickedElement = clickedElement.parentNode;
            }

            if (!clickedElement.classList.contains("project-card-active")) {
                const activeProject = document.getElementsByClassName("project-card-active").item(0);
                activeProject?.classList.remove("project-card-active");

                clickedElement.classList.add("project-card-active");
            }

            handleActiveProject(clickedElement.dataset.id);

            this.showTaskButton();
        }));

        editButtons.forEach((button) => button.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const selectedProjectId = event.target.parentNode.parentNode.parentNode.dataset.id
            this.#currentProjectId = selectedProjectId;

            document.getElementById("edit-project-window").showModal();
        }));

        deleteButtons.forEach((button) => button.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const selectedProjectId = event.target.parentNode.parentNode.parentNode.dataset.id
            this.#currentProjectId = selectedProjectId;

            document.getElementById("delete-project-window").showModal();
        }));
    }

    /**
     * Applies the event listeners for all current task cards
     * @param {function} handleCompleteTask Function to handle task completion
     * @param {function} getTaskDescription Function to retrieve a task's description
     */
    applyTaskEventListeners(handleCompleteTask, getTaskDescription) {
        const checkboxButtons = document.querySelectorAll(".task-checkbox");
        const descriptionButtons = document.querySelectorAll(".description-button");
        const editButtons = document.querySelectorAll(".task-edit-button");
        const deleteButtons = document.querySelectorAll(".task-delete-button");

        checkboxButtons.forEach((button) => button.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const selectedTaskId = event.target.parentNode.dataset.id;
            handleCompleteTask(selectedTaskId);
        }));

        descriptionButtons.forEach((button) => button.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const selectedTaskId = event.target.parentNode.parentNode.parentNode.dataset.id;
            this.#currentTaskId = selectedTaskId;

            const taskDescription = document.getElementById("task-description");
            taskDescription.textContent = getTaskDescription(this.#currentTaskId);

            document.getElementById("description-window").showModal();
        }));

        editButtons.forEach((button) => button.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const selectedTaskId = event.target.parentNode.parentNode.parentNode.dataset.id;
            this.#currentTaskId = selectedTaskId;

            document.getElementById("edit-task-window").showModal();
        }));

        deleteButtons.forEach((button) => button.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const selectedTaskId = event.target.parentNode.parentNode.parentNode.dataset.id;
            this.#currentTaskId = selectedTaskId;

            document.getElementById("delete-task-window").showModal();
        }));
    }

    /**
     * Applies all the initial event listeners on startup
     * @param {function} handleNewProject Handles functionality for creating a new Project
     * @param {function} handleEditProject Handles functionality for editing a Project
     * @param {function} handleDeleteProject Handles functionality for deleting a Project
     * @param {function} handleNewTask Handles functionality for creating a new Task
     * @param {function} handleEditTask Handles functionality for editing a Task
     * @param {function} handleDeleteTask Handles functionality for deleting a Task
     */
    applyInitialEventListeners(handleNewProject, handleEditProject, handleDeleteProject, handleNewTask,
        handleEditTask, handleDeleteTask) {
        const addProjectButton = document.getElementById("add-project-button");

        const newProjectWindow = document.getElementById("new-project-window");
        const newProjectWindowCloseButton = document.getElementById("new-project-window-close-button");
        const newProjectForm = document.getElementById("new-project-form");
        const projectTitleInput = document.getElementById("project-title-input");

        const editProjectWindow = document.getElementById("edit-project-window");
        const editProjectWindowCloseButton = document.getElementById("edit-project-window-close-button");
        const editTitleInput = document.getElementById("edit-title-input");
        const editProjectForm = document.getElementById("edit-project-form");

        const deleteProjectWindow = document.getElementById("delete-project-window");
        const deleteProjectWindowCloseButton = document.getElementById("delete-project-window-close-button");
        const deleteProjectButton = document.getElementById("delete-project-button");

        const addTaskButton = document.getElementById("add-task-button");

        const newTaskWindow = document.getElementById("new-task-window");
        const newTaskWindowCloseButton = document.getElementById("new-task-window-close-button");
        const newTaskForm = document.getElementById("new-task-form");
        const taskTitleInput = document.getElementById("task-title-input");
        const taskDescriptionInput = document.getElementById("task-description-input");
        const taskDueDateInput = document.getElementById("task-due-date-input");
        const taskPriorityInput = document.getElementById("task-priority-input");

        const descriptionWindow = document.getElementById("description-window");
        const descriptionWindowCloseButton = document.getElementById("description-window-close-button");
        const taskDescription = document.getElementById("task-description");

        const editTaskWindow = document.getElementById("edit-task-window");
        const editTaskWindowCloseButton = document.getElementById("edit-task-window-close-button");
        const editTaskForm = document.getElementById("edit-task-form");
        const editTaskTitleInput = document.getElementById("edit-task-title-input");
        const editTaskDescriptionInput = document.getElementById("edit-task-description-input");
        const editTaskDueDateInput = document.getElementById("edit-task-due-date-input");
        const editTaskPriorityInput = document.getElementById("edit-task-priority-input");

        const deleteTaskWindow = document.getElementById("delete-task-window");
        const deleteTaskWindowCloseButton = document.getElementById("delete-task-window-close-button");
        const deleteTaskButton = document.getElementById("delete-task-button");

        addProjectButton.addEventListener("click", () => {
            newProjectWindow.showModal();
        });

        newProjectWindowCloseButton.addEventListener("click", () => {
            projectTitleInput.value = "";
            newProjectWindow.close();
        })

        newProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            handleNewProject(projectTitleInput.value);

            projectTitleInput.value = "";
            newProjectWindow.close();
        })

        editProjectWindowCloseButton.addEventListener("click", () => {
            this.#currentProjectId = "";
            editTitleInput.value = "";
            editProjectWindow.close();
        })

        editProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            handleEditProject(this.#currentProjectId, editTitleInput.value);

            this.#currentProjectId = "";
            editTitleInput.value = "";
            editProjectWindow.close()
        })

        deleteProjectWindowCloseButton.addEventListener("click", () => {
            this.#currentProjectId = "";
            deleteProjectWindow.close();
        })

        deleteProjectButton.addEventListener("click", () => {
            handleDeleteProject(this.#currentProjectId);

            this.#currentProjectId = "";
            deleteProjectWindow.close();
        })

        addTaskButton.addEventListener("click", () => {
            newTaskWindow.showModal();
        })

        newTaskWindowCloseButton.addEventListener("click", () => {
            this.#currentTaskId = "";
            taskTitleInput.value = "";
            taskDescriptionInput.value = "";
            taskDueDateInput.value = "";
            newTaskWindow.close();
        })

        taskPriorityInput.addEventListener("click", (event) => {
            const target = event.target;

            if (target === taskPriorityInput || target.tagName === "LABEL") {
                return;
            }

            this.#currentRadioButtonChoice = target.value;
        })

        newTaskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            handleNewTask(taskTitleInput.value,
                taskDescriptionInput.value,
                taskDueDateInput.value,
                this.#currentRadioButtonChoice
            );

            this.#currentTaskId = "";
            taskTitleInput.value = "";
            taskDescriptionInput.value = "";
            taskDueDateInput.value = "";
            newTaskWindow.close();
        })

        descriptionWindowCloseButton.addEventListener("click", () => {
            this.#currentTaskId = "";
            taskDescription.textContent = "";
            descriptionWindow.close();
        })

        editTaskWindowCloseButton.addEventListener("click", () => {
            this.#currentTaskId = "";
            editTaskTitleInput.value = "";
            editTaskDescriptionInput.value = "";
            editTaskDueDateInput.value = "";
            editTaskWindow.close();
        })

        editTaskPriorityInput.addEventListener("click", (event) => {
            const target = event.target;

            if (target === editTaskPriorityInput || target.tagName === "LABEL") {
                return;
            }

            this.#currentRadioButtonChoiceEdit = target.value;
        })

        editTaskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            handleEditTask(this.#currentTaskId,
                editTaskTitleInput.value,
                editTaskDescriptionInput.value,
                editTaskDueDateInput.value,
                this.#currentRadioButtonChoiceEdit
            );

            this.#currentTaskId = "";
            editTaskTitleInput.value = "";
            editTaskDescriptionInput.value = "";
            editTaskDueDateInput.value = "";
            editTaskWindow.close();
        })

        deleteTaskWindowCloseButton.addEventListener("click", () => {
            this.#currentTaskId = "";
            deleteTaskWindow.close();
        })

        deleteTaskButton.addEventListener("click", () => {
            handleDeleteTask(this.#currentTaskId);

            this.#currentTaskId = "";
            deleteTaskWindow.close();
        })
    }
}

export default new View();