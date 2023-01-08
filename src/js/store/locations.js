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

  // serializeCountries(countries) {
  //   // { 'Country code' : {...} }
  //   return countries.reduce((acc, country) => {
  //     acc[country.code] = country;
  //     return acc;
  //   }, {});
  // }

  // serializeCities(cities) {
  //   //{ 'City name, Country name': {...} }
  //   return cities.reduce((acc, city) => {
  //     console.log(city, '21121');
  // const country_name = this.getCountryCodeByKey(city.cointry_code);
  // console.log(country_name);
  //     const key = `${city.name},${country_name}`;
  //     acc[key] = {
  //       ...city,
  //       country_name,
  //     };
  //     return acc;
  //   }, {});
  // }

  // getCountryCodeByKey(code) {
  //   return this.countries[code].name;
  // }

  // getCityCodeByKey(key) {
  //   return this.cities[key].code;
  // }

  // createShortCities(cities) {
  //   return Object.entries(cities).reduce((acc, [key]) => {
  //     acc[key] = null;
  //     return acc;
  //   }, {});
  // }

  getCitiesByCountryCode(code) {
    return this.cities.filter((city) => city.country_code === code);
  }
}

const locations = new Locations(api);

export default locations;
