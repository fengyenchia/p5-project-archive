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
let boxes = [];
let windowColor;

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
class Building {
	constructor(x, y, w, h, r, t, minTall, maxTall, counts, mainColor, myColorMode, windowColor, alphaValue) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.t = t;
		this.counts = counts;
		this.colorMode = myColorMode;
		this.alphaValue = alphaValue;

		this.myColor = mainColor;
		this.windowColor = windowColor;

		this.colorNumber = floor(random(this.myColor.length)); // this.colorMode == 0
		if (this.colorMode == 1) {
			this.mainHue = this.myColor[this.colorNumber]; // 單色
		}
		else if (this.colorMode == 2) {
			this.mainHue = this.myColor[this.colorNumber] + this.alphaValue; // 單色(透明)
		}

		let n = noise(x * 0.005, y * 0.005);
		this.tall = lerp(minTall, maxTall, n);
		this.counts = max(ceil(this.y / this.tall), counts); // 保證蓋滿畫面
	}

	draw() {
		push();
		let s = random([1, 1, 1.1, 1.2]);
		for (let count = this.counts; count > 0; count--) {
			let buildingMode = floor(random(0, 3));
			if (buildingMode === 0) {
				if (count == this.counts) {
					this.w /= 5;
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
			// 頂點
			this.w = lerp(this.w, this.w * s, count / this.counts);
			this.h = lerp(this.h, this.h * s, count / this.counts);
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


			// 底部
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

			// 左側
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
			if (random() < 0.95) {
				this.drawWindows(bLeft, bBottom, tBottom, tLeft, 0.04, this.t / 10);
			}
			pop();

			// 右側
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
			if (random() < 0.95) {
				this.drawWindows(bBottom, bRight, tRight, tBottom, 0.04, (1 - this.t) / 10);
			}
			pop();


			translate(0, this.tall);
		}
		pop();
	}

	drawWindows(p1, p2, p3, p4, rowsRatio = 0.05, colsRatio = 0.1) {

		// 計算表面寬度（底邊距離）
		let faceWidth = dist(p1.x, p1.y, p2.x, p2.y);

		let cols = floor(faceWidth * colsRatio);
		let rows = floor(this.tall * rowsRatio);

		// 至少有3列、行
		cols = max(cols, 3);
		rows = max(rows, 3);
		// 隨機窗戶大小變化
		let windowWidthRatio = random(0.6, 0.8) / cols;
		let windowHeightRatio = random(0.5, 0.7) / rows;


		for (let i = 1; i < cols; i++) {
			for (let j = 1; j < rows; j++) {
				// console.log(noise(i * 2, j * 2));
				if (noise(i * 2, j * 2) > 0.5) continue; // 跳過
				// 窗戶中心位置的四個角
				let tBottom = i / cols;
				let tTop = (i / cols);
				let bBottom = j / rows;
				let bTop = (j + windowHeightRatio * rows) / rows;

				// 左下角
				let x1 = lerp(lerp(p1.x, p2.x, tBottom - windowWidthRatio / 2), lerp(p4.x, p3.x, tBottom - windowWidthRatio / 2), bBottom);
				let y1 = lerp(lerp(p1.y, p2.y, tBottom - windowWidthRatio / 2), lerp(p4.y, p3.y, tBottom - windowWidthRatio / 2), bBottom);

				// 右下角
				let x2 = lerp(lerp(p1.x, p2.x, tBottom + windowWidthRatio / 2), lerp(p4.x, p3.x, tBottom + windowWidthRatio / 2), bBottom);
				let y2 = lerp(lerp(p1.y, p2.y, tBottom + windowWidthRatio / 2), lerp(p4.y, p3.y, tBottom + windowWidthRatio / 2), bBottom);

				// 右上角
				let x3 = lerp(lerp(p1.x, p2.x, tTop + windowWidthRatio / 2), lerp(p4.x, p3.x, tTop + windowWidthRatio / 2), bTop);
				let y3 = lerp(lerp(p1.y, p2.y, tTop + windowWidthRatio / 2), lerp(p4.y, p3.y, tTop + windowWidthRatio / 2), bTop);

				// 左上角
				let x4 = lerp(lerp(p1.x, p2.x, tTop - windowWidthRatio / 2), lerp(p4.x, p3.x, tTop - windowWidthRatio / 2), bTop);
				let y4 = lerp(lerp(p1.y, p2.y, tTop - windowWidthRatio / 2), lerp(p4.y, p3.y, tTop - windowWidthRatio / 2), bTop);

				push();
				strokeWeight(0.5);
				if (this.colorMode == 0) {
					noStroke();
					if (this.windowColor == 0) {
						this.counts % 2 == 0 ? fill(0, 0, 100, 100) : fill(0, 0, 0, 10);
					}
					else {
						if (random() < 0.05) {
							drawingContext.filter = 'drop-shadow(0px 0px 5px white)';
							fill(60, 100, 100); // 亮黃色
						}
						else {
							fill(random(this.myColor));
						}
					}
				}
				else if (this.colorMode == 1) {
					if (this.windowColor == 0) {
						stroke(0, 0, 100, 100);
						this.counts % 2 == 0 ? fill(0, 0, 100, 80) : fill(0, 0, 0, 10);
					}
					else {
						if (random() < 0.05) {
							drawingContext.filter = 'drop-shadow(0px 0px 5px white)';
							fill(60, 100, 100); // 亮黃色
						}
						else {
							noStroke();
							fill(random(this.myColor));
						}
					}
				}
				else if (this.colorMode == 2) {
					stroke(0, 0, 100, 100);
					strokeWeight(0.4);
					if (this.windowColor == 0) {
						this.counts % 2 == 0 ? fill(0, 0, 100, 40) : fill(0, 0, 0, 20);
					}
					else {
						fill(this.mainHue);
					}
				}
				strokeJoin(ROUND);
				// 畫矩形窗戶
				beginShape();
				vertex(x1, y1);
				vertex(x2, y2);
				vertex(x3, y3);
				vertex(x4, y4);
				endShape(CLOSE);
				drawingContext.filter = 'none';
				pop();
			}
		}
	}
}

function setup() {
	createCanvas(targetCanvasWidth, targetCanvasHeight);
	SetupCanvasScale();
	flex();
	noLoop();
}

let mainColor, myColorMode;
function draw() {
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 20, 100);

	let stepX = random(200, 280);
	let stepY = random(100, 140);
	let r = random(0.2, 0.8);
	let t = random(0.4, 0.6);
	let w = random(60, 170);
	let h = random(0, 40);
	let minTall = 40;
	let maxTall = 280;
	mainColor = random(colors);
	myColorMode = floor(random(0, 3)); // 0:多色 1:單色 2:透明單色

	let alphaValue = random(["11", "22", "33", "44", "55", "66", "77", "88"]);
	windowColor = floor(random(2));

	boxes = [];
	for (let y = height * 0.4; y < height; y += stepY) {
		for (let x = width * 0.2; x < width * 0.8; x += stepX) {
			let counts = ceil(random(10, 12));
			let offsetX = (floor(y / stepY) % 2 === 0) ? 0 : stepX / 2;

			let isConvert = random();
			r = (isConvert < 0.5 && h < 30) ? random([r, 1 - r]) : r
			boxes.push(new Building(
				x + offsetX, y, w, h,
				r, t, minTall, maxTall,
				counts, mainColor, myColorMode,
				windowColor, alphaValue));
		}
	}

	let moonMode = random();
	let bgMode = random();
	let color1, color2;

	// 純黑背景+殘月
	if (moonMode > 0.55) {
		myMoon(random(width * 0.2, width * 0.8), random(height * 0.1, height * 0.3), random(150, 250), false);
	}

	// 漸層背景+圓月
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

	// 4種背景
	if (bgMode < 0.15) {
		myStarBg();
	}
	else if (bgMode < 0.3) {
		flowBg(mainColor);
	}
	else if (bgMode < 0.45) {
		myDotBg();
	}
	else if (bgMode < 0.6) {
		mySnowBg()
	}
	else if (bgMode < 0.85) {
		flowBg(mainColor);
		myDotBg();
	}
	else {
		myStarBg()
		mySnowBg()
	}

	// 漸層背景+圓月
	if (moonMode <= 0.45) {
		myMoon(random(width * 0.2, width * 0.8), random(height * 0.1, height * 0.3), random(150, 250), true);
	}
	// 無月亮：0.1

	random() < 0.5 ? myCloud() : null;

	let amount = random(0.55, 0.85)
	for (let b of boxes) {
		if (random() < amount) {
			b.draw();
		}
	}

	// 電線
	let isWire = random();
	if (isWire < 0.2) {
		let wireCounts = floor(random(3, 7));
		for (let i = 0; i < wireCounts; i++) {
			myWire(
				createVector(0, random(height * -0.1, height * 0.4)),
				createVector(width * 0.3, random(height * 0.35, height * 0.6)),
				createVector(width * 0.7, random(height * 0.35, height * 0.6)),
				createVector(width, random(height * -0.1, height * 0.4))
			)
		}
	}

	// tool.js
	colorMode(RGB);
	drawGlossyFrame(15, color(0), color(100));
	noiseTexture(12);
}

function myStarBg() {
	noStroke();
	fill(0, 0, 100, 80);
	let starCount = random(100, 300);
	for (let i = 0; i < starCount; i++) {
		let x = random(width);
		let y = random(-50, height);
		let toX = random(45, 55);
		let toY = random(45, 55);
		for (let j = 0; j < 60; j++) {
			let px = x + lerp(-1, -toX, j / 60);
			let py = y + lerp(1, toY, j / 60);
			let starSize = lerp(0.05, 2, j / 60);
			circle(px, py, starSize);
		}
	}
}

function myDotBg() {
	noStroke();
	for (let j = 0; j <= height; j += 10) {
		for (let i = 0; i <= width; i += 10) {
			let dotSize = 2 * noise(i * 0.08, j * 0.08);
			fill(0, 0, 100, 100);
			circle(i, j, dotSize);
		}
	}
}
function mySnowBg() {
	noStroke();
	for (let j = 0; j <= height; j += 10) {
		for (let i = 0; i <= width; i += 10) {
			let dotSize = random(0.5, 3);
			if (noise(i * 0.1, j * 0.1) < 0.25) {
				fill(0, 0, 100, 100);
				circle(i, j, dotSize);
			}
		}
	}
}


// 流體背景
function flowBg(mainColor, force=1.5, spacing=20) { // force: 模糊程度
  let particles = [];
  let noiseRatio = random(0.005, 0.01);
  let layer = floor(random(8));

  for (let j = 0; j < height; j += spacing) {
    for (let i = 0; i < width; i += spacing) {
      particles.push({
        x: i,
        y: j,
        size: random(0.5, 2),
        color: random(mainColor) + "55"
      });
    }
  }

  // 模擬 30 幀的流動
  noStroke();
  for (let frame = 0; frame < 30; frame++) {
    let time = frame * layer; // 疊的層數
    for (let p of particles) {
      let angle = noise(p.x * noiseRatio, p.y * noiseRatio, time) * TWO_PI * 2;
      p.x += cos(angle) * force;
      p.y += sin(angle) * force;

      fill(p.color);
      circle(p.x, p.y, p.size);

      // 邊界處理
      if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;
    }
  }
}

// 雲
function myCloud() {
	push();
	noStroke();
	for (let j = 0; j < height; j += 1) {
		for (let i = 0; i <= width; i += 1) {
			let dotSize = random(0.1, 3);
			// console.log(noise(i * 0.01, j * 0.01));
			if (noise(i * 0.01, j * 0.01) < 0.4) {
				let alpha = noise(i * 0.01, j * 0.01) * 10;
				fill(0, 0, 100, (8 - alpha));
				circle(i, j, dotSize);
			}
		}
	}
	pop();
}

// 月亮
function myMoon(x, y, size, isFull) {
	push();
	translate(x, y);
	rotate(radians(random(-45, 45)));
	myColorMode == 2 ? drawingContext.filter = 'blur(4px)' : null;
	noStroke();
	fill(60, 20, 100, 100);
	circle(0, 0, size);
	fill(0, 0, 20, 100);

	if (!isFull) {
		let angle = radians(random(20, 160));
		let offset = size * random(0.15, 0.4);
		let offsetX = offset * cos(angle);
		let offsetY = offset * sin(angle);
		circle(-offsetX, -offsetY, size);
	}
	drawingContext.filter = 'none';
	pop();
}

// 漸層背景
function gradientBg(c1, c2) {
	let gradient = drawingContext.createLinearGradient(0, 0, 0, height); // (x1, y1, x2, y2)
	gradient.addColorStop(0, c1); // 起點顏色
	gradient.addColorStop(1, c2); // 終點顏色

	drawingContext.fillStyle = gradient;
	rect(0, 0, width, height);
}


// 電線
function myWire(p1, p2, p3, p4) {
	push();
	stroke(0, 0, 100, 80);
	strokeWeight(0.5);
	noFill();
	bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
	pop();
}