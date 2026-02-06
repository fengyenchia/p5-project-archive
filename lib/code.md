### 陰影
```javascript
drawingContext.shadowColor = color(0,200);
drawingContext.shadowOffsetX = 2;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = 6;
```

### drawingContext.filter 濾鏡

**效能消耗：** blur 濾鏡最吃效能，在 draw() 迴圈中大量使用會導致掉幀。

**重置方式：** 除了 push()、pop() 之外，也可以直接執行 drawingContext.filter = 'none';。

**使用位置：** 先寫濾鏡，再寫顏色
```javascript
// 亮度 (Brightness)
// 數值：0 (全黑) 到 1 (原狀)，1 以上更亮。
drawingContext.filter = 'brightness(0.5)';

// 模糊 (Blur)
// 數值：0px 以上，數值越大越模糊。
drawingContext.filter = 'blur(10px)';

// 對比度 (Contrast)
// 數值：0 (全灰) 到 1 (原狀)，1 以上對比更強。
drawingContext.filter = 'contrast(2)';

// 灰階 (Grayscale)
// 數值：0 (原狀) 到 1 (完全黑白)。
drawingContext.filter = 'grayscale(1)';

// 色相旋轉 (Hue-rotate)
// 數值：0deg 到 360deg (旋轉一圈顏色回到原點)。
drawingContext.filter = 'hue-rotate(180deg)';

// 負片 (Invert)
// 數值：0 (原狀) 到 1 (完全反相)。
drawingContext.filter = 'invert(1)';

// 飽和度 (Saturate)
// 數值：0 (完全無色) 到 1 (原狀)，1 以上顏色更鮮豔。
drawingContext.filter = 'saturate(3)';

// 懷舊色 (Sepia)
// 數值：0 (原狀) 到 1 (完全深褐色)。
drawingContext.filter = 'sepia(0.8)';

// 陰影 (Drop-shadow)
// 數值：(水平位移 垂直位移 模糊半徑 顏色)。
drawingContext.filter = 'drop-shadow(5px 5px 2px #000)';

// 不透明度 (Opacity)
// 數值：0 (全透明) 到 1 (不透明)。
drawingContext.filter = 'opacity(0.5)';

// -------------------------------------------------------------
// 常見組合範例

// 復古電影感：'sepia(0.8) contrast(1.2) brightness(0.9)'
// 霓虹發光感：'blur(2px) saturate(2) brightness(1.5)'
// 剪影效果：'brightness(0) invert(1)'
// 柔焦效果：'blur(1px) contrast(1.1)'
```


### 圓角描邊
```javascript
strokeJoin(ROUND);
```


### 顏色色票
```javascript
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