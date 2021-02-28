import puppeteer from 'puppeteer';
import {login, mainPage} from './selectors/twitter.js';
import user from './../creds.js';
import * as links from './constants/twitter.js';
import config from './../configs.js';

const NUMBER_OF_TWEETS = 2;

const postTweet = async (page, tweet, hasTagArray) => {

  await page.waitForSelector(mainPage.testIdTweetInp);
  await page.type(mainPage.testIdTweetInp, hasTagArray.join(' ')+' '+ tweet);
  await page.waitForSelector(mainPage.testIdTweetSubmitBtn);
  await page.click(mainPage.testIdTweetSubmitBtn);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false,slowMo: 50,defaultViewport: null }); 
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(links.TWITTER_LINK);
  await page.waitForSelector(login.loginButton);
  await page.click(login.loginButton);
  await page.waitForSelector(login.nameUserInp);
  await page.type(login.nameUserInp,user.username);
  await page.waitForSelector(login.namePassInp);
  await page.type(login.namePassInp,user.password);
  await page.waitForSelector(login.testIdLoginBtn);
  await page.click(login.testIdLoginBtn);
  await page.waitForSelector(mainPage.exploreLink);
  await page.click(mainPage.exploreLink);
  
  await page.goto(links.TWITTER_TRENDING_LINK, {"waitUntil" : "networkidle0"});
  await page.waitForSelector(mainPage.tagLink);
  const attr = await page.$$eval(mainPage.tagLink, el => el.map(x => x.textContent));
  //const attr = await page.$$eval(mainPage.tagLink, el => el.map(x => x.textContent));
  await page.goto(links.TWITTER_HOME_LINK);
  for (var i = 0; i < config.numberOfTweets; i++) {
    await postTweet(page, config.message, attr);
  } 
  console.log(attr);
  await browser.close();
})();



