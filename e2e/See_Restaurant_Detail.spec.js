/* eslint-disable no-undef */
Feature('See Restaurant Detail');

const restaurant = {
  address: 'Jl Pemuda no 17',
  categories: [{ name: 'French' }],
  city: 'Medan',
  customerReviews: [
    { name: 'customer', review: 'very good', date: '1 Januari 2021' },
  ],
  description: 'Restaurant description described descriptively',
  id: 'restaurant_id',
  menus: {
    drinks: [{ name: 'Cendolle Daweutte' }],
    foods: [{ name: 'Ser aux Bie' }],
  },
  name: "L'escargot",
  pictureId: '1',
  rating: 4.8,
};

Before(({ I }) => {
  I.amOnPage('/');

  I.mockRequest('GET', 'https://restaurant-api.dicoding.dev/detail/*', { error: false, message: 'success', restaurant });

  I.click('pierce/.description-wrapper a.name');
});

Scenario('seeing restaurant detail', ({ I }) => {
  const {
    name, address, city, rating, categories, description, customerReviews,
  } = restaurant;

  I.see(name, { css: 'h2' });
  I.see(`${address}, ${city}`, { css: 'div[name="restaurant-detail"] > span' });
  I.see(rating, { css: 'div[name="restaurant-detail"] > span' });
  I.see(categories.reduce((res, { name: ctg }) => (res ? `${res}, ${ctg}` : ctg), ''), { css: 'div[name="restaurant-detail"] > span' });
  I.see(description, { css: 'div[name="restaurant-detail"] > p' });

  customerReviews.forEach(({ name: reviewer, review }) => {
    I.see(reviewer, { css: 'div[name="review-item"] b' });
    I.see(review, { css: 'div[name="review-item"] p' });
  });
});

Scenario('seeing restaurant menu', ({ I }) => {
  I.seeElement('pierce/button.tab-title');
  I.see('Menu', 'pierce/button.tab-title:last-child');

  I.click('pierce/button.tab-title:last-child');
  I.see('Makanan', 'tab-content span b');
  I.see('Minuman', 'tab-content span b');

  restaurant.menus.drinks.forEach(({ name: drink }) => {
    I.see(drink, { css: 'li' });
  });

  restaurant.menus.foods.forEach(({ name: food }) => {
    I.see(food, { css: 'li' });
  });
});
