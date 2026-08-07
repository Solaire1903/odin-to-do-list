import pencilSVG from "./img/pencil.svg"
import trashCanSVG from "./img/trash-can.svg"

class View {
    renderProjects(projects) {
        const projectList = document.getElementById("project-list")

        for (const project of projects) {
            const listElement = document.createElement("li");

            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            const projectTitle = document.createElement("p");
            projectTitle.textContent = project.title;

            const buttonContainer = document.createElement("div");

            const editButton = document.createElement("button");

            const deleteButton = document.createElement("button");

            const deleteButtonImage = document.createElement("img");
            deleteButtonImage.src = trashCanSVG;
            deleteButtonImage.alt = "Delete";

            const editButtonImage = document.createElement("img");
            editButtonImage.src = pencilSVG;
            editButtonImage.alt = "Edit";

            projectList.appendChild(listElement);

            listElement.appendChild(projectCard);

            projectCard.appendChild(projectTitle);
            projectCard.appendChild(buttonContainer);

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            deleteButton.appendChild(deleteButtonImage);

            editButton.appendChild(editButtonImage);
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