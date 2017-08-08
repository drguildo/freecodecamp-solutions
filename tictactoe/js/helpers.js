function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function id(id) {
  return document.getElementById(id);
}

function select(query) {
  return document.querySelector(query);
}

function selectAll(query) {
  return document.querySelectorAll(query);
}