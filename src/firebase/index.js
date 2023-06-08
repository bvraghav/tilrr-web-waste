// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { VueFire, VueFireAuth } from 'vuefire'

export default {
  install: (app, options) => {
    /*  our code for the plugin goes here
        app is the result of createApp()
        options is user options passed in
    */
    // console.log('Installing Firebase!')
    // console.log(`With options: ${options}`)

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey            : import.meta.env.VITE_FIRE_API_KEY,
      authDomain        : import.meta.env.VITE_FIRE_AUTH_DOMAIN,
      databaseURL       : import.meta.env.VITE_FIRE_DATABASE_URL,
      projectId         : import.meta.env.VITE_FIRE_PROJECT_ID,
      storageBucket     : import.meta.env.VITE_FIRE_STORAGE_BUCKET,
      messagingSenderId : import.meta.env.VITE_FIRE_MESSAGING_SENDER_ID,
      appId             : import.meta.env.VITE_FIRE_APP_ID,
      measurementId     : import.meta.env.VITE_FIRE_MEASUREMENT_ID,
    };

    // console.log(firebaseConfig)

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseApp);

    app.use(VueFire, {
      // imported above but could also just be created here
      firebaseApp,
      modules: [
        // we will see other modules later on
        VueFireAuth(),
      ],
    })

  },
};


