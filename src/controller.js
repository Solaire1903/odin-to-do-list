import projectContainer from "./logic.js";
import view from "./view.js";

function loadApp() {
    projectContainer.createProject("Project 1");
    projectContainer.createProject("Project 2");
    projectContainer.createProject("Project 3");

    projectContainer.projects[0].createTask("Task 1", null, "Next Week");
    projectContainer.projects[0].createTask("Task 2", null, "Next Week");
    projectContainer.projects[0].createTask("Task 3", null, "Next Week");

    view.renderProjects(projectContainer.projects);
    view.renderTasks(projectContainer.projects[0].tasks);

    view.applyTaskEventListeners(() => console.log("EditTestT"), () => console.log("DeleteTestT"));
    view.applyProjectEventListeners(() => console.log("EditTestP"), () => console.log("DeleteTestP"));
    view.applyInitialEventListeners(() => console.log("AddPTest"), () => console.log("AddTTest"));
}

export default loadApp;