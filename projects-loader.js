// Configuration: Add your p5.js projects here
const projects = [
    {
        name: "彩色圓圈",
        description: "互動式彩色圓圈動畫，跟隨滑鼠移動",
        folder: "colorful-circles",
        icon: "🎨"
    },
    {
        name: "粒子系統",
        description: "動態粒子效果，展示物理模擬",
        folder: "particle-system",
        icon: "✨"
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
                <a href="projects/${project.folder}/index.html" class="project-link" target="_blank">查看作品</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);
