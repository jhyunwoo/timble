importScripts("https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js")

// 이곳에 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
const config = {
  apiKey: "AIzaSyBXiA07mFMSZiOLTRvo6Cf2_cX6MAY2ReM",
  projectId: "timble-9af87",
  messagingSenderId: "536733530711",
  appId: "1:536733530711:web:dcb3eba94fdcc227dec112",
}
// Initialize Firebase
firebase.initializeApp(config)

const messaging = firebase.messaging()
