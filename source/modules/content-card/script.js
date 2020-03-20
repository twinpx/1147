/*$( '.b-content-card .btn' ).click( function(e) {
  e.preventDefault();
  
  $.scrollTo( ($( '#filter-section-btn' ).offset().top-100) + 'px', 500 );
  
  $( '#filter-section' ).not( ':visible' ).slideDown();
  
  var num = $( this ).data( 'flats' );
  
  var filterObj = $( '#filter' ).data( 'Filter' );
  
  filterObj.setValue({  rooms:[ num,num], floors:[filterObj.$floors.slider( "option", "min" ),filterObj.$floors.slider( "option", "max" )], square:[filterObj.$square.slider( "option", "min" ),filterObj.$square.slider( "option", "max" )], price:[filterObj.$price.slider( "option", "min" ),filterObj.$price.slider( "option", "max" )] });
});*/

$( '.b-content-card' ).click( function(e) {
  e.preventDefault();
  
  //$.scrollTo( ($( '.b-flats' ).offset().top-250) + 'px', 500 );
  
  //filter
  /*$( '#filter-section' ).not( ':visible' ).slideDown();
  var num = $( this ).data( 'flats' );
  var filterObj = $( '#filter' ).data( 'Filter' );
  
  filterObj.setValue({  rooms:[ num,num], floors:[filterObj.$floors.slider( "option", "min" ),filterObj.$floors.slider( "option", "max" )], square:[filterObj.$square.slider( "option", "min" ),filterObj.$square.slider( "option", "max" )], price:[filterObj.$price.slider( "option", "min" ),filterObj.$price.slider( "option", "max" )] });*/
  
  //flats
  var $wrapper = $( this ).closest( '.b-content-card__wrapper' );
  
  //content cards
  $wrapper.find( '.b-content-card' ).removeClass( 'i-active' );
  $( this ).addClass( 'i-active' );
  
  //flat blocks
  $wrapper.find( '.b-flats__block:visible' ).slideUp();
  $wrapper.find( '.b-flats__block[ data-flats=' + $( this ).data( 'flats' ) + ']' ).slideDown();
  
  //flat info
  $( '.b-flats__info-block' ).slideUp();
});

$( '.b-flats__block img' ).click( function(e) {
  e.preventDefault();
  
  var $img = $( this );
  if ( $img.hasClass( 'i-active' )) {
    return;
  }
  var $wrapper = $img.closest( '.b-content-card__wrapper' );
  
  $.ajax({
    url: $wrapper.data( 'ajax-url' ),
    type: $wrapper.data( 'method' ),
    dataType: 'html',
    data: { id: $img.data( 'id' )},
    success: function( html ) {
      $( '.b-flats__info-block' ).hide().html( html ).slideDown();
      $( '.b-flats__blocks img' ).removeClass( 'i-active' );
      $img.addClass( 'i-active' );
      $( '.b-flats__info-block .fotorama' ).fotorama();
    },
    error: function( a, b, c ) {
      if ( window.console ) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  });
});

$( '.b-content-card:eq(0)' ).click();
$( '.b-flats__block[ data-flats="1" ] img:eq(0)' ).click();