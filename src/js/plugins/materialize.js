import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Innit select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

//Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

//Init Datepicker
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
  showClearBtn: true,
});

export function getDatepickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}