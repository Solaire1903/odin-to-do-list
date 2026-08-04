class View {
    renderProjects(projects) {
        const projectList = document.getElementById("project-list")

        for (const project of projects) {
            const projectElement = document.createElement("li");
            projectElement.classList.add("project");
            projectElement.textContent = project.title;
            projectList.appendChild(projectElement);
        }
    }

    renderTasks(tasks) {
        const taskList = document.getElementById("task-list");

        for (const task of tasks) {
            const taskElement = document.createElement("li");
            taskElement.classList.add("task");
            taskElement.textContent = task.title;
            taskList.appendChild(taskElement);
        }
    }
}

export default new View();