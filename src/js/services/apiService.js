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
    // this.destinationValue = destinationValue;
  }

  setSearchValue(inputValue) {
    this.searchValue = inputValue;
    this.cities();
  }
  // async countries() {
  //   try {
  //     const response = await axios.get(
  //       `${this.url}locale=ru&types[]=country&term=a`
  //     );
  //     return response.data;
  //   } catch (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  // }

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
  async prices(params) {}
}

const api = new Api(config);

export default api;
