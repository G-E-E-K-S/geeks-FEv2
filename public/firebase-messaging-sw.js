self.addEventListener("install", function (e) {
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

self.addEventListener("notificationclick", function (e) {
  const notification = e.notification;
  const action = e.action;

  if (action == "confirm") {
    e.waitUntil(self.clients.openWindow(notification.data.url));
    notification.close();
  } else if (action == "cancel") {
    notification.close();
  } else {
    e.waitUntil(self.clients.openWindow(notification.data.url));
    notification.close();
  }
});

importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDRtydDCeYxZXqhh3-6t8WngZzGEyjIyJk",
  authDomain: "geeks-d622d.firebaseapp.com",
  projectId: "geeks-d622d",
  storageBucket: "geeks-d622d.firebasestorage.app",
  messagingSenderId: "611238750750",
  appId: "1:611238750750:web:de8e43bd7fe9907e725c0f",
  measurementId: "G-SQ8H5MECQG",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const data = payload.data;
  const notification = payload.notification;
  const notificationTitle = notification.title;

  const notificationOptions = {
    title: notificationTitle,
    body: notification.body,
    data: data,
    badge: "univon.png", // 변경필요 128X128
    icon: "univon.png", // 변경필요 128X128
    actions: [
      { action: "confirm", title: "공지확인" },
      { action: "cancel", title: "취소" },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
