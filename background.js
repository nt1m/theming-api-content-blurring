function createImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

let toUpdate = new Set();

browser.runtime.onMessage.addListener(({ type }, { tab }) => {
  switch (type) {
    case "scrollStart":
      toUpdate.add(tab.windowId);
      loop(tab.windowId);
      break;
    case "scrollEnd":
      toUpdate.delete(tab.windowId);
      break;
  }
});

async function loop(windowId) {
  await updateTheme(windowId);
  if (toUpdate.has(windowId)) {
    setTimeout(async () => await loop(windowId), 10);
  }
}
async function updateTheme(windowId) {
  let img = await createImageFromUrl(await browser.tabs.captureVisibleTab());

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  stackBlurImage(img, canvas, 15, false, 100);
  let [r, g, b] = [255,255,255]
  //let [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

  await browser.theme.update(windowId, {
    colors: {
      accentcolor: `rgb(${r},${g},${b})`,
      textcolor: "black",
      toolbar: "rgba(0,0,0,0.1)"
    },
    images: {
      headerURL: canvas.toDataURL()
    }
  })
}

browser.tabs.onActivated.addListener((tab) => updateTheme(tab.windowId));