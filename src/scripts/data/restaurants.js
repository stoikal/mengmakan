import CONFIG from '../globals/config';

const { BASE_URL } = CONFIG;

// see https://restaurant-api.dicoding.dev/
class Restaurants {
  static async list() {
    const response = await fetch(`${BASE_URL}/list`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async retrieve(id) {
    const response = await fetch(`${BASE_URL}/detail/${id}`);
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async search(query) {
    const response = await fetch(`${BASE_URL}/search/?q=${query}`);
    const responseJson = await response.json();
    return responseJson;
  }

  static async postReview(data) {
    const response = await fetch(`${BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

export default Restaurants;
