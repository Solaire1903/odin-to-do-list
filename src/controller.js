import projectContainer from "./logic.js";
import view from "./view.js";

function loadApp() {
    projectContainer.createProject("Project 1");
    projectContainer.createProject("Project 2");
    projectContainer.createProject("Project 3");

    projectContainer.projects[0].createTask("T1");
    projectContainer.projects[0].createTask("T2");
    projectContainer.projects[0].createTask("T3");
}

export default loadApp;