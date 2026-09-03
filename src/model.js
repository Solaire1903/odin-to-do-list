/**
 * Represents a single task in a To-Do-Project
 */
class ToDoTask {
    title;
    description;
    dueDate;
    priority;
    id;

    /**
     * @param {string} title 
     * @param {string} description 
     * @param {string} dueDate 
     * @param {string} priority 
     */
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }
}

/**
 * Represents a single project with several tasks inside
 */
class ToDoProject {
    title;
    tasks;
    id;

    /**
     * @param {string} title 
     */
    constructor(title) {
        this.title = title;
        this.tasks = [];
        this.id = crypto.randomUUID();
    }

    /**
     * Create a new task in the array
     * @param {string} title The title of the task
     * @param {string} description The description of the task
     * @param {string} dueDate The due date of the task
     * @param {string} priority The priority of the task
     */
    createTask(title, description, dueDate, priority) {
        this.tasks.push(new ToDoTask(title, description, dueDate, priority));
    }

    /**
     * Finds the index of the task with a given id
     * @param {string} taskId The id of the task to find the index for
     * @returns The index of the task with the given id,
     * -1 if the task is not in the array
     */
    getTaskIndexbyId(taskId) {
        for (let index in this.tasks) {
            if (this.tasks[index].id === taskId) {
                return index;
            }
        }

        return -1;
    }

    /**
     * Removes a task with a given id from the array
     * @param {string} taskId The id of the task to be removed
     */
    removeTask(taskId) {
        for (let index in this.tasks) {
            if (this.tasks[index].id === taskId) {
                this.tasks.splice(index, 1);
                return;
            }
        }
    }
}

/**
 * Class that holds all projects
 */
class ToDoProjectContainer {
    projects;
    activeProject;

    constructor() {
        this.projects = [];
    }

    /**
     * Creates a new project in the array
     * @param {string} title The title of the project
     */
    createProject(title) {
        this.projects.push(new ToDoProject(title));
    }

    /**
     * Finds the index of the project with a given id
     * @param {string} projectId The id of the project to find the index for
     * @returns The index of the project with the given id,
     * -1 if the project is not in the array
     */
    getProjectIndexbyId(projectId) {
        for (let index in this.projects) {
            if (this.projects[index].id === projectId) {
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
        this.projects.splice(this.getProjectIndexbyId(projectId), 1);
    }
}

/**
 * Represents the entire logic/model for the app
 */
class Model {
    projectContainer

    constructor() {
        this.projectContainer = new ToDoProjectContainer();
    }

    get projectContainer() {
        return this.projectContainer;
    }

    /**
     * Checks, if the given storage type is available to use
     * @param {string} type The storage type
     * @returns True, if storage is available
     */
    storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                storage &&
                storage.length !== 0
            );
        }
    }

    /**
     * Saves projectContainer state to localStorage
     */
    updateLocalStorage() {
        if (this.storageAvailable("localStorage")) {
            localStorage.setItem("projectContainer", JSON.stringify(this.projectContainer));
        }
    }

    /**
     * Replaces the current projectContainer state with the one
     * saved in localStorage
     */
    readLocalStorage() {
        this.projectContainer = new ToDoProjectContainer();

        const localContainer = JSON.parse(localStorage.getItem("projectContainer"));

        for (let projectIndex in localContainer.projects) {
            const currentLocalProject = localContainer.projects[projectIndex];

            this.projectContainer.createProject(currentLocalProject.title);
            const currentProject = this.projectContainer.projects[projectIndex];

            for (let taskIndex in currentLocalProject.tasks) {
                
                const currentLocalTask = currentLocalProject.tasks[taskIndex];

                currentProject.createTask(
                    currentLocalTask.title,
                    currentLocalTask.description,
                    currentLocalTask.dueDate,
                    currentLocalTask.priority
                );
            }
        }
    }
}

export default new Model();