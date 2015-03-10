$(document).ready(function() {
  var $menu_btn = $('#menu_btn'),     // Кнопка открытия меню мобильной версии
      $menu_out = $('#menu'),         // Внешний блок меню
      menu_item = '.menu_item',       // Пункт меню
      $menu_items = $(menu_item),     
      menu_inner = '.menu_inner';     // Меню второго уровня
      $menu_wrap = $(menu_inner).closest(menu_item);

  // Открытие меню в мобильной версии
  $menu_btn.click(function(event) {
    menu_action();
  });

  $menu_wrap.addClass('__container');

  // Отображение меню второго уровня
  $menu_wrap.children('a').click(function(event) {
    $this_menu_item = $(this).closest(menu_item);

    if($this_menu_item.children(menu_inner).length > 0) {
      event.preventDefault();

      if(!$this_menu_item.hasClass('__open')) {
        $menu_items.removeClass('__open');
        $this_menu_item.addClass('__open');
      } else {
        $this_menu_item.removeClass('__open');
      }
      
    }
  });

  // Скрывание меню второго уровня при "левом" клике
  $(document).on('click', function(event){
    if ( $(event.target).parent(menu_item).length == 0) {
      $menu_items.removeClass('__open');
    }
  }); 

  function menu_action() {
    $menu_btn.toggleClass('__open');
    $menu_out.toggleClass('__open');
  }
});