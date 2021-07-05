const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until,
  Key = webdriver.Key;

(async function example() {
  let driver = new webdriver.Builder()
    .setChromeOptions()
    .forBrowser('chrome')
    .build();
  try {
    await driver.get('http://remp-alb-1861535656.us-east-2.elb.amazonaws.com:8080/');
    driver.getTitle().then(function(title) {
      if(title === 'REMP') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();
