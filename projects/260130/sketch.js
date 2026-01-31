let targetCanvasWidth = 1000;
let targetCanvasHeight = 1000;
let deviceRatio = 1;

function SetupCanvasScale() {
	let originalDensity = pixelDensity();

	if (windowWidth > targetCanvasWidth) {
		deviceRatio = (windowWidth / targetCanvasWidth);
	} else {
		deviceRatio = originalDensity;
	}

	deviceRatio = max(deviceRatio, 1);
	pixelDensity(deviceRatio);
}

// ---------------------------------------------------------------------
let cs = 1000;
let mainHue;
let gridSize;
let pointX = [];
let pointY = [];
let tt;
let frameColor = [100, 220];
let textColor = [255, 0];
let myColorNumber;
let dataNodeWeight;
let myCase;

async function setup() {
	createCanvas(targetCanvasWidth, targetCanvasHeight);
	SetupCanvasScale();
	flex();

	colorMode(HSB, 360, 100, 100, 100);
	noLoop();
}

async function draw() {
	colorMode(RGB);
	myColorNumber = floor(random(frameColor.length));
	background(frameColor[myColorNumber]);
	colorMode(HSB, 360, 100, 100, 100);
	mainHue = random(360);
	gridSize = cs / 40;
	myCase = floor(random(0, 3));
	
	drawPath();
	drawNodes();

	// 框
	drawArtisticFrame();

	noiseTexture(30);
}


function drawPath() {
	pointX = [0];
	pointY = [0];

	let nodeCount = floor(random([random(0, 10), random(50, 150),random(150, 210)]));
	for (let i = 1; i < nodeCount; i++) {
		pointX.push(floor(random(2, 38)) * gridSize);
		pointY.push(floor(random(2, 38)) * gridSize);

		if (nodeCount % 2 == 0) {
			stroke(255)
		} else {
			stroke(myColor());
		}
		strokeWeight(1);
		if (nodeCount < 150) {
			line(pointX[i - 1], pointY[i - 1], pointX[i], pointY[i - 1]);
			line(pointX[i], pointY[i - 1], pointX[i], pointY[i]);
		}
	}
}

function drawNodes() {
	dataNodeWeight = random(cs / 600, cs / 200);
	for (let i = 1; i < pointX.length; i++) {
		let rectWidth = floor(random(3, 6)) * gridSize;
		drawDataNode(pointX[i], pointY[i], i, rectWidth);
	}
}

function drawDataNode(px, py, idx, rectWidth) {
	push();
	rectMode(CENTER);
	drawingContext.shadowColor = color(0, 0, 0, 15);
	drawingContext.shadowBlur = 10;
	strokeWeight(dataNodeWeight);
	// 主視窗
	let cc = myColor();
	fill(cc);
	stroke(255);
	rect(px, py, rectWidth, rectWidth);

	// 頂部
	let c = random();
	if (c > 0.5) {
		fill(20);
		stroke(255);
	} else {
		fill(255);
		stroke(255);
	}
	rect(px, py - rectWidth / 2 - rectWidth / 14, rectWidth, rectWidth / 7);

	drawingContext.shadowBlur = 0;

	// 遮罩
	drawingContext.save();
	drawingContext.beginPath();
	drawingContext.rect(px - rectWidth / 2 + dataNodeWeight, py - rectWidth / 2 + dataNodeWeight, rectWidth - dataNodeWeight * 2, rectWidth - dataNodeWeight * 2);
	drawingContext.clip();

	if (idx % 4 == 0) archimedeaSpiral(px, py, random(0.7, 1.5));
	else if (idx % 4 == 1) roseCurve(px, py, rectWidth / 3, floor(random(1, 7)));
	else if (idx % 4 == 2) lissajousCurve(px, py, rectWidth / 3);
	else butterflyCurve(px, py, random(rectWidth / 8, rectWidth / 6));

	drawingContext.restore();

	// 文字
	textFont('monospace');
	noStroke()
	if (c > 0.5) {
		fill(255);
	} else {
		fill(20);
	}
	textSize(gridSize * 0.5);
	textAlign(LEFT, CENTER);
	text(`NO.${idx}`, px - rectWidth / 2 + 5, py - rectWidth / 2 - rectWidth / 20);
	pop();
}

function archimedeaSpiral(posX, posY, a) {
	beginShape();
	for (let t = 0; t <= 10 * PI; t += 0.01) {
		let x = posX + a * t * cos(t);
		let y = posY + a * t * sin(t);
		stroke(20, 90);
		strokeWeight(0.6);
		noFill();
		vertex(x, y);
	}
	endShape();
}

function roseCurve(posX, posY, a, n) {
	beginShape();
	for (let t = 0; t <= 2 * PI; t += 0.01) {
		let r = a * cos(n * t);
		let x = posX + r * cos(t);
		let y = posY + r * sin(t);
		stroke(20, 90);
		strokeWeight(0.6);
		noFill();
		vertex(x, y);
	}
	endShape(CLOSE);
}

function butterflyCurve(posX, posY, scale) {
	push();
	translate(posX, posY + cs / 80);
	rotate(PI);
	beginShape();
	for (let t = 0; t <= 12 * PI; t += 0.01) {
		let r = exp(cos(t)) - 2 * cos(4 * t) - pow(sin(t / 12), 5);
		let x = scale * sin(t) * r;
		let y = scale * cos(t) * r;
		noFill();
		stroke(20, 90);
		strokeWeight(0.2);
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}

function lissajousCurve(posX, posY, aSize) {
	let a = int(random(1, 5));
	let b = int(random(1, 5));
	let delta = PI / 2;
	beginShape();
	for (let t = 0; t < TWO_PI; t += 0.05) {
		let x = posX + aSize * sin(a * t + delta);
		let y = posY + aSize * sin(b * t);
		noFill();
		stroke(20, 90);
		strokeWeight(0.6);
		vertex(x, y);
	}
	endShape(CLOSE);
}




function myColor() {
	if (myCase == 0) {
		let colorHue = (mainHue + random(-40, 40)) % 360;
		let colorSat = random(5, 25);
		let colorBri = random(95, 100);
		if (random() < 0.1) {
			colorSat = 0;
			colorBri = 100;
		}
		if (random() < 0.1) {
			colorHue = (colorHue + 180) % 360;
		}
		return color(colorHue, colorSat, colorBri, 80);
	} else if (myCase == 1) {
		let isGlitch = random() < 0.15;
		let colorHue = (mainHue + random(-20, 20)) % 360;
		let colorSat = isGlitch ? random(75, 85) : random(30, 50);
		let colorBri = isGlitch ? random(85, 90) : random(95, 100);
		if (isGlitch) {
			colorHue = (colorHue + 180) % 360;
		}
		return color(colorHue, colorSat, colorBri, isGlitch ? 90 : 80);
	} else if (myCase == 2) {
		let colorHue = (mainHue + random(-10, 10)) % 360;
		let colorSat = random(50, 60);
		let colorBri = random(80, 100);

		if (random() < 0.2) return color(0, 0, 0, 60);
		if (random() < 0.2) return color(0, 0, 100, 90);

		return color(colorHue, colorSat, colorBri, 80);
	}
}

function drawArtisticFrame() {
	push();
	drawingContext.shadowColor = color(0, 0, 0, 80);
	drawingContext.shadowBlur = 100;
	// 內邊框
	let margin = cs * 0.1;
	noFill();
	colorMode(RGB);
	stroke(frameColor[myColorNumber]);
	strokeWeight(margin * 2);
	rect(0, 0, cs, cs);
	drawingContext.shadowColor = color(0, 0, 0, 0);
	drawingContext.shadowBlur = 0;
	// 細線框
	stroke(20, 40);
	strokeWeight(1);
	rect(margin, margin, cs - margin * 2, cs - margin * 2);
	// 文字
	fill(textColor[myColorNumber], 150);
	noStroke();
	textFont('monospace');
	textSize(cs / 55);
	textAlign(LEFT, TOP);
	text("Genuary 30: Its not a bug, its a feature.", margin, cs - margin + 10);

	textAlign(RIGHT, TOP);
	let d = new Date();
	let y = d.getFullYear().toString().slice(-2);
	let m = nf(d.getMonth() + 1, 2);
	let day = nf(d.getDate(), 2);
	let tt = y + "-" + m + "-" + day;
	text("Mint Time: " + tt, cs - margin, cs - margin + 10);
}

// -----------------------------------------------------

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}