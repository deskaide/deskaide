export const showBreakWindow = () => {
  if (window && window.manageWindow) {
    window.manageWindow.showBreakWindow();
  }
};

export const hideBreakWindow = () => {
  if (window && window.manageWindow) {
    window.manageWindow.hideBreakWindow();
  }
};
