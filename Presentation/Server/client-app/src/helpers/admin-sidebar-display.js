class AdminSidebarDisplay {
  static #minimized = null;
  
  static get minimized() {
    if (AdminSidebarDisplay.#minimized === null) {
      let state = window.localStorage.getItem('admin-sidebar-minimized');

      if (state === null || state === undefined) {
        AdminSidebarDisplay.minimized = false;
      } else {
        AdminSidebarDisplay.#minimized = (state === 'true');
      }
    }

    return AdminSidebarDisplay.#minimized;
  };

  static set minimized(state) {
    AdminSidebarDisplay.#minimized = state;

    window.localStorage.setItem('admin-sidebar-minimized', state);
  };
};

export default AdminSidebarDisplay;