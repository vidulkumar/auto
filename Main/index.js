import puppeteer from 'puppeteer';
import {login} from './selectors/twitter.js';

(async () => {
  const browser = await puppeteer.launch({ headless: false,slowMo: 100 }); 
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.twitter.com');
  await page.waitForSelector(login.loginButton);
  await page.click(login.loginButton);
  await page.waitForSelector(login.nameUserInp);
  await page.type(login.nameUserInp,'vidulkumar');
  await page.waitForSelector(login.namePassInp);
  await page.type(login.namePassInp,'newtotwitter');
  await page.waitForSelector(login.testIdLoginBtn);
  await page.click(login.testIdLoginBtn);
  
  await browser.close();
})();