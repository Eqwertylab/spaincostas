(function() {

	var $slides_node = $('.slides'),
      $slides_arr = $('.slide'),
      count = $slides_arr.size(),                         // кол-во слайдов
      idx = 1,                                            // счетчик слайдов
      SLIDER_DELAY = 5000,                                // заджержка
      SLIDER_DELAY_CLICK = 8000,                          // заджержка при клике
      timer,                                              // указатель на таймер
      $control = $('.control_nav').find('li'),            // выбор слайда
      idx_control,                                        // внутрений счетчик для выбора слайда
      $dir = $('.direction_nav').find('li'),              // следующий / предыдущий слайд
      idx_dir,                                            // внутрений счетчик
      idx_active,
      slide_delay;                                        // время задержки текущего слайда

  var timer = setTimeout(slide, SLIDER_DELAY);

  // обработка выбора слайда
  $control.click(function(event) {
    $control.removeClass('active');
    $(this).addClass('active');
    idx_control = $(this).index();
    
    clearTimeout(timer);
    slide(idx_control);
  });

  // обработка кликов вперед / назад
  $dir.click(function(event) {
    idx_active = $slides_node.children('.active').index();
    if( $(this).hasClass('next') ) {
      ++idx_active >= count ? idx_dir = 0 : idx_dir = idx_active;
    }
    if( $(this).hasClass('before') ) {
      --idx_active < 0 ? idx_dir = count - 1 : idx_dir = idx_active;
    }

    clearTimeout(timer);
    slide(idx_dir, SLIDER_DELAY_CLICK);
  });

  function slide(set_idx, slide_delay) {

  	// если переданно значение задержки устанавливаем его
    !slide_delay ? slide_delay = SLIDER_DELAY : false;

    // если передан номер след.слайда используем его
    set_idx ? idx = set_idx : false;
    $slides_arr.removeClass('active');
    $control.removeClass('active');

    // если просмотрели все слайды используем первый
    idx >= count ? idx = 0 : false;    
    $($control[idx]).addClass('active');
    $($slides_arr[idx++]).addClass('active');
    
    clearTimeout(timer);
    timer = setTimeout(slide, slide_delay);
  }

})();