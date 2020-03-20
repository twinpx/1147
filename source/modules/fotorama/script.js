window.processFotoramaTouch = [];

$( document )
  .delegate( '#process .b-photo-card', 'click', function(e) {
    var $photoCard = $( this );
    
    setTimeout( function() {
      if ( window.fotoramaSwipeFlag ) {
        window.fotoramaSwipeFlag = false;
        return false;
      }
      clickPhotoCard( e, $photoCard );
    }, 10);
    
  })
  .delegate( '#process .b-photo-card', 'touchstart', function(e) {
    window.processFotoramaTouch.pageX = e.changedTouches[0].pageX;
    window.processFotoramaTouch.pageY = e.changedTouches[0].pageY;
  })
  .delegate( '#process .b-photo-card', 'touchend', function(e) {
    if ( e.changedTouches[0].pageX !== window.processFotoramaTouch.pageX || e.changedTouches[0].pageY !== window.processFotoramaTouch.pageY ) {
      return false;
    }
    
    var $photoCard = $( this );
    clickPhotoCard( e, $photoCard );
    
    /*setTimeout( function() {
      if ( window.fotoramaSwipeFlag ) {
        window.fotoramaSwipeFlag = false;
        console.log( 'false:touchend' );
        return false;
      }
      clickPhotoCard( e, $photoCard );
    }, 10);*/
  });

function clickPhotoCard( e, $photoCard ) {
  
  if ( !$photoCard.data( 'url' )) {
    return;
  }
  
  e.preventDefault();
  
  $( '#processLayer' ).addClass( 'i-animate' );
  
  //ajax
  $.ajax({
    url: $photoCard.data( 'url' ),
    type: $photoCard.data( 'method' ),//GET
    dataType: "html",
    success: function( html ) {
      $( '#processLayer .container' ).html( html );
      
      //gallery fotorama
      $( '#processLayer .fotorama' ).fotorama();

      //fotorama arrows
      setTimeout( function() {
        $( '#processLayer .fotorama__wrap--toggle-arrows' ).addClass( 'fotorama__wrap--no-controls' );
      }, 100);
    },
    error: function( a, b, c ) {
      if ( window.console ) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  });
}

$( '#process .fotorama' )
  .on( 'fotorama:show', function() {
    window.fotoramaSwipeFlag = true;
  })
  .on( 'fotorama:showend', function() {
    window.fotoramaSwipeFlag = false;
  });

$( document ).delegate( '#processLayerClose', 'click', function(e) {
  e.preventDefault();
  $( '#processLayer' ).removeClass( 'i-animate' );
});