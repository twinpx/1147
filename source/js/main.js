/*if ( window.matchMedia( "(min-width: 1025px)" ).matches ) {
  $( '#planImage img' ).magnify();
} else {
  //plan modal
  if ( document.getElementById( 'planModal' ) && document.getElementById( 'planModalButton' )) {
    var titleModalInstance = M.Modal.init( document.querySelector( '#planModal' ));
    $( '#planModalButton' ).click( function() {
      titleModalInstance.open();
    });
  }
}*/

//panorama 360 modal
if ( document.getElementById( 'panoramaModal' ) && document.getElementById( 'panoramaModalButton' )) {
  var panoramaModalInstance = M.Modal.init( document.querySelector( '#panoramaModal' ));
  $( '#panoramaModalButton' ).click( function() {
    panoramaModalInstance.open();
    $( '#panoramaModal .modal-content' ).html( '<iframe src="' + $( '#panoramaModal .modal-content' ).data( 'url' ) + '"></frame>' );
  });
}
  
//plan modal
if ( document.getElementById( 'planModal' ) && document.getElementById( 'planModalButton' )) {
  var titleModalInstance = M.Modal.init( document.querySelector( '#planModal' ));
  $( '#planModalButton' ).click( function() {
    titleModalInstance.open();
  });
}

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
  if ( document.getElementById( $( this ).attr( 'href' ))) {
    e.preventDefault();
    $.scrollTo( ($( '#' + $( this ).attr( 'href' )).offset().top-100) + 'px', 500);
    return;
  }  
});

$( '#slide-out a' ).click( function(e) {
  e.preventDefault();
  
  var instance = M.Sidenav.getInstance( document.querySelector( '.sidenav' ));
  instance.close();
  
  $.scrollTo( $( '#' + $( this ).attr( 'href' )).offset().top - 110 , 500);
});

if ( window.ymaps ) {
  
  var zoom = 16;
  if ( window.matchMedia( '(max-width: 767px)' ).matches ) {
    zoom = 16;
  }
  
  ymaps.ready( function init(){ 
    var myMap = new ymaps.Map("map", {
      center: [55.6758526, 37.7620724],
      controls: ["zoomControl"],
      zoom: zoom
    });    
    
    var placemarks = [
      {
        coords: [55.67411928416459, 37.76492965908626],//Фитнес-клуб La Salute sports & relax club
        icon: 'sport.svg'
      },
      {
        coords: [55.67376806906387, 37.76042249999995],//ТРЦ «Люблино»
        icon: 'shop.svg'
      },
      {
        coords: [55.67733656904325, 37.765398999999995],//ТРЦ «Люблинский пассаж»
        icon: 'shop.svg'
      },
      {
        coords: [55.677942525990204, 37.80687899999994],//Люблинский парк
        icon: 'park.svg'
      },
      {
        coords: [55.68866163860446, 37.74970550000001],//Люблинский сквер
        icon: 'park.svg'
      },
      {
        coords: [55.67193750904794, 37.747594499999984],//Сквер им. М.П. Судакова
        icon: 'park.svg'
      },
      {
        coords: [55.67696050539645, 37.753002499999944],//Сквер им. Антона Чехова
        icon: 'park.svg'
      },
      {
        coords: [55.661572032170255, 37.7560025],//Парк Артема Боровика
        icon: 'park.svg'
      },
      {
        coords: [55.66137406145423, 37.76948649999991],//Дюссельдорфский парк
        icon: 'park.svg'
      }
    ];
    
    placemarks.forEach( function( item ) {
      
      var object = new ymaps.Placemark( item.coords, {}, {
        iconLayout: 'default#image',
        iconImageHref: yMapPlacemarksIconsSource + item.icon,
        iconImageSize: [52, 52],
        iconImageOffset: [-26,-26]
      });
      
      myMap.geoObjects.add( object );
    });
  
    var lclubPlacemark = new ymaps.Placemark([55.6749, 37.7628], {}, {
      iconLayout: 'default#image',
      iconImageHref: yMapPlacemarksIconsSource + 'lclub-logo.svg',
      iconImageSize: [84, 84],
      iconImageOffset: [-42,-42]
    });
    
    myMap.geoObjects.add( lclubPlacemark );
    
    if ( window.matchMedia( '(max-width: 767px)' ).matches ) {
      myMap.behaviors.disable( 'scrollZoom' ); 
    }
  });
}

$( '.b-form input[type=tel]' ).mask( '+0 (000) 000 00 00' );

$( '.b-form form' ).submit( function(e) {
  
  var tel = $( this ).find( 'input[type=tel]' ).val();
  
  if ( window.ComagicWidget ) {
    ComagicWidget.sitePhoneCall({phone:tel}, function(resp){if ( window.console ) {console.log(resp);}});
  }
});

$( '.b-filter .col.xl9' ).niceScroll();

$( '#filter-section-btn' ).click( function(e) {
  e.preventDefault();
  /*if ( $( '#filter-section' ).is( ':visible' )) {
    $.scrollTo( ($( '#filter-section-btn' ).offset().top-200) + 'px', 500 );
  } else {
    $.scrollTo( ($( '#filter-section-btn' ).offset().top+50) + 'px', 500 );
  }*/
  $( '#filter-section' ).slideToggle();
  $( '#filter-section-btn span' ).toggleClass( 'hide' );
}).click();

//gallery fotorama
if ( $.fotorama ) {
  $( window ).resize( function() {
    if ( window.matchMedia( "(max-width: 600px)" ).matches ) {
      $( '#gallery .fotorama' ).fotorama().data( 'fotorama' ).resize({
        width: '100%',
        ratio: 1
      });
    } else {
      $( '#gallery .fotorama' ).fotorama().data( 'fotorama' ).resize({
        width: '100%',
        ratio: '25/14'
      });
    }
  }).resize();
}

//fotorama arrows
setTimeout( function() {
  $( '.fotorama__wrap--toggle-arrows' ).addClass( 'fotorama__wrap--no-controls' );
}, 2000);

//call form co.magic
$( '.b-header-btn, .b-footer-btn' ).click( function(e) {
  e.preventDefault();
  var $comagicButton = $( '.comagic-c-sitephone-label__bubble.comagic-c-sitephone-label__bubble--solid:last' );
  if ( $comagicButton.length ) {
    $comagicButton.click();
  }
});

//banks, docs niceScroll
//$( '#banks .b-tabs__item, .b-docs-block' ).niceScroll();
$('.b-collapsible').each( function() {
  var $collapsible = $( this );
  $collapsible.find( '.b-collapsible-header' ).click( function(e) {
    e.preventDefault();
    if ( $( this ).is( '.btn' )) {
      $( this ).hide();
    }
    $collapsible.find( '.b-collapsible-body' ).slideToggle( function() {
      $.scrollTo( $( this ).closest( 'section' ), 500 );
    });
    $collapsible.toggleClass( 'i-active' );
  });
});

//animation
$( window ).scroll( function() {
  var top = $( document ).scrollTop() + parseInt( window.screen.height ) - 150;
  
  $( '.i-slide-top-animation' ).each( function() {
    if ( $( this ).offset().top < top ) {
      $( this ).addClass( 'i-animated' );
    }
  });
  
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
      
}).scroll();

//back link
$( '.b-close-link' ).click( function() {
  history.back();
});