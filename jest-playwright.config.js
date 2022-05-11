module.exports = {
  browsers: ["chromium"],
  exitOnPageError: false,
  launchOptions: {
    devtools: false,
    headless: false,
    slowMo: 1000
  },
  contextOptions: {
    ignoreHTTPSErrors: true,
  },
  args: [
    '--no-sandbox',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding'
  ],
  serverOptions: {
    command: `yarn start --port 3000`,
    port: 3000,
    launchTimeout: 10000,
    debug: true,
    options: {
      env: {
        "BROWSER": "none"
      }
    }
  }
}