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
        i          = 1,

        defaults   = {
            header:        '.collapsible-header',
            content:       '.collapsible-content',
            current:       '',
            closeSiblings: false,
            animateWith:   'css', // css or js
            duration:      200,

            onReady: false,
            onOpen:  false,
            onClose: false
        },
        events     = {
            click:     'click.' + rocketName,
            ready:     'uxrready.' + rocketName,
            collapsed: 'uxrcollapsed.' + rocketName,
            expanded:  'uxrexpanded.' + rocketName
        },
        ns         = {
            prefix:  'uxr-',
            rocket:  'uxRocket',
            data:    rocketName,
            name:    'collapsible',
            classes: {
                node:    'node',
                header:  'header',
                content: 'content',
                ready:   'ready',
                current: 'current',
                animate: 'animate'
            }
        },

        utils      = new uxrPluginUtils({ns: ns});

    // Constructor
    var Collapsible = function(el, options, selector) {
        this._instance = i;
        this._name     = rocketName;
        this._defaults = defaults;

        this.el       = el;
        this.$el      = $(el);
        this.options  = $.extend(true, {}, defaults, options, this.$el.data());
        this.selector = selector;
        this.siblings = this.$el.siblings(this.selector);
        this.isActive = this.options.active || false;

        i++;

        this.init();
    };

    Collapsible.prototype.init = function() {
        if(this.el.id === '') {
            this.el.id = ns.data + '-' + this._instance;
        }

        this.registry();

        this.getChildren();

        // add ready class
        this.decorateUI();

        this.bindUI();

        this.emitEvent('ready');
    };

    Collapsible.prototype.handleClasses = function() {
        this.$el.addClass(utils.getClassname('node') + ' ' + utils.getClassname('ready') + ' ' + utils.getClassname('animate') + this.options.animateWith.toUpperCase());

        if(this.isActive || this.$el.hasClass(this.options.current)) {
            this.$el.addClass(utils.getClassname('current') + ' ' + this.options.current);
            this.isActive = true;
        }
    };

    Collapsible.prototype.handleChildClasses = function() {
        this.$header.addClass(utils.getClassname('header'));
        this.$content.addClass(utils.getClassname('content'));
    };

    Collapsible.prototype.getChildren = function() {
        this.$header  = this.$el.find('> ' + this.options.header);
        this.$content = this.$el.find('> ' + this.options.content);
    };

    Collapsible.prototype.decorateUI = function() {
        this.handleClasses();
        this.handleChildClasses();
    };

    Collapsible.prototype.bindUI = function() {
        var _this = this;

        this.$header.on(events.click, function() {
            _this.toggle();
        });

        this.$el
            .on(events.ready, function() {
                utils.callback(_this.options.onReady);
            })
            .on(events.collapsed, function() {
                _this.closeNested();
                utils.callback(_this.options.onClose);
            })
            .on(events.expanded, function() {
                utils.callback(_this.options.onOpen);
            });
    };

    Collapsible.prototype.unbindUI = function() {
        this.$el.off('.' + rocketName);
        this.$header.off('.' + rocketName);
    };

    Collapsible.prototype.toggle = function() {
        if(this.isActive) {
            this.close();
        }
        else {
            this.open();
        }
    };

    Collapsible.prototype.closeSiblings = function() {
        var _this = this;

        this.siblings.each(function() {
            var $this       = $(this),
                collapsible = $this.data(rocketName);

            if(!$this.hasClass(utils.getClassname('current'))) {
                return;
            }

            if($this.hasClass(utils.getClassname('animate') + 'JS')) {
                collapsible.$content.slideUp();
            }

            collapsible.isActive = false;
            collapsible.emitEvent('collapsed');
            $this.removeClass(utils.getClassname('current') + ' ' + _this.options.current);
        });
    };

    Collapsible.prototype.closeNested = function() {
        this.$el.find('.' + utils.getClassname('node')).removeClass(utils.getClassname('current'));
    };

    Collapsible.prototype.open = function(force) {
        if(this.options.animateWith === 'js') {
            this.$content.slideDown(this.options.duration);
        }

        if(this.options.closeSiblings && !force) {
            this.closeSiblings();
        }

        this.$el.addClass(utils.getClassname('current') + ' ' + this.options.current);
        this.isActive = true;

        this.emitEvent('expanded');
    };

    Collapsible.prototype.close = function() {
        if(this.options.animateWith === 'js') {
            this.$content.slideUp(this.options.duration);
        }

        this.$el.removeClass(utils.getClassname('current') + ' ' + this.options.current);
        this.isActive = false;

        this.emitEvent('collapsed')
    };

    Collapsible.prototype.registry = function() {
        var uxrocket = this.$el.data(ns.rocket) || {};

        // register plugin data to rocket
        uxrocket[ns.data] = {
            hasWrapper: false,
            ready:      utils.getClassname('ready'),
            selector:   this.selector,
            options:    this.options
        };

        this.$el.data(ns.rocket, uxrocket);
    };

    Collapsible.prototype.emitEvent = function(which) {
        this.$el.trigger(events[which]);
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

    ux.openAll = function(parent) {
        var $parent = $(parent);

        $parent.find('> .' + utils.getClassname('ready')).each(function() {
            var collapsible = $(this).data(rocketName);

            collapsible.open(true);
        });
    };

    ux.closeAll = function(parent) {
        var $parent = $(parent);

        $parent.find('> .' + utils.getClassname('ready')).each(function() {
            var collapsible = $(this).data(rocketName);

            collapsible.close();
        });
    };

    // Version
    ux.version = '1.3.0';

    // settings
    ux.settings = defaults;
}));