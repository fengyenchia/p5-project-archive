let particles = [];

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0.05);
        this.lifetime = 255;
        this.size = random(5, 15);
        // Use grayscale for black and white theme
        this.gray = random(0, 255);
    }
    
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.lifetime -= 2;
        
        // Add some damping
        this.vel.mult(0.99);
    }
    
    show() {
        // Draw with stroke for 2D effect
        stroke(0);
        strokeWeight(1);
        fill(this.gray, this.lifetime);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
    isDead() {
        return this.lifetime < 0;
    }
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(255, 255, 255, 50);
    
    // Create new particles at mouse position
    if (mouseIsPressed) {
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }
    
    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
    
    // Instructions
    fill(0);
    noStroke();
    textSize(16);
    text('按住滑鼠拖曳來創造粒子效果', 10, 20);
    text('粒子數量: ' + particles.length, 10, 40);
}
