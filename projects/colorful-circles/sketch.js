let circles = [];

function setup() {
    createCanvas(800, 600);
    background(255);
}

function draw() {
    // Fade effect
    background(255, 255, 255, 25);
    
    // Add new circle at mouse position
    if (mouseIsPressed) {
        // Use grayscale values for black and white theme
        let grayValue = random(0, 255);
        let newCircle = {
            x: mouseX,
            y: mouseY,
            size: random(20, 60),
            color: color(grayValue, 200),
            speedX: random(-2, 2),
            speedY: random(-2, 2)
        };
        circles.push(newCircle);
    }
    
    // Draw and update circles
    for (let i = circles.length - 1; i >= 0; i--) {
        let c = circles[i];
        
        // Draw circle with stroke for 2D effect
        stroke(0);
        strokeWeight(2);
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
    fill(0);
    noStroke();
    textSize(16);
    text('按住滑鼠拖曳來創造黑白圓圈', 10, 20);
}
