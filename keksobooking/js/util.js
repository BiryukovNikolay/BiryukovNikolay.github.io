'use strict';
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 'Enter';

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEY) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY) {
      action();
      evt.preventDefault();
    }
  };

  var setHidden = function (element) {
    element.classList.add('hidden');
  };

  var setDisabled = function (arr) {
    for (var t = 0; t < arr.length; t++) {
      arr[t].setAttribute('disabled', 'disabled');
    }
  };

  var removeDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  };

  window.util = {
    setHidden: setHidden,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    setDisabled: setDisabled,
    removeDisabled: removeDisabled
  };
})();
