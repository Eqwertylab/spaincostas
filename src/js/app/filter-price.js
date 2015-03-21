 (function() {
  $( "#filter_price" ).slider({
    range: true,
    min: 3500,
    max: 15500,
    values: [ 5200, 12200 ],
    slide: function( event, ui ) {
      $( "#filter_price_value .filter_smin" ).text( ui.values[ 0 ] + "р" );
      $( "#filter_price_value .filter_smax" ).text( ui.values[ 1 ] + "р" );
    }
  });
  $( "#filter_price_value .filter_smin" )
    .text( $( "#filter_price" )
    .slider( "values", 0 ) + "р" );
    
  $( "#filter_price_value .filter_smax" )
    .text( $( "#filter_price" )
    .slider( "values", 1 ) + "р" );
})();