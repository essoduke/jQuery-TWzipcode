/**
 * TWzipcode
 * https://code.essoduke.org/twzipcode/nojquery
 * Copyright 2019 essoduke.org, Licensed MIT.
 *
 *
 * @author  Essoduke Chang<essoduke@gmail.com>
 * @license MIT License
 */
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
        module.exports = factory();
    }
    else {
        /* jshint sub:true */
        window['TWzipcode'] = factory();
    }

}(this, function TWzipcodeFactory () {

    'use strict';

    // Zipcode JSON data
    var database = {
        '基隆市': {'仁愛區': '200', '信義區': '201', '中正區': '202', '中山區': '203', '安樂區': '204', '暖暖區': '205', '七堵區': '206'},
        '臺北市': {'中正區': '100', '大同區': '103', '中山區': '104', '松山區': '105', '大安區': '106', '萬華區': '108', '信義區': '110', '士林區': '111', '北投區': '112', '內湖區': '114', '南港區': '115', '文山區': '116'},
        '新北市': {
          '萬里區': '207', '金山區': '208', '板橋區': '220', '汐止區': '221', '深坑區': '222', '石碇區': '223',
          '瑞芳區': '224', '平溪區': '226', '雙溪區': '227', '貢寮區': '228', '新店區': '231', '坪林區': '232',
          '烏來區': '233', '永和區': '234', '中和區': '235', '土城區': '236', '三峽區': '237', '樹林區': '238',
          '鶯歌區': '239', '三重區': '241', '新莊區': '242', '泰山區': '243', '林口區': '244', '蘆洲區': '247',
          '五股區': '248', '八里區': '249', '淡水區': '251', '三芝區': '252', '石門區': '253'
        },
        '宜蘭縣': {
          '宜蘭市': '260', '頭城鎮': '261', '礁溪鄉': '262', '壯圍鄉': '263', '員山鄉': '264', '羅東鎮': '265',
          '三星鄉': '266', '大同鄉': '267', '五結鄉': '268', '冬山鄉': '269', '蘇澳鎮': '270', '南澳鄉': '272',
          '釣魚臺列嶼': '290'
        },
        '新竹市': {'東區': '300', '北區': '300', '香山區': '300'},
        '新竹縣': {
          '竹北市': '302', '湖口鄉': '303', '新豐鄉': '304', '新埔鎮': '305', '關西鎮': '306', '芎林鄉': '307',
          '寶山鄉': '308', '竹東鎮': '310', '五峰鄉': '311', '橫山鄉': '312', '尖石鄉': '313', '北埔鄉': '314',
          '峨眉鄉': '315'
        },
        '桃園市': {
          '中壢區': '320', '平鎮區': '324', '龍潭區': '325', '楊梅區': '326', '新屋區': '327', '觀音區': '328',
          '桃園區': '330', '龜山區': '333', '八德區': '334', '大溪區': '335', '復興區': '336', '大園區': '337',
          '蘆竹區': '338'
        },
        '苗栗縣': {
          '竹南鎮': '350', '頭份市': '351', '三灣鄉': '352', '南庄鄉': '353', '獅潭鄉': '354', '後龍鎮': '356',
          '通霄鎮': '357', '苑裡鎮': '358', '苗栗市': '360', '造橋鄉': '361', '頭屋鄉': '362', '公館鄉': '363',
          '大湖鄉': '364', '泰安鄉': '365', '銅鑼鄉': '366', '三義鄉': '367', '西湖鄉': '368', '卓蘭鎮': '369'
        },
        '臺中市': {
          '中區': '400', '東區': '401', '南區': '402', '西區': '403', '北區': '404', '北屯區': '406', '西屯區': '407', '南屯區': '408',
          '太平區': '411', '大里區': '412', '霧峰區': '413', '烏日區': '414', '豐原區': '420', '后里區': '421',
          '石岡區': '422', '東勢區': '423', '和平區': '424', '新社區': '426', '潭子區': '427', '大雅區': '428',
          '神岡區': '429', '大肚區': '432', '沙鹿區': '433', '龍井區': '434', '梧棲區': '435', '清水區': '436',
          '大甲區': '437', '外埔區': '438', '大安區': '439'
        },
        '彰化縣': {
          '彰化市': '500', '芬園鄉': '502', '花壇鄉': '503', '秀水鄉': '504', '鹿港鎮': '505', '福興鄉': '506',
          '線西鄉': '507', '和美鎮': '508', '伸港鄉': '509', '員林市': '510', '社頭鄉': '511', '永靖鄉': '512',
          '埔心鄉': '513', '溪湖鎮': '514', '大村鄉': '515', '埔鹽鄉': '516', '田中鎮': '520', '北斗鎮': '521',
          '田尾鄉': '522', '埤頭鄉': '523', '溪州鄉': '524', '竹塘鄉': '525', '二林鎮': '526', '大城鄉': '527',
          '芳苑鄉': '528', '二水鄉': '530'
        },
        '南投縣': {
          '南投市': '540', '中寮鄉': '541', '草屯鎮': '542', '國姓鄉': '544', '埔里鎮': '545', '仁愛鄉': '546',
          '名間鄉': '551', '集集鎮': '552', '水里鄉': '553', '魚池鄉': '555', '信義鄉': '556', '竹山鎮': '557',
          '鹿谷鄉': '558'
        },
        '嘉義市': {'東區': '600', '西區': '600'},
        '嘉義縣': {
          '番路鄉': '602', '梅山鄉': '603', '竹崎鄉': '604', '阿里山鄉': '605', '中埔鄉': '606', '大埔鄉': '607',
          '水上鄉': '608', '鹿草鄉': '611', '太保市': '612', '朴子市': '613', '東石鄉': '614', '六腳鄉': '615',
          '新港鄉': '616', '民雄鄉': '621', '大林鎮': '622', '溪口鄉': '623', '義竹鄉': '624', '布袋鎮': '625'
        },
        '雲林縣': {
          '斗南鎮': '630', '大埤鄉': '631', '虎尾鎮': '632', '土庫鎮': '633', '褒忠鄉': '634', '東勢鄉': '635',
          '臺西鄉': '636', '崙背鄉': '637', '麥寮鄉': '638', '斗六市': '640', '林內鄉': '643', '古坑鄉': '646',
          '莿桐鄉': '647', '西螺鎮': '648', '二崙鄉': '649', '北港鎮': '651', '水林鄉': '652', '口湖鄉': '653',
          '四湖鄉': '654', '元長鄉': '655'
        },
        '臺南市': {
          '中西區': '700', '東區': '701', '南區': '702', '北區': '704', '安平區': '708', '安南區': '709',
          '永康區': '710', '歸仁區': '711', '新化區': '712', '左鎮區': '713', '玉井區': '714', '楠西區': '715',
          '南化區': '716', '仁德區': '717', '關廟區': '718', '龍崎區': '719', '官田區': '720', '麻豆區': '721',
          '佳里區': '722', '西港區': '723', '七股區': '724', '將軍區': '725', '學甲區': '726', '北門區': '727',
          '新營區': '730', '後壁區': '731', '白河區': '732', '東山區': '733', '六甲區': '734', '下營區': '735',
          '柳營區': '736', '鹽水區': '737', '善化區': '741', '大內區': '742', '山上區': '743', '新市區': '744',
          '安定區': '745'
        },
        '高雄市': {
          '新興區': '800', '前金區': '801', '苓雅區': '802', '鹽埕區': '803', '鼓山區': '804', '旗津區': '805',
          '前鎮區': '806', '三民區': '807', '楠梓區': '811', '小港區': '812', '左營區': '813',
          '仁武區': '814', '大社區': '815', '東沙群島': '817', '南沙群島': '819', '岡山區': '820', '路竹區': '821',
          '阿蓮區': '822', '田寮區': '823',
          '燕巢區': '824', '橋頭區': '825', '梓官區': '826', '彌陀區': '827', '永安區': '828', '湖內區': '829',
          '鳳山區': '830', '大寮區': '831', '林園區': '832', '鳥松區': '833', '大樹區': '840', '旗山區': '842',
          '美濃區': '843', '六龜區': '844', '內門區': '845', '杉林區': '846', '甲仙區': '847', '桃源區': '848',
          '那瑪夏區': '849', '茂林區': '851', '茄萣區': '852'
        },
        '屏東縣': {
          '屏東市': '900', '三地門鄉': '901', '霧臺鄉': '902', '瑪家鄉': '903', '九如鄉': '904', '里港鄉': '905',
          '高樹鄉': '906', '鹽埔鄉': '907', '長治鄉': '908', '麟洛鄉': '909', '竹田鄉': '911', '內埔鄉': '912',
          '萬丹鄉': '913', '潮州鎮': '920', '泰武鄉': '921', '來義鄉': '922', '萬巒鄉': '923', '崁頂鄉': '924',
          '新埤鄉': '925', '南州鄉': '926', '林邊鄉': '927', '東港鎮': '928', '琉球鄉': '929', '佳冬鄉': '931',
          '新園鄉': '932', '枋寮鄉': '940', '枋山鄉': '941', '春日鄉': '942', '獅子鄉': '943', '車城鄉': '944',
          '牡丹鄉': '945', '恆春鎮': '946', '滿州鄉': '947'
        },
        '臺東縣': {
          '臺東市': '950', '綠島鄉': '951', '蘭嶼鄉': '952', '延平鄉': '953', '卑南鄉': '954', '鹿野鄉': '955',
          '關山鎮': '956', '海端鄉': '957', '池上鄉': '958', '東河鄉': '959', '成功鎮': '961', '長濱鄉': '962',
          '太麻里鄉': '963', '金峰鄉': '964', '大武鄉': '965', '達仁鄉': '966'
        },
        '花蓮縣': {
          '花蓮市': '970', '新城鄉': '971', '秀林鄉': '972', '吉安鄉': '973', '壽豐鄉': '974', '鳳林鎮': '975',
          '光復鄉': '976', '豐濱鄉': '977', '瑞穗鄉': '978', '萬榮鄉': '979', '玉里鎮': '981', '卓溪鄉': '982',
          '富里鄉': '983'
        },
        '金門縣': {'金沙鎮': '890', '金湖鎮': '891', '金寧鄉': '892', '金城鎮': '893', '烈嶼鄉': '894', '烏坵鄉': '896'},
        '連江縣': {'南竿鄉': '209', '北竿鄉': '210', '莒光鄉': '211', '東引鄉': '212'},
        '澎湖縣': {'馬公市': '880', '西嶼鄉': '881', '望安鄉': '882', '七美鄉': '883', '白沙鄉': '884', '湖西鄉': '885'}
    };

    /**
     * Get or Set data-attribute
     */
    var data = (function () {

        var db = {};

        return {
            /**
             * Get attribute
             *
             * @param {Object} elem Element object
             * @param {string} key  Key name
             */
            'get': function (elem, key) {

                if (!elem) {
                    return false;
                }

                [].forEach.call(elem.attributes, function (attr) {
                    if (/^data-/.test(attr.name)) {
                        var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
                            return $1.toUpperCase();
                        });
                        db[camelCaseName] = attr.value;
                    }
                });
                if ('string' === typeof key && (key in db)) {
                    return JSON.parse(['"', htmldecode(db[key]), '"'].join(''));
                } else if ('undefined' === typeof key) {
                    return db;
                }
            },
            /**
             * Set data-attribute
             *
             * @param {Object} elem Element object
             * @param {string} key  Key name
             * @param {string} val  Key value
             */
            'set': function (elem, key, val) {

                if (!elem) {
                    return false;
                }

                if ('string' === typeof key) {
                    db[key] = val;
                }

                Object.keys(db).forEach(function (k) {
                    var attrName = 'data-' + k.replace(/[A-Z]/g, function ($0) {
                            return '-' + $0.toLowerCase();
                        }),
                        attrValue = htmlencode(JSON.stringify(db[k]).slice(1, -1));
                    elem.setAttribute(attrName, attrValue);
                });
            }
        };
    }());

    function htmlencode (s) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    }
    function htmldecode (s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    }

    /**
     * 轉換異體字 [台]為 [臺]
     *
     * @param  {string} value
     * @return {string}
     */
    function transfer (value) {
        return 'string' === typeof value ? value.replace(/[台]+/gi, '臺') : value;
    }

    // unbind event
    function on (el, event, fn) {
        el.addEventListener(event, fn, false);
    }

    // bind event
    function off (el, event, fn) {
        el.removeEventListener(event, fn, false);
    }

    // getJSON
    function getJSON (url, params, success, error) {

        var request = new XMLHttpRequest();

        function serialize (obj) {
            var str = [], p;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push([encodeURIComponent(p), encodeURIComponent(obj[p])].join('='));
                }
            }
            return str.join('&');
        }

        request.open('GET', [url, serialize(params)].join('?') , true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                if ('function' === typeof success) {
                    success.call(this, data);
                }
            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = 'function' === typeof error ? error : function () {};
        request.send();
    }

    /**
     *
     */
    function deepExtend () {

        // Variables
        var extended = {},
            deep = false,
            i = 0,
            length = arguments.length;

        // Check if a deep merge
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
            deep = arguments[0];
            i += 1;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for ( var prop in obj ) {
                if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                    // If deep merge and property is an object, merge properties
                    extended[prop] = deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ?
                                     deepExtend( true, extended[prop], obj[prop] ) :
                                     obj[prop];
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++ ) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    /**
     *
     */
    function trigger (el, eventName) {

        var event;

        // Namespace
        if (-1 !== eventName.indexOf('.')) {
            if (window.CustomEvent) {
                event = new CustomEvent(eventName);
            } else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, true);
            }
        } else {
            if (document.createEvent) {
                event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, true);
            } else {
                event = document.createEventObject();
                event.eventType = eventName;
            }
        }

        event.eventName = eventName;

        if (document.createEvent) {
            el.dispatchEvent(event);
        } else {
            el.fireEvent('on' + event.eventType, event);
        }
    }

    /**
     *
     */
    function isElement (obj) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return obj instanceof HTMLElement;
        } catch (ignore) {
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have. (works on IE7)
            return (typeof obj === 'object') &&
                   (obj.nodeType===1) && (typeof obj.style === 'object') &&
                   (typeof obj.ownerDocument === 'object');
        }
    }

    /**
     *
     */
    function TWzipcode (container, options) {

        /**
         * Default options of Plugin
         * @type {Object}
         */
        var twzipcodeOpts = {
                'county': {
                    'label'    : '縣市',
                    'name'     : 'county',    //表單名稱
                    'value'    : '',          //預設值
                    'css'      : '',          //樣式名稱
                    'hidden'   : false,       //要隱藏的縣市
                    'required' : true,
                    'onSelect' : null
                },
                'district': {
                    'label'    : '鄉鎮市區',
                    'name'     : 'district',  //表單名稱
                    'value'    : '',          //預設值
                    'css'      : '',          //樣式名稱
                    'hidden'   : false,       //要隱藏的鄉鎮市區
                    'required' : true,
                    'onSelect' : null
                },
                'zipcode': {
                    'name'       : 'zipcode', //表單名稱
                    'value'      : '',        //預設值
                    'css'        : '',        //樣式名稱
                    'hidden'     : false,     //要隱藏的鄉鎮市區
                    'type'       : 'text',
                    'min'        : 0,
                    'max'        : 0,
                    'step'       : 1,
                    'placeholder': '',
                    'maxlength'  : 3,
                    'pattern'    : '\\d+',
                    'readonly'   : false,
                    'required'   : true,
                    'onKeyUp'    : null,
                    'onFocus'    : null,
                    'onBlur'     : null
                },
                'GMAP_KEY'  : '', //
                'detect'    : false,
                'combine'   : false,
                'island'    : true,
                'database'  : {}
            };

        /**
         * 離島縣市、鄉鎮市區
         * @type {Array}
         */
        this.islands = [
            '釣魚臺列嶼', '東沙群島', '南沙群島', '綠島鄉', '蘭嶼鄉',
            '金門縣', '連江縣', '澎湖縣'
        ];

        /**
         * Plugin Namespace
         * @type {string}
         */
        this.namespace = 'twzipcode';

        /**
         * DOM of selector
         * @type {Object}
         */
        //this.container = $(container);
        this.container = 'string' === typeof container ?
                         document.querySelectorAll(container) :
                         isElement(container) ? container : false;


        if (false === this.container) {
            throw 'Initialize failed';
            return false;
        }

        /**
         * Merge the options
         * @type {Object}
         */
        //this.options = $.extend(true, {}, twzipcodeOpts, options);
        this.options = deepExtend(true, twzipcodeOpts, options);

        // 外部 data JSON
        if (this.options.database && Object.keys(this.options.database).length !== 0) {
            database = this.options.database;
            delete this.options.database;
        }

        /**
         * Zipcode data JSON
         * @type {Object}
         */
        this.database = database;

        // Initialize
        this.init();
    }

    // 取得指定的選項
    TWzipcode.prototype.getOpt = function () {

        var opt  = this.options,
            args = Array.prototype.slice.call(arguments, 0),
            i    = 0,
            v,
            obj;

        args.forEach(function (arg, i) {
            if (obj && obj.hasOwnProperty(arg)) {
                v = obj[arg];
            } else if (opt.hasOwnProperty(arg))  {
                obj = opt[arg];
                v = obj;
            } else {
                v = obj;
                return;
            }
        });
        return v;
    };

    // 建立 select dropdown list
    TWzipcode.prototype.createDropdownList = function (el, id, role, opt) {

        var self     = this,
            opts     = deepExtend(true, opt, data.get(el)),
            dom      = document.createElement('select'),
            label    = opts.hasOwnProperty('label') ? opts.label : opt.label,
            defItem  = ['<option value="">' + label + '</option>'],
            html     = [],
            hide     = [],
            event    = 'change',
            nv       = transfer(opts.value),
            selected,
            o,
            c;

        if (false === self.getOpt('island')) {
            hide = hide.concat(self.islands);
        }

        if (opts.hidden) {
            if (Array.isArray(opts.hidden)) {
                hide.concat(opts.hidden);
            } else if ('string' === typeof opts.hidden) {
                hide.concat(opts.hidden.toString().split(','));
            }
            hide = hide.map(function (item) {
                return transfer(item.trim());
            });
        }

        html.push(defItem.join(''));

        // if (opts.hasOwnProperty('value') && opts.value) {
        //     nv = opts.value;
        // }

        if ('county' === role) {
            for (c in self.database) {
                if ('undefined' !== typeof self.database[c]) {
                    if (-1 === hide.indexOf(c)) {
                        selected = nv === c ? ' selected="selected"' : '';
                        html.push(['<option value="', c, '" ', selected, '>', c, '</option>'].join(''));
                    }
                }
            }
        }

        dom.setAttribute('name', opts.name);
        dom.setAttribute('id', [role, '-', id].join(''));
        dom.className += [opts.css].join('');
        dom.innerHTML = html.join('');

        data.set(dom, 'default', defItem.join(''));

        dom.removeAttribute('data-role');

        if (opts.required) {
            dom.setAttribute('required', true);
        }

        // County onchange
        function onCountyChange (evt) {

            var district = self.getEl(id, 'district'),
                zipcode  = self.getEl(id, 'zipcode'),
                //value    = transfer(this.value),
                value    = transfer(this.options[this.selectedIndex].value),
                sv       = data.get(district, 'value'),
                hide     = [],
                sub      = [],
                combine  = '',
                selected,
                cn;

            district.innerHTML = data.get(district, 'default');

            if (zipcode && opts.hasOwnProperty('onSelect') && 'function' === typeof opts.onSelect) {
                opts.onSelect.call(this, evt);
            }

            if (false === self.getOpt('island')) {
                hide = hide.concat(self.islands);
            }

            if (opts.hasOwnProperty('hidden')) {
                if ('string' === typeof opts.hidden) {
                    hide.concat(opts.hidden.split(','));
                } else if (Array.isArray(opts.hidden)) {
                    hide.concat(opts.hidden);
                }

                hide = hide.map(function (item) {
                    return transfer(item.trim());
                });
            }

            if (district.length) {
                if (self.database.hasOwnProperty(value)) {
                    for (cn in self.database[value]) {
                        if (Array.isArray(hide) && (!hide.length) || (hide.length && -1 === hide.indexOf(cn))) {
                            selected = cn === nv || cn === sv ? ' selected="selected"' : '';
                            combine  = self.getOpt('combine') ? (self.database[value][cn] + ' ') : '';
                            sub.push([
                                '<option value="', cn, '"', selected, '>', (combine + cn), '</option>'
                            ].join(''));
                        }
                    }
                    district.innerHTML = sub.join('');
                    trigger(district, event);
                } else {
                    if ('value' in zipcode) {
                        zipcode.value = '';
                    }
                }
            }
        }

        // District onchange
        function onDistrictChange (evt) {

            var elCounty   = self.getEl(id, 'county'),
                elDistrict = self.getEl(id, 'district'),
                elZipcode  = self.getEl(id, 'zipcode');

            if (elCounty && elDistrict && elZipcode) {
                if (self.database.hasOwnProperty(elCounty.value) &&
                    self.database[elCounty.value].hasOwnProperty(elDistrict.value)
                ) {
                    elZipcode.value = self.database[elCounty.value][elDistrict.value];
                    if (opts.hasOwnProperty('onSelect') && 'function' === typeof opts.onSelect) {
                        opts.onSelect.call(this, evt, this.value);
                    }
                }
            }
        }

        switch (role) {
            case 'county':
                on(dom, event, onCountyChange);
                el.appendChild(dom);
                break;
            case 'district':
                on(dom, event, onDistrictChange);
                el.appendChild(dom);
                break;
        }

        if ('string' === typeof nv && nv) {


            setTimeout(function () {
                o = dom.querySelector('[value="' + nv + '"]');
                if (o) {
                    o.setAttribute('selected', true);
                    trigger(dom, event);
                }
            }, 0);
        }

        return dom;
    };

    // 建立 input element
    TWzipcode.prototype.createInput = function (el, id, role, opt) {

        var self       = this,
            opts       = deepExtend(true, opt, data.get(el)),
            dom        = document.createElement('input'),
            c;

        dom.setAttribute('type', opts.type);
        dom.setAttribute('name', opts.name);
        dom.setAttribute('id', [role, '-', id].join(''));
        dom.setAttribute('placeholder', opts.placeholder);
        dom.setAttribute('pattern', opts.pattern);
        dom.className += [opts.css].join(' ');
        dom.value = opts.value;

        switch (opts.type) {
            case 'number':
                dom.setAttribute('min', parseInt(opts.min, 10));
                dom.setAttribute('max', parseInt(opts.max, 10));
                dom.setAttribute('step', parseInt(opts.step, 10));
                break;
            default:
                dom.setAttribute('maxLength', parseInt(opts.maxlength, 10));
        }

        dom.removeAttribute('data-role');

        if (opts.required) {
            //dom.attr('required', true);
            dom.setAttribute('required', true);
        }

        if (opts.readonly) {
            //dom.attr('readonly', true);
            dom.setAttribute('readonly', true);
        }

        // 佚代尋找郵遞區號
        function findCode (zipcode) {
            var n, o, p;
            for (n in self.database) {
                if (self.database[n]) {
                    for (o in self.database[n]) {
                        if (zipcode === self.database[n][o]) {
                            return {
                                'county'   : n,
                                'district' : o
                            };
                        }
                    }
                }
            }
        }

        // Events binding
        on(dom, 'keyup', function (evt) {

            var elCounty   = self.getEl(id, 'county'),
                elDistrict = self.getEl(id, 'district'),
                county     = elCounty ? elCounty.value : {},
                district   = elDistrict ? elDistrict.value : {},
                code       = findCode(this.value),
                c,
                d;

            if (code && code.hasOwnProperty('county') && code.hasOwnProperty('district')) {
                elCounty.value = code.county
                trigger(elCounty, 'change');
                elDistrict.value = code.district;
                trigger(elDistrict, 'change');
                c = code.county;
                d = code.district;
            }

            if ('function' === typeof opts.onKeyup) {
                opts.onKeyup.call(this, evt, c, d);
            }
        });

        if ('function' === typeof opts.onBlur) {
            on(dom, 'blur', opts.onBlur);
        }

        if ('function' === typeof opts.onFocus) {
            on(dom, 'focus', opts.onFocus);
        }

        if (opts.value) {
            trigger(dom, 'keyup');
        }
        return el.appendChild(dom);
    };

    /**
     * 偵測郵遞區號
     * Powered by Google Maps API
     */
    TWzipcode.prototype.geolocation = function () {

        var self        = this,
            container   = self.container,
            geolocation = navigator.geolocation,
            options     = {
                'maximumAge'         : 600000,
                'timeout'            : 3000,
                'enableHighAccuracy' : false
            },
            opts     = self.options,
            callback = opts.detect;

        if (!geolocation || !callback) {
            return;
        }

        // onSuccess
        function success (loc) {

            var latLng  = [],
                params  = {
                    'key'    : self.getOpt('GMAP_KEY'),
                    'sensor' : false,
                };

            if (('coords' in loc) && ('latitude' in loc.coords) && ('longitude' in loc.coords)) {

                params.latlng = [loc.coords.latitude, loc.coords.longitude].join(',');

                getJSON('https://maps.googleapis.com/maps/api/geocode/json', params, function (resp) {

                    var postal  = '';

                    if (resp &&
                        'undefined' !== typeof resp.results &&
                        'undefined' !== typeof resp.results[0].address_components &&
                        'undefined' !== typeof resp.results[0].address_components[0]
                    ) {
                        postal = resp.results[0]
                                     .address_components[resp.results[0].address_components.length - 1]
                                     .long_name;

                        if (postal) {
                            Array.prototype.forEach.call(container, function (el) {
                                var zipcode = el.querySelector('input');
                                if (zipcode) {
                                    zipcode.value = postal.toString();
                                    trigger(zipcode, 'keyup');
                                }
                            });
                        }
                    }
                    if ('function' === typeof callback) {
                        callback.call(self, loc);
                    }
                });
            }
        }

        // onError
        function error (error) {
            console.error(error);
        }
        // Binding
        geolocation.watchPosition(success, error, options);
    };

    /**
     * Get element by id
     *
     * @param  {string} id   Element Id
     * @param  {string} type Element type
     * @return {Object}
     */
    TWzipcode.prototype.getEl = function (id, type) {
        return document.querySelector(['#', type, '-', id].join(''));
    };

    /**
     * 建立所需的 DOM
     */
    TWzipcode.prototype.createElements = function () {

        var self         = this,
            container    = self.container,
            opts         = self.options,
            optCounty    = self.getOpt('county'),
            optDistrict  = self.getOpt('district'),
            optZipcode   = self.getOpt('zipcode'),
            dom;

        Array.prototype.forEach.call(container, function (el) {

            var id = Math.random().toString(36).substr(2, 10);

            Array.prototype.forEach.call(el.querySelectorAll('[data-role]'), function (child) {

                var role  = child.getAttribute('data-role').toLowerCase();

                switch (role) {
                    case 'county':
                        dom = self.createDropdownList(child, id, role, optCounty);
                        break;
                    case 'district':
                        dom = self.createDropdownList(child, id, role, optDistrict);
                        break;
                    case 'zipcode':
                        dom = self.createInput(child, id, role, optZipcode);
                        // 如果 combine = true 則隱藏 input
                        if (opts.combine) {
                            dom.removeAttribute('required');
                            dom.style.display = 'none';
                        }
                        break;
                }
            });

            // Elements created callback @v2.0.5
            if (opts.hasOwnProperty('created') && 'function' === typeof opts.created) {
                opts.created.call(self);
            }
        });
    };

    /**
     * 設值
     */
    TWzipcode.prototype.set = function (input) {

        var self   = this,
            result = [];

        Array.prototype.forEach.call(self.container, function (el) {

            var county   = el.querySelector('[id^="county-"]'),
                district = el.querySelector('[id^="district-"]'),
                zipcode  = el.querySelector('[id^="zipcode-"]');

            if (input.substring || input.toFixed) {
                zipcode.value = input;
                trigger(zipcode, 'keyup');
            } else {

                if ('object' === typeof input) {
                    if (input.hasOwnProperty('county')) {
                        county.value = transfer(input.county);
                        trigger(county, 'change');
                    }
                    if (input.hasOwnProperty('district')) {
                        setTimeout(function () {
                            district.value = transfer(input.district);
                            trigger(district, 'change');
                        }, 5);
                    }
                    if (input.hasOwnProperty('zipcode')) {
                        setTimeout(function () {
                            zipcode.value = parseInt(input.zipcode);
                            trigger(zipcode, 'keyup');
                        }, 10);
                    }
                }
            }
        });
        return result;
    };

    /**
     * 取值
     */
    TWzipcode.prototype.get = function (callback) {

        var self   = this,
            pp     = [],
            result = [];

        Array.prototype.forEach.call(self.container, function (el) {
            var county   = el.querySelector('[id^="county-"]'),
                district = el.querySelector('[id^="district-"]'),
                zipcode  = el.querySelector('[id^="zipcode-"]');
            result.push({
                'id'      : county.getAttribute('id').replace(/county\-/g, ''),
                'county'  : county.value,
                'district': district.value,
                'zipcode' : zipcode.value,
            });
        });
        if ('function' === typeof callback) {
            callback.call(self, result);
        } else if ('string' === typeof callback) {
            switch (callback.toLowerCase()) {
                case 'county':
                case 'district':
                case 'zipcode':
                    result.forEach(function (item) {
                        pp.push(item[callback]);
                    });
                    return pp;
            }
        }
        return result;
    };

    /**
     * 輸出序列化字串
     */
    TWzipcode.prototype.serialize = function () {
        var result     = [];
        Array.prototype.forEach.call(this.container, function (el) {
            var county   = el.querySelector('[id^="county-"]'),
                district = el.querySelector('[id^="district-"]'),
                zipcode  = el.querySelector('[id^="zipcode-"]');
            result.push(elCounty.getAttribute('name')   + '=' + elCounty.value);
            result.push(elDistrict.getAttribute('name') + '=' + elDistrict.value);
            result.push(elZipcode.getAttribute('name')  + '=' + elZipcode.value);
        });
        return resulresult;
    };

    /**
     * 移除 Plugin
     */
    TWzipcode.prototype.destroy = function () {
        try {
            Array.prototype.forEach.call(this.container, function (el) {
                var county   = el.querySelector('[id^="county-"]'),
                    district = el.querySelector('[id^="district-"]'),
                    zipcode  = el.querySelector('[id^="zipcode-"]');
                county.parentNode.removeChild(county);
                district.parentNode.removeChild(district);
                zipcode.parentNode.removeChild(zipcode);
                el.removeAttribute('id');
                el.removeAttribute('data-twzipcode');

            });
        } catch (ignore) {
            console.warn(ignore);
        }
    };

    /**
     * 初始化
     */
    TWzipcode.prototype.init = function () {
        this.createElements();
        this.geolocation();
    };

    // Create instance
    TWzipcode.create = function (el, options) {
         return new TWzipcode(el, options);
    };

    /**
     * Version
     * @constructor
     */
    TWzipcode.VERSION = '2.0.5';
    return TWzipcode;

}));
//#EOF
