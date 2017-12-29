function createImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function debounce(callback, delay) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      callback.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

browser.runtime.onMessage.addListener(({ type }, { tab }) => {
  if (type !== "scroll") {
    return;
  }
  debounce(updateTheme, 5)(tab);
});

async function updateTheme(tab) {
  let img = await createImageFromUrl(await browser.tabs.captureVisibleTab());

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  stackBlurImage(img, canvas, 15, false, 100);

  await browser.theme.update(tab.windowId, {
    colors: {
      accentcolor: "#efefef",
      textcolor: "black",
      toolbar: "rgba(0,0,0,0.1)"
    },
    images: {
      headerURL: canvas.toDataURL()
    }
  })
}

browser.tabs.onActivated.addListener(updateTheme);