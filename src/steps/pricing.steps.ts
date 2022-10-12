import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then(
  'I should be navigated to the Sleek SG {string} page',
  async function (this: ICustomWorld, page_name: string) {
    const page = this.page!;
    let checkButton = '';
    let button_text_value = '';

    if (page_name === 'Pricing') {
      checkButton = 'div[data-id="d366e72"] > div > a';
      button_text_value = '/sg/corporate-secretary-singapore/';
    }

    const button_text = await page.locator(checkButton).getAttribute('href');
    expect(button_text).toEqual(button_text_value);
  },
);

Given('I am on the Sleek SG {string} page', async function (this: ICustomWorld, page_name: string) {
  const page = this.page!;
  await page.goto(config.SLEEK_URL);
  let button_locator = '';
  if (page_name === 'Pricing') {
    button_locator = 'li[id="menu-item-36831"]';
  }
  page.locator(button_locator).click();
  await page.waitForSelector('a[id="home-lets-talk"]');
});

When('I click on Find out more button', async function (this: ICustomWorld) {
  const page = this.page!;

  const findOutMoreButton = 'div[data-id="d366e72"] > div > a';

  await page.locator(findOutMoreButton).click();
  await page.waitForSelector('select[id="no_of_shareholders"]');
});

When('I choose {string} option', async function (this: ICustomWorld, option: string) {
  const page = this.page!;

  const selectorOption = 'select[id="no_of_shareholders"]';
  let value = '';

  if (option === '2 Shareholders') {
    value = '2';
  } else if (option === '6 - 9 Shareholders') {
    value = '6-9';
  } else if (option === '> 30 Shareholders') {
    value = '>30';
  }

  await page.locator(selectorOption).hover();
  const selector_element = page.locator(selectorOption);

  await selector_element.selectOption(value);

  // await page.locator(selectorOption + `> [value=${value}]`).click();
  await page.waitForSelector('div[id="text_new_amount"] > p');
});

Then(
  'Verify corporate secretary details are correct: {string}',
  async function (this: ICustomWorld, price_expected: string) {
    const page = this.page!;
    const price_value = await page.locator('div[id="text_new_amount"] > p').textContent();
    expect(price_expected).toEqual(price_value);
  },
);
