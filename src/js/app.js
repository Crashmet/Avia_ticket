import '../css/style.css';
import './plugins';
import api from './services/apiService';
import locations from './store/locations';
import formUI from './views/form';

document.addEventListener('DOMContentLoaded', () => {
  const form = formUI.form;

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

  // Events
  form.addEventListener('submit', (e) => {
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

    api.getCitiesCode(origin, destination);

    console.log(
      api.getCitiesCode(origin, destination).then((e) => {
        console.log(e.destination.iata, e.origin.iata);
      })
    );

    console.log(origin, destination, depart_date, return_date);
  }
});
