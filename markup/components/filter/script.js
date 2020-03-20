( function($) {

  'use strict';
  
  $( function() {
    
    new Tablesort( document.getElementById( 'filterTable' ) );
    
    $( '#filter' ).data({ Filter: new Filter( $( '#filter' )) });
  
    function Filter() {
      var self = this;
      
      init();
      
      function init() {
        initVars();
        initFilter();
        
        //public methods
        self.slideFilter = slideFilter;
        self.setValue = setValue;
      }
      
      function initVars() {
        self.flatsArray = [];
        self.flatsArrayFiltered = [];
        self.$filter = $( '.b-filter' );
        self.$input = $( '.b-filter input' );
        self.$tbody = $( '.b-filter table tbody' );
        self.$reset = $( '#filter-reset' );
        self.$rooms = $( "#filter-rooms" );
        self.$floors = $( "#filter-floors" );
        self.$square = $( "#filter-square" );
        self.$price = $( "#filter-price" );
      }
      
      function initFilter() {
        getArray();
        setReset();
        setModals();
        setEvents();
      }
      
      function setEvents() {
        self.$input.keydown( function(e) {
          if ( e.which !== 13 ) {
            return;
          }
          
          var $input = $( this );
          var id = $input.attr( 'id' );
          var val = $input.val()*1;
          var min, max;
          var sliderId = id.substring( 0, id.search( 'input' )-1 );
          var slider = sliderId.substring( id.search( '-' )+1 );
          
          if ( typeof val !== 'number' ) {
            return;
          }
          
          if ( String(id).search( 'min' ) !== -1 ) {
            min = val;
            max = $input.siblings( 'input' ).val() * 1;
            
            if ( min > $( "#" + sliderId + " .ui-slider-handle:eq(1) span" ).text()) {
              $input.val( $( "#" + sliderId + " .ui-slider-handle:eq(0) span" ).text());
              return;
            }
            if ( min < self[ '$' + slider ].slider( "option", "min" )) {
              min = self[ '$' + slider ].slider( "option", "min" );
              $input.val( min );
            }
          } else {
            max = val;
            min = $input.siblings( 'input' ).val() * 1;
            
            if ( max < $( "#" + sliderId + " .ui-slider-handle:eq(0) span" ).text()) {
              $input.val( $( "#" + sliderId + " .ui-slider-handle:eq(1) span" ).text());
              return;
            }
            if ( max > self[ '$' + slider ].slider( "option", "max" )) {
              max = self[ '$' + slider ].slider( "option", "max" );
              $input.val( max );
            }
          }
          
          //price
          $( "#" + sliderId ).slider( "values", 0, min );
          $( "#" + sliderId ).slider( "values", 1, max );
          $( "#" + sliderId + " .ui-slider-handle:eq(0) span" ).text( min );
          $( "#" + sliderId + " .ui-slider-handle:eq(1) span" ).text( max );
          
          slideFilter();
          
        });
      }
      
      function setValue( obj ) {
        //obj = { rooms: [1,2], floors: [4,6], square: [44,54], price: [10000000,12000000] };
        //rooms
        $( "#filter-rooms" ).slider( "values", 0, obj.rooms[0]);
        $( "#filter-rooms" ).slider( "values", 1, obj.rooms[1]);
        $( "#filter-rooms .ui-slider-handle:eq(0) span" ).text( obj.rooms[0]);
        $( "#filter-rooms .ui-slider-handle:eq(1) span" ).text( obj.rooms[1]);
        //floors
        $( "#filter-floors" ).slider( "values", 0, obj.floors[0]);
        $( "#filter-floors" ).slider( "values", 1, obj.floors[1]);
        $( "#filter-floors .ui-slider-handle:eq(0) span" ).text( obj.floors[0]);
        $( "#filter-floors .ui-slider-handle:eq(1) span" ).text( obj.floors[1]);
        //square
        $( "#filter-square" ).slider( "values", 0, obj.square[0]);
        $( "#filter-square" ).slider( "values", 1, obj.square[1]);
        $( "#filter-square .ui-slider-handle:eq(0) span" ).text( obj.square[0]);
        $( "#filter-square .ui-slider-handle:eq(1) span" ).text( obj.square[1]);
        //price
        $( "#filter-price" ).slider( "values", 0, obj.price[0]);
        $( "#filter-price" ).slider( "values", 1, obj.price[1]);
        $( "#filter-price-value" ).text( obj.price[0] + ' — ' + obj.price[1] + ' руб.' );
        
        slideFilter();
      }
      
      function setReset() {
        self.$reset.click( function() {
          setValue({ rooms:[self.$rooms.slider( "option", "min" ),self.$rooms.slider( "option", "max" )], floors:[self.$floors.slider( "option", "min" ),self.$floors.slider( "option", "max" )], square:[self.$square.slider( "option", "min" ),self.$square.slider( "option", "max" )], price:[self.$price.slider( "option", "min" ),self.$price.slider( "option", "max" )]});
          
          self.$input.each( function( $elem ) {
            var $input = $( this );
            var id = $input.attr( 'id' );
            var sliderId = id.substring( 0, id.search( 'input' )-1 );
            
            if ( String(id).search( 'min' ) !== -1 ) {
              $input.val( $( "#" + sliderId + " .ui-slider-handle:eq(0) span" ).text());
            } else {
              $input.val( $( "#" + sliderId + " .ui-slider-handle:eq(1) span" ).text());
            }
          });
        });        
      }
      
      function setRoomsSlider() {
        
        var minMaxCookie = getMinMaxFromCookie( 'rooms' );
        var minMax = getMinMax( 'FlatRoomsCount' );
        
        if ( !minMaxCookie ) {
          minMaxCookie = minMax;
        }
        
        self.$rooms.slider({
          range: true,
          min: minMax[0],
          max: minMax[1],
          values: [ minMaxCookie[0], minMaxCookie[1] ],
          create: function( event, ui ) {
            $( "#filter-rooms .ui-slider-handle:eq(0)" ).attr({ contenteditable: "true" }).append( '<span>' + minMaxCookie[0] + '</span>' );
            $( '#filter-rooms-input-min' ).val( minMaxCookie[0]);
            $( "#filter-rooms .ui-slider-handle:eq(1)" ).attr({ contenteditable: "true" }).append( '<span>' + minMaxCookie[1] + '</span>' );
            $( '#filter-rooms-input-max' ).val( minMaxCookie[1]);
          },
          slide: function( event, ui ) {
            $( "#filter-rooms .ui-slider-handle:eq(0) span" ).text( ui.values[ 0 ]);
            $( "#filter-rooms .ui-slider-handle:eq(1) span" ).text( ui.values[ 1 ]);
            $( '#filter-rooms-input-min' ).val( ui.values[ 0 ]);
            $( '#filter-rooms-input-max' ).val( ui.values[ 1 ]);
          },
          stop: slideFilter
        });
      }
      
      function setFloorsSlider() {
        
        var minMaxCookie = getMinMaxFromCookie( 'floors' );
        var minMax = getMinMax( 'FloorNumber' );
        
        if ( !minMaxCookie ) {
          minMaxCookie = minMax;
        }
        
        self.$floors.slider({
          range: true,
          min: minMax[0],
          max: minMax[1],
          values: [ minMaxCookie[0], minMaxCookie[1] ],
          create: function( event, ui ) {
            $( "#filter-floors .ui-slider-handle:eq(0)" ).attr({ contenteditable: "true" }).append( '<span>' + minMaxCookie[0] + '</span>' );
            $( '#filter-floors-input-min' ).val( minMaxCookie[0]);
            $( "#filter-floors .ui-slider-handle:eq(1)" ).attr({ contenteditable: "true" }).append( '<span>' + minMaxCookie[1] + '</span>' );
            $( '#filter-floors-input-max' ).val( minMaxCookie[1]);
          },
          slide: function( event, ui ) {
            $( "#filter-floors .ui-slider-handle:eq(0) span" ).text( ui.values[ 0 ]);
            $( "#filter-floors .ui-slider-handle:eq(1) span" ).text( ui.values[ 1 ]);
            $( '#filter-floors-input-min' ).val( ui.values[ 0 ]);
            $( '#filter-floors-input-max' ).val( ui.values[ 1 ]);
          },
          stop: slideFilter
        });
      }
      
      function setSquareSlider() {
        
        var minMaxCookie = getMinMaxFromCookie( 'square' );
        
        var minMax = getMinMax( 'TotalArea' );
        minMax = [ Math.floor( minMax[0] ), Math.ceil( minMax[1] )];
        
        if ( !minMaxCookie ) {
          minMaxCookie = minMax;
        }
        
        self.$square.slider({
          range: true,
          min: minMax[0],
          max: minMax[1],
          values: [ minMaxCookie[0], minMaxCookie[1] ],
          create: function( event, ui ) {
            $( "#filter-square .ui-slider-handle:eq(0)" ).attr({ contenteditable: "true" }).append( '<span>' + minMaxCookie[0] + '</span>' );
            $( '#filter-square-input-min' ).val( minMaxCookie[0]);
            $( "#filter-square .ui-slider-handle:eq(1)" ).attr({ contenteditable: "true" }).append( '<span>' + minMaxCookie[1] + '</span>' );
            $( '#filter-square-input-max' ).val( minMaxCookie[1]);
          },
          slide: function( event, ui ) {
            $( "#filter-square .ui-slider-handle:eq(0) span" ).text( ui.values[ 0 ]);
            $( "#filter-square .ui-slider-handle:eq(1) span" ).text( ui.values[ 1 ]);
            $( '#filter-square-input-min' ).val( ui.values[ 0 ]);
            $( '#filter-square-input-max' ).val( ui.values[ 1 ]);
          },
          stop: slideFilter
        });
      }
      
      function setPriceSlider() {
        
        var minMaxCookie = getMinMaxFromCookie( 'price' );
        var minMax = getMinMax( 'Price' );
        
        if ( !minMaxCookie ) {
          minMaxCookie = minMax;
        }
        
        
        self.$price.slider({
          range: true,
          min: minMax[0],
          max: minMax[1],
          step: 100,
          values: [ minMaxCookie[0], minMaxCookie[1] ],
          create: function( event, ui ) {
            $( '#filter-price-value' ).text( Number( minMaxCookie[0] ).toLocaleString('ru-RU') + ' — ' +  Number( minMaxCookie[1] ).toLocaleString('ru-RU') + ' руб.' );
          },
          slide: function( event, ui ) {
            $( "#filter-price-value" ).text( Number( ui.values[0] ).toLocaleString('ru-RU') + ' — ' + Number( ui.values[1] ).toLocaleString('ru-RU') + ' руб.' );
          },
          stop: slideFilter
        });
      }
      
      function getMinMaxFromCookie( sliderName ) {
        if ( Cookies.get( 'filter' )) {
          return JSON.parse( Cookies.get( 'filter' ))[ sliderName ];
        }
        return;
      }
      
      function getMinMax( arrayProp ) {
        var min = 1e15;
        var max = 0;
        
        self.flatsArray.forEach( function( elem ) {
          if ( 1*elem[ arrayProp ] && 1*elem[ arrayProp ] > max ) {
            max = 1*elem[ arrayProp ];
          }
          if ( 1*elem[ arrayProp ] && 1*elem[ arrayProp ] < min ) {
            min = 1*elem[ arrayProp ];
          }
        });
        
        if ( min === 1e15 && max === 0 ) {//when the prop is a string
          min = 0;
          max = 10;
        }
        
        return [ min, max ];
      }
      
      function getArray() {
        $.ajax({
          url: self.$tbody.data( 'json' ),
          type: self.$tbody.data( 'method' ),
          dataType: "json",
          success: function( data ) {
            self.flatsArray = data;
            setRoomsSlider();
            setFloorsSlider();
            setSquareSlider();
            setPriceSlider();
            setTimeout( function() {slideFilter();}, 100);
          },
          error: function() {}
        });
      }
      
      function slideFilter() {
        self.flatsArrayFiltered = self.flatsArray.filter( function( element ) {
          if ( (element.FlatRoomsCount >= self.$rooms.slider( "values", 0 ) && element.FlatRoomsCount <= self.$rooms.slider( "values", 1 )) &&
               (element.FloorNumber >= self.$floors.slider( "values", 0 ) && element.FloorNumber <= self.$floors.slider( "values", 1 )) &&
               (element.TotalArea >= self.$square.slider( "values", 0 ) && element.TotalArea <= self.$square.slider( "values", 1 )) &&
               (element.Price >= self.$price.slider( "values", 0 ) && element.Price <= self.$price.slider( "values", 1 )) ) {
            return true;
          }
        });
        
        renderResult();
        setCookie();
      }
      
      function setCookie() {
        var cookieValue = {
          "floors": [ self.$floors.slider( "values", 0 ), self.$floors.slider( "values", 1 )],
          "rooms": [ self.$rooms.slider( "values", 0 ), self.$rooms.slider( "values", 1 )],
          "square": [ self.$square.slider( "values", 0 ), self.$square.slider( "values", 1 )],
          "price": [ self.$price.slider( "values", 0 ), self.$price.slider( "values", 1 )],
          "filter": ""
        };
        Cookies.set( 'filter', cookieValue, { expires: 365, path: window.location.pathname });
      }
      
      function renderResult() {
        var html = "";
        
        self.flatsArrayFiltered.forEach( function( element ) {
          var cls = '';
          if ( element.Action ) {
            cls = " i-action";
          }
          html += "<tr class=\"modal-trigger" + cls + "\" data-flatroomscount=\"" + element.FlatRoomsCount + "\" data-sectionnumber=\"" + element.SectionNumber + "\" data-floornumber=\"" + element.FloorNumber + "\" data-totalarea=\"" + element.TotalArea + "\" data-layoutphoto=\"" + element.LayoutPhoto + "\" data-price=\"" + element.PriceFormat + "\" data-externalid=\"" + element.ExternalId + "\"><td data-sort=\"" + element.FloorNumber + "\">" + element.FloorNumber + " этаж<br><small>" + element.FloorsCount + " этажей<small></td><td>" + element.SectionNumber + "</td><td>" + element.TotalArea + "м<sup>2</sup></td><td>" + element.FlatRoomsCount + "</td><td data-sort=\"" + element.Price + "\">" + element.PriceFormat + " руб.</td><td><a href=\"" + self.$tbody.data( 'orderlink' ) + element.ExternalId + "\" class=\"btn\">Оставить заявку</a></td></tr>";
        });
        
        self.$tbody.html( html );
      }
    
      function setModals() {
        var instance = M.Modal.init( document.querySelector( '#modal1' ));
        //var instance = M.Modal.getInstance(elem);
        
        self.$filter.delegate( 'tbody tr', 'click', function() {
        
          var $tr = $( this );
          
          var fotoramaHtml = '';
          
          $tr.data( 'layoutphoto' ).split( ';' ).forEach( function( item ) {
            fotoramaHtml += '<div class="b-fotorama__frame"><div class="b-fotorama__container i-show"><span href="" style="background-image: url(\'' + item + '\');" class="b-fotorama__image"></span></div></div>';
          });
        
          $( '#modal1 .b-flat-modal__img' ).html( '<div class="b-fotorama i-contain"><div data-width="100%" data-height="450" data-arrows="true" data-click="true" data-swipe="true" data-autoplay="3000" data-loop="true" class="fotorama">' + fotoramaHtml + '</div></div>' );
          
          $( '#modal1 .b-flat-modal__text' ).html( '<b>Количество комнат:&nbsp;</b>' + $tr.data( 'flatroomscount' ) +'<br><b>Секция:&nbsp;</b>' + $tr.data( 'sectionnumber' ) + '<br><b>Этаж:&nbsp;</b>' + $tr.data( 'floornumber' ) + '<br><b>Площадь:&nbsp;</b>' + $tr.data( 'totalarea' ) + 'м<sup>2</sup><div class="b-flat-modal__price">' + $tr.data( 'price' ) + ' руб.</div><div class="b-flat-modal__btn"><a href="' + $( '.b-filter table tbody' ).data( 'orderlink' ) + $tr.data( 'externalid' ) + '" class="btn btn-large">Отправить заявку</a></div><div><!--<a href="/pdf/?id=' + $tr.data( 'externalid' ) + '" class="b-doc">Скачать pdf</a>--></div><div class="b-flat-modal__close"><a href="#!" class="modal-close">Вернуться к списку</a></div>' );
          
          instance.open();
          
          $( '#modal1 .b-flat-modal__img .fotorama' ).fotorama();
          
        });
      }
      
      self.$filter.delegate( '.btn', 'click', function(e) {
        e.stopPropagation();
      });
      
    }
    
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