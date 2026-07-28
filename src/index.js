import "./styles.css";
import ToDoList from "./logic.js";

const list = new ToDoList("TestList");
list.createTask("1");
list.createTask("2");
list.createTask("3");
list.createTask("4");
console.table(list.tasks);

list.removeTask(list.tasks[0].id);
console.table(list.tasks);
list.removeTask(list.tasks[0].id);
console.table(list.tasks);
list.removeTask(list.tasks[0].id);
console.table(list.tasks);
list.removeTask(list.tasks[0].id);
console.table(list.tasks);