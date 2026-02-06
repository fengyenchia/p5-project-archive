// Configuration: Add your p5.js projects here
const projects = [
    {
        name: "260202",
        description: "Midnight Mirage 午夜幻象 | GENUARY 8, 2026 - A City. Create a generative metropolis. <br><br>A dream-state city, where bright geometric shapes stack up layer upon layer and stand towards the sky amidst the whispers of midnight.",
        folder: "260202",
        thumbnail: "projects/260202/images/0202.png"
    },
    // {
    //     name: "260201",
    //     description: "請輸入專案描述",
    //     folder: "260201",
    //     thumbnail: "projects/260201/images/0130.png"
    // },
    {
        name: "260130",
        description: "Beautiful Crash | GENUARY 30, 2026 - Its not a bug, its a feature.",
        folder: "260130",
        thumbnail: "projects/260130/images/260130.png"
    },
    // {
    //     name: "Template",
    //     description: "專案主題與描述",
    //     folder: "template",
    //     thumbnail: "projects/template/images/0130.png"
    // }
];

// Function to load projects
function loadProjects() {
    const container = document.getElementById('projects-container');

    projects.forEach(project => {
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = `projects/${project.folder}/index.html`;

        card.innerHTML = `
            <div class="project-preview">
                <img src="${project.thumbnail}" alt="${project.name} 作品縮圖">
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);
