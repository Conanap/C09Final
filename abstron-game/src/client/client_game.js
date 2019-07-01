
// push notification
// https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679
const checkPushSupport = function() {
  let ret = true;
  if(!("serviceWorker" in navigator)) {
    console.log("Service worker API not supported.");
    ret = false;
  }
  if(!("PushManager" in window)) {
    console.log("Push manager API not supported.");
    ret = false;
  }
  if(!ret) {
    console.log("Push notifications not supported on this browser.");
  }

  return ret;
};

const registerServiceWorker = async function() {
  const swreg = await navigator.serviceWorker.register('service.js');
  return swreg;
};

const requestNotiPermission = async function() {
  if(Notification.permission === 'default') {
    const perm = await window.Notification.requestPermission();

  if(perm !== 'granted')
    console.log('User did not grant permisison for notifications.');

  } else {
    console.log('Current notification permissions: ', Notification.permission);
  }
};

export async function startPushService() {
  if(!checkPushSupport())
    return;

  const swreg = await registerServiceWorker();
  const perm = await requestNotiPermission();
  console.log('Starting push service');
};