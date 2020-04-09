'use strict';
(function () {

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingTypeSelected = housingType.options.selectedIndex;
  var housingTypeValue = housingType.options[housingTypeSelected].value;

  var housingPrice = document.querySelector('#housing-price');
  var housingPriceSelected = housingPrice.options.selectedIndex;
  var housingPriceValue = housingPrice.options[housingPriceSelected].value;

  var housingRooms = document.querySelector('#housing-rooms');
  var housingRoomsSelected = housingRooms.options.selectedIndex;
  var housingRoomsValue = housingRooms.options[housingRoomsSelected].value;

  var housingGuests = document.querySelector('#housing-guests');
  var housingGuestsSelected = housingGuests.options.selectedIndex;
  var housingGuestsValue = housingGuests.options[housingGuestsSelected].value;

  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var cards = [];
  var loadSamePins = function () {
    var onSuccess = function (data) {
      cards = data;
      window.pin.set(cards);
    };
    var onError = function () {
    };
    window.xhr(URL_GET, onSuccess, onError, 'GET');
  };

  var updatePins = function () {

    var sameType = cards.filter(function (it) {
      if (housingTypeValue === 'any') {
        return cards;
      }
      return it.offer.type === housingTypeValue;
    });

    var samePrice = sameType.filter(function (it) {
      if (housingPriceValue === 'low') {
        return it.offer.price < LOW_PRICE;
      } else if (housingPriceValue === 'high') {
        return it.offer.price > HIGH_PRICE;
      } else if (housingPriceValue === 'middle') {
        return (it.offer.price > LOW_PRICE && it.offer.price < HIGH_PRICE);
      }
      return sameType;
    });

    var sameRooms = samePrice.filter(function (it) {
      if (housingRoomsValue !== 'any') {
        return it.offer.rooms === Number(housingRoomsValue);
      }
      return samePrice;
    });

    var sameGuests = sameRooms.filter(function (it) {
      if (housingGuestsValue !== 'any') {
        return it.offer.guests === Number(housingGuestsValue);
      }
      return sameRooms;
    });

    var setSameFeatures = function () {
      var featuresCheck = function () {
        var featuresChecked = [];
        housingFeatures.forEach(function (that) {
          if (that.checked) {
            featuresChecked.push(that.value);
          }
        });
        return featuresChecked;
      };
      var sameFeaturesArray = sameGuests;
      var features = featuresCheck();
      if (features[0]) {
        for (var i = 0; i < features.length; i++) {
          sameFeaturesArray = sameFeaturesArray.filter(function (it) {
            return it.offer.features.includes(features[i]);
          });
        }
        return sameFeaturesArray;
      }
      return sameGuests;
    };
    var filteredCards = setSameFeatures();
    window.pin.set(filteredCards);
  };

  var updateType = function () {
    housingType.addEventListener('change', window.debounce(function () {
      housingTypeSelected = housingType.options.selectedIndex;
      housingTypeValue = housingType.options[housingTypeSelected].value;
      updatePins();
    }));
  };

  var updatePrice = function () {
    housingPrice.addEventListener('change', window.debounce(function () {
      housingPriceSelected = housingPrice.options.selectedIndex;
      housingPriceValue = housingPrice.options[housingPriceSelected].value;
      updatePins();
    }));
  };

  var updateRooms = function () {
    housingRooms.addEventListener('change', window.debounce(function () {
      housingRoomsSelected = housingRooms.options.selectedIndex;
      housingRoomsValue = housingRooms.options[housingRoomsSelected].value;
      updatePins();
    }));
  };

  var updateGuests = function () {
    housingGuests.addEventListener('change', window.debounce(function () {
      housingGuestsSelected = housingGuests.options.selectedIndex;
      housingGuestsValue = housingGuests.options[housingGuestsSelected].value;
      updatePins();
    }));
  };

  var updateFeatures = function () {
    for (var i = 0; i < housingFeatures.length; i++) {
      housingFeatures[i].addEventListener('change', window.debounce(function () {
        updatePins();
      }));
    }
  };

  var update = function () {
    updateType();
    updatePrice();
    updateRooms();
    updateGuests();
    updateFeatures();
  };

  var reset = function () {
    mapFilters.reset();
  };

  window.filter = {
    reset: reset,
    update: update,
    loadSamePins: loadSamePins
  };
})();
