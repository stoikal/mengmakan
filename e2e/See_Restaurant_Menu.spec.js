/* eslint-disable no-undef */
Feature('See Restaurant Menu');

Scenario.only('seeing restaurant menu', ({ I }) => {
  I.amOnPage('/');
  I.seeElement('restaurant-card');

  I.click('pierce/.description-wrapper a.name'); // click first restaurant in list

  I.seeElement('pierce/button.tab-title');
  I.see('Menu', 'pierce/button.tab-title:last-child');

  I.click('pierce/button.tab-title:last-child');
  I.see('Makanan', 'tab-content span b');
  I.see('Minuman', 'tab-content span b');
});
