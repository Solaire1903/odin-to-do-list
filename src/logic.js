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

    get title() {
        return this.#title;
    }

    get id() {
        return this.#id;
    }

}

class ToDoList {
    #title;
    #tasks;
    #id;

    constructor(title) {
        this.#title = title;
        this.#tasks = [];
        this.#id = crypto.randomUUID();
    }

    get title() {
        return this.#title;
    }

    get tasks() {
        return this.#tasks;
    }

    get id() {
        return this.#id;
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

class ToDoListContainer {
    #lists;

    constructor() {
        this.#lists = [];
    }

    get lists() {
        return this.#lists;
    }

    createList(title) {
        this.#lists.push(new ToDoList(title));
    }

    removeList(listId) {
        for (let index in this.#lists) {
            if (this.#lists[index].id === listId) {
                this.#lists.splice(index, 1);
                return;
            }
        };
    }
}

export default new ToDoListContainer();