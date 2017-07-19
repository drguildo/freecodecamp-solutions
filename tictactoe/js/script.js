function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(function(el) {
    el.addEventListener("click", (event) => {
      console.log(event.target);
      event.target.textContent = "X";
    });
  });
});
