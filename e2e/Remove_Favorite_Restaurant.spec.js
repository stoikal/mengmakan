/* eslint-disable no-undef */
Feature('Removing Restaurant from Favorites');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('restaurant-card');

  // liking first restaurant on the list
  I.click('pierce/button.like-button');
});

Scenario('unliking restaurant on favorites page', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.seeElement('restaurant-card');

  I.click('pierce/button.like-button');

  I.dontSeeElement('restaurant-card');
  I.see('Belum ada restoran yang ditambahkan ke favorit!', 'p');
});

Scenario('unliking restaurant on detail page', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.seeElement('restaurant-card');

  I.click('pierce/.description-wrapper a.name');

  I.seeElement('like-button');
  I.click('pierce/#like-button');

  I.amOnPage('/#/favorites');

  I.dontSeeElement('restaurant-card');
  I.see('Belum ada restoran yang ditambahkan ke favorit!', 'p');
});

Scenario('unliking restaurant on list page', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.seeElement('restaurant-card');

  I.amOnPage('/');
  I.click('pierce/button.like-button');

  I.amOnPage('/#/favorites');
  I.dontSeeElement('restaurant-card');
  I.see('Belum ada restoran yang ditambahkan ke favorit!', 'p');
});
