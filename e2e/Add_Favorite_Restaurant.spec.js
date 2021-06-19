/* eslint-disable no-undef */
const assert = require('assert');

Feature('Adding Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorites page', async ({ I }) => {
  I.see('Belum ada restoran yang ditambahkan ke favorit!', 'p');
});

Scenario('adding a restaurant to favorites', async ({ I }) => {
  I.see('Belum ada restoran yang ditambahkan ke favorit!', 'p');

  I.amOnPage('/');
  I.seeElement('restaurant-card');

  // grab the name of first restaurant && click the link
  const restaurantName = await I.grabTextFrom('pierce/.description-wrapper a.name'); // pierce is puppeteer selector feature to access shadow DOM
  I.click('pierce/.description-wrapper a.name');

  I.seeElement('like-button');
  I.click('pierce/#like-button');

  I.amOnPage('/#/favorites');
  I.seeElement('restaurant-card');

  const likedRestaurant = await I.grabTextFrom('pierce/.description-wrapper a.name');

  assert.strictEqual(likedRestaurant, restaurantName);
});
