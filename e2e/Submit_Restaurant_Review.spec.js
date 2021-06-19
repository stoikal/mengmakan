/* eslint-disable no-undef */
Feature('Submitting Restaurant Review');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('restaurant-card');

  I.click('pierce/.description-wrapper a');
});

Scenario.only('showing review form', ({ I }) => {
  I.seeElement('review-form');
});
