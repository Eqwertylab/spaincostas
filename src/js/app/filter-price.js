(function() {

  console.log(this);

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


  // Получаем список квартир
  $.getJSON( "testdata/apartlist.json" , function( data ) {

    data = data['apartment'];

    // Формируем фильтры
    render_filters( data ); 

    // Выводим картиры
    render( data, 5, 1 );

    // Обработчик пагинации
    pagination( data );


  }); 

  // Обработка кликов постраничной навигации
  function pagination( data ) {

    $('#pagination').on('click', 'a', function(event) {

      event.preventDefault();
      var page = $(this).attr('href');
      render( data , 5, page );

    });

  }

  function render_filters( data ) {

    //
    // Формируем фильтры
    // --------------------

    //
    // Фильтр стоимости
    // --------------------
    // Определяем мин. и макс. стоимость
    var data_count = data.length;
    var min_price = data[0]['price'];
    var max_price = data[0]['price'];
    for (var i = 0; i < data_count; i++) {

      if(data[i]['price'] < min_price) {
        min_price = data[i]['price'];
      }
      if(data[i]['price'] > max_price) {
        max_price = data[i]['price'];
      }

      // Формируем массив спален
      

    };

    // Показываем фильтр
    $( "#filter_price" ).slider({
      range: true,
      min: min_price,
      max: max_price,
      values: [ min_price, max_price ],
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
    // Фильтры с checkbox
    // --------------------



  }
  


  //
  // INP:
  // data (array) - массив с квартирами
  // limit (number) - кол-во квартир на странице
  // set_page (number) - выбраная страница
  //
  // OUT:
  // (array) - [0] рендер страниц и [1] постраничной навигации 
  // ------------------
  function render( data, limit, set_page ) {

    var items = '';                         // Квартиры
    var page_nav = '';                      // Постраничная навигация
    var count = data.length;                // Кол-во квартир
    var limit = limit || 5;                 // Кол-во квартир на странице
    var pages = Math.ceil(count / limit);   // Кол-во страниц
    var last_page_el = count % limit;       // Кол-во квартир на последней странице

    set_page = set_page || 1;                      // Если страница не указана показываем первую
    set_page = set_page > pages ? pages : set_page // Если указана страница > pages устанавливаем последню
    set_page = set_page < 0     ? 1     : set_page // Если указана страница < 0 устанавливаем первую

    var first_el = limit * set_page - (limit); // Первая квартира на странице
    var last_el = limit * set_page - 1;        // Последняя квартира на странице

    if( set_page == pages ) {
      last_el = first_el + last_page_el - 1;
    }

    // Перебираем нужное кол-во квартир
    for (var key = first_el; key <= last_el; key++) {

      val = data[key];

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

    };


    // Постраничная навигация
    if (count > limit ) {
      // Before
      page_nav += set_page > 1 ?  '<li><a href="'+ (set_page - 1) +'"><i class="fa fa-angle-double-left"></i></a></li>' : '<li><span><i class="fa fa-angle-double-left"></i></span></li>';
      // Pages
      for (var i = 1; i <= pages; i++) {
        if( !(i == set_page) ) {
          page_nav += '<li><a href="'+ i +'">'+ i +'</a></li>';
        } else {
          page_nav += '<li class="__active"><span>'+ i +'</span></li>';
        }
      };
      // After
      page_nav += set_page < pages ? '<li><a href="'+ ( Number(set_page) + 1) +'"><i class="fa fa-angle-double-right"></i></a></li>' : '<li><span><i class="fa fa-angle-double-right"></i></span></li>';
    }

    var answer = [ items, page_nav ];

    // Добавляем квартиры в DOM
    $('#search_result').html(answer[0]);
    $('#pagination').html(answer[1]);


  }

})();