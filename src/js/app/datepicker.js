(function() {

  var lang = 'RU';

  dpMonthNames = {
    'EN': [ "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December" ],
    'RU': [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
  }

  dpNamesMin = {
    'EN' : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
    'RU' : [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ]
  }

  function customDatepiker(selArrival, selExit) {

    $( selArrival )
      .datepicker({
        monthNames: dpMonthNames[lang],
        dayNamesMin: dpNamesMin[lang],
        dayNamesShort: dpNamesMin[lang],
        minDate: "+1d",
        onClose: function( selectedDate ) {
          $( selExit ).datepicker( "option", "minDate", selectedDate );
        }
      });

    $( selExit )
      .datepicker({
        monthNames: dpMonthNames[lang],
        dayNamesMin: dpNamesMin[lang],
        dayNamesShort: dpNamesMin[lang],
        onClose: function( selectedDate ) {
          $( selArrival ).datepicker( "option", "maxDate", selectedDate );
        }
      });
  } // <-- / customDatepiker


  customDatepiker('#hfilter-arrival', '#hfilter-exit');
  customDatepiker('#search-arrival', '#search-exit');
})();