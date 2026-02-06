let cs;
const BASE_SIZE = 1000;
let boxes = [];
let windowColor;
let particle = [];
let mainColor, myColorMode;
let colors = [
    ["#45caff", "#ff1b6b"],
    ["#ebf4f5", "#b5c6e0"],
    ["#9bafd9", "#103783"],
    ["#f6f7eb", "#e94f37"],
    ["#006d77", "#83c5be", "#edf6f9"],
    ["#2b2d42", "#8d99ae", "#edf2f4"],
    ["#f4f1de", "#e07a5f", "#3d405b"],
    ["#26547c", "#ef476f", "#ffd066"],
    ["#ddfff7", "#93e1d8", "#ffa69e"],
    ["#9381ff", "#b8b8ff", "#f8f7ff"],
    ["#ffba49", "#20a39e", "#ef5b5b"],
    ["#005A5A", "#2D6464", "#C80050", "#A03C40"],
    ["#ffa69e", "#dad3dd", "#b8f2e6", "#aed9e0"],
    ["#780000", "#C1121F", "#FDF0D5", "#003049", "#669BBC"],
    ["#FF9F1C", "#FFBF69", "#FFFFFF", "#CBF3F0", "#2EC4B6"],
    ["#D8F3DC", "#B7E4C7", "#95D5B2", "#74C69D", "#52B788"],
    ["#3D348B", "#7678ED", "#F7B801", "#F18701", "#F35B04"],
    ["#390099", "#9E0059", "#FF0054", "#FF5400", "#FFBD00"],
    ["#EE4266", "#FFD23F", "#3BCEAC", "#540D6E", "#0EAD69"],
    ["#6798C0", "#99D6EA", "#FFFDF7", "#FDD85D", "#FDC921"],
    ["#04151F", "#183A37", "#2E8BC0", "#FF4C29", "#F9DC5C"],
    ["#FAE0E4", "#F7CAD0", "#F9BEC7", "#FBB1BD", "#FF99AC", "#FF85A1"]
];

class RandomBank {
    get() {
        return random();
    }
    getRangeValue(min, max) {
        return random(min, max);
    }
}

class Building {
    constructor(x, y, w, h, r, t, minTall, maxTall, counts, mainColor, myColorMode, windowColor, alphaValue, s, isDrawWindow, rng) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.t = t;
        this.counts = counts;
        this.colorMode = myColorMode;
        this.alphaValue = alphaValue;
        this.isDrawWindow = isDrawWindow;
        this.rng = rng;

        this.myColor = mainColor;
        this.windowColor = windowColor;

        this.colorNumber = floor(this.rng.get() * this.myColor.length);
        this.mainHue = this.myColor[this.colorNumber];
        if (this.colorMode == 1) {
            this.mainHue = this.myColor[this.colorNumber];
        }
        else if (this.colorMode == 2) {
            this.mainHue = this.myColor[this.colorNumber] + this.alphaValue;
        }

        let n = noise(x * 0.005, y * 0.005);
        this.tall = lerp(minTall, maxTall, n);
        this.counts = max(ceil(this.y / this.tall), counts);

        this.s = s;
    }

    drawBuilding() {
        push();
        for (let count = this.counts; count > 0; count--) {
            let buildingMode = floor(this.rng.getRangeValue(0, 3));
            if (buildingMode === 0) {
                if (count == this.counts) {
                    this.w /= 4;
                    this.h /= 5;
                }
                else if (count == this.counts - 1) {
                    this.w *= 5;
                    this.h *= 5;
                }
            }
            else if (buildingMode === 1) {
                if (count == this.counts) {
                    this.w /= 2;
                    this.h /= 2;
                }
                else if (count == this.counts - 1) {
                    this.w *= 2;
                    this.h *= 2;
                }
            }

            this.w = lerp(this.w, this.w * this.s, count / this.counts);
            this.h = lerp(this.h, this.h * this.s, count / this.counts);

            let bTop = { x: this.x - this.w * (0.5 - this.r), y: this.y + this.h / 2 };
            let bBottom = { x: this.x + this.w * (0.5 - this.r), y: this.y - this.h / 2 };
            let bLeft = { x: this.x - this.w / 2, y: this.y + this.h * (0.5 - this.t) };
            let bRight = { x: this.x + this.w / 2, y: this.y - this.h * (0.5 - this.t) };

            let tTop = { x: bTop.x, y: bTop.y - this.tall };
            let tBottom = { x: bBottom.x, y: bBottom.y - this.tall };
            let tLeft = { x: bLeft.x, y: bLeft.y - this.tall };
            let tRight = { x: bRight.x, y: bRight.y - this.tall };

            strokeJoin(ROUND);
            this.colorMode == 2 ? strokeWeight(1) : strokeWeight(1);
            this.colorMode == 2 ? stroke(0, 0, 100, 60) : stroke(0, 0, 100, 80);

            push();
            if (this.colorMode == 1 || this.colorMode == 2) {
                fill(this.mainHue);
            }
            else {
                fill(this.myColor[(this.colorNumber + count) % this.myColor.length]);
            }
            // drawingContext.filter = 'brightness(0.8)';
            beginShape();
            vertex(bBottom.x, bBottom.y);
            vertex(bRight.x, bRight.y);
            vertex(bTop.x, bTop.y);
            vertex(bLeft.x, bLeft.y);
            endShape(CLOSE);
            pop();

            push();
            if (this.colorMode == 1 || this.colorMode == 2) {
                fill(this.mainHue);
            }
            else {
                fill(this.myColor[(this.colorNumber + count) % this.myColor.length]);
            }
            beginShape();
            vertex(bLeft.x, bLeft.y);
            vertex(bBottom.x, bBottom.y);
            vertex(tBottom.x, tBottom.y);
            vertex(tLeft.x, tLeft.y);
            endShape(CLOSE);
            if (this.isDrawWindow < 0.95) {
                drawWindowsStatic(bLeft, bBottom, tBottom, tLeft, 0.04, this.t / 10, this.tall, this.colorMode, this.windowColor, this.myColor, this.rng, this.counts, this.mainHue);
            }
            pop();

            push();
            drawingContext.filter = 'brightness(1.2)';
            if (this.colorMode == 1 || this.colorMode == 2) {
                fill(this.mainHue);
            }
            else {
                fill(this.myColor[(this.colorNumber + count) % this.myColor.length]);
            }
            beginShape();
            vertex(bBottom.x, bBottom.y);
            vertex(bRight.x, bRight.y);
            vertex(tRight.x, tRight.y);
            vertex(tBottom.x, tBottom.y);
            endShape(CLOSE);
            drawingContext.filter = 'none';
            if (this.isDrawWindow < 0.95) {
                drawWindowsStatic(bBottom, bRight, tRight, tBottom, 0.04, (1 - this.t) / 10, this.tall, this.colorMode, this.windowColor, this.myColor, this.rng, this.counts, this.mainHue);
            }
            pop();

            translate(0, this.tall);
        }
        pop();
    }

}

function setup() {
    cs = min(windowHeight, windowWidth);
    createCanvas(cs, cs);
    noLoop();
    setSeeds();
}

function draw() {
    let rng = new RandomBank();

    boxes = [];
    particle = [];

    colorMode(HSB, 360, 100, 100, 100);
    background(0, 0, 20, 100);

    const scaleFactor = cs / BASE_SIZE;
    push();
    scale(scaleFactor);

    let stepX = rng.getRangeValue(BASE_SIZE * 0.2, BASE_SIZE * 0.28);
    let stepY = rng.getRangeValue(BASE_SIZE * 0.1, BASE_SIZE * 0.14);
    let r = rng.getRangeValue(0.2, 0.8);
    let t = rng.getRangeValue(0.4, 0.6);
    let w = rng.getRangeValue(BASE_SIZE * 0.06, BASE_SIZE * 0.17);
    let h = rng.getRangeValue(0, BASE_SIZE * 0.04);
    let minTall = BASE_SIZE * 0.04;
    let maxTall = BASE_SIZE * 0.28;
    mainColor = colors[floor(rng.get() * colors.length)];
    myColorMode = floor(rng.getRangeValue(0, 3));

    let alphaValues = ["11", "22", "33", "44", "55", "66", "77", "88"];
    let alphaValue = alphaValues[floor(rng.get() * alphaValues.length)];
    windowColor = floor(rng.getRangeValue(0, 2));

    const sOptions = [1, 1, 1.1, 1.2];

    for (let y = BASE_SIZE * 0.4; y < BASE_SIZE; y += stepY) {
        for (let x = BASE_SIZE * 0.2; x < BASE_SIZE * 0.8; x += stepX) {
            let counts = ceil(rng.getRangeValue(10, 12));
            let offsetX = (floor(y / stepY) % 2 === 0) ? 0 : stepX / 2;

            let isConvert = rng.get();
            r = (isConvert < 0.5 && h < BASE_SIZE * 0.03) ? (rng.get() < 0.5 ? r : 1 - r) : r;

            let s = sOptions[floor(rng.getRangeValue(0, sOptions.length))];
            let isDrawWindow = rng.get();
            boxes.push(new Building(
                x + offsetX, y, w, h,
                r, t, minTall, maxTall,
                counts, mainColor, myColorMode,
                windowColor, alphaValue, s, isDrawWindow, rng));
        }
    }

    let moonMode = rng.get();
    let bgMode = rng.get();
    let color1, color2;

    if (moonMode > 0.55) {
        myMoon(rng.getRangeValue(BASE_SIZE * 0.2, BASE_SIZE * 0.8), rng.getRangeValue(BASE_SIZE * 0.1, BASE_SIZE * 0.3), rng.getRangeValue(BASE_SIZE * 0.15, BASE_SIZE * 0.25), false, rng);
    }

    if (moonMode <= 0.45) {
        if (moonMode < 0.25) {
            color1 = color('#003049');
            color2 = color('#000');
        }
        else {
            color1 = color('#0B132B');
            color2 = color('#1C2541');
        }
        gradientBg(color1.toString(), color2.toString());
    }

    if (bgMode < 0.15) {
        myStarBg(rng);
    }
    else if (bgMode < 0.3) {
        flowBg(rng);
    }
    else if (bgMode < 0.45) {
        myDotBg(rng);
    }
    else if (bgMode < 0.6) {
        mySnowBg(rng);
    }
    else if (bgMode < 0.85) {
        flowBg(rng);
        myDotBg(rng);
    }
    else {
        myStarBg(rng);
        mySnowBg(rng);
    }

    if (moonMode <= 0.45) {
        myMoon(rng.getRangeValue(BASE_SIZE * 0.2, BASE_SIZE * 0.8), rng.getRangeValue(BASE_SIZE * 0.1, BASE_SIZE * 0.3), rng.getRangeValue(BASE_SIZE * 0.15, BASE_SIZE * 0.25), true, rng);
    }

    if (rng.get() < 0.5) {
        myCloud(rng);
    }

    let amount = rng.getRangeValue(0.55, 0.85);
    for (let b of boxes) {
        if (rng.get() < amount) {
            b.drawBuilding();
        }
    }

    let isWire = rng.get();
    if (isWire < 0.2) {
        let wireCounts = floor(rng.getRangeValue(3, 7));
        for (let i = 0; i < wireCounts; i++) {
            myWire(
                createVector(0, rng.getRangeValue(BASE_SIZE * -0.1, BASE_SIZE * 0.4)),
                createVector(BASE_SIZE * 0.3, rng.getRangeValue(BASE_SIZE * 0.35, BASE_SIZE * 0.6)),
                createVector(BASE_SIZE * 0.7, rng.getRangeValue(BASE_SIZE * 0.35, BASE_SIZE * 0.6)),
                createVector(BASE_SIZE, rng.getRangeValue(BASE_SIZE * -0.1, BASE_SIZE * 0.4)),
                rng
            );
        }
    }

    colorMode(RGB);
    drawGlossyFrame(BASE_SIZE * 0.015, color(0), color(100));
    noiseTexture(BASE_SIZE * 0.01, rng);

    drawingContext.filter = 'none';
    pop();

    setTimeout(() => {
        requestAnimationFrame(() => {
            if (typeof triggerPreview === 'function') {
                triggerPreview();
            }
        });
    }, 2000);
}

function windowResized() {
    setSeeds();
    cs = min(windowHeight, windowWidth);
    resizeCanvas(cs, cs);
}

function myStarBg(rng) {
    noStroke();
    fill(0, 0, 100, 80);
    const sizeScale = BASE_SIZE / 1000;
    const areaScale = sizeScale * sizeScale;
    let starCount = floor(rng.getRangeValue(100, 300) * areaScale);
    for (let i = 0; i < starCount; i++) {
        let x = rng.getRangeValue(0, BASE_SIZE);
        let y = rng.getRangeValue(-BASE_SIZE * 0.05, BASE_SIZE);
        let toX = rng.getRangeValue(BASE_SIZE * 0.045, BASE_SIZE * 0.055);
        let toY = rng.getRangeValue(BASE_SIZE * 0.045, BASE_SIZE * 0.055);
        let tailSteps = max(1, floor(BASE_SIZE * 0.06));
        for (let j = 0; j < tailSteps; j++) {
            let px = x + lerp(-1, -toX, j / tailSteps);
            let py = y + lerp(1, toY, j / tailSteps);
            let starSize = lerp(BASE_SIZE * 0.00005, BASE_SIZE * 0.002, j / tailSteps);
            circle(px, py, starSize);
        }
    }
}

function myDotBg(rng) {
    noStroke();
    let step = max(1, BASE_SIZE * 0.015);
    for (let j = 0; j <= BASE_SIZE; j += step) {
        for (let i = 0; i <= BASE_SIZE; i += step) {
            let dotSize = (BASE_SIZE * 0.002) * noise(i * 0.08, j * 0.08);
            fill(0, 0, 100, 100);
            circle(i, j, dotSize);
        }
    }
}

function mySnowBg(rng) {
    noStroke();
    let step = max(1, BASE_SIZE * 0.015);
    for (let j = 0; j <= BASE_SIZE; j += step) {
        for (let i = 0; i <= BASE_SIZE; i += step) {
            let dotSize = rng.getRangeValue(BASE_SIZE * 0.0005, BASE_SIZE * 0.003);
            if (noise(i * 0.1, j * 0.1) < 0.25) {
                fill(0, 0, 100, 100);
                circle(i, j, dotSize);
            }
        }
    }
}

function flowBg(rng) {
    let step = max(1, BASE_SIZE * 0.02);
    for (let j = 0; j < BASE_SIZE; j += step) {
        for (let i = 0; i < BASE_SIZE; i += step) {
            particle.push({
                x: i,
                y: j,
                size: rng.getRangeValue(BASE_SIZE * 0.0005, BASE_SIZE * 0.002),
                color: mainColor[floor(rng.get() * mainColor.length)] + "55"
            });
        }
    }

    noStroke();
    let noiseRatio = rng.getRangeValue(0.005, 0.01);
    let layer = floor(rng.getRangeValue(0, 8));

    let frames = max(1, floor(BASE_SIZE * 0.03));
    for (let frame = 0; frame < frames; frame++) {
        let time = frame * layer;

        for (let p of particle) {
            let angle = noise(p.x * noiseRatio, p.y * noiseRatio, time) * PI * 4;
            let force = BASE_SIZE * 0.0015;

            p.x += cos(angle) * force;
            p.y += sin(angle) * force;

            fill(p.color);
            circle(p.x, p.y, p.size);

            if (p.x < 0) p.x = BASE_SIZE;
            if (p.x > BASE_SIZE) p.x = 0;
            if (p.y < 0) p.y = BASE_SIZE;
            if (p.y > BASE_SIZE) p.y = 0;
        }
    }
}

function myCloud(rng) {
    push();
    noStroke();
    let step = max(1, BASE_SIZE * 0.001);
    for (let j = 0; j < BASE_SIZE; j += step) {
        for (let i = 0; i <= BASE_SIZE; i += step) {
            let dotSize = rng.getRangeValue(BASE_SIZE * 0.0001, BASE_SIZE * 0.003);
            if (noise(i * 0.01, j * 0.01) < 0.4) {
                let alpha = noise(i * 0.01, j * 0.01) * 10;
                fill(0, 0, 100, (8 - alpha));
                circle(i, j, dotSize);
            }
        }
    }
    pop();
}

function myMoon(x, y, size, isFull, rng) {
    push();
    translate(x, y);
    rotate(radians(rng.getRangeValue(-45, 45)));
    if (myColorMode == 2) {
        drawingContext.filter = 'blur(4px)'
    }
    noStroke();
    fill(60, 20, 100, 100);
    circle(0, 0, size);
    fill(0, 0, 20, 100);

    if (!isFull) {
        let angle = radians(rng.getRangeValue(20, 160));
        let offset = size * rng.getRangeValue(0.15, 0.4);
        let offsetX = offset * cos(angle);
        let offsetY = offset * sin(angle);
        circle(-offsetX, -offsetY, size);
    }
    pop();
}

function gradientBg(c1, c2) {
    let gradient = drawingContext.createLinearGradient(0, 0, 0, BASE_SIZE);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);

    drawingContext.fillStyle = gradient;
    rect(0, 0, BASE_SIZE, BASE_SIZE);
}

function myWire(p1, p2, p3, p4, rng) {
    push();
    drawingContext.filter = 'none';
    stroke(0, 0, 100, 80);
    strokeWeight(0.5);
    noFill();
    bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    pop();
}

function drawWindowsStatic(p1, p2, p3, p4, rowsRatio, colsRatio, tall, colorMode, windowColor, myColor, rng, counts, mainHue) {
    let faceWidth = dist(p1.x, p1.y, p2.x, p2.y);

    let cols = floor(faceWidth * colsRatio);
    let rows = floor(tall * rowsRatio);

    cols = max(cols, 3);
    rows = max(rows, 3);

    let windowWidthRatio = rng.getRangeValue(0.6, 0.8) / cols;
    let windowHeightRatio = rng.getRangeValue(0.5, 0.7) / rows;

    for (let i = 1; i < cols; i++) {
        for (let j = 1; j < rows; j++) {
            if (noise(i * 2, j * 2) > 0.5) continue;

            let tBottom = i / cols;
            let tTop = (i / cols);
            let bBottom = j / rows;
            let bTop = (j + windowHeightRatio * rows) / rows;

            let x1 = lerp(lerp(p1.x, p2.x, tBottom - windowWidthRatio / 2), lerp(p4.x, p3.x, tBottom - windowWidthRatio / 2), bBottom);
            let y1 = lerp(lerp(p1.y, p2.y, tBottom - windowWidthRatio / 2), lerp(p4.y, p3.y, tBottom - windowWidthRatio / 2), bBottom);

            let x2 = lerp(lerp(p1.x, p2.x, tBottom + windowWidthRatio / 2), lerp(p4.x, p3.x, tBottom + windowWidthRatio / 2), bBottom);
            let y2 = lerp(lerp(p1.y, p2.y, tBottom + windowWidthRatio / 2), lerp(p4.y, p3.y, tBottom + windowWidthRatio / 2), bBottom);

            let x3 = lerp(lerp(p1.x, p2.x, tTop + windowWidthRatio / 2), lerp(p4.x, p3.x, tTop + windowWidthRatio / 2), bTop);
            let y3 = lerp(lerp(p1.y, p2.y, tTop + windowWidthRatio / 2), lerp(p4.y, p3.y, tTop + windowWidthRatio / 2), bTop);

            let x4 = lerp(lerp(p1.x, p2.x, tTop - windowWidthRatio / 2), lerp(p4.x, p3.x, tTop - windowWidthRatio / 2), bTop);
            let y4 = lerp(lerp(p1.y, p2.y, tTop - windowWidthRatio / 2), lerp(p4.y, p3.y, tTop - windowWidthRatio / 2), bTop);

            push();
            strokeWeight(0.5);
            if (colorMode == 0) {
                noStroke();
                if (windowColor == 0) {
                    counts % 2 == 0 ? fill(0, 0, 100, 100) : fill(0, 0, 0, 10);
                }
                else {
                    if (rng.get() < 0.05) {
                        drawingContext.filter = 'drop-shadow(0px 0px 5px white)';
                        fill(60, 100, 100);
                    }
                    else {
                        fill(myColor[floor(rng.get() * myColor.length)]);
                    }
                }
            }
            else if (colorMode == 1) {
                if (windowColor == 0) {
                    stroke(0, 0, 100, 100);
                    counts % 2 == 0 ? fill(0, 0, 100, 80) : fill(0, 0, 0, 10);
                }
                else {
                    if (rng.get() < 0.05) {
                        drawingContext.filter = 'drop-shadow(0px 0px 5px white)';
                        fill(60, 100, 100);
                    }
                    else {
                        noStroke();
                        fill(myColor[floor(rng.get() * myColor.length)]);
                    }
                }
            }
            else if (colorMode == 2) {
                stroke(0, 0, 100, 100);
                strokeWeight(0.4);
                if (windowColor == 0) {
                    counts % 2 == 0 ? fill(0, 0, 100, 40) : fill(0, 0, 0, 20);
                }
                else {
                    fill(mainHue);
                }
            }
            strokeJoin(ROUND);
            beginShape();
            vertex(x1, y1);
            vertex(x2, y2);
            vertex(x3, y3);
            vertex(x4, y4);
            endShape(CLOSE);
            pop();
        }
    }
}

function noiseTexture(degree = 12, rng) {
    loadPixels();
    let d = pixelDensity();
    let w = cs * d;
    let h = cs * d;

    for (let row = 0; row < h; row += 3) {
        for (let col = 0; col < w; col += 3) {
            let index = (row * w + col) * 4;
            if (index + 2 < w * h * 4 && rng.get() > 0.65) {
                let g = rng.getRangeValue(-degree, degree);
                pixels[index] += g;
                pixels[index + 1] += g;
                pixels[index + 2] += g;
            }
        }
    }
    updatePixels();
}

function drawGlossyFrame(size = 50, startCol, endCol) {
    push();
    noFill();
    const sCol = startCol || color(30);
    const eCol = endCol || color(80);

    for (let i = 0; i < size; i++) {
        let inter = map(i, 0, size, 0, 1);
        let c = lerpColor(sCol, eCol, inter);
        stroke(c);
        rect(i, i, BASE_SIZE - i * 2, BASE_SIZE - i * 2);
    }
    stroke(255, 50);
    rect(size, size, BASE_SIZE - size * 2, BASE_SIZE - size * 2);
    pop();
}