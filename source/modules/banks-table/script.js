$( '.b-tabs' ).delegate( '.b-tabs__menu__item', 'click', function(e) {
  e.preventDefault();
  
  $( this ).closest( '.b-tabs' ).find( '.b-tabs__item, .b-tabs__menu__item' ).removeClass( 'i-active' );
  $( this ).addClass( 'i-active' );
  $( '#' + $( this ).data( 'tab' )).addClass( 'i-active' );
});