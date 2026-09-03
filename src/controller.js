import model from "./model.js";
import view from "./view.js";

let projectContainer;
let projects;

/**
 * Sets a clicked project to active and renders it's tasks to the page
 * @param {string} activeProjectCardId The id of the active project card
 */
function handleActiveProject(activeProjectId) {
    projectContainer.activeProject = projects[projectContainer.getProjectIndexbyId(activeProjectId)];

    view.renderActiveProjectTitle(projectContainer.activeProject.title);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(getTaskDescription);
    model.updateLocalStorage();
}

/**
 * Adds a new project to the model and updates the view
 * @param {string} title The title of the new project to be created
 */
function handleNewProject(title) {
    projectContainer.createProject(title);
    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject);
    model.updateLocalStorage();
}

/**
 * Retrieves the description of a task with a given id
 * @param {string} taskId The id of the task to get the description of
 * @returns The description of the task
 */
function getTaskDescription(taskId) {
    return projectContainer.activeProject.tasks[
        projectContainer.activeProject.getTaskIndexbyId(taskId)
    ].description;
}

/**
 * Changes the title of a project with a given id and updates the view
 * @param {string} projectId The id of the project to be edited
 * @param {string} title The new title of the project
 */
function handleEditProject(projectId, title) {
    projects[projectContainer.getProjectIndexbyId(projectId)].title = title;
    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject);

    if (projectContainer.activeProject !== null &&
        projectContainer.activeProject.id === projectId) {
        view.renderActiveProjectTitle(projectContainer.activeProject.title);
    }

    model.updateLocalStorage();
}

/**
 * Deletes a project with a given id and updates the view
 * @param {string} projectId The id of the project to be deleted
 */
function handleDeleteProject(projectId) {
    projectContainer.removeProject(projectId);
    view.renderProjects(projects);

    if (projectContainer.activeProject !== null &&
        projectContainer.activeProject.id === projectId) {
        projectContainer.activeProject = null;
        view.renderActiveProjectTitle("");
        view.renderTasks([]);
        view.hideTaskButton();
    }

    view.applyProjectEventListeners(handleActiveProject);
    model.updateLocalStorage();
}

/**
 * Adds a new task to the active project and updates the view
 * @param {string} title The task title
 * @param {string} description The task description
 * @param {string} dueDate The task due date
 * @param {string} priority The task priority
 */
function handleNewTask(title, description, dueDate, priority) {
    projectContainer.activeProject.createTask(title, description, dueDate, priority);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(getTaskDescription);
    model.updateLocalStorage();
}

/**
 * Changes the properties of a task with a given id on the active project and updates the view
 * @param {string} taskId The id of the task to be edited
 * @param {string} title The new title of the task
 * @param {string} description The new description of the task
 * @param {string} dueDate The new due date of the task
 * @param {string} priority The new priority of the task
 */
function handleEditTask(taskId, title, description, dueDate, priority) {
    const editedTaskIndex = projectContainer.activeProject.getTaskIndexbyId(taskId);
    const editedTask = projectContainer.activeProject.tasks[editedTaskIndex];

    editedTask.title = title;
    editedTask.description = description;
    editedTask.dueDate = dueDate;
    editedTask.priority = priority;

    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(getTaskDescription);
    model.updateLocalStorage();
}

/**
 * Deletes a task with a given id from the active project and updates the view
 * @param {string} taskId The id of the task to delete
 */
function handleDeleteTask(taskId) {
    projectContainer.activeProject.removeTask(taskId);

    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(getTaskDescription);
    model.updateLocalStorage();
}

/**
 * Loads the app on initial startup
 */
function loadApp() {
    projectContainer = model.projectContainer;
    projects = projectContainer.projects;

    //Read localStorage if available
    if (localStorage.getItem("projectContainer")) {
        model.readLocalStorage();
    }
    //Create default project and Task otherwise
    else {
        projectContainer.createProject("Your Project");
        projectContainer.activeProject = projects[0];

        projects[0].createTask("Your Task", "Description goes here", "2028-10-07", "low");
    }

    view.applyInitialEventListeners(
        handleNewProject,
        handleEditProject,
        handleDeleteProject,
        handleNewTask,
        handleEditTask,
        handleDeleteTask);

    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject);
    view.renderActiveProjectTitle(projectContainer.activeProject.title);

    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(getTaskDescription);
}

export default loadApp;