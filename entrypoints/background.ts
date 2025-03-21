export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  // backgroud task run interval
  // add a task to echo current datetime in "Y-m-d H:i:s" format in console every 1 second
  // setInterval(() => {
  //   console.log(
  //     new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" })
  //   );
  // }, 1000);

  // run after extension installed
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    console.log("reason+", reason);

    if (reason !== "install") return;

    // Open a tab on install
    await browser.tabs.create({
      // url: browser.runtime.getURL("/json-parser.html"),
      url: browser.runtime.getURL("/misc-tools.html"),
      active: true,
    });
  });
});
