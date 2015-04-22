requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.11.2.min',
        jquery_ui: 'lib/jquery-ui/jquery-ui.min',
        uri_plug: 'lib/URI',
        jquery_uri: 'lib/jquery.uri.min'
    }
});

var file = requirejs(['jquery','jquery_ui'], function($) {
	var a = [
			'uri_plug',
			'jquery_uri',
			'app/menu',
			'app/select-lang',
			'app/head-slider', 
			'app/custom-select', 
			'app/datepicker', 
			'app/filter-price'
			]

	requirejs(a);

});