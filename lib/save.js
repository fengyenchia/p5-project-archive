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


// 儲存圖片
function keyPressed() {
    if (key == " ")
        saveCanvas(str, "png");
}

// 儲存 5 秒 GIF
function keyPressed() {
    saveGif(str + '.gif', 5);
}