# p5.js Project Archive

 用於 p5.js 作品存檔。

## 功能特點

- 可以存放多個 p5.js 專案
- 美觀的卡片式畫廊展示，黑白極簡風格
- 響應式設計，支援各種螢幕尺寸
- 簡單易用，只需添加專案資料夾
- 提供指令工具快速創建專案
- 共用函式庫與輔助工具

## 使用方法

### 1. 查看現有專案

直接打開 `index.html` 檔案即可查看所有專案。

### 2. 新增專案

#### 方法一：使用終端指令

使用 `create-project.js` 指令自動複製 `template` 並更新 `projects-loader.js`：

```bash
node create-project.js <專案資料夾名稱> --name "專案名稱" --desc "專案描述" --thumb "縮圖路徑"
```

**參數說明：**
- `<專案資料夾名稱>`：**必填**，會建立在 `projects/` 底下（建議格式：YYMMDD）
- `--name`：選填，專案顯示名稱（未填會使用資料夾名稱）
- `--desc`：選填，專案描述（預設為「請輸入專案描述」）
- `--thumb`：選填，縮圖路徑（預設為 `projects/<專案資料夾名稱>/images/0130.png`）

**範例：**
```bash
node create-project.js 260131 --name "260131" --desc "Beautiful Art | GENUARY 31, 2026"
```

#### 方法二：手動新增

1. 在 `projects/` 資料夾中創建新的專案資料夾
2. 在該資料夾中放入你的 p5.js 專案檔案（index.html 和 sketch.js）
3. 在 `projects-loader.js` 中添加專案資訊：

```javascript
const projects = [
    // ... 其他專案
    {
        name: "專案名稱",
        description: "專案主題與描述",
        folder: "your-project-folder",
        thumbnail: "projects/your-project-folder/images/thumbnail.png"
    }
];
```

### 3. 專案結構

```
p5-project-archive/
├── index.html             # 主頁面
├── style.css              # 樣式表
├── projects-loader.js     # 專案載入腳本
├── create-project.js      # 專案創建工具腳本
├── lib/                   # 共用函式庫資料夾
│   ├── p5.min.js         # p5.js 核心函式庫
│   ├── p5.flex.js        # 響應式畫布工具
│   ├── tool.js           # 常用輔助函式
│   ├── save.js           # 儲存圖片/GIF 工具
│   ├── easing.js         # 緩動函式庫
│   ├── code.md           # 程式碼片段與筆記
│   └── README.md         # lib 函式庫與工具
├── projects/              # 專案資料夾
│   ├── 260130/           # 專案資料夾
│   │   ├── index.html
│   │   ├── sketch.js
│   │   └── images/
│   └── template/         # 專案模板
│       ├── index.html
│       ├── sketch.js
│       └── images/
└── README.md
```

## p5.js 函式庫與工具

### 核心函式庫

所有專案的 `index.html` 都引用這兩個檔案：
- **p5.min.js** - p5.js 核心函式庫
- **p5.flex.js** - 響應式畫布，自動適應螢幕尺寸

```html
<script src="../../lib/p5.min.js"></script>
<script src="../../lib/p5.flex.js"></script>
```

### 輔助工具

- **tool.js** - 常用輔助函式
- **save.js** - 按空白鍵儲存 PNG，按 'a' 儲存 5 秒 GIF
- **easing.js** - 緩動動畫函式庫

根據需要在專案的 `index.html` 中引用：

```html
<script src="../../lib/tool.js"></script>
<script src="../../lib/save.js"></script>
<script src="../../lib/easing.js"></script>
```

> **注意**: 如果需要更新 p5.js 版本，請從 [p5.js 官網](https://p5js.org/download/) 或 [GitHub Releases](https://github.com/processing/p5.js/releases/) 下載新版本並替換 `lib/p5.min.js` 檔案。
## 設計風格

- **配色**：黑白極簡風格，使用 `#000000` 與 `#ffffff`
- **排版**：2px 實線邊框，卡片式佈局
- **互動**：懸停時背景與顏色反轉效果
- **圖示**：使用 [Bootstrap Icons](https://icons.getbootstrap.com/) CDN

<!-- ## Footer 社群連結

主頁面底部包含社群媒體與聯絡方式連結：
- Email
- Instagram
- LinkedIn
- GitHub
- OpenProcessing (p5.js 作品集) -->

## 技術棧

- HTML5
- CSS3
- JavaScript
- Node.js (用於專案創建工具)
- [p5.js](https://p5js.org/) - 創意編程函式庫
- [Bootstrap Icons](https://icons.getbootstrap.com/) - 圖示系統

<!-- ## 部署

可以將此專案部署到任何靜態網站託管服務：

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- 或任何網頁伺服器

## 授權

MIT License -->