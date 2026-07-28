class ToDoTask {
    #title;
    #description;
    #dueDate;
    #priority;
    #id;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#id = crypto.randomUUID();
    }

    get id() {
        return this.#id;
    }

}

class ToDoList {
    #title;
    #tasks;

    constructor(title) {
        this.#title = title;
        this.#tasks = [];
    }

    get tasks() {
        return this.#tasks;
    }

    createTask(title, description, dueDate, priority) {
        this.#tasks.push(new ToDoTask(title, description, dueDate, priority));
    }

    removeTask(taskId) {
        for (let index in this.#tasks) {
            if (this.#tasks[index].id === taskId) {
                this.#tasks.splice(index, 1);
                return;
            }
        };
    }
}

export default ToDoList;