( function($) {

  'use strict';
  
  $( function() {
  
    var flatsArray = [];
    var flatsArrayFiltered = [];
    var $tbody = $( '.b-filter table tbody' );
    
    $( '#filter-reset' ).click( function() {
      //rooms
      $( "#filter-rooms" ).slider( "values", 0, $( "#filter-rooms" ).slider( "option", "min" ));
      $( "#filter-rooms" ).slider( "values", 1, $( "#filter-rooms" ).slider( "option", "max" ));
      //floors
      $( "#filter-floors" ).slider( "values", 0, $( "#filter-floors" ).slider( "option", "min" ));
      $( "#filter-floors" ).slider( "values", 1, $( "#filter-floors" ).slider( "option", "max" ));
      //square
      $( "#filter-square" ).slider( "values", 0, $( "#filter-square" ).slider( "option", "min" ));
      $( "#filter-square" ).slider( "values", 1, $( "#filter-square" ).slider( "option", "max" ));
      //price
      $( "#filter-price" ).slider( "values", 0, $( "#filter-price" ).slider( "option", "min" ));
      $( "#filter-price" ).slider( "values", 1, $( "#filter-price" ).slider( "option", "max" ));
      
      slideFilter();
    });
    
    $( "#filter-rooms" ).slider({
      range: true,
      min: 1,
      max: 4,
      values: [ 1, 4 ],
      create: function( event, ui ) {
        $( "#filter-rooms .ui-slider-handle:eq(0)" ).append( '<span>1</span>' );
        $( "#filter-rooms .ui-slider-handle:eq(1)" ).append( '<span>4</span>' );
      },
      slide: function( event, ui ) {
        $( "#filter-rooms .ui-slider-handle:eq(0) span" ).text( ui.values[ 0 ]);
        $( "#filter-rooms .ui-slider-handle:eq(1) span" ).text( ui.values[ 1 ]);
      },
      stop: slideFilter
    });
    
    $( "#filter-floors" ).slider({
      range: true,
      min: 1,
      max: 22,
      values: [ 1, 22 ],
      create: function( event, ui ) {
        $( "#filter-floors .ui-slider-handle:eq(0)" ).append( '<span>1</span>' );
        $( "#filter-floors .ui-slider-handle:eq(1)" ).append( '<span>22</span>' );
      },
      slide: function( event, ui ) {
        $( "#filter-floors .ui-slider-handle:eq(0) span" ).text( ui.values[ 0 ]);
        $( "#filter-floors .ui-slider-handle:eq(1) span" ).text( ui.values[ 1 ]);
      },
      stop: slideFilter
    });
    
    $( "#filter-square" ).slider({
      range: true,
      min: 44,
      max: 118,
      values: [ 44, 118 ],
      create: function( event, ui ) {
        $( "#filter-square .ui-slider-handle:eq(0)" ).append( '<span>44</span>' );
        $( "#filter-square .ui-slider-handle:eq(1)" ).append( '<span>118</span>' );
      },
      slide: function( event, ui ) {
        $( "#filter-square .ui-slider-handle:eq(0) span" ).text( ui.values[ 0 ]);
        $( "#filter-square .ui-slider-handle:eq(1) span" ).text( ui.values[ 1 ]);
      },
      stop: slideFilter
    });
    
    $( "#filter-price" ).slider({
      range: true,
      min: 11429400,
      max: 31292400,
      step: 100,
      values: [ 11429400, 31292400 ],
      create: function( event, ui ) {
        $( '#filter-price-value' ).text( '11429400 — 31292400 руб.' );
      },
      slide: function( event, ui ) {
        $( "#filter-price-value" ).text( ui.values[0] + ' — ' + ui.values[1] + ' руб.' );
      },
      stop: slideFilter
    });
  
    $.ajax({
      url: $tbody.data( 'json' ),
      type: $tbody.data( 'method' ),
      dataType: "json",
      success: function( data ) {
        flatsArray = data;
        setTimeout( function() {slideFilter();}, 100);
      },
      error: function() {}
    });
    
    function slideFilter() {
      flatsArrayFiltered = flatsArray.filter( function( element ) {
        if ( (element.FlatRoomsCount >= $( "#filter-rooms" ).slider( "values", 0 ) && element.FlatRoomsCount <= $( "#filter-rooms" ).slider( "values", 1 )) &&
             (element.FloorNumber >= $( "#filter-floors" ).slider( "values", 0 ) && element.FloorNumber <= $( "#filter-floors" ).slider( "values", 1 )) &&
             (element.TotalArea >= $( "#filter-square" ).slider( "values", 0 ) && element.TotalArea <= $( "#filter-square" ).slider( "values", 1 )) &&
             (element.Price >= $( "#filter-price" ).slider( "values", 0 ) && element.Price <= $( "#filter-price" ).slider( "values", 1 )) ) {
          return true;
        }
      });
      
      renderResult();
    }
    
    function renderResult() {
      var html = "";
      
      flatsArrayFiltered.forEach( function( element ) {
        var cl = '';
        if ( element.Action ) {
          cl = " i-action";
        }
        html += "<tr class=\"modal-trigger" + cl + "\" data-flatroomscount=\"" + element.FlatRoomsCount + "\" data-sectionnumber=\"" + element.SectionNumber + "\" data-floornumber=\"" + element.FloorNumber + "\" data-totalarea=\"" + element.TotalArea + "\" data-layoutphoto=\"" + element.LayoutPhoto + "\" data-price=\"" + element.PriceFormat + "\" data-externalid=\"" + element.ExternalId + "\" ><td>" + element.FloorNumber + " этаж<br><small>" + element.FloorsCount + " этажей<small></td><td>" + element.SectionNumber + "</td><td>" + element.TotalArea + "м<sup>2</sup></td><td>" + element.FlatRoomsCount + "</td><td>" + element.PriceFormat + " руб.</td><td><a href=\"" + $tbody.data( 'orderlink' ) + element.ExternalId + "\" class=\"btn\">Оставить заявку</a></td></tr>";
      });
      
      $tbody.html( html );
    }
    
    //modals
    var instance = M.Modal.init( document.querySelector( '#modal1' ));
    //var instance = M.Modal.getInstance(elem);
    
    $( '.b-filter' ).delegate( 'tr', 'click', function() {
    
      $( '#modal1 .b-flat-modal__img' ).html( '<img src="' + $( this ).data( 'layoutphoto' ) + '" alt="">' );
      
      $( '#modal1 .b-flat-modal__text' ).html( '<b>Количество комнат:&nbsp;</b>' + $( this ).data( 'flatroomscount' ) +'<br><b>Секция:&nbsp;</b>' + $( this ).data( 'sectionnumber' ) + '<br><b>Этаж:&nbsp;</b>' + $( this ).data( 'floornumber' ) + '<br><b>Площадь:&nbsp;</b>' + $( this ).data( 'totalarea' ) + '<div class="b-flat-modal__price">' + $( this ).data( 'price' ) + '</div><div class="b-flat-modal__btn"><a href="' + $( '.b-filter table tbody' ).data( 'orderlink' ) + $( this ).data( 'externalid' ) + '" class="btn btn-large">Отправить заявку</a></div><div class="b-flat-modal__close"><a href="#!" class="modal-close">Вернуться к списку</a></div>' );
      
      instance.open();
      
    });
    
    $( '.b-filter' ).delegate( '.btn', 'click', function(e) {
      e.stopPropagation();
    });
    
    $( '#filter-btn' ).click( function(e) {
      e.preventDefault();
      
      if ( $( '#filter-btn span:visible' ).is( '.i-show' )) {
        $( '#filter' ).slideDown();
        $( '#filter-btn span' ).show();
        $( '#filter-btn span.i-show' ).hide();
      } else {
        $( '#filter' ).slideUp();
        $( '#filter-btn span' ).hide();
        $( '#filter-btn span.i-show' ).show();
      }
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));