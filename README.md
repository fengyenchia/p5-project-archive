# p5.js 專案作品集 Archive

這是一個用來展示多個 p5.js 專案的網頁作品集。

## 功能特點

- 📁 可以存放多個 p5.js 專案
- 🎨 美觀的卡片式畫廊展示
- 📱 響應式設計，支援各種螢幕尺寸
- 🚀 簡單易用，只需添加專案資料夾

## 使用方法

### 1. 查看現有專案

直接打開 `index.html` 檔案即可查看所有專案。

### 2. 新增專案

1. 在 `projects/` 資料夾中創建新的專案資料夾
2. 在該資料夾中放入你的 p5.js 專案檔案（index.html 和 sketch.js）
3. 在 `projects-loader.js` 中添加專案資訊：

```javascript
const projects = [
    {
        name: "你的專案名稱",
        description: "專案描述",
        folder: "your-project-folder",
        icon: "🎯"  // 可選的 emoji 圖示
    },
    // ... 其他專案
];
```

### 3. 專案結構

```
p5-project-archive/
├── index.html              # 主頁面
├── style.css              # 樣式表
├── projects-loader.js     # 專案載入腳本
├── lib/                   # 共用函式庫資料夾
│   ├── p5.min.js         # p5.js 函式庫（需自行下載）
│   └── README.md         # 函式庫下載說明
├── projects/              # 專案資料夾
│   ├── colorful-circles/  # 範例專案 1
│   │   ├── index.html
│   │   └── sketch.js
│   └── particle-system/   # 範例專案 2
│       ├── index.html
│       └── sketch.js
└── README.md
```

## 範例專案

此 repository 包含兩個範例專案：

1. **黑白圓圈** - 互動式黑白圓圈動畫
2. **粒子系統** - 動態粒子效果

## p5.js 函式庫

專案使用共用的 p5.js 函式庫，位於 `lib/` 資料夾中。所有專案的 index.html 都引用此共用函式庫：

```html
<script src="../../lib/p5.min.js"></script>
```

> **重要**: 請從 [p5.js 官網](https://p5js.org/download/) 或 [GitHub Releases](https://github.com/processing/p5.js/releases/download/v1.7.0/p5.min.js) 下載 `p5.min.js` 並放置於 `lib/` 資料夾中。或者，您也可以將 script src 改回 CDN 連結以使用線上版本。

## 技術棧

- HTML5
- CSS3
- JavaScript
- [p5.js](https://p5js.org/) - 創意編程函式庫

## 部署

可以將此專案部署到任何靜態網站託管服務：

- GitHub Pages
- Netlify
- Vercel
- 或任何網頁伺服器

## 授權

MIT License