import '../css/style.css';
import './plugins';
import api from './services/apiService';
import locations from './store/locations';
import formUI from './views/form';

document.addEventListener('DOMContentLoaded', () => {
  const valueOrigin = [];
  const valuedestination = [];

  // Autocomplete events
  formUI.origin.addEventListener('input', (el) => {
    if (el.data === null) {
      valueOrigin.pop();
    } else {
      valueOrigin.push(el.data);
    }

    if (!valueOrigin.length) {
      return;
    }

    let value = valueOrigin.join('');

    api.setSearchValue(value);
    initApp();
  });

  formUI.destination.addEventListener('input', (el) => {
    if (el.data === null) {
      valuedestination.pop();
    } else {
      valuedestination.push(el.data);
    }

    if (!valuedestination.length) {
      return;
    }

    let value = valuedestination.join('');

    api.setSearchValue(value);
    initApp();
  });

  // Events

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }
});
