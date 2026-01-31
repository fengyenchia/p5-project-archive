// Configuration: Add your p5.js projects here
const projects = [
    {
        name: "黑白圓圈",
        description: "互動式黑白圓圈動畫，跟隨滑鼠移動",
        folder: "template",
        icon: "⚫"
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
                <span>${project.icon}</span>
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
