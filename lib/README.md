# p5.js 函式庫資料夾

此資料夾用於存放所有專案共用的 p5.js 函式庫檔案。

## 目前版本

- **p5.min.js** - p5.js v1.7.0 (2023年7月10日)

## 更新 p5.js

如需更新 p5.js 版本，請從 [p5.js 官方網站](https://p5js.org/download/) 下載新版本並替換此資料夾中的檔案：

- `p5.min.js` - p5.js 的壓縮版本（建議用於生產環境）
- `p5.js` - p5.js 的完整版本（包含註解，建議用於開發）（可選）

### 下載連結

- 最新版本: [p5.js 官方下載頁面](https://p5js.org/download/)
- GitHub Releases: [p5.js Releases](https://github.com/processing/p5.js/releases/)

## 使用方式

所有專案的 index.html 都應該引用此資料夾中的 p5.js 檔案：

```html
<script src="../../lib/p5.min.js"></script>
```

## 優點

- **節省空間**: 避免在每個專案中重複存放相同的函式庫檔案
- **統一管理**: 只需在一個地方更新 p5.js 版本，所有專案都會自動使用新版本
- **離線使用**: 不依賴 CDN，可以完全離線運行專案

## 注意事項

- 此資料夾中的檔案由所有專案共用，更新時請確保不會影響現有專案的相容性
- 如果需要使用 CDN 而非本地檔案，可以將專案的 script src 改為 CDN 連結
