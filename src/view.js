class View {
    renderLists(lists) {
        const container = document.querySelector(".container");

        for (const list of lists) {
            const listElement = document.createElement("p");
            listElement.textContent = list.title;
            container.appendChild(listElement);
        }
    }
}

export default new View();