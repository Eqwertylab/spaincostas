$(document).ready(function() {

  var lang = 'RU';

  dpMonthNames = {
    'EN': [ "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December" ],
    'RU': [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
  }

  dpNamesMin = {
    'EN' : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
    'RU' : [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ]
  }


  $('#hfilter-arrival')
    .datepicker({
      monthNames: dpMonthNames[lang],
      dayNamesMin: dpNamesMin[lang],
      dayNamesShort: dpNamesMin[lang],
      minDate: "+1d",
      onClose: function( selectedDate ) {
        $( "#hfilter-exit" ).datepicker( "option", "minDate", selectedDate );
      }
    });

  $('#hfilter-exit')
    .datepicker({
      monthNames: dpMonthNames[lang],
      dayNamesMin: dpNamesMin[lang],
      dayNamesShort: dpNamesMin[lang],
      onClose: function( selectedDate ) {
        $( "hfilter-arrival" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
});