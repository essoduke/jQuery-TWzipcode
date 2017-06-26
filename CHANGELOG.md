# jQuery TWzipcode Changelog
### 1.7.14
* 修正新竹縣「峨嵋鄉」為「峨眉鄉」

### 1.7.13
* 新增 `afterZipcodeSetup` 事件於初始化後觸發 

### 1.7.12
* 新增 html5 [data-*] 新增為元素屬性的功能。

### 1.7.11
* 修正 get 方法，若第二個參數傳入 county, district, zipcode 將會直接返回值而不是 DOM 物件。
* 修正 detect 方法，現在可以除了 true|false 也可以傳入 callback funciotn。

### 1.7.10
* 修正異體字「台」為正體字「臺」

### 1.7.9
* 新增 hideCounty, hideDistrict 屬性，可控制隱藏符合的縣市或鄉鎮市區名稱。

### 1.7.8
* 修正使用 html data-value 的方式傳入預設值無效的錯誤。

### 1.7.7
* 修正 readonly 會造成 keyup, blur 無法被 detect 觸發的錯誤。

### 1.7.6
* 修正高雄市田寮鄉為田寮區，湖內鄉為湖內區（By kevin50406418）
 
### 1.7.5
* 加入 zipcode input placeholder 的支援（By visioncan）

### 1.7.4
* 鄉鎮市區修正: 東沙、南沙編在高雄市轄區內、三地門補上鄉字

### 1.7.3
* 新增 get 方法，可取得元素 DOM。
* 取消 onCountySelect, onDistrictSelect, onZipcodeKeyUp 返回的參數，this 即為元素本身。

### 1.7.2
* 新增 set 方法，可設置縣市、鄉鎮市區。

### 1.7.1
* 因應員林鎮改制為員林市、頭份鎮改制為頭份市。

### 1.7.0
* 修正 html5 data-value 優先於 countySel, districtSel, zipcodeSel 的問題。

### 1.6.9
* 增加 googleMapsKey 參數，可設置 Google Maps Geolocation API 的金鑰，以能透過購買用量來解決 API 用量限制。(By Patrick Wang)
* 修正了無法於 Safari 8.0.5 (OS X) 上定位的問題。(By Patrick Wang)

### 1.6.8
* 更改桃園縣升格後行政區域的名稱。(By syj610226)

### 1.6.7
* 恢復 detect(bool) 參數的支援，可設置是否自動讀取用戶的位置（瀏覽器需 GeoLocation API 支援）

### 1.6.6
* 新增 zipcodeIntoDistrict 參數，可隱藏郵遞區號輸入框，並顯示於鄉鎮市區清單內。

### 1.6.5
* 新增 data-name, data-readonly 設置元素名稱及是否唯讀。(By Wake Liu)

### 1.6.4
* 修正預設值無法傳入的問題

### 1.6.3
* HTML5 自訂容器加入 data-value 可傳入預設值

### 1.6.2
* 修正 destroy 方法註銷 plugin 後不回傳物件導致無法 chain 的錯誤。
* 轉換至 MIT 授權

### 1.6.0
* 程式碼重構，增加可讀性。
* 增加 data 方法可取得目前選取的縣市郵遞區號資料（若無選取則返回全部資料）。
* 暫時移除 detect 使用的 Geolocation API。
* 採用 Closure Compiler 製作 production 版本。

### 1.5.2
* 修正資料 (Hsinchu, Chiayi)

### 1.5.1
* 修正 callback 綁定錯誤

### 1.5.0
* 支援 jQuery 2.0

### 1.4
* 改寫原始碼以符合 jslint.com
* 修改參數名稱以更符合語意 areaName => districtName, zipName => zipcodeName, areaSel => districtSel, zipSel => zipcodeSel
* 加入 destroy, reset, serialize 等方法
* 修正當指定元素名稱時，若名稱內包含 [] 會發生錯誤的情形。
* 更新 Creative Commons 至 3.0

### 1.3.1
* 因應五都改制，修正為合併後的行政區劃。

### 1.3.0
* 新增輸入郵遞區號取得縣市名稱的功能。（意見提供：ileadu）

### 1.2.0
* 修正 IE6 鄉鎮市區選單只顯示一個以及清單過長的問題

### 1.1.0
* 修正 form reset 時，鄉鎮市區選單無法重置的錯誤
* 加入css參數以套用樣式： $(element).twzipcode({ css:[select1, select2, select3] });
* 改寫成更簡潔的源碼以增進效能
* 使用自訂表單元件名稱
