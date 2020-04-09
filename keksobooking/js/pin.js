'use strict';
(function () {
  var OFFSET = 20;
  var QUANTITY_OF_PINS = 5;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var pinCopy = pin.cloneNode(true);
  var mapCard = map.querySelector('.map__card');
  var pinActive = document.querySelector('.map__pin--active');
  var removeOld = function () {
    pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var r = 0; r < pins.length; r++) {
      if (pins[0]) {
        mapPins.removeChild(pins[r]);
      }
    }
  };
  var removeCard = function () {
    pinActive = document.querySelector('.map__pin--active');
    if (mapCard) {
      map.removeChild(mapCard);
      pinActive.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onEscCard);
    }
  };

  var onRemoveCard = function () {
    removeCard();
  };

  var onEscCard = function (evt) {
    window.util.isEscEvent(evt, onRemoveCard);
  };

  var set = function (data) {
    mapCard = map.querySelector('.map__card');
    pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinsQuatity = data.length;
    if (data.length > QUANTITY_OF_PINS) {
      pinsQuatity = QUANTITY_OF_PINS;
    }
    removeCard();
    removeOld();

    var createPins = function (pinInfo) {
      pinCopy = pin.cloneNode(true);
      var avatar = pinCopy.querySelector('img');
      var left = pinInfo.location.x + OFFSET;
      var top = pinInfo.location.y + OFFSET;
      pinCopy.style.left = left + 'px';
      pinCopy.style.top = top + 'px';
      avatar.src = pinInfo.author.avatar;
      avatar.alt = pinInfo.offer.title;
      return pinCopy;
    };
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsQuatity; i++) {
      fragment.appendChild(createPins(data[i]));
    }
    mapPins.appendChild(fragment);

    var insertCard = function (t) {
      map.appendChild(window.card(t, data));
    };
    var onPinClick = function (pinCop, j) {
      pinCop.addEventListener('click', function () {
        mapCard = map.querySelector('.map__card');
        pinActive = map.querySelector('.map__pin--active');
        pinCop.classList.add('map__pin--active');
        if (mapCard) {
          removeCard();
        }
        if (pinActive) {
          pinActive.classList.remove('map__pin--active');
        }
        insertCard(j);
        mapCard = map.querySelector('.map__card');
        var cardClose = document.querySelector('.popup__close');
        cardClose.addEventListener('click', onRemoveCard);
        document.addEventListener('keydown', onEscCard);
      });
    };
    pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      onPinClick(pins[j], j);
    }
  };

  window.pin = {
    set: set,
    removeOld: removeOld,
    removeCard: removeCard
  };
})();

