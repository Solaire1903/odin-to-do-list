import projectContainer from "./logic.js";
import view from "./view.js";

function loadApp() {
    projectContainer.createProject("Project 1");
    projectContainer.createProject("Project 2");
    projectContainer.createProject("Project 3");

    projectContainer.projects[0].createTask("Task 6");
    projectContainer.projects[0].createTask("Task 7");
    projectContainer.projects[0].createTask("Task 8");

    view.renderProjects(projectContainer.projects);
    view.renderTasks(projectContainer.projects[0].tasks);
}

export default loadApp;