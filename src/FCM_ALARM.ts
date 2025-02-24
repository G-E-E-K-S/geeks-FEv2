// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", function () {
			console.log("load");
			navigator.serviceWorker
				.register("/firebase-messaging-sw.js")
				.then(function (registration) {
					console.log("Service Worker가 scope에 등록되었습니다.:", registration.scope);
				})
				.catch(function (err) {
					console.log("Service Worker 등록 실패:", err);
				});
		});
	}
}

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FCM_APIKEY,
	authDomain: process.env.REACT_APP_FCM_AUTHDOMAIN,
	projectId: process.env.REACT_APP_FCM_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FCM_SENDER_ID,
	appId: process.env.REACT_APP_FCM_APP_ID
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function handleAllowNotification() {
	registerServiceWorker();
	console.log("handleAllowNotification");
	try {
		const permission = await Notification.requestPermission();
		alert(permission);
		if (permission === "granted") {
			// const token = await getToken(messaging, {
			//     vapidKey: "BPuVdaQKLaqXuYNB0dC2g_8840vs77Jj8Xx7P23g7SFL9JOBejSGLu2oz9QBrzwozHdy0La4ncn-lJgVgs8TWNg"
			// });
			//console.log(messaging);
			getToken(messaging, {
				vapidKey: process.env.REACT_APP_VAPIDKEY
			}).then((currentToken) => {
				if (currentToken) {
					// setToken(currentToken);
					//sendTokenToServer(token);// (토큰을 서버로 전송하는 로직)
				} else {
					alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
				}
			});
		} else if (permission === "denied") {
			alert("web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요");
		}
	} catch (error) {
		console.error("푸시 토큰 가져오는 중에 에러 발생", error);
	}

	onMessage(messaging, (payload) => {
		console.log("알림 도착 ", payload);
		const notification = payload.notification;
		const notificationTitle = notification?.title;
		const notificationOptions = {
			title: notificationTitle,
			body: notification?.body,
			badge: "https://bucket-geeks.s3.ap-northeast-2.amazonaws.com/logo.svg",
			icon: "https://bucket-geeks.s3.ap-northeast-2.amazonaws.com/logo.svg"
		};

		if (Notification.permission === "granted") {
			console.log(notificationTitle);
			if (!notificationTitle) return;
			new Notification(notificationTitle, notificationOptions);
		}
	});
}
