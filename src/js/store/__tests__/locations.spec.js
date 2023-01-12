import locationsInstance, { Locations } from '../locations';
import api, { Api } from '../../services/apiService';

const cities = [{ country_name: 'Россия', name: 'Москва', code: 'MOS' }];
// придуманные данные для теста

jest.mock('../../services/apiService', () => {
  const mockApi = {
    // создаем фейковую функцию и передаем в нее колбек
    cities: jest.fn(() =>
      Promise.resolve([{ country_name: 'Россия', name: 'Москва', code: 'MOS' }])
    ),
  };

  // фейково возвращаем результат апи
  return {
    Api: jest.fn(() => mockApi),
  };
}); // создаем фейковый запрос апи для проверки

const apiService = new Api(); // передаем эту функцию в тест апи вызов

describe('Locations store tests', () => {
  beforeEach(() => {
    locationsInstance.cities = locationsInstance.serializeCities(cities);
  });
  // заранее подготовленные данные для теста

  it('Check that locationInstance is instance of Locations class', () => {
    expect(locationsInstance).toBeInstanceOf(Locations);
  });
  // проверяем что в locationsInstance есть класс Locations

  it('Success Locations instance create', () => {
    const instance = new Locations(api);
    expect(instance.api).toEqual(api);
    expect(instance.countries).toBe(null);
    expect(instance.cities).toBe(null);
    expect(instance.shortCitiesList).toBe(null);
    expect(instance.airlines).toEqual({});
  });
  // проверяем что в в конструкторе Locations есть данные с нужным нам значением

  it('Check correct cities serialize', () => {
    const res = locationsInstance.serializeCities(cities);
    const expectedData = {
      MOS: `Москва, Россия`,
    };

    expect(res).toEqual(expectedData);
  });

  it('Check correct cities createShort', () => {
    const res = locationsInstance.createShortCities({
      MOS: `Москва, Россия`,
    });
    const expectedData = {
      ['Москва, Россия']: null,
    };

    expect(res).toEqual(expectedData);
  });

  it('Check correct init method call', () => {
    const instance = new Locations(apiService);
    expect(instance.init()).resolves.toEqual([cities]); // в Locations.init , указывая что init это промис(.resolves), проверяем ответ
  });
});
