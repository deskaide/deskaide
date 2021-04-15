const notify = (title = '', message = {}) => {
  const notification = new Notification(title, {
    body: message.body,
    icon: message.icon,
  });
  notification.onclick = (event) => {
    event.preventDefault();
  };
};

export default notify;
