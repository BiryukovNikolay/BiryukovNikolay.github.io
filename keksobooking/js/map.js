'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_BUTTON = 1;
  var adFormHeader = document.querySelector('.ad-form-header');
  var form = document.querySelector('.ad-form');
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var onMapPinMain = function (evt) {
    if (evt.which === LEFT_BUTTON) {
      mapActivate();
    }
  };
  var disactivate = function () {
    window.util.setDisabled(mapFeatures);
    window.util.setDisabled(mapFilter);
    window.util.setDisabled(adFormHeader);
    window.util.setDisabled(adFormElement);
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    mapPinMain.addEventListener('mousedown', onMapPinMain);
  };


  var mapActivate = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.util.removeDisabled(mapFeatures);
    window.util.removeDisabled(adFormHeader);
    window.util.removeDisabled(adFormElement);
    window.filter.loadSamePins();
    window.util.removeDisabled(mapFilter);
    window.filter.reset();
    window.filter.update();
    mapPinMain.removeEventListener('mousedown', onMapPinMain);
  };

  disactivate();
  window.form.onMoveMainPin();
  window.form.submit(disactivate, map);

  mapPinMain.addEventListener('mousedown', onMapPinMain);

  mapPinMain.addEventListener('mouseup', function (evt) {
    if (evt.which === LEFT_BUTTON) {
      window.form.onMoveMainPin();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      mapActivate();
      window.form.onMoveMainPin();
    }
  });

  window.form.validatingRoomGuest();
  window.form.validatingTitle();
  window.form.validatingPrice();
  window.form.validatingType();
  window.form.validatingCheckInOut();
  window.form.reset();

  window.map = {
    disactivate: disactivate
  };
})();
