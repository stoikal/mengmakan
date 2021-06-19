/* eslint-disable no-undef */
Feature('Submitting Restaurant Review');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('restaurant-card');
  pause();
  // I.click('pierce/.description-wrapper a');
});

Scenario('showing review form', ({ I }) => {
  // I.seeElement();
});
