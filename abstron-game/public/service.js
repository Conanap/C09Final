// import { saveSubscription } from "src/queries/queries";

// function code taken directly from https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679
const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const registerToServer = async function(username, subscription) {
    console.log("registering");
    const query = "{\"query\":\"mutation {\\n  saveSub(username:\\\"" + username + "\\\", subscription:\\\"" + JSON.stringify(subscription) + "\\\") {\\n    username\\n  }\\n}\",\"variables\":null}";
    return await fetch('https://abstron.net:2053/graphql?', {
        "headers":{
            "accept":"application/json",
            "accept-language":"en,zh-TW;q=0.9,zh;q=0.8,zh-CN;q=0.7",
            "content-type":"application/json"
        },
        "referrer":"https://abstron.net:2053/",
        "referrerPolicy":"origin",
        "body":query,
        "method":"POST",
        "mode":"cors"
    })
    .then(function(res) {
        console.log(res);
        console.log("Successfully created subscription.");
    })
    .catch(function(err) {
        console.log('failed to register');
        console.error(err);
    });
};

const newNotification = function(title, body, swreg) {
    const options = {
        body
    };

    swreg.showNotification(title, options);
};

self.addEventListener('activate', async function() {
    let username = 'sabakia';
    console.log("Push service worker initializing.");

    try {
        const applicationServerKey = urlB64ToUint8Array('BIoXMHmJ075p-tNRwP_6-j1pBMba44Aot8xxKxvjfexPkSk78We2shzc9sKsR-SaDjagNj3WKBcgZAv5v3zRCiQ');
        const options = { applicationServerKey, userVisibleOnly: true };
        const sub = await self.registration.pushManager.subscribe(options);
        console.log(JSON.stringify(sub));

        const res = await registerToServer(username, sub);
        console.log(res);
    } catch (err) {
        console.log(err);
    }

});

self.addEventListener('push', function(event) {
    if(event.data) {
        newNotification("AbsTron", event.data.text(), self.registration);
    }
});