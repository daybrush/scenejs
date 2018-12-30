
(function () {
  var nav = document.querySelector("nav");
  var searchBar = nav.querySelector(".search");
  var input = searchBar.querySelector("input");
  // var submit = searchBar.querySelector("button");
  var items = Array.prototype.slice.call(document.querySelectorAll("nav>ul li a"));
  var strings = items.map(function (a) {
    return a.innerText.toLowerCase();
  });
  input.addEventListener("keyup", function (e) {
    var value = input.value.toLowerCase();

    if (value) {
      utils.addClass(nav, "searching");
    } else {
      utils.removeClass(nav, "searching");
      return;
    }
    strings.forEach(function (v, i) {
      var item = items[i];
      if (utils.hasClass(item.parentNode, "parent")) {
        item = item.parentNode;
      }
      if (v.indexOf(value) > -1) {
        utils.addClass(item, "targeting");
      } else {
        utils.removeClass(item, "targeting");
      }
    });
  });
})();