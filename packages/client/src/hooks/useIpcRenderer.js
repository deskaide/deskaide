const electron = window.require("electron");
const { ipcRenderer } = electron;

const useIpcRenderer = () => {
  const sendEvent = (type = "", data) => ipcRenderer.send(type, data);

  const listenForEvent = (event = "", callback) =>
    ipcRenderer.on(event, callback);

  return { sendEvent, listenForEvent };
};

export default useIpcRenderer;
