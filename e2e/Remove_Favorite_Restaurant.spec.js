/* eslint-disable no-undef */
Feature('Removing Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('restaurant-card');

  // liking first restaurant on the list
  I.click('pierce/button.like-button');
});

Scenario('removing restaurant from favorites', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.seeElement('restaurant-card');

  I.click('pierce/button.like-button');

  I.dontSeeElement('restaurant-card');
});
