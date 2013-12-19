# jQuery-TWzipcode

在網頁建立多組 3 碼台灣郵遞區號表單元素的 jQuery Plugin ─ 讀取快速、不需使用資料庫。

[範例展示 Live Demo](http://app.essoduke.org/twzipcode)


\* **jQuery-TWzipcode v1.5 以後版本需 jQuery v1.6（支援 2.0）**


## 使用 Usage

HTML
```html
...
<head>
  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script type="text/javascript" src="jquery.twzipcode-1.6.0.min.js"></script>
</head>
<body>
  
  <!-- Normal -->
  <div id="twzipcode"></div>
  
  <!-- OR -->
  <!-- HTML5 data-* (Version 1.5+) -->
  
  <div id="twzipcode">
    <div data-role="county" data-style="Style Name"></div>
    <div data-role="district" data-style="Style Name"></div>
    <div data-role="zipcode" data-style="Style Name"></div>
  </div>
  
</body>
...
```

Javascript
```javascript
$('#twzipcode').twzipcode();
```

## 參數 Parameters

### countryName (string) 
指定縣市下拉清單元素的表單名稱。  
_預設值: country_

### districtName (string)
指定鄉鎮市區下拉清單元素的表單名稱。  
_預設值: district_

### zipcodeName (string)
指定郵遞區號輸入框元素的表單名稱。  
_預設值: zipcode_

### countySel (string)	
縣市清單的預設值

### districtSel (string)
鄉鎮市區清單的預設值

### zipcodeSel (string)
郵遞區號輸入框的預設值

### onCountySelect (function) 
`version 1.5+` 綁定縣市選單 Change 事件。

### onDistrictSelect (function) 
`version 1.5+` 綁定鄉鎮市區選單 Change 事件。

### onZipcodeKeyUp (function) 
`version 1.5+` 綁定郵遞區號輸入框 keyUp 事件（readonly 必須為 false）。  

### readonly (boolean)
郵遞區號輸入框是否唯讀？  
_預設值: true_

### css	(array)
表單元素樣式名稱，順序格式 `['縣市清單', '鄉鎮市區清單', '郵遞區號輸入框']`

## 方法 Methods

### data
取得已選取縣市的郵遞區號資料
```javascript
var data = $(selector).twzipcode('data');
console.log(data);
```

### destory	
從指定的元素移除 Plugin
```javascript
$(selector).twzipcode('destory');
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
  <div data-role="zipcode" data-style="addr-zip"></div>
  <div data-role="county" data-style="addr-county"></div>
  <div data-role="district" data-style="addr-district"></div>
</div>
```
## 支援

請拜訪 http://app.essoduke.org/twzipcode 留言取得支援。

## 授權

jQuery-TWzipcode 採用[創用 CC 姓名標示-相同方式分享 3.0  台灣授權條款](http://creativecommons.org/licenses/by-sa/3.0/deed.zh_TW)。
