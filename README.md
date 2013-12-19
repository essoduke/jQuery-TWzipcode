jQuery-tinyMap
==============

This is a simple plugin of jQuery for helping you to create the simple or complex Google Maps on the page.

Supported layers: Marker, Polyline, Polygon, Circle, Direction and KML.


How to use?
-----------

First, Create the container in HTML like this:

```html
<div id="map"></div>
```

Second, Setting up the style of container:

```css
#map{width:(WIDTH); height:(HEIGHT)}
```

Third, Call it!

```javascript
$(function () {
    $('#map').tinyMap();
});
```

Options
-------
*unfinished yet, will be continue.*

<table class="help">
        <thead>
          <tr>
            <th scope="col" class="param">Name</th>
            <th scope="col" class="value">Type</th>
            <th scope="col" class="text">Description (default value)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">center</th>
            <td class="value">String, Object</td>
            <td class="text">
              <p>The center of Map, could be a LatLng or address string.</p>
              <pre>e.g. center: 'Newyork City' or center: {x: '22.652807', y: '121.483474'}。</pre>
            </td>
          </tr>
          <tr>
            <th scope="row">control</th>
            <td class="value">Boolean</td>
            <td class="text">Display MapType controller or not.<span> (true)</span></td>
          </tr>
          <tr>
            <th scope="row">draggable</th>
            <td class="value">Boolean</td>
            <td class="text">Enable draggable or not. (true)</td>
          </tr>
          <tr>
            <th scope="row">keyboardShortcuts</th>
            <td class="value">Boolean</td>
            <td class="text">Enable keyboard control or not.<span> (true)</span></td>
          </tr>
          <tr>
            <th scope="row">mapTypeId</th>
            <td class="value">String</td>
            <td class="text">Map type id.<span> could be `default`, `hybrid`, `roadmap`, `satellite`. (`roadmap`)</span></td>
          </tr>
          <tr>
            <th scope="row">mapTypeControl</th>
            <td class="value">Boolean</td>
            <td class="text">Enable change the Map type or not. (true)</td>
          </tr>
          <tr>
            <th scope="row">navigationControl</th>
            <td class="value">Boolean</td>
            <td class="text">Display zoom controller or not. (true)</td>
          </tr>
          <tr>
            <th scope="row">scaleControl</th>
            <td class="value">Boolean</td>
            <td class="text">Display scale controller or not. (true)</td>
          </tr>
          <tr>
            <th scope="row">scrollwheel</th>
            <td class="value">Boolean</td>
            <td class="text">Enable Mouse scroll or not. (true)</td>
          </tr>
          <tr>
            <th scope="row">zoom</th>
            <td class="value">Integer</td>
            <td class="text">Default zoom level. (13)</td>
          </tr>
          <tr>
            <th scope="row">marker</th>
            <td class="value">Array</td>
            <td class="text">
              <p>Markers group</p>
              <pre>[{
  addr: 'Address or Latlng', //e.g. 'Newyork City' or ['22.652807', '121.483474']
  text: 'Marker Text',
  icon: 'ICON URL',
  label: 'Label text', //Label layer
  css: 'Style class name'
}...]</pre>
              <p>Recommend using LatLng in array format.</p>
            </td>
          </tr>
          <tr>
            <th scope="row">markerFitBounds</th>
            <td class="value">Bool</td>
            <td class="text">Auto zoom and center the markers. (false)</span></td>
          </tr>
          <tr>
            <th scope="row">direction</th>
            <td class="value">Array</td>
            <td class="text">
              <p>Path direction</p>
              <pre>[{
  from: 'Startup address string',
  to: 'Destination address string',
  waypoint: ['midway address 1', 'midway address 2'...],
  optimize: 'Optimize the path. true|false (false)
  travel: 'Vehicle type in DRIVING|WALKING|BICYCLING'
}...]</pre>
            </td>
          </tr>
          <tr>
            <th scope="row">polyline</th>
            <td class="value">Object</td>
            <td class="text">
              <p>Draw the polyline</p>
              <pre>{
  coords: [[Lat1, Lng1], [Lat2, Lng2]...] <span>Array</span>,
  color: 'Line color in HEX' e.g. '#FF0000' (#FF0000),
  width: 'Line width' (2)</span>
}</pre>
            </td>
          </tr>
          <tr>
          <th scope="row">polygon</th>
            <td class="value">Object</td>
            <td class="text">
              <p>Draw the polygon</p>
              <pre>{
  coords: [[Lat1, Lng1], [Lat2, Lng2]...] <span>Array</span>,
  color: 'Line color in HEX' e.g. '#FF0000' (#FF0000),
  fillcolor: 'Fill color in HEX' e.g. '#FF0000' (#CC0000),
  width: 'Line width' (2),
  click: 'Click event' <Function> (null)</span>
}</pre>
            </td>
          </tr>
          <tr>
            <th scope="row">circle</th>
            <td class="value">Array</td>
            <td class="text">
              <p>繪製圓形</p>
              <pre>[{
  center: {x: Lat, y: Lng} <span>圓心座標 JSON</span>,
  radius: 圓形半徑，單位: 公尺 <span>預設 100</span>,
  width: 線條寬度 (Integer) <span>預設 2</span>,
  color: 線條顏色 e.g. '#FF0000' <span>預設 '#FF0000'</span>,
  fillcolor: 填充顏色 e.g. '#FF0000' <span>預設 '#FF0000'</span>,
  click: Click 事件 (Function) <span>預設 null</span>
}...]</pre>
            </td>
          </tr>
          <tr>
            <th scope="row">kml</th>
            <td class="value">String, JSON</td>
            <td class="text">
              <p>KML 網址字串或物件</p>
              <pre>
kml: 'KML URL' //e.g. kml: 'http://yourdomain.com/gps.kml'
OR
{
  url: 'KML URL',
  viewport: true|false, //自動縮放置中地圖以觀看軌跡，預設 true
  infowindow: true|false, //可點選軌跡以顯示該位置資訊，預設 false
}</pre>
            </td>
          </tr>
          <tr>
            <th scope="row">notfound</th>
            <td class="value">String</td>
            <td class="text">查詢不到地點時顯示的訊息。<span>預設 <strong>找不到查詢的地點</strong></span></td>
          </tr>
          <tr>
            <th scope="row">loading</th>
            <td class="value">String</td>
            <td class="text">地圖載入前顯示的文字訊息。<span>預設 <strong>載入中…</strong></span></td>
          </tr>
        </tbody>
      </table>
