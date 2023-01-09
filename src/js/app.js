import '../css/style.css';
import './plugins';
import api from './services/apiService';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';

document.addEventListener('DOMContentLoaded', () => {
  // Autocomplete events
  formUI.origin.addEventListener('input', (e) => {
    const origin = formUI.originValue;

    if (!origin.length) {
      return;
    }

    api.setSearchValue(origin);
    initApp();
  });

  formUI.destination.addEventListener('input', (e) => {
    const destination = formUI.destinationValue;

    if (!destination.length) {
      return;
    }

    api.setSearchValue(destination);
    initApp();
  });

  // Form event
  formUI.form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собираем формы из инпутов
    const origin = formUI.originValue;
    const destination = formUI.destinationValue;
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;

    // Получение валюты
    const currency = currencyUI.currecyValue;

    // получае код города
    let originSityCode;
    let destinationSityCode;

    await api.getCitiesCode(origin, destination).then((e) => {
      originSityCode = e.origin.iata;
      destinationSityCode = e.destination.iata;
    });

    await locations.fetchTickets({
      originSityCode,
      destinationSityCode,
      depart_date,
      return_date,
      currency,
    });
  }
});
