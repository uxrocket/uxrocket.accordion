/**
 * UX Rocket
 * jQuery based accordion
 * @author Bilal Cinarli
 */

;(function($){
	var ux, // local shorthand

		defaults = {
			header: ".collapsible-header",
			content: ".collapsible-content",
			current: 'current',
			closeSiblings: false,
			
			onReady: false,
			onOpen : false,
			onClose: false
		},
		events = {
			click: 'click.uxCollapsible'
		},
		ns = {
			rocket: 'uxRocket',
			data  : 'uxCollapsible',
			ready : 'uxitd-collapsible-ready',
			opened: 'uxitd-collapsible-opened',
			closed: 'uxitd-collapsible-closed'
		};

	// constructor method
    var Collapsible = function(el, options){
        var $el = $(el),
			opts = $.extend({}, defaults, options, $el.data());
			
			opts.siblings = $el.siblings();
			opts.children = opts.siblings.find('.' + ns.ready);
		
		$el.data(ns.data, opts);
		
		callback(opts.onReady);
		
		bindUIActions($el);
    };
	
	var bindUIActions = function($el){
		var _opts = $el.data(ns.data);
		
		$el.on(events.click, function(e){
			e.preventDefault();
			
			if(!$el.hasClass(_opts.current)){
				$el.addClass(_opts.current + ' ' + ns.opened);
				callback(_opts.onOpen);
			}
			else {
				$el.removeClass(_opts.current + ' ' + ns.opened);
				callback(_opts.onClose);
			}
			
			if(_opts.closeSiblings){
				_opts.siblings.removeClass(_opts.current + ' ' + ns.opened);
				
				if(_opts.children){
					_opts.children.removeClass(_opts.current + ' ' + ns.opened);
				}
			}
		});
	};
	
    // global callback
    var callback = function(fn){
        // if callback string is function call it directly
        if(typeof fn === 'function'){
            fn.apply(this);
        }

        // if callback defined via data-attribute, call it via new Function
        else {
            if(fn !== false){
                var func = new Function('return ' + fn);
                func();
            }
        }
    };

	// jquery bindings
    ux = $.fn.collapsible = $.uxcollapsible = function(options){
		var selector = this.selector;
		
        return this.each(function(){
            var $el = $(this),
				uxrocket = $el.data(ns.rocket) || {},
                collapsible;

			if($el.hasClass(ns.ready)){
				return;
			}

			$el.addClass(ns.ready);
			
            uxrocket[ns.data] = {'hasWrapper': false, 'ready': ns.ready, 'selector': selector, 'options': options};

            $el.data(ns.rocket, uxrocket);
			
            collapsible = new Collapsible(this, options);
        });
    };

    // Version
    ux.version = "0.4.0";

	// settings
	ux.settings = defaults;

})(jQuery);
