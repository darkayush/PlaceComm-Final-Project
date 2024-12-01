document.addEventListener("DOMContentLoaded", () => {
    const teamSection = document.querySelector(".story-cards");

    // Fetch the JSON file
    fetch("data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch JSON");
            }
            return response.json();
        })
        .then((data) => {
            // Clear existing content
            teamSection.innerHTML = "";

            // Populate the team leads dynamically
            data.teamLeads.forEach((lead) => {
                const card = document.createElement("div");
                card.classList.add("story-card");

                card.innerHTML = `
                    <img src="${lead.image}" alt="${lead.name}">
                    <h2>${lead.name}</h2>
                    <h3>${lead.position}</h3>
                    <p>${lead.email}</p>
                `;

                teamSection.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
