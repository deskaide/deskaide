export const showBreakWindow = () => {
  if (window && window.showWindow) {
    window.showWindow.showBreakWindow();
  }
};

export const showMainWindow = () => {
  if (window && window.showWindow) {
    window.showWindow.showMainWindow();
  }
};
