import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
  }
  async init() {
    const response = await Promise.all([
      // this.api.countries(),
      this.api.cities(),
    ]);

    const [cities] = response;
    // this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCities(this.cities);
    return response;
  }

  serializeCities(cities) {
    //{ 'City name, Country name': {...} }
    return cities.reduce((acc, city) => {
      const key = `${city.name}, ${city.country_name}`;
      acc[city.code] = key;
      return acc;
    }, {});
  }

  createShortCities(cities) {
    return Object.entries(cities).reduce((acc, [key, value]) => {
      acc[value] = null;
      return acc;
    }, {});
  }
}

const locations = new Locations(api);

export default locations;
