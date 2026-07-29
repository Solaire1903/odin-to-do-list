import listContainer from "./logic.js";
import view from "./view.js";

function loadApp() {
    listContainer.createList("List 1");
    listContainer.createList("List 2");
    listContainer.createList("List 3");

    listContainer.lists[0].createTask("T1");
    listContainer.lists[0].createTask("T2");
    listContainer.lists[0].createTask("T3");

    view.renderLists(listContainer.lists);
    view.renderTasks(listContainer.lists[0].tasks);
}

export default loadApp;