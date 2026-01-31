// Configuration: Add your p5.js projects here
const projects = [
    {
        name: "260130",
        description: "Beautiful Crash | GENUARY 30, 2026 - Its not a bug, its a feature.",
        folder: "260130",
        thumbnail: "projects/260130/images/260130.png"
    },
    {
        name: "Template",
        description: "專案主題與描述",
        folder: "template",
        thumbnail: "projects/template/images/0130.png"
    }
];

// Function to load projects
function loadProjects() {
    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-preview">
                <img src="${project.thumbnail}" alt="${project.name} 作品縮圖">
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="projects/${project.folder}/index.html" class="project-link">查看作品</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);
