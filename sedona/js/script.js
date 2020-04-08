  var book = document.querySelector(".start-search-btn");
  var popup = document.querySelector(".popup-none");
  var form = popup.querySelector("form");
  var checkin = popup.querySelector("[name=check-in]");
  var checkout = popup.querySelector("[name=check-out]");
  var adult = popup.querySelector("[name=adult]");
  var children = popup.querySelector("[name=children]");
  var isStorageSupport = true;
  var storage = "";
  
  try {
    storage = localStorage.getItem("adult");
    storage = localStorage.getItem("children");
  } catch (err) {
    isStorageSupport = false;
  }

  book.addEventListener("click", function (evt) {
    popup.classList.toggle("popup");
    checkin.focus();
  });
  
  form.addEventListener("submit", function (evt) {
    if (!checkin.value || !checkout.value || !adult.value || !children.value) {
      evt.preventDefault();
      console.log("Нужно ввести Дату заезда, дату выезда и количество гостей");
    } else {
      if (isStorageSupport) {
      localStorage.setItem("adult", adult.value);
      localStorage.setItem("children", children.value);
      }
    }
  });
