import model from "./model.js";
import view from "./view.js";

const projectContainer = model.projectContainer;

/**
 * Adds a new project to the Model and updates the View
 * @param {string} projectName The name of the new project to be created
 */
function handleNewProject(projectName) {
    projectContainer.createProject(projectName);
    view.renderProjects(projectContainer.projects);
}

/**
 * Loads the app on initial startup
 */
function loadApp() {
    projectContainer.createProject("Project 1");
    projectContainer.createProject("Project 2");
    projectContainer.createProject("Project 3");

    projectContainer.projects[0].createTask("Task 1", null, "Next Week");
    projectContainer.projects[0].createTask("Task 2", null, "Next Week");
    projectContainer.projects[0].createTask("Task 3", null, "Next Week");

    view.renderProjects(projectContainer.projects);
    view.renderTasks(projectContainer.projects[0].tasks);

    view.applyTaskEventListeners(() => console.log("CheckboxTest"), () => console.log("EditTestT"), () => console.log("DeleteTestT"));
    view.applyProjectEventListeners(() => console.log("EditTestP"), () => console.log("DeleteTestP"));
    view.applyInitialEventListeners(handleNewProject);
}

export default loadApp;