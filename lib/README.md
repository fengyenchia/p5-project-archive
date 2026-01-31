# lib 函式庫與工具

此資料夾用於存放所有專案共用的 p5.js 函式庫與輔助工具。

## 檔案清單

- **p5.min.js** - p5.js 核心函式庫
- **p5.flex.js** - 響應式畫布工具
- **tool.js** - 常用輔助函式
- **save.js** - 儲存圖片 / GIF 工具
- **easing.js** - 緩動函式庫
- **code.md** - 程式碼片段與筆記

## 使用方式

所有專案的 index.html 都應該引用 p5.min.js 與 p5.flex.js：

```html
<script src="../../lib/p5.min.js"></script>
<script src="../../lib/p5.flex.js"></script>
```

依需求加入輔助工具：

```html
<script src="../../lib/tool.js"></script>
<script src="../../lib/save.js"></script>
<script src="../../lib/easing.js"></script>
```

## save.js 使用說明

- 按 **空白鍵** 下載 PNG
- 按 **a** 下載 5 秒 GIF

## 更新 p5.js

如需更新 p5.js 版本，請從下列連結下載並替換 `p5.min.js`：

- 最新版本: [p5.js 官方下載頁面](https://p5js.org/download/)
- GitHub Releases: [p5.js Releases](https://github.com/processing/p5.js/releases/)

## 注意事項

- 此資料夾中的檔案由所有專案共用，更新時請確保相容性
- 若改用 CDN，請把 `script src` 改為 CDN 連結
