// noise材質
function noiseTexture(degree = 12) {
    push();
    loadPixels();
    for (let i = 0; i < pixels.length; i += 20) {
        let g = random(-degree, degree);
        pixels[i] += g;
        pixels[i + 1] += g;
        pixels[i + 2] += g;
    }
    updatePixels();
    pop();
}

// -----------------------------------------------------

/**
 * 繪製立體畫框
 * @param {Number} w 框的寬度
 * @param {Array} colors 包含 [亮部色, 暗部色] 的陣列
 */
function drawFrame(thickness = 40, colors = [220, 100]) {
    push();
    noStroke();
    let edgeL = colors[0]; // 亮部 (左、上)
    let edgeD = colors[1]; // 暗部 (右、下)

    // 上邊框 (亮)
    fill(edgeL);
    beginShape();
    vertex(0, 0);
    vertex(width, 0);
    vertex(width - thickness, thickness);
    vertex(thickness, thickness);
    endShape(CLOSE);
    // 左邊框 (中亮)
    fill(edgeL * 0.9);
    beginShape();
    vertex(0, 0);
    vertex(thickness, thickness);
    vertex(thickness, height - thickness);
    vertex(0, height);
    endShape(CLOSE);
    // 下邊框 (暗)
    fill(edgeD);
    beginShape();
    vertex(0, height);
    vertex(width, height);
    vertex(width - thickness, height - thickness);
    vertex(thickness, height - thickness);
    endShape(CLOSE);
    // 右邊框 (中暗)
    fill(edgeD * 0.8);
    beginShape();
    vertex(width, 0);
    vertex(width, height);
    vertex(width - thickness, height - thickness);
    vertex(width - thickness, thickness);
    endShape(CLOSE);

    pop();
}

// -----------------------------------------------------

/**
 * 極簡藝廊細框
 * @param {Number} size 邊緣留白寬度
 * @param {Color} lineColor 線條顏色
 * @param {Boolean} inner 是否繪製內部細線
 * @param {Color} innerColor 內部細線顏色
 */
function drawFlatFrame(size = 30, lineColor = color(0), inner = true, innerColor = color(255)) {
    push();
    // 外圍大框（白色遮蓋）
    noFill();
    stroke(lineColor);
    strokeWeight(size * 2);
    rect(0, 0, width, height);

    // 內部裝飾細線
    if (inner) {
        stroke(innerColor);
        strokeWeight(1);
        rect(size, size, width - size * 2, height - size * 2);
    }
    pop();
}

// -----------------------------------------------------

/**
 * 現代深度漸層框
 * @param {Number} size 框的總寬度
 * @param {Color} startCol 起始顏色 (外)
 * @param {Color} endCol 結束顏色 (內)
 */
function drawGlossyFrame(size = 50, startCol, endCol) {
    push();
    noFill();
    const sCol = startCol || color(30);
    const eCol = endCol || color(80);

    for (let i = 0; i < size; i++) {
        let inter = map(i, 0, size, 0, 1);
        let c = lerpColor(sCol, eCol, inter);
        stroke(c);
        rect(i, i, width - i * 2, height - i * 2);
    }

    // 最後在最內層補一條高亮線，模擬反光
    stroke(255, 50);
    rect(size, size, width - size * 2, height - size * 2);
    pop();
}