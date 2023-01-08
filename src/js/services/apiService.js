import axios from 'axios';
import config from '../config/apiConfig';

/**
 * /countries - array of countries
 * /cities - array of cities
 * /prices/cheap - array
 */

class Api {
  constructor(config) {
    this.url = config.url;
    this.key = config.key;
    this.searchValue = null;
  }

  setSearchValue(inputValue) {
    this.searchValue = inputValue;
    this.cities();
  }

  async cities() {
    try {
      const response = await axios.get(
        `${this.url}locale=ru&types[]=city&term=${this.searchValue}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async getCitiesCode(origin, destination) {
    const cityOrigin = origin.split(',').splice(0, 1).join('');
    const cityDestination = destination.split(',').splice(0, 1).join('');

    try {
      const response = await axios.get(
        `https://www.travelpayouts.com/widgets_suggest_params?q=Из%20${cityOrigin}%20в%20${cityDestination}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async prices(params) {}
}

const api = new Api(config);

export default api;
