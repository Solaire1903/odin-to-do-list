class View {
    #container = document.querySelector(".container");

    renderLists(lists) {
        for (const list of lists) {
            const listElement = document.createElement("p");
            listElement.textContent = list.title;
            this.#container.appendChild(listElement);
        }
    }

    renderTasks(tasks) {
        for (const task of tasks) {
            const taskElement = document.createElement("p");
            taskElement.textContent = task.title;
            this.#container.appendChild(taskElement);
        }
    }
}

export default new View();