$( '.b-scroll-to-top' ).click( function() {
  $.scrollTo(0, 500);
});

$( window ).scroll( function() {

  var scrolled = $( window ).scrollTop() - $( window ).height();

  if ( scrolled > 0 ) {
    $( '.b-scroll-to-top' ).addClass( 'i-show' );
  } else {
    $( '.b-scroll-to-top' ).removeClass( 'i-show' );
  }
  
}).scroll();