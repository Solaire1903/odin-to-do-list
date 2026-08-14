import model from "./model.js";
import view from "./view.js";

const projectContainer = model.projectContainer;
const projects = projectContainer.projects;

/**
 * Adds a new project to the Model and updates the View
 * @param {string} title The title of the new project to be created
 */
function handleNewProject(title) {
    projectContainer.createProject(title);
    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject, () => console.log("EditTestP"), () => console.log("DeleteTestP"));
}

/**
 * Sets a clicked project to active and renders it's tasks to the page
 * @param {string} activeProjectCardId The id of the active project card
 */
function handleActiveProject(activeProjectId) {
    projectContainer.activeProject = projects[projectContainer.getProjectIndexbyId(activeProjectId)];

    view.renderActiveProjectTitle(projectContainer.activeProject.title);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(() => console.log("CheckboxTest"), () => console.log("EditTestT"), () => console.log("DeleteTestT"));
}

/**
 * Loads the app on initial startup
 */
function loadApp() {
    view.applyInitialEventListeners(handleNewProject);

    projectContainer.createProject("Project 1");
    projectContainer.createProject("Project 2");
    projectContainer.createProject("Project 3");

    projects[0].createTask("Task 1", null, "Next Week");
    projects[1].createTask("Task 2", null, "Next Week");
    projects[2].createTask("Task 3", null, "Next Week");

    view.renderProjects(projects);
    view.applyProjectEventListeners(handleActiveProject, () => console.log("EditTestP"), () => console.log("DeleteTestP"));

    projectContainer.activeProject = projects[0];

    view.renderActiveProjectTitle(projectContainer.activeProject.title);
    view.renderTasks(projectContainer.activeProject.tasks);
    view.applyTaskEventListeners(() => console.log("CheckboxTest"), () => console.log("EditTestT"), () => console.log("DeleteTestT"));
}

export default loadApp;