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
            current      : '',
            closeSiblings: false,
            animateWith  : 'css', // css or js
            duration     : 200,

            onReady: false,
            onOpen : false,
            onClose: false
        },
        events = {
            click    : 'click.' + rocketName,
            collapsed: 'uxrcollapsed.' + rocketName,
            expanded : 'uxrexpanded.' + rocketName
        },
        ns = {
            prefix : 'uxr-',
            rocket : 'uxRocket',
            data   : rocketName,
            name   : 'collapsible',
            classes: {
                node   : 'node',
                header : 'header',
                content: 'content',
                ready  : 'ready',
                current: 'current',
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
        this.siblings = this.$el.siblings(this.selector);

        this.init();
    };

    Collapsible.prototype.init = function() {
        var uxrocket = this.$el.data(ns.rocket) || {};

        this.getChildren();

        // add ready class
        this.handleClasses();
        this.handleChildClasses();

        // register plugin data to rocket
        uxrocket[ns.data] = {hasWrapper: false, ready: utils.getClassname('ready'), selector: this.selector, options: this.options};
        this.$el.data(ns.rocket, uxrocket);

        utils.callback(this.options.onReady);

        this.bindUIActions();
    };

    Collapsible.prototype.handleClasses = function() {
        this.$el.addClass(utils.getClassname('node') + ' ' + utils.getClassname('ready') + ' ' + utils.getClassname('animate') + this.options.animateWith.toUpperCase());
    };

    Collapsible.prototype.handleChildClasses = function() {
        this.$header.addClass(utils.getClassname('header'));
        this.$content.addClass(utils.getClassname('content'));
    };

    Collapsible.prototype.getChildren = function() {
        this.$header = this.$el.find('> ' + this.options.header);
        this.$content = this.$el.find('> ' + this.options.content);
    };

    Collapsible.prototype.bindUIActions = function() {
        var _this = this;

        this.$header.on(events.click, function() {
            _this.toggle();
        });

        this.$el
            .on(events.collapsed, function() {
                utils.callback(_this.options.onClose);
            })
            .on(events.expanded, function() {
                utils.callback(_this.options.onOpen);
            });
    };

    Collapsible.prototype.unbindUIActions = function() {
        this.$el.off('.' + rocketName);
        this.$header.off('.' + rocketName);
    };

    Collapsible.prototype.toggle = function() {
        if(this.options.animateWith === 'js') {
            this.animate();
        }

        if(this.options.closeSiblings) {
            this.closeSiblings();
        }

        this.emitEvent();

        this.$el.toggleClass(utils.getClassname('current') + ' ' + this.options.current);
    };

    Collapsible.prototype.animate = function() {
        this.$content.slideToggle(this.options.duration);
    };

    Collapsible.prototype.closeSiblings = function() {
        var _this = this;

        this.siblings.each(function() {
            var $this = $(this),
                collapsible = $this.data(rocketName);

            if(!$this.hasClass(utils.getClassname('current'))) {
                return;
            }

            if($this.hasClass(utils.getClassname('animate') + 'JS')) {
                collapsible.$content.slideUp();
            }

            collapsible.emitEvent();
            $this.removeClass(utils.getClassname('current') + ' ' + _this.options.current);
        });
    };

    Collapsible.prototype.emitEvent = function() {
        if(this.$el.hasClass(utils.getClassname('current'))) {
            this.$el.trigger('uxrcollapsed');
        }
        else {
            this.$el.trigger('uxrexpanded');
        }
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
                    var func = new Function('return ' + fn);
                    func();
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

    ux = $.fn.collapsible = $.fn.uxrcollapsible = $.uxrcollapsible = function(options) {
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
    ux.version = '1.1.0';

    // settings
    ux.settings = defaults;
}));