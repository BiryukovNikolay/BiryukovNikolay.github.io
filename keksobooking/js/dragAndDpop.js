'use strict';

(function () {
  var PIN_HEIGHT = 85;
  var PIN_WIDTH = 65;
  var Y_TOP_STOP = 130;
  var Y_BOTTOM_STOP = 680 - PIN_HEIGHT;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainSize = document.querySelector('main').offsetWidth;
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = true;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = false;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var finishY = (mapPinMain.offsetTop - shift.y);
      var finishX = (mapPinMain.offsetLeft - shift.x);
      if (finishX > mainSize - (PIN_WIDTH / 2)) {
        mapPinMain.style.left = mainSize - (PIN_WIDTH / 2) + 'px';
      } else if (finishX < 0) {
        mapPinMain.style.left = 0 - PIN_WIDTH / 2 + 'px';
      } else {
        mapPinMain.style.left = finishX + 'px';
      }

      if (finishY > Y_BOTTOM_STOP) {
        mapPinMain.style.top = Y_BOTTOM_STOP + 'px';
      } else if (finishY < Y_TOP_STOP) {
        mapPinMain.style.top = Y_TOP_STOP + 'px';
      } else {
        mapPinMain.style.top = finishY + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        mapPinMain.removeEventListener('click', onClickPreventDefault);
      };
      mapPinMain.addEventListener('click', onClickPreventDefault);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.startCoords = startCoords;
  });
})();
