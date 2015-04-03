(function() {

  //
  // Фильтр стоимости
  // --------------------
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


  //
  // Рендер квартир
  // --------------------

  // Список опций
  var options_list = {
    '0':'Free Bike',
    '1':'bed sofa',
    '2':'juicer',
    '3':'bed linen & towels',
    '4':'washing machine',
    '5':'iron & ironing board',
    '6':'hairdryer',
    '7':'air-conditioning',
    '8':'oven',
    '9':'fridge-freezer',
    '10':'blender',
    '11':'coffee press',
    '12':'toaster',
    '13':'TV',
    '14':'TV Smart',
    '15':'DVD player'
  }
  $.getJSON( "testdata/apartlist.json", function( data ) {

    var items = '';

    $.each( data["apartment"], function( key, val ) {
      // items.push( "<div class='realty' id='" + key + "'>" + val.name + "</div>" );

      // Блок с именем
      var name =  "<div class='realty_name'>" + val.name + "</div>";

      // Блок с описанием
      var description = "<div class='shortDesc'>" + val.shortDesc + "</div>";

      // Блок с опциями
      var options='';
      var options_arr = val.option.split( ',' );

      $.each( options_arr, function(index, el) {
        
        options += "<li>" + options_list[el] + "</li>";

      });

      // Блок со стоимостью
      var price = '<span class="realty_price_2">' + val.price + 'р.</span>';

      // Фото (пока только 1 - первое)
      var photo = val.id+'_' + val.image + '_1';
      photo = '<img src="testdata/apartphoto/'+ val.id + '/' + photo + '.jpg">';

      // Собираем блок
      var block = '<div class="realty">' +
                    '<div class="realty_photo">' +
                      photo +
                    '</div>' +
                    '<div class="realty_details">' +
                      '<div class="realty_col_left">' +
                        name +
                        description +
                        '<ul class="realty_option">' +
                          options +
                        '</ul>' +
                      '</div>' +
                      '<div class="realty_col_right">' +
                        '<div class="realty_price">' +
                          '<span class="realty_price_1">от</span>' +
                          price + 
                          '<span class="realty_price_3">за ночь</span>' +
                        '</div>' +
                        '<a href="" class="realty_link"><i class="fa fa-chevron-right"></i></a>' + 
                      '</div>' +     
                    '</div>' +
                  '</div>';
      items += block;
    });
    $('#search_result').html(items);
  });

})();