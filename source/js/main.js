if ( document.getElementById( 'bx-panel' ) && $( '.b-header__container' ).length ) {

  $( '#slide-out' ).css({ top: $( '.b-header__container' ).offset().top + 'px' });
  
  $( '#bx-panel-expander, #bx-panel-hider' ).bind( 'click', function() {
    setTimeout( function() {
      $( '#slide-out' ).css({ top: $( '.b-header__container' ).offset().top + 'px' });
    }, 100 );
  });
}

//sideNav
$( "#slide-out" ).sidenav();

//top menu
$( '.b-header-top-menu a, #slide-out a' ).click( function(e) {
  e.preventDefault();
  
  $.scrollTo( '#' + $( this ).attr( 'href' ), 500);
});

$( '#slide-out a' ).click( function(e) {
  e.preventDefault();
  
  var instance = M.Sidenav.getInstance( document.querySelector( '.sidenav' ));
  instance.close();
  
  $.scrollTo( $( '#' + $( this ).attr( 'href' )).offset().top - 110 , 500);
});

if ( window.ymaps ) {
  ymaps.ready( function init(){ 
    var myMap = new ymaps.Map("map", {
      center: [55.812752, 37.647549],
      controls: ["zoomControl"],
      zoom: 17
    });
  
    var myPlacemark = new ymaps.Placemark([55.812752, 37.647549], {
        hintContent: 'Квартал 1147<br>До 21:00',
        balloonContent: 'Квартал 1147<br>До 21:00'
    });
    
    myMap.geoObjects.add(myPlacemark);
    
    myMap.behaviors.disable('scrollZoom'); 
  });
}

$( '.b-form input[type=tel]' ).mask( '(000) 000 00 00' );

$( '#filter-section-btn' ).click( function(e) {
  e.preventDefault();
  $( '#filter-section' ).slideToggle();
});


/*$( window ).scroll( function() {
  //animation
  /*var top = $( document ).scrollTop() + parseInt( window.screen.height ) - 150;
  
  $( '.i-slide-top-animation' ).each( function() {
    if ( $( this ).offset().top < top ) {
      $( this ).addClass( 'i-animated' );
    }
  });*/
  
  //fixed header
  /*var scrolled = $( window ).scrollTop();
  
  if ( $( '#bx-panel' ).length && $( '#bx-panel' ).hasClass( 'bx-panel-fixed' )) {
    bxPanelBorder = $( '#bx-panel' ).height();
  } else {
    bxPanelBorder = 0;
  }
  
  if ( scrolled > headerBorder ) {
      
    if ( !$header.hasClass( 'i-fixed' )) {
      $header.addClass( 'i-fixed' );
      $headerContainer.css({ top: '-100px' });
      setTimeout( function() {
        $headerContainer.css({ top: bxPanelBorder + 'px' });
        $( '#slide-out' ).css({ top: bxPanelBorder + 'px' });
      }, 100);
    } else {
      if ( bxPanelBorder !== parseInt( $headerContainer.css( 'top' ), 10)) {
        $headerContainer.css({ top: bxPanelBorder + 'px' });
        $( '#slide-out' ).css({ top: bxPanelBorder + 'px' });
      }
    }
    
  } else {
    $header.removeClass( 'i-fixed' );
    $headerContainer.removeAttr( 'style' );
    $( '#slide-out' ).css({ top: $headerContainer.offset().top + 'px' });
  }*/
      
/*}).scroll();*/