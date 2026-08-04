class View {
    #container = document.querySelector(".container");

    renderProjects(projects) {
        for (const project of projects) {
            const projectElement = document.createElement("p");
            projectElement.textContent = project.title;
            this.#container.appendChild(projectElement);
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