import api from '../services/apiService';

export class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = {};
  }

  async init() {
    const response = await Promise.all([
      this.api.cities(),
      // this.api.airlines(),
    ]);
    console.log(response);

    const [cities] = response;
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCities(this.cities);
    // this.airlines = this.serializeAirlines(airlines);
    return response;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const key = `${city.name}, ${city.country_name}`;
      acc[city.code] = key;
      return acc;
    }, {});
  }

  createShortCities(cities) {
    return Object.entries(cities).reduce((acc, [, value]) => {
      acc[value] = null;
      return acc;
    }, {});
  }

  async fetchTickets(params) {
    console.log(params);
    const response = await this.api.prices(params);
  }
}

const locations = new Locations(api);

export default locations;
