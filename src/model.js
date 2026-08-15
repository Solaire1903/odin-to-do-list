/**
 * Represents a single task in a To-Do-Project
 */
class ToDoTask {
    #title;
    #description;
    #dueDate;
    #priority;
    #id;

    /**
     * @param {string} title 
     * @param {string} description 
     * @param {string} dueDate 
     * @param {*} priority 
     */
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

    get dueDate() {
        return this.#dueDate;
    }

    get id() {
        return this.#id;
    }

}

/**
 * Represents a single project with several tasks inside
 */
class ToDoProject {
    #title;
    #tasks;
    #id;

    /**
     * @param {string} title 
     */
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

    /**
     * Create a new task in the array
     * @param {string} title The title of the task
     * @param {string} description The description of the task
     * @param {string} dueDate The due date of the task
     * @param {string} priority The priority of the task
     */
    createTask(title, description, dueDate, priority) {
        this.#tasks.push(new ToDoTask(title, description, dueDate, priority));
    }

    /**
     * Removes a task with a given id from the array
     * @param {string} taskId The id of the task to be removed
     */
    removeTask(taskId) {
        for (let index in this.#tasks) {
            if (this.#tasks[index].id === taskId) {
                this.#tasks.splice(index, 1);
                return;
            }
        }
    }
}

/**
 * Class that holds all projects
 */
class ToDoProjectContainer {
    #projects;
    #activeProject;

    constructor() {
        this.#projects = [];
    }

    get projects() {
        return this.#projects;
    }

    get activeProject() {
        return this.#activeProject;
    }

    set activeProject(activeProject) {
        this.#activeProject = activeProject;
    }

    /**
     * Creates a new project in the array
     * @param {string} title The title of the project
     */
    createProject(title) {
        this.#projects.push(new ToDoProject(title));
    }

    /**
     * Finds the index of the project with a given id
     * @param {string} projectId The id of the project to find the index for
     * @returns The index of the project with the given id,
     * -1 if the project is not in the array
     */
    getProjectIndexbyId(projectId) {
        for (let index in this.#projects) {
            if (this.#projects[index].id === projectId) {
                return index;
            }
        }

        return -1;
    }

    /**
     * Removes a project with a given id from the array
     * @param {string} projectId The id of the project to be removed
     */
    removeProject(projectId) {
        this.#projects.splice(this.getProjectIndexbyId(projectId), 1);
    }
}

/**
 * Represents the entire logic/model for the app
 */
class Model {
    #projectContainer

    constructor() {
        this.#projectContainer = new ToDoProjectContainer();
    }

    get projectContainer() {
        return this.#projectContainer;
    }
}

export default new Model();