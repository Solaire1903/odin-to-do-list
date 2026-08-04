import projectContainer from "./logic.js";
import view from "./view.js";

function loadApp() {
    projectContainer.createProject("Project 4");
    projectContainer.createProject("Project 5");
    projectContainer.createProject("Project 6");

    projectContainer.projects[0].createTask("Task 4");
    projectContainer.projects[0].createTask("Task 5");
    projectContainer.projects[0].createTask("Task 6");

    view.renderProjects(projectContainer.projects);
    view.renderTasks(projectContainer.projects[0].tasks);
}

export default loadApp;