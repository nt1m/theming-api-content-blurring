// window.addEventListener("load", (e) => {
//   browser.runtime.sendMessage({"type": "scroll"});
// });

let scrolling = false;
let timeout = null;
window.addEventListener("scroll", (e) => {
  if (!scrolling) {
    scrolling = true;
    console.log("Scroll start")
    browser.runtime.sendMessage({"type": "scrollStart"});
  }
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(() => {
    if (scrolling) {
      scrolling = false;
      console.log("scroll end")
      browser.runtime.sendMessage({"type": "scrollEnd"});
    }
  }, 200);
});