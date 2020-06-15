( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-top-gallery .b-fotorama__gallery' ).fotorama();
    
    setTimeout( function() {
      $( '.b-top-gallery__fotorama .fotorama__wrap' ).prepend( $( '.b-4june' ));
    }, 1000);
    
    setTimeout( function() {
      $( '.b-fotorama__container, .b-fotorama__sticky-content' ).addClass( 'i-load' );
    }, 100);
        
    if ( window.matchMedia( "(max-width: 600px)" ).matches ) {
      $( '.b-top-gallery .b-fotorama__gallery' ).fotorama().data( 'fotorama' ).resize({
        height: '500px',
        ratio: undefined
      });
    }
    
    /*$('.b-fotorama .fotorama').on( 'fotorama:ready', function (e, fotorama) {
    
      $( '.b-fotorama' ).each( function() {
        var $bFotorama = $( this );
        
        $bFotorama.find( '.b-fotorama__image' ).each( function() {
          var $image = $( this );
          var src = $image.data( 'image' );
          
          var $img = $( '<img src="' + src + '" width="1" height="1" alt="" style="position: absolute; top: 0; left: 0; visibility: hidden;">' );
          $bFotorama.append( $img );
          
          if( $img[0].complete ) {
            show();
          } else {
            $img.load( function() { 
              show();
            });
          }
          
          function show() {
            $image.css({ backgroundImage: "url(" + src + ")" })
            .closest( '.b-fotorama__container' ).addClass( 'i-show' );
            $img.remove();
          }
        });
      });
      
    });*/
      
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));