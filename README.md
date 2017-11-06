# jQuery-TWzipcode

在網頁建立多組 3 碼臺灣郵遞區號表單元素的 jQuery Plugin ─ 讀取快速、不需使用資料庫。

[範例展示 Live Demo](https://code.essoduke.org/twzipcode/)


\* **jQuery-TWzipcode v1.5 以後版本需 jQuery v1.6（支援 2.0）**

# TWzipcodeJS No-jQuery
免 jQuery 並支援 AMD 的純 JS 版本
[TWzipcodeJS No-Jquery](https://code.essoduke.org/twzipcode/nojquery)

## 多國語言 i18n

Download: [branch v1.6.1](https://github.com/essoduke/jQuery-TWzipcode/tree/i18n)

新增參數

```javascript
language: 'language file path' //預設自動判斷
```

Example
```javascript
$(selector).twzipcode({
  language: 'lang/zh-tw' //不需加上 .js
});
```
## 安裝 Install
### bower
```
$bower install jquery-TWzipcode
```

## 使用 Usage

HTML
```html
...
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="jquery.twzipcode.min.js"></script>

<!-- Normal -->
<div id="twzipcode"></div>
  
<!-- OR HTML5 data-* (Version 1.5+) -->
  
<div id="twzipcode">
  <div data-role="county" data-style="Style Name" data-value="110"></div>
  <div data-role="district" data-style="Style Name" data-value="臺北市"></div>
  <div data-role="zipcode" data-style="Style Name" data-value="信義區"></div>
</div>
```

Javascript
```javascript
$('#twzipcode').twzipcode();
```

## 選項 Options

### css	(Array)
設置元素的樣式名稱，依序為 `['縣市清單', '鄉鎮市區清單', '郵遞區號輸入框']`

### googleMapsKey (string)
`v1.6.9` Google Maps Geolocation API 金鑰。若您達到 Geocoder 的每日限制用量，可透過購買來提高用量，同時需設置金鑰。
_預設值: ''_

### detect	(boolean|Function)
`v1.6.7` 是否自動偵測用戶位置。不需引入 Google Maps API。
_預設值: false_

### countyName (string) 
指定縣市下拉清單元素的表單名稱。  
_預設值: county_

### countySel (string)	
縣市清單的預設值

### districtName (string)
鄉鎮市區下拉清單的表單名稱。  
_預設值: district_

### districtSel (string)
鄉鎮市區的預設值

### zipcodeName (string)
郵遞區號輸入框的表單名稱。  
_預設值: zipcode_

### zipcodeSel (string)
郵遞區號輸入框的預設值（此選項優先於 countySel, districtSel）

### zipcodeIntoDistrict (bool)
`v1.6.6` 是否隱藏郵遞區號輸入框並顯示於鄉鎮市區清單內？
_預設值: false_

### onCountySelect (function) 
`v1.5` 綁定縣市選單 Change 事件。

### onDistrictSelect (function) 
`v1.5` 綁定鄉鎮市區選單 Change 事件。

### onZipcodeKeyUp (function) 
`v1.5` 綁定郵遞區號輸入框 keyUp 事件（readonly 必須為 false）。  

### readonly (boolean)
郵遞區號輸入框是否唯讀？  
_預設值: true_

### hideCounty (array)
`v1.7.9` 要隱藏的縣市名稱，例如 ['臺北市', '宜蘭縣'...]
_預設值: []_

### hideDistrict (array)
`v1.7.9` 要隱藏的鄉鎮市區，可以是名稱或三碼郵遞區號例如 ['大安區', '110'...]
_預設值: []_


## 方法 Methods

### data
取得已選取縣市的郵遞區號資料
```javascript
var data = $(selector).twzipcode('data');
console.log(data);
```

### destroy
從指定的元素移除 Plugin
```javascript
$(selector).twzipcode('destroy');
```

### get
```javascript
// 取得縣市 county（返回字串）
var county = $(selector).twzipcode('get', 'county');

// 取得縣市 county 以及鄉鎮市區 district（返回陣列）
var result = $(selector).twzipcode('get', 'county,district'); // 以 , 字串傳入
var result = $(selector).twzipcode('get', ['county', 'district']);  // 以陣列傳入

// Callback
$(selector).twzipcode('get', function (county, district, zipcode) {
    console.log(county);   // 縣市
    console.log(district); // 鄉鎮市區
    console.log(zipcode);  // 郵遞區號
});
```

### set
```javascript
// 直接設置郵遞區號
$(selector).twzipcode('set', 110);
// 傳入縣市、鄉鎮市區
$(selector).twzipcode('set', {
    'county': '臺北市',
    'district': '信義區',
    'zipcode': 110
});
```

### reset
將指定的元素恢復未選狀態
```javascript
$(selector).twzipcode('reset');
```

### serialize
將指定的元素輸出為 URL QueryString。
```javascript
var qs = $(selector).twzipcode('serialize');
console.log(qs);
// output: 
// county=AAA&district=BBB&zipcode=999
```

## 範例
### 加入郵遞區號預設值，並可輸入郵遞區號取得縣市名稱
```javascript
$('selector').twzipcode({
    'zipcodeSel': 110,
    'readonly': false
});
```
### 加入縣市預設值
```javascript
$('selector').twzipcode({
    'countySel': '高雄市',
    'districtSel': '那瑪夏區'
});
```

### 指定 CSS 樣式名稱
```css
.addr-county{background:#4169E1;color:#fff}
.addr-district{background:#008000;color:#fff}
.addr-zip{background:#c00;color:#fff;border:1px solid #666}
```
```javascript
$('#container').twzipcode({
    'css': [
        'addr-county', //縣市
        'addr-distrcit',  // 鄉鎮市區
        'addr-zip' // 郵遞區號
    ]
});
```

或是直接使用 HTML5 data-* 套用樣式

```html
<div id="twzipcode">
  <div data-role="zipcode" data-style="addr-zip" data-name="元素名稱" data-value="預設值"></div>
  <div data-role="county" data-style="addr-county" data-name="元素名稱" data-value="預設值"></div>
  <div data-role="district" data-style="addr-district" data-name="元素名稱" data-value="預設值"></div>
</div>
```
## 支援

請拜訪 https://code.essoduke.org/twzipcode/ 取得支援。

## 授權

v1.6.2 開始採用 [MIT License](http://opensource.org/licenses/MIT)  
v1.6.1 及更早版本採用 [創用 CC 姓名標示-相同方式分享 3.0  台灣授權條款](http://creativecommons.org/licenses/by-sa/3.0/deed.zh_TW)。
