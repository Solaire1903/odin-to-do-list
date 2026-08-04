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

class ToDoProject {
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

class ToDoProjectContainer {
    #projects;

    constructor() {
        this.#projects = [];
    }

    get projects() {
        return this.#projects;
    }

    createProject(title) {
        this.#projects.push(new ToDoProject(title));
    }

    removeProject(projectId) {
        for (let index in this.#projects) {
            if (this.#projects[index].id === projectId) {
                this.#projects.splice(index, 1);
                return;
            }
        };
    }
}

export default new ToDoProjectContainer();