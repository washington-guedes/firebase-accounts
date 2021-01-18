import Toastify from 'toastify-js';

export class ToastService {
  constructor() {
    this.defaults = {
      position: 'center',
      close: true,
    };

    this.toast = (text, backgroundColor) => {
      Toastify({
        text,
        backgroundColor,
        ...this.defaults,
      }).showToast();
    };
  }

  error(text) {
    this.toast(text, 'darkred');
  }

  warn(text) {
    this.toast(text, 'orange');
  }

  success(text) {
    this.toast(text, 'darkgreen');
  }
}

export default ToastService;
