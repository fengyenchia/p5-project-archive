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
let mainHue;

async function setup() {
	createCanvas(targetCanvasWidth, targetCanvasHeight);
	SetupCanvasScale();
	flex();

	mainHue = random(0, 360);
	noLoop();
}

async function draw() {
	background(20);
	colorMode(HSB, 360, 100, 100, 100);

	noStroke();
	for (let i = 0; i < 50; i++) {
		mainHue = random(0, 360);
		fill(mainHue, 40, 100, 80);
		let offset = i * 10;
		circle(width / 2 + random(-offset / 8, offset / 8), height / 2 + random(-offset / 8, offset / 8), 500 - offset);
		await sleep(20);
	}
}




// -----------------------------------------------------

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}