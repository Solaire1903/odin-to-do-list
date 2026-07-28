import "./styles.css";
import ToDoListContainer from "./logic.js";

const container = new ToDoListContainer();

container.createList("L1");
container.createList("L2");
container.createList("L3");

const lists = container.lists;
const listOne = lists[0];
const listOneTasks = listOne.tasks;

console.log("Array with 3 lists");
console.table(lists);

listOne.createTask("T1");
listOne.createTask("T2");
listOne.createTask("T3");

console.log("List 1 should have three tasks");
console.table(lists);

console.log("Tasks of List 1");
console.table(listOneTasks);

console.log("Remove tasks from List 1");
for (let i = 0; i < 3; ++i) {
    listOne.removeTask(listOneTasks[0].id);
    console.table(listOneTasks);
}

console.log("List 1 has no tasks");
console.table(lists);

console.log("Remove lists");
for (let i = 0; i < 3; ++i) {
    container.removeList(lists[0].id);
    console.table(lists);
}