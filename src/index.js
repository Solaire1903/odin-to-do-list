import "./styles.css";
import listContainer from "./logic.js";
import view from "./view.js";

listContainer.createList("List 1");
listContainer.createList("List 2");
listContainer.createList("List 3");
view.renderLists(listContainer.lists);