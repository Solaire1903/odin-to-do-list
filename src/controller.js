import model from "./model.js";
import view from "./view.js";

const projectContainer = model.projectContainer;
const projects = projectContainer.projects;


/**
 * Sets a clicked project to active and renders it's tasks to the page
 * @param {string} activeProjectCardId The id of the active project card
 */
function handleActiveProject(activeProjectId) {
    projectContainer.activeProject = projects[projectContainer.getProjectIndexbyId(activeProjectId)];

    view.renderActiveProjectTitle(projectContainer.activeProject.title);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners();
}

/**
 * Adds a new project to the model and updates the view
 * @param {string} title The title of the new project to be created
 */
function handleNewProject(title) {
    projectContainer.createProject(title);
    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject);
}

/**
 * Changes the title of a project with a given id and updates the view
 * @param {string} projectId The id of the project to be edited
 * @param {string} title The new title of the project
 */
function handleEditProject(projectId, title) {
    projects[projectContainer.getProjectIndexbyId(projectId)].title = title;
    view.renderProjects(projects);
    view.renderActiveProjectTitle(projectContainer.activeProject.title);
    view.applyProjectEventListeners(handleActiveProject);
}

function handleDeleteProject(projectId) {
    projectContainer.removeProject(projectId);
    view.renderProjects(projects);
    
    if (projectContainer.activeProject.id === projectId) {
        projectContainer.activeProject = null;
        view.renderActiveProjectTitle("");
        view.renderTasks([]);
        view.removeTaskButton();  
    }

    view.applyProjectEventListeners(handleActiveProject);
}

/**
 * Adds a new task to the active project and updates the view
 * @param {string} title The task title
 * @param {string} description The task description
 * @param {string} dueDate The task due date
 * @param {*} priority The task priority
 */
function handleNewTask(title, description, dueDate, priority) {
    projectContainer.activeProject.createTask(title, description, dueDate, priority);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners();
}

/**
 * Changes the properties of a task with a given id and updates the view
 * @param {string} taskId The id of the task to be edited
 * @param {string} title The new title of the task
 * @param {string} description The new description of the task
 * @param {string} dueDate The new due date of the task
 * @param {*} priority The new priority of the task
 */
function handleEditTask(taskId, title, description, dueDate, priority) {
    const editedTaskIndex = projectContainer.activeProject.getTaskIndexbyId(taskId);
    const editedTask = projectContainer.activeProject.tasks[editedTaskIndex];

    editedTask.title = title;
    editedTask.description = description;
    editedTask.dueDate = dueDate;
    editedTask.priority = priority;

    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners();
}

/**
 * Loads the app on initial startup
 */
function loadApp() {
    view.applyInitialEventListeners(
        handleNewProject,
        handleEditProject,
        handleDeleteProject,
        handleNewTask,
        handleEditTask);

    projectContainer.createProject("Project 1");
    projectContainer.createProject("Project 2");
    projectContainer.createProject("Project 3");

    projects[0].createTask("Task 1", null, "Next Week");
    projects[1].createTask("Task 2", null, "Next Week");
    projects[2].createTask("Task 3", null, "Next Week");

    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject);

    projectContainer.activeProject = projects[0];

    view.renderActiveProjectTitle(projectContainer.activeProject.title);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners();
}

export default loadApp;