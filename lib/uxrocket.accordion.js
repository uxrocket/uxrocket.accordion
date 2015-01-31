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
			animateWith: 'css', // css or js
			duration: 200,
			
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
			closed: 'uxitd-collapsible-closed',
			animate: 'uxitd-collapsible-animate'
		};

	// constructor method
    var Collapsible = function(el, options){
        var $el = $(el),
			opts = $.extend({}, defaults, options, $el.data());
			
			opts.siblings = $el.siblings();
			opts.children = opts.siblings.find('.' + ns.ready);
		
		$el.data(ns.data, opts).addClass(ns.animate + opts.animateWith.toUpperCase());
		
		callback(opts.onReady);
		
		bindUIActions($el);
    };
	
	var bindUIActions = function($el){
		var _opts = $el.data(ns.data);
		
		$el.on(events.click, function(e){
			e.preventDefault();
			
			if(_opts.animateWith.toLowerCase() === 'js'){
				animate($el);
			}
			
			else {
				toggleCurrent($el);
			}			
			
			
			if(_opts.closeSiblings){
				closeSiblings(_opts.siblings);
			}
		});
	};
	
	var animate = function($el, direction){
		var _opts = $el.data(ns.data),
			_direction = direction || $el.hasClass(_opts.current) ? 'Up' : 'Down';

		$el.find(_opts.content)['slide' + _direction](_opts.duration, function(){
			toggleCurrent($el, _direction);
		});
	};
	
	var toggleCurrent = function($el, which){
		var _opts = $el.data(ns.data),
			func = [],
			_which = $el.hasClass(_opts.current) ? 'Up' : 'Down';
			_which = which || _which;
			
			func['Up'] = ['Close', 'remove'];
			func['Down'] = ['Open', 'add'];
			
		$el[func[_which][1] + 'Class'](_opts.current + ' ' + ns.opened);
		callback(_opts['on' + func[_which][0]]);
	};
	
	var closeSiblings = function(siblings){
		siblings.each(function(){
			var _this = $(this),
				_opts = _this.data(ns.data);
				
			// no need to close, already closed once :)
			if(!_this.hasClass(_opts.current)){
				return;
			}
				
			if(_opts['animateWith'].toLowerCase() === 'js'){
				animate(_this, 'Up');				
			}
				
			else {
				toggleCurrent(_this, 'Up');
			}
			
			
			if(_opts.children) {
				closeSiblings(_opts.children);
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
    ux.version = "0.5.0";

	// settings
	ux.settings = defaults;

})(jQuery);
