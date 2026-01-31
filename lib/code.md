### 陰影
```javascript
drawingContext.shadowColor = color(0,200);
drawingContext.shadowOffsetX = 2;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = 6;
```


### 顏色色票
```javascript
let colors = [
    ["#226699", "#dd2e44", "#ffcc4d"],
    ["#00b2b4", "#fdd35b", "#3b4696", "#f4737d", "#333333"],
    ["#ff6f59", "#254441", "#43aa8b", "#b2b09b"],
    ["#393e41", "#e94f37", "#f2b134", "#168aad", "#1a1a1d"],
    ["#4fb99f", "#f2d398", "#d96c75", "#c44569", "#512234"],
    ["#405d27", "#9bc53d", "#eaf27f", "#f4d35e", "#ee964b"],
    ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"]
];
```

### 隨機顏色(360度)
```javascript
function myColor(h=random(-30, 30), s=random(40, 60), b=random(80, 100)) {
	let colorHue = (mainHue + h) % 360;
	let colorSat = s;
	let colorBri = b;
	if (random() < 0.1) {
		colorSat = 0;
		colorBri = 100;
	}
	if (random() < 0.05) {
		colorHue = (colorHue + 180) % 360;
	}
    return color(colorHue, colorSat, colorBri);
}
```


### 材質
```javascript
let overAllTexture;

function preload() {
	overAllTexture= loadImage(
		"https://fengyenchia.github.io/archive-storage/openprocessing/texture/1.jpg"
	);
}

// 在draw()最後加
push();
blendMode(MULTIPLY);
image(overAllTexture, 0, 0, width, height);
pop();
```


### 時間(時分秒)
```javascript
let hr = hour();
let mn = minute();
let sc = second();

// 時間角度轉換
let secondAngle = map(second(), 0, 60, 0, 360);
let minuteAngle = map(minute(), 0, 60, 0, 360);
let hourAngle = map(hour(), 0, 12, 0, 360);
```


### 時間(年月日)
```javascript
let year, month, day;
let today = new Date();
let dateStr = today.toLocaleDateString('en-GB', { // YYYY-MM-DD
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
}).split('/'); //  [day, month, year]
year = dateStr[2];
month = dateStr[1];
day = dateStr[0];

let str = year + "-" + month + "-" + day;
```


### 錄影(記得解除index.html的註解)

```javascript
let myP5MovRec;

function setup() {
  createCanvas( 720, 720 );
  myP5MovRec = new P5MovRec();
}

function keyPressed() {
  switch (keyCode) {
    case 49: //1: Start record
      myP5MovRec.startRec();
      break;
    case 50: //2: Stop record
      myP5MovRec.stopRec();
      break;
    default:
      break;
  }
}
```