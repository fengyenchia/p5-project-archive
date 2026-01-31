# p5.js 函式庫資料夾

此資料夾用於存放所有專案共用的 p5.js 函式庫檔案。

## 下載 p5.js

請從 [p5.js 官方網站](https://p5js.org/download/) 下載以下檔案並放置於此資料夾：

- `p5.min.js` - p5.js 的壓縮版本（建議用於生產環境）
- `p5.js` - p5.js 的完整版本（包含註解，建議用於開發）

### 下載連結

最新版本 (1.7.0):
- [p5.min.js](https://github.com/processing/p5.js/releases/download/v1.7.0/p5.min.js)
- [p5.js](https://github.com/processing/p5.js/releases/download/v1.7.0/p5.js)

## 使用方式

所有專案的 index.html 都應該引用此資料夾中的 p5.js 檔案：

```html
<script src="../../lib/p5.min.js"></script>
```

## 注意事項

- 此資料夾中的檔案由所有專案共用，更新時請確保不會影響現有專案
- 如果需要使用 CDN，可以將 script src 改回 CDN 連結
