( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-life-style-gallery' ).each( function() {
      
      var $lifeStyleGallery = $( this ),
          $textWrap = $lifeStyleGallery.find( '.b-life-style-gallery__text-wrap' ),
          $fotorama = $lifeStyleGallery.find( '.fotorama' );
          
      $textWrap.html( $lifeStyleGallery.find( '.b-fotorama__frame:eq(0) .b-fotorama__text' ).html()).addClass( 'i-show' );
    
      $fotorama
        .on( 'fotorama:show', function(e,f,i) {
          var html = f.data[ f.activeIndex ].html;
          var text = $( html ).find( '.b-fotorama__text' ).html();
          $textWrap.removeClass( 'i-show' );
          setTimeout( function() {
            $textWrap.html( text ).addClass( 'i-show' );
          }, 500);
        })
        .fotorama();
        
      if ( window.matchMedia( "(max-width: 600px)" ).matches ) {
        $fotorama.data( 'fotorama' ).resize({
          height: '500px',
          ratio: undefined
        });
      }
    
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));