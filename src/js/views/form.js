import {
  getAutocompleteInstance,
  getDatepickerInstance,
} from '../plugins/materialize';
import api from '../services/apiService';

class FormUI {
  constructor(autocompleteInstance, datepickerInstance) {
    this._form = document.forms['locationsControls'];

    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');

    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatepicker = datepickerInstance(this.depart);
    this.returnDatepicker = datepickerInstance(this.return);

    this.origin.addEventListener('input', (el) => {
      console.log(el.data);
      api;
    });
    this.destination.addEventListener('input', (el) => {
      console.log(el.data);
    });
  }

  // getValueOriginInput

  get form() {
    this.$form;
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);

export default formUI;
