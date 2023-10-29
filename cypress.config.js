const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
          // implement node event listeners here
        on('task', {
          log(message) {
            console.log(...message);
            return null;
            },
        });
       // on('task', {downloadFile});
    },
    baseUrl: "https://www.epam.com",
  },
});
