# Content blurring using Firefox's theming API

Greatly improve Firefox's performance with this demo.

## How it works?

- Uses runtime messaging to communicate page scrolls
- Uses `tabs.captureVisibleTab()` to the top of the page
- Uses a slightly modified version of stackblur.js to blur the capture
- Uses `theme.update(windowId, {headerURL: ...})` to update the browser theme

## Credits
- original version of stackblur.js: http://quasimondo.com/StackBlurForCanvas/StackBlurDemo.html