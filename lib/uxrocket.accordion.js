/**
 * UX Rocket
 * jQuery based accordion
 * @author Bilal Cinarli
 */

(function(factory) {
    'use strict';
    if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if(typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(jQuery);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    var ux,
        rocketName = 'uxrCollapsible',

        defaults = {
            header       : '.collapsible-header',
            content      : '.collapsible-content',
            current      : 'current',
            closeSiblings: false,
            animateWith  : 'css', // css or js
            duration     : 200,

            onReady: false,
            onOpen : false,
            onClose: false
        },
        events = {
            click: 'click.' + rocketName
        },
        ns = {
            prefix : 'uxr-',
            rocket : 'uxRocket',
            data   : rocketName,
            name   : 'collapsible',
            classes: {
                ready  : 'ready',
                opened : 'opened',
                closed : 'closed',
                animate: 'animate'
            }
        };

    // Constructor
    var Collapsible = function(el, options, selector) {
        this._name = rocketName;
        this._defaults = defaults;

        this.el = el;
        this.$el = $(el);
        this.options = $.extend(true, {}, defaults, options, this.$el.data());
        this.selector = selector;

        this.init();
    };

    Collapsible.prototype.init = function() {
        var uxrocket = this.$el.data(ns.rocket) || {};

        // add ready class
        this.$el.addClass(utils.getClassname('ready'));

        // register plugin data to rocket
        uxrocket[ns.data] = {hasWrapper: false, ready: utils.getClassname('ready'), selector: this.selector, options: this.options};
        this.$el.data(ns.rocket, uxrocket);

        utils.callback(this.options.onReady);

        this.bindUIActions();
    };

    Collapsible.prototype.bindUIActions = function() {

    };

    Collapsible.prototype.unbindUIActions = function() {
        this.$el.off('.' + rocketName);
    };

    Collapsible.prototype.animate = function() {

    };

    Collapsible.prototype.toggle = function() {

    };

    Collapsible.prototype.closeSiblings = function() {

    };

    var utils = {
        callback: function(fn) {
            // if callback string is function call it directly
            if(typeof fn === 'function') {
                fn.apply(this);
            }

            // if callback defined via data-attribute, call it via new Function
            else {
                if(fn !== false) {
                    var _fn = /([a-zA-Z._$0-9]+)(\(?(.*)?\))?/.exec(fn),
                        _fn_ns = _fn[1].split('.'),
                        _args = _fn[3] ? _fn[3] : '',
                        func = _fn_ns.pop(),
                        context = _fn_ns[0] ? window[_fn_ns[0]] : window;

                    for(var i = 1; i < _fn_ns.length; i++) {
                        context = context[_fn_ns[i]];
                    }

                    return context[func](_args);
                }
            }
        },

        getStringVariable: function(str) {
            var val;
            // check if it is chained
            if(str.indexOf('.') > -1) {
                var chain = str.split('.'),
                    chainVal = window[chain[0]];

                for(var i = 1; i < chain.length; i++) {
                    chainVal = chainVal[chain[i]];
                }

                val = chainVal;
            }

            else {
                val = window[str];
            }

            return val;
        },

        getClassname: function(which) {
            return ns.prefix + ns.name + '-' + ns.classes[which];
        }
    };

    ux = $.fn.uxrcollapsible = $.uxrcollapsible = function(options) {
        var selector = this.selector;

        return this.each(function() {
            if($.data(this, ns.data)) {
                return;
            }

            // Bind the plugin and attach the instance to data
            $.data(this, ns.data, new Collapsible(this, options, selector));
        });
    };

    // Version
    ux.version = '1.0.0';

    // settings
    ux.settings = defaults;
}));