requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.11.2.min',
        jquery_ui: 'lib/jquery-ui/jquery-ui.min'
    }
});

requirejs(['jquery','jquery_ui'], function($) {

	requirejs(['app/menu','app/select-lang','app/head-slider', 'app/custom-select', 'app/datepicker']);

});