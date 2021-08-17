class DisplayOptions {
  static #productDisplayMode = null;

  static get productDisplayMode() {
    if (DisplayOptions.#productDisplayMode === null) {
      let mode = window.localStorage.getItem('product-display-mode');

      if (mode === null || mode === undefined) {
        DisplayOptions.productDisplayMode = 'list';
      } else {
        DisplayOptions.#productDisplayMode = mode;
      }
    }

    return DisplayOptions.#productDisplayMode;
  };

  static set productDisplayMode(mode) {
    DisplayOptions.#productDisplayMode = mode;

    window.localStorage.setItem('product-display-mode', mode);
  };
};

export default DisplayOptions;