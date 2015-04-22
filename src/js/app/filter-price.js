Filter = {};
Filter = {
  Init: function() {

    Filter.Func.start_filter();

  },
  Func: {
    // Получаем список квартир по умолчанию
    start_filter: function() {
      $.getJSON(Filter.Const.default_url)
        .done(function( data ) {
          if(data['apartment'].length) {

            data = data['apartment'];

            // Формируем фильтры
            Filter.Render.main( data ); 

            // Выводим картиры
            Filter.Func.render( data, 5, 1 );

            // Обработка фильтров
            Filter.Action.main( data );
          } else {
            $('#search_result').html('<div class="search_empty">По вашему запросу ничего не найдено.</div>');
          }
        }); 
    },

    // Отправка формы
    send_form: function() {
      $('#search').submit(function(event) {
        event.preventDefault();
        var data_submit = $(this).serialize();
        var url_submit = $(this).attr('action'); 
        var method_submit = $(this).attr('method'); 
        $.ajax({
          url: url_submit,
          type: method_submit,
          dataType: 'json',
          data: data_submit
        })
        .done(function(data) {

          if(data['apartment'].length) {

            data = data['apartment'];

            // Формируем фильтры
            Filters.Render.main( data ); 

            // Выводим картиры
            Filter.Func.render( data, 5, 1 );

            // Обработка фильтров
            Filter.Action.main( data );
          } else {
            $('#search_result').html('<div class="search_empty">По вашему запросу ничего не найдено.</div>');
          }

        })
        .fail(function() {
          alert("Error");
        })
        
      });
    },

    // Обработчик кликов пагинации
    pagination: function( data ) {
      $('#pagination').unbind();
      $('#pagination').on('click', 'a', function(event) {
        event.preventDefault();
        var page = $(this).attr('href');
        Filter.Func.render( data , 5, page );
      });
    },

    /*
     * INP:
     * data (array) - массив с квартирами
     * limit (number) - кол-во квартир на странице
     * set_page (number) - выбраная страница
     *
     * OUT:
     * (array) - [0] рендер страниц и [1] постраничной навигации 
     */
    render: function( data, limit, set_page ) {
      if(!data.length) {
        $('#search_result').html('<div class="search_empty">По вашему запросу ничего не найдено.</div>');
        return;
      }
      var items = '';                         // Квартиры
      var options_list = Filter.Const.options_list; // Окции квартиры
      var page_nav = '';                      // Постраничная навигация
      var count = data.length;                // Кол-во квартир
      var limit = limit || 5;                 // Кол-во квартир на странице
      var pages = Math.ceil(count / limit);   // Кол-во страниц
      var last_page_el = (count % limit) || limit;       // Кол-во квартир на последней странице

      set_page = set_page || 1;                      // Если страница не указана показываем первую
      set_page = set_page > pages ? pages : set_page // Если указана страница > pages устанавливаем последню
      set_page = set_page < 0     ? 1     : set_page // Если указана страница < 0 устанавливаем первую

      var last_el = limit * set_page - 1;         // Последняя квартира на странице
      var first_el = limit * set_page - limit;    // Первая квартира на странице

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
                          '<div class="realty_basis">' +
                            '<div class="realty_basis_item"><i class="fa fa-bed"></i> 3 спальни</div>' + 
                            '<div class="realty_basis_item"><i class="fa fa-users"></i> 6 человек</div>' +
                            '<div class="realty_basis_item"><i class="fa fa-th"></i> 48 м<sup>2</sup></div>' +
                            '<div class="realty_basis_item"><i class="fa fa-tint"></i> 1 ванная</div>' +
                          '</div>' +
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

      // Регистрируем обработчик пагинации
      Filter.Func.pagination( data );
    },
  },
  Render: {
    // Отображает фильтры
    main: function( data ) {

      // --------------------
      // Формируем данные для фильтров на основе даннык о недвижимости
      // --------------------

      //
      // Фильтр стоимости
      // --------------------
      // Определяем мин. и макс. стоимость
      var data_count = data.length;
      var min_price = data[0]['price'];
      var max_price = data[0]['price'];

      //
      // Фильтры с checkbox
      // --------------------
      var bedRoomArr = {};
      var coastArr = {};
      var zoneArr = {};
      var optionArr = {};

      for (var i = data.length - 1; i >= 0; i--) {

        // Фильтр стоимости
        if(data[i]['price'] < min_price) {
          min_price = data[i]['price'];
        }
        if(data[i]['price'] > max_price) {
          max_price = data[i]['price'];
        }     

        // Фильтры с checkbox
        var val = data[i];

        // Спален
        var key = val['bedRoom'];
        if(!bedRoomArr[key]) {
          bedRoomArr[key] = {};
          bedRoomArr[key].count = 1;
        } else {
          bedRoomArr[key].count = bedRoomArr[key].count + 1;
        }

        // Побережья
        var key = val['coastid'];
        if(coastArr[key] == undefined) {
          coastArr[key] = 1;
        } else {
          coastArr[key] = coastArr[key] + 1;
        }

        // Районы
        var key = val['zoneid'];
        if(zoneArr[key] == undefined) {
          zoneArr[key] = 1;
        } else {
          zoneArr[key] = zoneArr[key] + 1;
        }

        // Опции
        var key = val['option'].split(",");
        for (var j = key.length - 1; j >= 0; j--) {
          if(optionArr[key[j]] == undefined) {
            optionArr[key[j]] = {};
            optionArr[key[j]].count = 1;
          } else {
            optionArr[key[j]].count = optionArr[key[j]].count + 1;
          }
        };
      };


      // --------------------
      // Отображаем фильтры
      // --------------------

      Filter.Render.filter_Price(min_price, max_price);
      Filter.Render.filter_bedRoom(bedRoomArr);
      Filter.Render.filter_option(optionArr);
    },

    filter_Price: function(min_price, max_price) {
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
    },
    filter_bedRoom: function(bedRoomArr) {
      var filters = '';
      for (var room in bedRoomArr) {

        switch(+room) {
          case 1:
            bedRoomArr[room].postfix = 'Спальня';
            break;
          case 2:
          case 3:
          case 4:
            bedRoomArr[room].postfix = 'Спальни';
            break;
          default:
            bedRoomArr[room].postfix = 'Спален';
            break;
        }

        filters += '<div class="filter_item">';
        filters += '<input type="checkbox" id="room-' + room + '" value="' + room + '" class="form_check">';
        filters += '<label for="room-' + room + '" class="form_label">' + room + ' ' + bedRoomArr[room].postfix + '</label>';
        filters += '<span class="filter_count">' + bedRoomArr[room].count + '</span>';
        filters += '</div>';

      };
      $('#bedRoom').html(filters);
    },
    filter_option: function(optionArr) {
      var filters = '';
      for (var option in optionArr) {
        filters += '<div class="filter_item">';
        filters += '<input type="checkbox" id="option-' + option + '" value="' + option + '" class="form_check">';
        filters += '<label for="option-' + option + '" class="form_label">' + Filter.Const.options_list[option] + '</label>';
        filters += '<span class="filter_count">' + optionArr[option].count + '</span>';
        filters += '</div>';
      }
      $('#option').html(filters);
    }
  },
  Action: {
    // Обработка изменения фильтров
    main: function( data ) {
      var mod_data = [];
      $('#filters').on('change', '.form_check', function() {
        mod_data = JSON.parse( JSON.stringify( data ) );
        mod_data = Filter.Action.filter_bedRoom( mod_data );
        mod_data = Filter.Action.filter_option( mod_data );
        Filter.Func.render( mod_data, '', 1 );
        Filter.Update.main( mod_data );
      });
    },

    filter_bedRoom: function( data ) {
      // Получаем значения выбранных пунктов фильтра
      var elements = $('#bedRoom').find('.form_check:checked');

      // Если ничего не выбрано переходим к следующему
      if(!elements.length) return data;

      // Определяем параметры 
      var param = {};
      for (var i = elements.length - 1; i >= 0; i--) {
        param[elements[i].value] = 1;
      };

      var mod_data = [];
      var mod_i = 0;
      // Модифицируем объект с квартирами
      for (var i = data.length - 1; i >= 0; i--) {
        if(param[data[i]["bedRoom"]]) {
          mod_data[mod_i++] = data[i];
        }
      };

      return mod_data;
    },

    filter_option: function( data ) {
      // Получаем значения выбранных пунктов фильтра
      var elements = $('#option').find('.form_check:checked');

      // Если ничего не выбрано переходим к следующему
      if(!elements.length) return data;

      // Определяем параметры 
      var param = [];

      for (var i = elements.length - 1; i >= 0; i--) {
        param[i] = elements[i].value;
      };

      var mod_data = [];
      var mod_i = 0;
      // Модифицируем объект с квартирами
      // перебираем квартиры
      for (var i = data.length - 1; i >= 0; i--) {

        //перебираем опции
        for (var j = param.length - 1; j >= 0; j--) {
          var trigger = true;
          var re = new RegExp('^'+param[j]+'\,|\,'+param[j]+'\,|\,'+param[j]+'$');
          if( data[i]['option'].search(re) == -1 ) {
            trigger = false;
            break;
          }
        };
        if(trigger) {
          mod_data[mod_i++] = data[i];
        }
      };
      return mod_data;
    }
  },
  Update: {
    main: function( data ) {

      //
      // Фильтры с checkbox
      // --------------------
      var bedRoomArr = {};
      var coastArr = {};
      var zoneArr = {};
      var optionArr = {};

      for (var i = data.length - 1; i >= 0; i--) {

        // Фильтры с checkbox
        var val = data[i];

        // Спален
        var key = val['bedRoom'];
        if(!bedRoomArr[key]) {
          bedRoomArr[key] = {};
          bedRoomArr[key].count = 1;
        } else {
          bedRoomArr[key].count = bedRoomArr[key].count + 1;
        }

        // Опции
        var key = val['option'].split(",");
        for (var j = key.length - 1; j >= 0; j--) {
          if(optionArr[key[j]] == undefined) {
            optionArr[key[j]] = {};
            optionArr[key[j]].count = 1;
          } else {
            optionArr[key[j]].count = optionArr[key[j]].count + 1;
          }
        };

      };

      // --------------------
      // Обновляем фильтры
      // --------------------
      Filter.Update.filter_bedRoom( bedRoomArr );
      Filter.Update.filter_option( optionArr );

    },

    filter_option: function( optionArr ) {
      var elements = $('#option').find('.form_check');
      var count = $('#option').find('.filter_count');
      
      for (var i = elements.length - 1; i >= 0; i--) {
        if(optionArr[elements[i].value]) {
          $(count[i]).text(optionArr[elements[i].value].count);
        } else {
          $(count[i]).text('0');
        }
      };
    },

    filter_bedRoom: function( bedRoomArr ) {
      var elements = $('#bedRoom').find('.form_check');
      var count = $('#bedRoom').find('.filter_count');
      
      for (var i = elements.length - 1; i >= 0; i--) {
        if(bedRoomArr[elements[i].value]) {
          $(count[i]).text(bedRoomArr[elements[i].value].count);
        } else {
          $(count[i]).text('0');
        }
      };
    }

  },
  Const : {

    // Список опций квартиры
    options_list: {
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
    },

    // URL запрос по умолчанию
    default_url: 'testdata/apartlist.json',

    // Кол-во квартир на странице
    page_count: 5
  }

}

Filter.Init();

// Обновление фильтров
function update_filters( data ) {
  update_filter_bedRoom( data );
}