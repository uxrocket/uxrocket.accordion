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
		};

	// constructor method
    var Collapsible = function(el, options){
        var $el = $(el),
			opts = $.extend({}, defaults, options, $el.data());
			
			opts.siblings = $el.siblings();
			opts.children = opts.siblings.find('.uxitd-collapsible-ready');
		
		$el.data('uxCollapsible', opts);
		
		callback(opts.onReady);
		
		bindUIActions($el);
    };
	
	var bindUIActions = function($el){
		var _opts = $el.data('uxCollapsible');
		
		$el.on(events.click, function(e){
			e.preventDefault();
			
			if(!$el.hasClass(_opts.current)){
				$el.addClass(_opts.current);
				callback(_opts.onOpen);
			}
			else {
				$el.removeClass(_opts.current);
				callback(_opts.onClose);
			}
			
			if(_opts.closeSiblings){
				_opts.siblings.removeClass(_opts.current);
				
				if(_opts.children){
					_opts.children.removeClass(_opts.current);
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
				uxrocket = $el.data('uxRocket') || {},
                collapsible;

			if($el.hasClass('uxitd-collapsible-ready')){
				return;
			}

			$el.addClass('uxitd-collapsible-ready');
			
            uxrocket['uxCollapsible'] = {'hasWrapper': false, 'ready': 'uxitd-collapsible-ready', 'selector': selector, 'options': options};

            $el.data('uxRocket', uxrocket);
			
            collapsible = new Collapsible(this, options);
        });
    };

    // Version
    ux.version = "0.4.0";

	// settings
	ux.settings = defaults;

})(jQuery);
