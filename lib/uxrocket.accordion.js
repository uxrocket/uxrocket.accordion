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
			closeSiblings: false
		},
		events = {
			click: 'click.uxCollapsible'
		};

	// constructor method
    var Collapsible = function(el, options){
        var opts = $.extend({}, defaults, options, $(el).data()),

        // cached variables
        $collapsible = $(el),
        $header = $collapsible.find(opts.header),
        $siblings = $collapsible.siblings(),
        $children = $siblings.find('.uxitd-collapsible-ready');

        $(el).on(events.click , opts.header , function(e){
            e.preventDefault();
            e.stopPropagation();
            $collapsible.toggleClass(opts.current);
            if(opts.closeSiblings === true){
                $siblings.removeClass(opts.current);
                //check nested collapsibles
                if($children.length) {
                    $children.removeClass(opts.current);
                }
            }
        });
    };

	// jquery bindings
    ux = $.fn.collapsible = $.uxcollapsible = function(options){
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
    ux.version = "0.3.0";

	// settings
	ux.settings = defaults;

})(jQuery);