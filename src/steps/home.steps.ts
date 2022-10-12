import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When } from '@cucumber/cucumber';

Given(
  'I went to the Sleek SG {string} page',
  async function (this: ICustomWorld, page_name: string) {
    const page = this.page!;
    let path = '';
    if (page_name === 'Home') {
      path = '';
    }
    await page.goto(config.SLEEK_URL + path);
  },
);

When('I click on the {string} link', async function (this: ICustomWorld, link: string) {
  const page = this.page!;
  let button_locator = '';
  if (link === 'Pricing') {
    button_locator = 'li[id="menu-item-36831"]';
  }
  page.locator(button_locator).click();
  await page.waitForSelector('a[id="home-lets-talk"]');
});
