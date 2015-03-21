$(document).ready(function() {

	$.widget( "custom.baseselect", $.ui.selectmenu, {

		set_custom_class: function() {

			$( this.button ).addClass('custom_select');
			$( this.menuWrap ).addClass('custom_select_menu');

		}
	});

	var baseselect_option = {
			open: function( event, ui ) {
				$(event.currentTarget).addClass('__open');
			},
			close: function( event, ui ) {
				$('.custom_select').removeClass('__open')
			}
		}

	$('#hfilter-city, #hfilter-count, #advert-type, #realty-type, #search-city, #search-count')
		.baseselect(baseselect_option)
		.baseselect('set_custom_class');

})