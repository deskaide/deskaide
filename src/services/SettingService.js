export default class SettingService {
  setSetting = data => {
    const setting = JSON.stringify(data) || {};
    window.localStorage.setItem('setting', setting);
  };

  getSetting = () => {
    let setting = window.localStorage.getItem('setting');
    setting = setting ? JSON.parse(setting) : {};
    return setting;
  };
}
