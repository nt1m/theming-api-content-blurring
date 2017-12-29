// window.addEventListener("load", (e) => {
//   browser.runtime.sendMessage({"type": "scroll"});
// });

window.addEventListener("scroll", (e) => {
  browser.runtime.sendMessage({"type": "scroll"});
});