'use strict';

(function () {
  var TIMEOUT_TIME = 10000;
  var SUCCESS_STATUS = 200;
  window.xhr = function (URL, onSuccess, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = TIMEOUT_TIME;
    xhr.open(method, URL);
    xhr.send(data);
  };
})();
