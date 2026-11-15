// panicquarium.com home: bubbles, tilting mode cards, buddy parade, screenshot viewer
var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

// bubbles in the hero
var bub = document.querySelector(".bubbles");
for (var i = 0; bub && !calm && i < 16; i++) {
  var s = document.createElement("span"), size = 6 + Math.random() * 20;
  s.style.cssText = "left:" + (Math.random() * 100) + "%;width:" + size + "px;height:" + size + "px;--wob:" + ((Math.random() - .5) * 60) + "px;animation-duration:" + (9 + Math.random() * 10) + "s;animation-delay:-" + (Math.random() * 14) + "s";
  bub.appendChild(s);
}

// buddy parade: a second copy of the list makes the loop seamless (hidden from screen readers and from calm mode)
var parade = document.querySelector(".parade ul");
if (parade) parade.querySelectorAll("li").forEach(function (li) {
  var c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); parade.appendChild(c);
});

// mode cards: tilt toward the mouse, layers drift by depth, bubbles splash out on enter
var fine = matchMedia("(hover: hover) and (pointer: fine)").matches && !calm;
document.querySelectorAll(".mode").forEach(function (card) {
  var scene = card.querySelector(".depth");
  if (!scene || !fine) return;
  card.addEventListener("pointermove", function (e) {
    var r = scene.getBoundingClientRect();
    var x = Math.max(-.5, Math.min(.5, (e.clientX - r.left) / r.width - .5));
    var y = Math.max(-.5, Math.min(.5, (e.clientY - r.top) / r.height - .5));
    scene.style.setProperty("--ry", (x * 12) + "deg");
    scene.style.setProperty("--rx", (-y * 9) + "deg");
    scene.style.setProperty("--mx", x);
    scene.style.setProperty("--my", y);
  });
  card.addEventListener("pointerleave", function () {
    ["--rx", "--ry", "--mx", "--my"].forEach(function (p) { scene.style.removeProperty(p); });
  });
  card.addEventListener("pointerenter", function () {
    scene.querySelectorAll(".d-left, .d-right").forEach(function (b) {
      for (var i = 0; i < 6; i++) {
        var s = document.createElement("span"), size = 6 + Math.random() * 14;
        s.className = "splash";
        s.style.cssText = "width:" + size + "px;height:" + size + "px;left:" + (b.offsetLeft + b.offsetWidth * (.2 + Math.random() * .6)) + "px;top:" + (b.offsetTop + b.offsetHeight * .3) + "px;--sx:" + ((Math.random() - .5) * 90) + "px;--sy:" + (-40 - Math.random() * 80) + "px;animation-delay:" + (Math.random() * .2) + "s";
        scene.appendChild(s);
        s.addEventListener("animationend", function () { this.remove(); });
      }
    });
  });
});

// screenshot viewer
var dlg = document.getElementById("viewer"), big = document.getElementById("viewer-img");
if (dlg && dlg.showModal) {
  document.querySelectorAll(".gallery button").forEach(function (b) {
    b.addEventListener("click", function () { var i = b.querySelector("img"); big.src = i.src; big.alt = i.alt; dlg.showModal(); });
  });
  dlg.addEventListener("click", function () { dlg.close(); });
}
