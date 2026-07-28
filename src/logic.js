class ToDoTask {
    #title;
    #description;
    #dueDate;
    #priority;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }

    get title() {
        return this.#title;
    }
    
}

export default ToDoTask;