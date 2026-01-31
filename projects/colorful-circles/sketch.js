let circles = [];

function setup() {
    createCanvas(800, 600);
    background(30);
}

function draw() {
    // Fade effect
    background(30, 30, 30, 25);
    
    // Add new circle at mouse position
    if (mouseIsPressed) {
        let newCircle = {
            x: mouseX,
            y: mouseY,
            size: random(20, 60),
            color: color(random(255), random(255), random(255), 200),
            speedX: random(-2, 2),
            speedY: random(-2, 2)
        };
        circles.push(newCircle);
    }
    
    // Draw and update circles
    for (let i = circles.length - 1; i >= 0; i--) {
        let c = circles[i];
        
        // Draw circle
        noStroke();
        fill(c.color);
        ellipse(c.x, c.y, c.size);
        
        // Update position
        c.x += c.speedX;
        c.y += c.speedY;
        
        // Bounce off edges
        if (c.x < 0 || c.x > width) c.speedX *= -1;
        if (c.y < 0 || c.y > height) c.speedY *= -1;
        
        // Remove old circles
        if (circles.length > 100) {
            circles.shift();
        }
    }
    
    // Instructions
    fill(255);
    textSize(16);
    text('按住滑鼠拖曳來創造彩色圓圈', 10, 20);
}
