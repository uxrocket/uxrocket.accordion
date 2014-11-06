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
		};

	// constructor method
    var Collapsible = function(el, options){
        var opts = $.extend({}, defaults, options, $(el).data()),

        // cached variables
        $collapsible = $(el),
        $header = $collapsible.find(opts.header),
        $siblings = $collapsible.siblings(),
        $children = $siblings.find('.uxitd-collapsible-ready');

        $(el).on('click' , opts.header , function(e){
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
                collapsible;

			if($el.hasClass('uxitd-collapsible-ready')){
				return;
			}

			$el.addClass('uxitd-collapsible-ready');
            collapsible = new Collapsible(this, options);
        });
    };

    // Version
    ux.version = "0.2.3";

	// settings
	ux.settings = defaults;

})(jQuery);