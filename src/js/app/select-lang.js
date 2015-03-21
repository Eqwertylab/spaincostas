(function() {
	$.widget( "custom.langselect", $.ui.selectmenu, {
		setButton: function() {
			$(this.button)
				.css('width', '60px')
				.find('.lang_ico')
				.remove();
			var select_lang = $(this.element).val();
			$('<span class="ui-icon lang_ico __'+select_lang+'"></span>').prependTo(this.button);
		},
		_renderItem: function( ul, item ) {
			var li = $( "<li>", { text: item.label } );
			if ( item.disabled ) {
				li.addClass( "ui-state-disabled" );
			}
			$( "<span>", {
				style: item.element.attr( "data-style" ),
				"class": "ui-icon " + item.element.attr( "data-class" )
			})
				.appendTo( li );
			return li.appendTo( ul );
		},
		_renderMenu: function( ul, items ) {
			var that = this;
			$.each( items, function( index, item ) {
				that._renderItemData( ul, item );
			});
			$(ul).parent().css('z-index', '300');
		}
	});
	$( "#lang" )
		.langselect({
			position: { 
				at: "left top" 
			},
			select: function() {
				$(this).langselect( "setButton" );
			}
		})
		.langselect( "setButton" )
		.langselect( "menuWidget" )		
		.addClass( "ui-menu-icons lang-menu" );
})();
	
