/**
 * MIT License
 * Copyright(c) 2013 essoduke.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 『AS IS』, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * jQuery TWzipcode: 3 碼台灣郵遞區號jQuery Plugin
 * 在網頁建立多組3 碼台灣郵遞區號表單元素的jQuery Plugin ─ 讀取快速、不需使用資料庫。
 *
 * Demo: http://app.essoduke.org/twzipcode/
 * Download: https://github.com/essoduke/jQuery-TWzipcode
 *
 * @author: Essoduke Chang
 * @version: 1.6.1
 *
 * [Changelog]
 * 支援多國語系。
 * 轉換授權至 MIT License
 *
 * Last Modify: Tue, 10 December 2013 08:33:58 GMT
 */
;(function ($, window, document, undefined) {

    'use strict';

    /**
     * @see {@link http://stackoverflow.com/questions/16157459/how-to-open-select-element-using-jquery}
     */
    var openSelect = function (selector) {
    };

    /**
     * _hasOwnProperty for compatibility IE
     * @param {Object} obj Object
     * @param {string} property Property name
     * @return {bool}
     * @version 2.4.3
     */
    function _hasOwnProperty (obj, property) {
        try {
            return (!window.hasOwnProperty) ? Object.prototype.hasOwnProperty.call(obj, property.toString()) : obj.hasOwnProperty(property.toString());
        } catch (ignore) {
        }
    }
    /**
     * twzipcode Constructor
     * @param {Object} container HTML element
     * @param {(Object|string)} options User settings
     * @constructor
     */
    function twzipcode (container, options) {
        /**
         * Default settings
         * @type {Object}
         */
        var defaults = {
                language: (navigator.language || navigator.userLanguage).toLowerCase(),
                detect: false, //v1.4
                countyName: 'county',
                districtName: 'district',
                zipcodeName: 'zipcode',
                countySel: '',
                districtSel: '',
                zipcodeSel: '',
                readonly: false,
                onCountySelect: null, //v1.5
                onDistrictSelect: null, //v1.5
                onZipcodeKeyUp: null,  //v1.5
                css: []
            },
            self = this,
            langFile = '';

        /**
         * Default option of Select list
         * @type {Object}
         */
        self.selectDefaultOpt = {};
        /**
         * DOM of selector
         * @type {Object}
         */
        self.container = $(container);
        /**
         * Merge the options
         * @type {Object}
         */
        self.options = $.extend({}, defaults, options);
        /**
         * Full Language file path without extension.
         * @type {string}
         */
        langFile = self.options.language.replace(/\.js$/, '');
        
        // Get the languag JSON file.
        $.getJSON(langFile + '.js', function (data) {

            self.data = data;
            try {
                self.selectDefaultOpt.county = self.data.COUNTY;
                self.selectDefaultOpt.district = self.data.DISTRICT;
                delete self.data.COUNTY;
                delete self.data.DISTRICT;
                // initialize
                self.init();
            } catch (ignore) {
                console.log(ignore.message);
            }
        });
    }
    /**
     * tinyMap prototype
     */
    twzipcode.prototype = {

        // Version
        VERSION: '1.6.1',

        /**
         * Method: Get all post data
         * @return {Object}
         */
        data: function () {
            var self = this,
                data = self.data,
                wrap = self.wrap;
            return _hasOwnProperty(data, wrap.county.val()) ? data[wrap.county.val()] : data;
        },

        /**
         * Method: Serialize the data
         * @return {string}
         */
        serialize: function () {
            var result = [], obj = {}, s = {}, ele = {};
            obj = this.container.find('select,input');
            if (obj.length) {
                obj.each(function () {
                    ele = $(this);
                    result.push(ele.attr('name') + '=' + ele.val());
                });
            } else {
                $(this).children().each(function () {
                    s = $(this);
                    result.push(s.attr('name') + '=' + s.val());
                });
            }
            return result.join('&');
        },

        /**
         * Method: Destroy the container.
         * @this {twzipcode}
         */
        destroy: function () {
            var self = this;
            if (self.container.length) {
                $.data(self.container.get(0), 'twzipcode', null);
                return self.container
                    .data('twzipcode', null)
                    .empty()
                    .off('change keyup blur');
            }
        },

        /**
         * Method: Reset the selected items to default.
         * @this {twzipcode}
         */
        reset: function (container, obj) {
            var self = this,
                data = self.data,
                wrap = self.wrap,
                def = [
                    '<option value="">' + self.selectDefaultOpt.county + '</option>',
                    '<option value="">' + self.selectDefaultOpt.district + '</option>'
                ],
                tpl = [],
                county;
            switch (obj) {
            case 'district':
                wrap.district.empty().html(def[1]);
                break;
            default:
                wrap.county.empty().html(def[0]);
                wrap.district.empty().html(def[1]);
                for (county in data) {
                    if (_hasOwnProperty(data, county)) {
                        tpl.push('<option value="' + county);
                        tpl.push('">' + county + '</option>');
                    }
                }
                $(tpl.join('')).appendTo(wrap.county);
                break;
            }
            wrap.zipcode.val('');
        },

        /**
         * Binding the event of the elements
         * @this {twzipcode}
         */
        bindings: function () {

            var self = this,
                data = self.data,
                opts = self.options,
                wrap = self.wrap;

            // county
            wrap.county.on('change', function () {
                var val = $(this).val(),
                    tpl = [],
                    district;
                wrap.district.empty();
                if (val) {
                    for (district in data[val]) {
                        if (_hasOwnProperty(data[val], district)) {
                            tpl.push('<option value="' + district);
                            tpl.push('">' + district + '</option>');
                        }
                    }
                    wrap.district.append(tpl.join('')).trigger('change');
                } else {
                    wrap.county.find('option:first').prop('selected', true);
                    self.reset('district');
                }
                // callback binding
                if ('function' === typeof opts.onCountySelect) {
                    opts.onCountySelect.call(this, wrap.county);
                }
            });
            // district
            wrap.district.on('change', function () {
                var val = $(this).val();
                if (wrap.county.val()) {
                    wrap.zipcode.val(data[wrap.county.val()][val]);
                }
                // callback binding
                if ('function' === typeof opts.onDistrictSelect) {
                    opts.onDistrictSelect.call(this, wrap.district);
                }
            });
            // zipcode
            wrap.zipcode.on('keyup blur', function () {
                var obj = $(this),
                    val = '', i, j;
                obj.val(obj.val().replace(/[^0-9]/g, ''));
                val = obj.val().toString();
                if (3 === val.length) {
                    for (i in data) {
                        if (_hasOwnProperty(data, i)) {
                            for (j in data[i]) {
                                if (_hasOwnProperty(data[i], j)) {
                                    if (val === data[i][j]) {
                                        wrap.county.val(i).trigger('change');
                                        wrap.district.val(j).trigger('change');
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                // callback binding
                if ('function' === typeof opts.onZipcodeKeyUp) {
                    opts.onZipcodeKeyUp.call(this, wrap.zipcode);
                }
            });
            // if pass the default value
            if (_hasOwnProperty(data, opts.countySel)) {
                this.wrap.county.val(opts.countySel).trigger('change');
                if (_hasOwnProperty(data[opts.countySel], opts.districtSel)) {
                    this.wrap.district.val(opts.districtSel).trigger('change');
                }
            }
            if (opts.zipcodeSel) {
                if (3 === (opts.zipcodeSel.toString()).length) {
                    this.wrap.zipcode.val(opts.zipcodeSel).trigger('blur');
                }
            }
        },
        /**
         * Geolocation detect
         * @declare
         * @this {twzipcode}
         */
        geolocation: function () {
        },

        /**
         * twzipcode Initialize
         * @this {twzipcode}
         */
        init: function () {

            var self = this,
                container = self.container,
                opts = self.options,
                role = {
                    county: container.find('[data-role="county"]:first'),
                    district: container.find('[data-role="district"]:first'),
                    zipcode: container.find('[data-role="zipcode"]:first')
                };

            // Elements create
            $('<select/>')
                .attr('name', opts.countyName)
                .addClass(role.county.data('style') || (undefined !== opts.css[0] ? opts.css[0] : ''))
                .appendTo(role.county.length ? role.county : container);

            $('<select/>')
                .attr('name', opts.districtName)
                .addClass(role.district.data('style') || (undefined !== opts.css[1] ? opts.css[1] : ''))
                .appendTo(role.district.length ? role.district : container);

            $('<input/>')
                .attr({'type': 'text', 'name': opts.zipcodeName})
                .prop('readonly', opts.readonly)
                .addClass(role.zipcode.data('style') || (undefined !== opts.css[2] ? opts.css[2] : ''))
                .appendTo(role.zipcode.length ? role.zipcode : container);

            this.wrap = {
                county: container.find('select[name="' + opts.countyName + '"]:first'),
                district: container.find('select[name="' + opts.districtName + '"]:first'),
                zipcode: container.find('input[type=text][name="' + opts.zipcodeName + '"]:first')
            };

            // reset the elements
            this.reset();
            // elements event bindings
            this.bindings();
            // geolocation API (declare)
            this.geolocation();
        }
    };
    /**
     * jQuery twzipcode instance
     * @param {Object} options Plugin settings
     * @public
     */
    $.fn['twzipcode'] = function (options) {
        if ('string' === typeof options) {
            switch (options) {
                case 'data': case 'destroy': case 'reset': case 'serialize':
                    var result, instance;
                    this.each(function () {
                        instance = $.data(this, 'twzipcode');
                        if (instance instanceof twzipcode && 'function' === typeof instance[options]) {
                            result = instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
                        }
                    });
                    break;
            }
            return undefined !== result ? result : this;
        } else {
            return this.each(function () {
                if (!$.data(this, 'twzipcode')) {
                    $.data(this, 'twzipcode', new twzipcode(this, options));
                }
            });
        }
    };

}(jQuery, window, document));
